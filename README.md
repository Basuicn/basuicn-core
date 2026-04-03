# cus-base-ui

Bộ component UI cho React, phân phối qua CLI — copy trực tiếp vào dự án của bạn, không cần cài như package dependency (tương tự shadcn/ui).

---

## Yêu cầu

- Node.js 18+
- Dự án React + Vite + TypeScript

---

## Bắt đầu nhanh

### 1. Khởi tạo dự án

Đứng tại thư mục gốc dự án của bạn, chạy:

```bash
npx cus-base-ui init
```

Lệnh này tự động thực hiện:

| Bước | Nội dung |
|------|----------|
| Cài dev packages | `tailwindcss`, `@tailwindcss/vite`, `@vitejs/plugin-react`, `vite-plugin-babel`, `babel-plugin-react-compiler`, `@types/node` |
| Tạo / cập nhật `vite.config.ts` | Thêm plugin Tailwind, React, React Compiler + alias `@`, `@lib`, `@components`, `@assets`, `@pages`, `@styles` |
| Cập nhật `tsconfig.json` | Thêm `baseUrl` + `paths` tương ứng với alias trên |
| Setup Tailwind CSS | Thêm `@import "tailwindcss";` vào `src/index.css` (tạo mới nếu chưa có) |
| Cài core utilities | `clsx`, `tailwind-merge` + tạo `src/lib/utils/cn.ts` |

> Nếu `vite.config.ts` hoặc `tsconfig.json` đã tồn tại và đã có cấu hình, CLI sẽ bỏ qua bước đó — không ghi đè.

**Kết quả `vite.config.ts` sau init:**

```ts
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import babel from 'vite-plugin-babel';
import { reactCompilerPreset } from 'babel-plugin-react-compiler';
import path from 'path';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@components': path.resolve(__dirname, './src/components'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@styles': path.resolve(__dirname, './src/styles'),
    },
  },
});
```

---

### 2. Thêm component

```bash
npx cus-base-ui add button
npx cus-base-ui add button input switch   # nhiều component cùng lúc
npx cus-base-ui add button --force        # ghi đè nếu đã tồn tại
```

Component được copy thẳng vào `src/components/ui/<name>/`. Các component phụ thuộc lẫn nhau sẽ tự động được kéo theo.

---

### 3. Xóa component

```bash
npx cus-base-ui remove button
```

---

### 4. Liệt kê tất cả component

```bash
npx cus-base-ui list
```

---

### 5. Hướng dẫn cấu hình Tailwind theme

```bash
npx cus-base-ui tailwind
```

---

## Tùy chọn

| Flag | Mô tả |
|------|-------|
| `--local` | Dùng `registry.json` cục bộ thay vì tải từ remote |
| `--force` | Ghi đè file đã tồn tại khi `add` |

---

## Dành cho maintainer

### Cập nhật registry (sau khi thêm/sửa component)

```bash
npm run registry:build
```

Sau đó commit + push lên GitHub để người dùng nhận được bản mới nhất.

### Build CLI

```bash
npm run build:cli
```

Output: `dist/ui-cli.js`

### Phát hành lên NPM

```bash
npm login
npm publish
```

> Nếu tên package bị trùng, đổi `name` trong `package.json` trước khi publish.

---

## Cơ chế hoạt động

- **Remote mode (mặc định):** Tải `registry.json` từ `https://raw.githubusercontent.com/huy14032003/ui-component/main/registry.json`
- **Local mode (`--local`):** Đọc `registry.json` ngay tại thư mục hiện tại
- Registry chứa source code + danh sách npm dependencies của từng component — CLI đọc rồi copy/install vào dự án target
