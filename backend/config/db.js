require('dotenv').config();
const mysql = require('mysql2');

// استخدام createPool بدلاً من createConnection
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 4, // تحديد الحد الأقصى للاتصالات لتجنب حظر Clever Cloud
    queueLimit: 0
});

// اختبار الاتصال
db.getConnection((err, connection) => {
    if (err) {
        console.error('❌ خطأ في الاتصال بقاعدة البيانات:', err);
    } else {
        console.log('✅ تم الاتصال بقاعدة بيانات MySQL بنجاح (Pool)');
        connection.release(); // تحرير الاتصال لطلبات أخرى
    }
});

module.exports = db;