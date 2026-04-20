
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Lock, Quote } from 'lucide-react';
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

export const LoginFullScreen = () => {
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
    <div className="h-screen w-full flex">

      {/* ── Left: Color panel ─────────────────────────────────── */}
      <div className="hidden md:flex w-[60%] flex-col justify-between p-12 bg-gradient-to-br from-primary via-primary/90 to-violet-700 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/5 rounded-full" />
        <div className="absolute top-1/2 -right-32 w-72 h-72 bg-white/5 rounded-full" />
        <div className="absolute -bottom-16 left-1/4 w-56 h-56 bg-white/5 rounded-full" />

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="w-9 h-9 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-sm select-none">UI</span>
          </div>
          <span className="text-white font-semibold text-lg tracking-tight">BasuiCN</span>
        </div>

        {/* Quote */}
        <div className="relative space-y-5">
          <Quote className="w-10 h-10 text-white/30" />
          <p className="text-white text-2xl font-medium leading-relaxed max-w-xs">
            Công cụ tốt nhất là thứ giúp bạn làm việc nhanh hơn, không phải phức tạp hơn.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-bold">
              NT
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Nguyễn Trung</p>
              <p className="text-white/50 text-xs">Product Lead · BasuiCN</p>
            </div>
          </div>
        </div>

        <p className="relative text-white/30 text-xs">© 2026 BasuiCN. All rights reserved.</p>
      </div>

      {/* ── Right: Form panel ─────────────────────────────────── */}
      <div className="flex-1 flex flex-col bg-background overflow-y-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between p-8">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 md:invisible">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs select-none">UI</span>
            </div>
            <span className="font-semibold text-foreground text-sm">BasuiCN</span>
          </div>
          <Button variant="ghost" size="sm" className="text-sm text-muted-foreground ml-auto">
            Chưa có tài khoản?&nbsp;
            <span className="text-primary font-semibold">Đăng ký</span>
          </Button>
        </div>

        {/* Centered form */}
        <div className="flex-1 flex items-center justify-center px-8 pb-12">
          <div className="w-full max-w-sm space-y-8">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-foreground tracking-tight">Chào mừng trở lại</h1>
              <p className="text-muted-foreground text-sm">Đăng nhập để tiếp tục sử dụng dịch vụ</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <Input
                      label="Email"
                      type="email"
                      placeholder="email@example.com"
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
                  <Button variant="link" type="button" className="px-0 text-sm">
                    Quên mật khẩu?
                  </Button>
                </div>

                <Button type="submit" className="w-full" size="lg" isLoading={isLoading} disabled={isLoading}>
                  Đăng nhập
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Hoặc tiếp tục với</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" type="button" className="w-full">Google</Button>
                  <Button variant="outline" type="button" className="w-full">GitHub</Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LoginFullScreen;
