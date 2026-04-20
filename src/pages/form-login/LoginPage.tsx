import React from 'react';
import { PageHeader, ShowcaseCard } from '@/components/ui/Showcase';
import { LoginClassic } from '../../components/ui/login-classic/LoginClassic';
import { LoginMinimal } from '../../components/ui/login-minimal/LoginMinimal';
import { LoginGlass } from '../../components/ui/login-glass/LoginGlass';
import { LoginSplit } from '../../components/ui/login-split/LoginSplit';
import LoginFullScreen from '../../components/ui/login-fullscreen/LoginFullScreen';

const LoginPage = () => {
  return (
    <div className="max-w-5xl mx-auto py-8">
      <PageHeader
        title="Form Đăng Nhập"
        description="Bộ sưu tập các mẫu form đăng nhập đa dạng phong cách — React Hook Form + Zod validation. Chọn mẫu phù hợp với thiết kế dự án của bạn."
      />

      <ShowcaseCard
        title="Classic — Thẻ chuẩn với viền"
        description="Dạng phổ biến nhất: card trắng, input viền, social login. Phù hợp cho hầu hết ứng dụng."
      >
        <div className="w-full flex justify-center py-4">
          <LoginClassic />
        </div>
      </ShowcaseCard>

      <ShowcaseCard
        title="Minimal — Input gạch chân (Flushed)"
        description="Thiết kế tối giản, input chỉ có gạch chân phía dưới. Phù hợp giao diện editorial hoặc landing page hiện đại."
      >
        <div className="w-full flex justify-center py-8">
          <LoginMinimal />
        </div>
      </ShowcaseCard>

      <ShowcaseCard
        title="Glass Morphism — Kính mờ nền tối"
        description="Hiệu ứng backdrop blur trên nền gradient tối. Nổi bật, ấn tượng — dùng cho trang marketing hoặc hero section."
        dark
      >
        <div className="w-full flex justify-center py-6">
          <LoginGlass />
        </div>
      </ShowcaseCard>

      <ShowcaseCard
        title="Split Layout — Hai cột kèm branding"
        description="Chia đôi màn hình: bên trái hiển thị thương hiệu & tính năng nổi bật, bên phải là form — chuẩn SaaS."
      >
        <div className="w-full">
          <LoginSplit />
        </div>
      </ShowcaseCard>
      <ShowcaseCard
        title="Full Screen Layout — Toàn màn hình"
        description="Toàn màn hình: bên trái hiển thị thương hiệu & tính năng nổi bật, bên phải là form — chuẩn SaaS."
      >
        <div className="w-full">
          <LoginFullScreen />
        </div>
      </ShowcaseCard>
    </div>
  );
};

export default LoginPage;
