# CUS-UI CLI (Remote/NPM Ready)

Bộ công cụ CLI giúp bạn cài đặt các components từ thư viện UI này vào bất kỳ dự án React nào khác thông qua `npx`.

## 🚀 Cách sử dụng từ dự án khác

Bạn không cần cài đặt gì cả, chỉ cần đứng tại thư mục dự án của bạn và gõ:

### 1. Khởi tạo dự án (Lần đầu)
```bash
npx base-cus-ui init
```
Lệnh này sẽ tự động cài các gói cần thiết (`clsx`, `tailwind-merge`) và tạo file `src/lib/utils/cn.ts`.

### 2. Thêm Component
```bash
npx base-cus-ui add button input switch
```
*Lưu ý: CLI sẽ tự động nhận diện và tải thêm các component phụ thuộc nếu cần.*

### 3. Cấu hình Tailwind
Chạy lệnh sau để nhận hướng dẫn copy-paste cấu hình theme:
```bash
npx base-cus-ui tailwind
```

---
### 4. Liệt kê Component
```bash
npx base-cus-ui list
```

## 🛠 Cách để tự bạn quản lý và phát hành

### 1. Cập nhật Registry (Khi thêm component mới)
```bash
npm run registry:build
```
Sau đó hãy `git commit` và `git push` lên GitHub để CLI trên máy người dùng có thể thấy update mới.

### 2. Biên dịch CLI
```bash
npm run build:cli
```

### 3. Phát hành lên NPM
Để mọi người có thể gõ `npx base-cus-ui`, bạn cần đưa nó lên NPM:
1. Đăng nhập: `npm login`
2. Phát hành: `npm publish` (Nếu tên `base-cus-ui` đã bị trùng trên NPM, hãy đổi tên trong `package.json`).

---

## 📂 Cơ chế hoạt động
- **Local Mode**: Nếu bạn chạy `npx cus-ui add --local`, nó sẽ tìm file `registry.json` ngay tại thư mục hiện tại.
- **Remote Mode (Mặc định)**: CLI sẽ tải dữ liệu trực tiếp từ: `https://raw.githubusercontent.com/huy14032003/ui-component/main/registry.json`.
