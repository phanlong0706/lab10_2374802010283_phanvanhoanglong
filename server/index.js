const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Thêm dòng này

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// APIs
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from server!' });
});
app.use('/api/admin', require('./api/admin.js'));
app.use('/api/customer', require('./api/customer.js'));

// ----------------------------------------------------------------
// CẤU HÌNH HOSTING CHO LAB 10 (Thêm đoạn này trước app.listen)
// ----------------------------------------------------------------

// 1. Phục vụ các file đã build của Admin
app.use('/admin', express.static(path.resolve(__dirname, '../client-admin/build')));
app.get('/admin/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client-admin/build', 'index.html'));
});

// 2. Phục vụ các file đã build của Customer (Trang chủ)
app.use('/', express.static(path.resolve(__dirname, '../client-customer/build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client-customer/build', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});