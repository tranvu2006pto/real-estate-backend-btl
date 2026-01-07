# 🏠 WEBSITE BUÔN BÁN NHÀ ĐẤT

## 1. Giới thiệu
Đây là website buôn bán nhà đất được xây dựng phục vụ cho **bài tập nhóm**, cho phép:
- Hiển thị danh sách nhà đất
- Lọc theo giá, diện tích, loại hình
- Xem thông tin người bán
- Thêm nhà mới và **lưu dữ liệu thật**

Website được triển khai **fullstack** với frontend và backend chạy chung trên **Render**, dữ liệu lưu trữ bằng **MongoDB Atlas**.

---

## 2. Công nghệ sử dụng

### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla JS)

### Backend
- Node.js (http module)
- MongoDB Atlas
- Mongoose

### Triển khai
- Render (Web Service)
- MongoDB Atlas (Free tier)

---

## 3. Các chức năng chính

### 1. Giới thiệu buôn bán nhà
- Hiển thị danh sách nhà đất bán và cho thuê
- Giao diện dạng thẻ (card)
- Thông tin cơ bản: tiêu đề, diện tích, giá, loại hình

### 2. Tìm kiếm và lọc
- Lọc theo:
  - Khoảng giá (đơn vị: tỷ)
  - Diện tích
  - Loại hình (bán / thuê)
- Áp dụng bộ lọc trực tiếp trên giao diện

### 3. Thông tin người bán
- Hiển thị:
  - Tên người bán
  - Số điện thoại
- Có nút gọi điện và liên hệ Zalo

### 4. Thêm nhà mới
- Form nhập thông tin nhà
- Kiểm tra dữ liệu phía frontend
- Gửi dữ liệu lên backend
- Lưu vĩnh viễn vào MongoDB Atlas

---

## 4. Kiến trúc hệ thống

Client (Trình duyệt)  
→ Render Server (Node.js)  
→ MongoDB Atlas (Cơ sở dữ liệu)

---

## 5. Cấu trúc thư mục

project-root/
- server.js
- package.json
- package-lock.json
- public/
  - index.html
  - style.css
  - responsive.css
  - script.js

---

## 6. Hướng dẫn chạy local

### Bước 1: Cài đặt thư viện
npm install

### Bước 2: Cấu hình biến môi trường
Tạo biến môi trường:
MONGO_URI = mongodb+srv://<user>:<password>@cluster.mongodb.net/realestate

### Bước 3: Chạy server
node server.js

Mở trình duyệt tại:
http://localhost:3000

---

## 7. Triển khai
- Website được deploy trên Render
- Backend và frontend chạy chung
- Dữ liệu được lưu trữ thật trên MongoDB Atlas

---

## 8. Kết luận
Dự án đáp ứng đầy đủ yêu cầu bài tập:
- Website buôn bán nhà đất
- Có backend xử lý dữ liệu
- Có chức năng lọc, tìm kiếm
- Lưu dữ liệu thật
- Hoạt động ổn định trên môi trường online

---

## 9. Hướng phát triển
- Đăng nhập người dùng
- Phân quyền quản trị
- Upload hình ảnh thật
- Quản lý tin đăng
- Tìm kiếm nâng cao

---

Nhóm thực hiện: 4

