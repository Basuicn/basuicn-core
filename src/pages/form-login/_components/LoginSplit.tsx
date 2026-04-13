import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Lock, BadgeCheck } from 'lucide-react';
import { Form, FormField } from '@/components/ui/form/Form';
import { Input } from '@/components/ui/input/Input';
import { Button } from '@/components/ui/button/Button';
import { Checkbox } from '@/components/ui/checkbox/Checkbox';
import { toast } from 'sonner';

const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu ít nhất 6 ký tự'),
  rememberMe: z.boolean().optional(),
});

type LoginValues = z.infer<typeof loginSchema>;

const features = [
  'Bảo mật 2 lớp (2FA)',
  'Đồng bộ đa thiết bị',
  'Dashboard phân tích thời gian thực',
  'Hỗ trợ 24/7',
];

export const LoginSplit = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  });

  const onSubmit = async (_data: LoginValues) => {
    setIsLoading(true);
    await new Promise<void>((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    toast.success('Đăng nhập thành công!');
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border shadow-lg animate-in fade-in zoom-in-95 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[480px]">
        {/* Left: Branding */}
        <div className="relative hidden md:flex flex-col justify-between bg-gradient-to-br from-primary via-primary/90 to-primary/70 p-10 text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.1),transparent_60%)]" />

          <div className="relative flex items-center gap-2 font-bold text-xl">
            <BadgeCheck className="h-6 w-6" />
            BasuiCN
          </div>

          <div className="relative space-y-6">
            <h2 className="text-3xl font-bold leading-snug">
              Nền tảng quản lý<br />thế hệ mới
            </h2>
            <ul className="space-y-3">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-primary-foreground/80 text-sm">
                  <BadgeCheck className="h-4 w-4 shrink-0 text-primary-foreground/60" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <p className="relative text-primary-foreground/40 text-xs">
            © 2026 BasuiCN. All rights reserved.
          </p>
        </div>

        {/* Right: Form */}
        <div className="bg-card flex flex-col justify-center p-10">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground">Chào mừng trở lại</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Đăng nhập để tiếp tục sử dụng dịch vụ
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <Input
                    label="Email"
                    type="email"
                    placeholder="email@example.com"
                    variant="filled"
                    icon={<Mail className="w-4 h-4" />}
                    error={fieldState.error?.message}
                    {...field}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <Input
                    label="Mật khẩu"
                    type="password"
                    placeholder="••••••••"
                    variant="filled"
                    icon={<Lock className="w-4 h-4" />}
                    error={fieldState.error?.message}
                    {...field}
                  />
                )}
              />

              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <Checkbox
                      label="Ghi nhớ đăng nhập"
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked === true)}
                    />
                  )}
                />
                <Button variant="link" type="button">
                  Quên mật khẩu?
                </Button>
              </div>

              <Button
                type="submit"
                className="w-full"
                isLoading={isLoading}
                disabled={isLoading}
              >
                Đăng nhập
              </Button>
            </form>
          </Form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Chưa có tài khoản?{' '}
            <Button variant="link" type="button" className="px-0 font-semibold">
              Đăng ký ngay
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};
