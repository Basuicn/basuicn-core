# basuicn — React UI Component CLI

Bộ sưu tập component React hiện đại, phân phối trực tiếp vào dự án qua CLI. Bạn sở hữu hoàn toàn mã nguồn — không runtime ẩn, không black box (tương tự shadcn/ui).

---

## Yêu cầu

- **Node.js** 18+
- **React** 18+ / 19+
- **Framework**: Vite hoặc Next.js (App Router / Pages Router)
- **Styling**: Tailwind CSS v4

---

## Bắt đầu nhanh

### 1. Khởi tạo dự án

```bash
npx basuicn init
```

Lệnh này tự động:
- Cài đặt runtime packages: `@base-ui/react`, `tailwind-variants`, `clsx`, `lucide-react`, ...
- Cấu hình `vite.config.ts` với Tailwind CSS v4 + path aliases (`@/`, `@components/`, `@lib/`, ...)
- Cập nhật `tsconfig.json` với `paths` tương ứng
- Copy core files: `cn.ts`, `ThemeProvider.tsx`, `themes.ts`, `index.css`
- Bọc `<App />` trong `<ThemeProvider>` tại `src/main.tsx`

> **Next.js**: CLI tự nhận diện App Router / Pages Router và cấu hình phù hợp (`postcss.config.mjs`, `app/layout.tsx`, `pages/_app.tsx`).

---

### 2. Thêm component

```bash
npx basuicn add button
npx basuicn add button input card     # Thêm nhiều component
npx basuicn add                       # Chế độ interactive — chọn từ danh sách
```

Component được copy vào `src/components/ui/<name>/`. Bạn thoải mái chỉnh sửa sau.

> CLI tự động tải các component phụ thuộc nội bộ:
> - `select` → kéo theo `popover`
> - `table` → kéo theo `checkbox`, `spinner`
> - `sheet` → kéo theo `drawer`
> - `sidebar` → kéo theo `tooltip`

---

### 3. Cập nhật component

```bash
npx basuicn diff button       # Xem thay đổi giữa code local và registry
npx basuicn update button     # Ghi đè bằng phiên bản mới nhất
npx basuicn update button card dialog   # Cập nhật nhiều cùng lúc
```

---

### 4. Xóa component

```bash
npx basuicn remove button
npx basuicn remove dialog drawer sheet
```

---

### 5. Kiểm tra cấu hình (Doctor)

```bash
npx basuicn doctor
```

Kiểm tra toàn bộ: core files, ThemeProvider, CSS import, runtime packages, path aliases, Tailwind config — và gợi ý cách sửa nếu có vấn đề.

---

## Danh sách lệnh

| Lệnh | Mô tả |
|------|-------|
| `init` | Thiết lập dự án: cài packages, config Vite/Next.js, core files, ThemeProvider |
| `add <name...>` | Thêm component(s) vào `src/components/ui/` |
| `update <name...>` | Cập nhật component(s) lên phiên bản registry mới nhất |
| `diff <name...>` | So sánh code local với bản gốc trên registry |
| `remove <name...>` | Xóa component(s) và dọn thư mục trống |
| `list` | Liệt kê tất cả component có sẵn (hiển thị trạng thái installed/available) |
| `doctor` | Kiểm tra sức khỏe cấu hình dự án |

### Options

| Flag | Mô tả |
|------|-------|
| `--force` | Ghi đè file đã tồn tại khi `add` / `update` |
| `--local` | Đọc `registry.json` local thay vì fetch từ GitHub |
| `--help, -h` | Hiển thị hướng dẫn (dùng với command để xem chi tiết: `add --help`) |
| `--version, -v` | Hiển thị phiên bản CLI |

---

## Danh sách component

### Input & Form
| Component | Mô tả |
|-----------|-------|
| `button` | Button với nhiều variant, size, loading state |
| `input` | Text input cơ bản |
| `textarea` | Textarea với auto-resize |
| `checkbox` | Checkbox có label |
| `radio` / `radio-group` | Radio button và Radio Group |
| `switch` | Toggle switch |
| `toggle` | Toggle button |
| `select` | Dropdown select |
| `autocomplete` | Input với gợi ý tự động |
| `combobox` | Combobox tìm kiếm + chọn |
| `number-input` | Input số với nút tăng/giảm |
| `input-otp` | OTP input nhiều ô |
| `slider` | Range slider |
| `rate` | Đánh giá sao |
| `file-upload` | Upload file với drag & drop |
| `form` | Form wrapper tích hợp react-hook-form + zod |
| `calendar` | Bộ chọn ngày |
| `datepicker` | Input + calendar popup |

### Overlay & Popup
| Component | Mô tả |
|-----------|-------|
| `dialog` | Modal dialog |
| `alert-dialog` | Dialog xác nhận hành động |
| `drawer` | Drawer trượt từ cạnh màn hình |
| `sheet` | Sheet (alias drawer mở rộng) |
| `popover` | Popup neo đến element |
| `tooltip` | Tooltip hiển thị khi hover |
| `dropdown-menu` | Menu dropdown |
| `context-menu` | Menu chuột phải |
| `preview-card` | Card preview khi hover |
| `command` | Command palette (Ctrl+K) |

### Hiển thị dữ liệu
| Component | Mô tả |
|-----------|-------|
| `table` | Bảng dữ liệu với sort, filter, pagination |
| `chart` | Biểu đồ (line, bar, pie, ...) dựa trên Recharts |
| `carousel` | Carousel / slider ảnh |
| `timeline` | Timeline sự kiện |
| `accordion` | Accordion mở rộng/thu gọn |
| `collapsible` | Nội dung có thể ẩn/hiện |
| `tree-view` | Cây phân cấp |
| `table-contents` | Mục lục tự động từ headings |

### Navigation
| Component | Mô tả |
|-----------|-------|
| `breadcrumb` | Đường dẫn điều hướng |
| `tabs` | Tabs navigation |
| `pagination` | Phân trang |
| `menu-bar` | Menu bar ngang |
| `sidebar` | Sidebar điều hướng |

### Feedback & Trạng thái
| Component | Mô tả |
|-----------|-------|
| `toast` | Thông báo toast (Sonner) — tự thêm `<Toaster />` vào `main.tsx` |
| `alert` | Thông báo inline |
| `spinner` | Loading spinner |
| `progress` | Thanh tiến trình |
| `skeleton` | Skeleton loading placeholder |
| `empty` | Trạng thái trống (empty state) |

### Layout & Misc
| Component | Mô tả |
|-----------|-------|
| `card` | Card container |
| `badge` | Badge / tag nhỏ |
| `avatar` | Avatar ảnh / initials |
| `separator` | Đường kẻ phân cách |
| `aspect-ratio` | Container giữ tỉ lệ khung hình |
| `resizable` | Panel chia tay có thể kéo resize |
| `scroll-area` | Vùng cuộn tùy chỉnh |
| `typography` | Các thẻ heading, paragraph chuẩn hóa style |
| `pretty-code` | Hiển thị code với syntax highlight (Shiki) |

---

## Dành cho Maintainers

```bash
# Chạy dev server (showcase)
npm run dev

# Build registry từ source components
npm run registry:build

# Đồng bộ theme CSS từ themes.ts
npm run theme:sync

# Build CLI binary
npm run build:cli

# Kích hoạt auto version bump sau mỗi commit
npm run setup-hooks

# Đặt version thủ công
npm run version:set 1.0.0       # Set thẳng
npm run version:set major        # 0.x.x → 1.0.0
npm run version:set minor        # x.2.x → x.3.0

# Publish lên npm
npm publish
```

---

## License

MIT
