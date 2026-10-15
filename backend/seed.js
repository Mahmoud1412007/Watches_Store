const mysql2 = require('mysql2');

// إعدادات الاتصال بتاعتك (اتأكد إن اسم قاعدة البيانات صح)
const db = mysql2.createConnection({
    host: 'bo4a4tjbzl45qxyilro8-mysql.services.clever-cloud.com',
    user: 'uswisnfqxloydl4v',
    password: 'YaBwIwXW0S05wrW4TB8V',
    database: 'bo4a4tjbzl45qxyilro8',
    port: 3306 
});

db.connect(err => {
    if (err) throw err;
    console.log('تم الاتصال بقاعدة البيانات... جاري إضافة المنتجات!');
    seedData();
});

const categories = ['رجالي', 'حريمي', 'أوريجينال', 'ميرور'];
const brands = ['Rolex', 'Omega', 'Seiko', 'Patek Philippe', 'Casio', 'Cartier', 'Tissot'];
const images = [
    'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500',
    'https://images.unsplash.com/photo-1587836374828-cb4387df3c56?w=500',
    'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500',
    'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=500',
    'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500'
];

function seedData() {
    let count = 0;
    const totalWatches = categories.length * 30; // 4 تصنيفات * 30 = 120 ساعة

    categories.forEach(cat => {
        for(let i = 1; i <= 30; i++) {
            const brand = brands[Math.floor(Math.random() * brands.length)];
            const name = `${brand} الإصدار ${i}`;
            const price = Math.floor(Math.random() * 15000) + 1000; // سعر عشوائي بين 1000 و 16000
            const image_url = images[Math.floor(Math.random() * images.length)];
            const desc = `ساعة ${cat} فخمة جداً من ماركة ${brand}، تتميز بالدقة العالية والتصميم الأنيق الذي يناسب جميع الأذواق.`;

            const query = 'INSERT INTO watches (name, brand, price, image_url, description, stock, is_displayed, category) VALUES (?, ?, ?, ?, ?, 15, true, ?)';
            
            db.query(query, [name, brand, price, image_url, desc, cat], (err) => {
                if (err) console.error(err);
                count++;
                
                // لما يخلص إضافة الـ 120 كلهم
                if(count === totalWatches) {
                    console.log(`تم إضافة ${totalWatches} ساعة بنجاح! روح شوف الموقع دلوقتي.`);
                    process.exit(); // يقفل السكريبت
                }
            });
        }
    });
}