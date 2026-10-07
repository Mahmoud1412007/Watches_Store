const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // الافتراضي في XAMPP
    password: '', // الافتراضي بيبقى فاضي
    database: 'watch_store',
    port: 3307
});

db.connect((err) => {
    if (err) {
        console.error('❌ خطأ في الاتصال بقاعدة البيانات:', err);
        return;
    }
    console.log('✅ تم الاتصال بقاعدة بيانات MySQL بنجاح');
});

module.exports = db;