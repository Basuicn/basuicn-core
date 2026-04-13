import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Lock, Sparkles } from 'lucide-react';
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

const glassInputClass =
  'bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-violet-400';

export const LoginGlass = () => {
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
    <div className="relative w-full max-w-sm overflow-hidden rounded-2xl p-px bg-gradient-to-br from-violet-500/30 via-indigo-500/20 to-transparent">
      {/* Gradient backdrop */}
      <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-violet-900 via-indigo-900 to-slate-900" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_rgba(139,92,246,0.3),transparent_60%)]" />

      <div className="relative rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 space-y-6 animate-in fade-in zoom-in-95 duration-500">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 border border-white/20">
            <Sparkles className="h-7 w-7 text-violet-300" />
          </div>
          <h2 className="text-2xl font-bold text-white">Đăng nhập</h2>
          <p className="text-white/50 mt-1 text-sm">Truy cập vào tài khoản của bạn</p>
        </div>

        {/* Override label & icon colours for dark background */}
        <div className="[&_label]:!text-white/70 [&_.text-muted-foreground]:!text-white/40">
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
                    icon={<Mail className="w-4 h-4 text-white/50" />}
                    error={fieldState.error?.message}
                    className={glassInputClass}
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
                    icon={<Lock className="w-4 h-4 text-white/50" />}
                    error={fieldState.error?.message}
                    className={glassInputClass}
                    {...field}
                  />
                )}
              />

              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <div className="[&_label]:!text-white/60">
                      <Checkbox
                        label="Ghi nhớ đăng nhập"
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(checked === true)}
                      />
                    </div>
                  )}
                />
                <Button
                  variant="link"
                  type="button"
                  className="text-violet-300 hover:text-violet-100 px-0"
                >
                  Quên mật khẩu?
                </Button>
              </div>

              <Button
                type="submit"
                variant="glass"
                className="w-full"
                isLoading={isLoading}
                disabled={isLoading}
              >
                Đăng nhập
              </Button>
            </form>
          </Form>
        </div>

        <p className="text-center text-sm text-white/40">
          Chưa có tài khoản?{' '}
          <Button
            variant="link"
            type="button"
            className="text-violet-300 px-0 hover:text-violet-100"
          >
            Đăng ký ngay
          </Button>
        </p>
      </div>
    </div>
  );
};
