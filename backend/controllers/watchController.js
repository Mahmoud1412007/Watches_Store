const db = require('../config/db');

// دالة لجلب كل الساعات
const getAllWatches = (req, res) => {
    const query = 'SELECT * FROM watches';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'خطأ في جلب البيانات من السيرفر' });
        }
        res.status(200).json(results);
    });
};

// دالة لجلب ساعة واحدة بالـ ID
const getWatchById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM watches WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'خطأ في جلب البيانات' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'الساعة غير موجودة' });
        }
        res.status(200).json(results[0]);
    });
};

module.exports = { getAllWatches, getWatchById };