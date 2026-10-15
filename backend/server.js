const express = require('express');
const cors = require('cors');

const app = express();
const db = require('./config/db');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// إعدادات الـ Middleware
app.use(cors());
app.use(express.json()); 

app.use(cors({
    origin: 'https://watches-store-chi.vercel.app',
    credentials: true
}));


// ==========================================
// 1. مسارات المصادقة (Auth)
// ==========================================
app.post('/api/auth/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        
        db.query(query, [name, email, hashedPassword], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ error: 'البريد الإلكتروني مستخدم بالفعل' });
                return res.status(500).json({ error: 'خطأ في السيرفر' });
            }
            res.status(201).json({ message: 'تم إنشاء الحساب بنجاح' });
        });
    } catch (err) {
        res.status(500).json({ error: 'مشكلة أثناء التشفير' });
    }
});

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ?';
    
    db.query(query, [email], async (err, results) => {
        if (err) return res.status(500).json({ error: 'خطأ في السيرفر' });
        if (results.length === 0) return res.status(401).json({ error: 'البريد أو كلمة المرور غير صحيحة' });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'البريد أو كلمة المرور غير صحيحة' });

        const token = jwt.sign({ id: user.id, role: user.role }, 'secret_key_timekeepers', { expiresIn: '1d' });
        
        res.json({ 
            message: 'تم تسجيل الدخول بنجاح', 
            token, 
            user: { name: user.name, email: user.email, role: user.role } 
        });
    });
});


// ==========================================
// 2. مسارات المستخدمين (Users)
// ==========================================
app.get('/api/users', (req, res) => {
    const query = 'SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: 'خطأ في جلب المستخدمين' });
        res.json(results);
    });
});

app.patch('/api/users/:id/role', (req, res) => {
    const { role } = req.body;
    const query = 'UPDATE users SET role = ? WHERE id = ?';
    db.query(query, [role, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: 'خطأ في تعديل الصلاحية' });
        res.json({ message: 'تم تحديث الصلاحية بنجاح' });
    });
});


// ==========================================
// 3. مسارات الطلبات (Orders)
// ==========================================
app.post('/api/orders', (req, res) => {
    const { customer_name, customer_phone, address, total_amount, items } = req.body;
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 7);
    const formattedDate = deliveryDate.toISOString().split('T')[0]; 

    const orderQuery = 'INSERT INTO orders (customer_name, customer_phone, address, total_amount, delivery_date) VALUES (?, ?, ?, ?, ?)';
    db.query(orderQuery, [customer_name, customer_phone, address, total_amount, formattedDate], (err, result) => {
        if (err) return res.status(500).json({ error: 'خطأ أثناء حفظ الطلب الرئيسي' });

        const orderId = result.insertId;
        const itemsValues = items.map(item => [orderId, item.id, item.quantity]);
        const itemsQuery = 'INSERT INTO order_items (order_id, watch_id, quantity) VALUES ?';

        db.query(itemsQuery, [itemsValues], (err) => {
            if (err) return res.status(500).json({ error: 'خطأ أثناء حفظ منتجات الطلب' });
            res.status(201).json({ message: 'تم الطلب بنجاح', expectedDelivery: formattedDate });
        });
    });
});

app.get('/api/orders/track/:phone', (req, res) => {
    const phone = req.params.phone;
    const query = 'SELECT * FROM orders WHERE customer_phone = ? ORDER BY created_at DESC';
    db.query(query, [phone], (err, results) => {
        if (err) return res.status(500).json({ error: 'خطأ في جلب الطلبات' });
        res.json(results);
    });
});

app.get('/api/orders', (req, res) => {
    const query = 'SELECT * FROM orders ORDER BY created_at DESC';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: 'خطأ في جلب الطلبات' });
        res.json(results);
    });
});

app.patch('/api/orders/:id/status', (req, res) => {
    const { status } = req.body;
    const query = 'UPDATE orders SET status = ? WHERE id = ?';
    db.query(query, [status, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: 'خطأ في تحديث الحالة' });
        res.json({ message: 'تم تحديث حالة الطلب بنجاح' });
    });
});


// ==========================================
// 4. مسارات الدعم الفني (Contact)
// ==========================================
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    const query = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
    db.query(query, [name, email, message], (err) => {
        if (err) return res.status(500).json({ error: 'خطأ في حفظ الرسالة' });
        res.status(201).json({ message: 'تم استلام الرسالة بنجاح' });
    });
});

app.get('/api/contact', (req, res) => {
    const query = 'SELECT * FROM contacts ORDER BY created_at DESC';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: 'خطأ في جلب الرسائل' });
        res.json(results);
    });
});

app.patch('/api/contact/:id/read', (req, res) => {
    const query = 'UPDATE contacts SET is_read = TRUE WHERE id = ?';
    db.query(query, [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: 'خطأ في التحديث' });
        res.json({ message: 'تم التحديد كمقروء' });
    });
});


// ==========================================
// 5. مسارات المنتجات (Watches)
// ==========================================

// جلب المنتجات (بالتصنيف الجديد)
app.get('/api/watches', (req, res) => {
    const query = 'SELECT * FROM watches ORDER BY id DESC';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: 'خطأ في جلب المنتجات' });
        res.json(results);
    });
});

// جلب تفاصيل ساعة واحدة (بالـ ID) لصفحة عرض المنتج
app.get('/api/watches/:id', (req, res) => {
    const query = 'SELECT * FROM watches WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: 'خطأ في جلب بيانات الساعة' });
        
        // لو ملقاش الساعة في الداتا بيز
        if (results.length === 0) return res.status(404).json({ message: 'الساعة غير موجودة' });
        
        // بيرجع بيانات الساعة ككائن (Object) مش مصفوفة
        res.json(results[0]); 
    });
});

// إضافة منتج جديد (النسخة الصحيحة بالتصنيف ومعاها الكشف)
app.post('/api/watches', (req, res) => {
    console.log("البيانات اللي جاية من الواجهة يا محمود:", req.body); 

    const { name, brand, price, image_url, description, stock, is_displayed, category } = req.body;
    const query = 'INSERT INTO watches (name, brand, price, image_url, description, stock, is_displayed, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [name, brand, price, image_url, description, stock || 0, is_displayed !== false, category || 'رجالي'], (err, result) => {
        if (err) return res.status(500).json({ error: 'خطأ أثناء إضافة المنتج' });
        res.status(201).json({ message: 'تم الإضافة بنجاح' });
    });
});

// تعديل منتج (النسخة الصحيحة بالتصنيف)
app.put('/api/watches/:id', (req, res) => {
    const { name, brand, price, image_url, description, is_displayed, category } = req.body;
    const query = 'UPDATE watches SET name=?, brand=?, price=?, image_url=?, description=?, is_displayed=?, category=? WHERE id=?';
    
    db.query(query, [name, brand, price, image_url, description, is_displayed, category, req.params.id], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'خطأ أثناء تعديل المنتج' });
        }
        res.json({ message: 'تم التعديل بنجاح' });
    });
});

app.delete('/api/watches/:id', (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM watches WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) return res.status(500).json({ error: 'خطأ أثناء حذف المنتج' });
        res.json({ message: 'تم الحذف بنجاح' });
    });
});

app.patch('/api/watches/:id/stock', (req, res) => {
    const { stock } = req.body;
    const query = 'UPDATE watches SET stock = ? WHERE id = ?';
    db.query(query, [stock, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: 'خطأ أثناء تحديث المخزون' });
        res.json({ message: 'تم تحديث المخزون بنجاح' });
    });
});

// مسار رئيسي
app.get('/', (req, res) => {
    res.send('مرحباً بك في سيرفر متجر الساعات 🚀');
});

// تشغيل السيرفر
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 السيرفر شغال على البورت ${PORT}`);
});
module.exports = app;