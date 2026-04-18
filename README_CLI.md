# basuicn CLI

Công cụ dòng lệnh để thêm, cập nhật và quản lý các component UI trong dự án React.

## Cài đặt & Khởi tạo

```bash
npx basuicn init
```

Tự động cài packages, cấu hình Vite/Next.js, Tailwind CSS v4, path aliases và ThemeProvider.

## Các lệnh

```bash
npx basuicn add <name...>       # Thêm component
npx basuicn update <name...>    # Cập nhật lên phiên bản mới nhất
npx basuicn diff <name...>      # So sánh với bản gốc trên registry
npx basuicn remove <name...>    # Xóa component
npx basuicn list                # Danh sách tất cả component
npx basuicn doctor              # Kiểm tra cấu hình dự án
```

### Options

```
--force     Ghi đè file đã tồn tại
--local     Dùng registry.json local thay vì fetch từ GitHub
--help      Hướng dẫn chi tiết (vd: npx basuicn add --help)
--version   Hiển thị phiên bản
```

## Cơ chế hoạt động

1. Fetch metadata từ `registry.json` trên GitHub
2. Cài đặt npm packages cần thiết
3. Tải về các component phụ thuộc nội bộ tự động
4. Copy source code vào `src/components/ui/<name>/`
5. Patch `main.tsx` / `layout.tsx` nếu component yêu cầu (vd: `toast`)

## Bảo mật

- Không có runtime dependency sau khi cài đặt — bạn sở hữu hoàn toàn mã nguồn
- Mã nguồn mở 100%, thoải mái tùy chỉnh

Xem thêm tại [README.md](./README.md).
