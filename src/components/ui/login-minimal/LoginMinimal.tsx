import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Form, FormField } from '@/components/ui/form/Form';
import { Input } from '@/components/ui/input/Input';
import { Button } from '@/components/ui/button/Button';
import { toast } from 'sonner';

const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu ít nhất 6 ký tự'),
});

type LoginValues = z.infer<typeof loginSchema>;

export const LoginMinimal = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (_data: LoginValues) => {
    setIsLoading(true);
    await new Promise<void>((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    toast.success('Đăng nhập thành công!');
  };

  return (
    <div className="w-full max-w-sm space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <p className="text-sm font-medium text-primary uppercase tracking-widest mb-1">
          Chào mừng
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Đăng nhập
        </h2>
        <p className="mt-1 text-muted-foreground text-sm">
          Nhập thông tin để tiếp tục hành trình
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Input
                label="Email"
                type="email"
                placeholder="email@example.com"
                variant="flushed"
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
                variant="flushed"
                icon={<Lock className="w-4 h-4" />}
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />

          <div className="flex justify-end -mt-2">
            <Button variant="link" type="button" className="text-xs px-0">
              Quên mật khẩu?
            </Button>
          </div>

          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
            disabled={isLoading}
            rightIcon={!isLoading ? <ArrowRight className="w-4 h-4" /> : undefined}
          >
            Tiếp tục
          </Button>
        </form>
      </Form>

      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        <span>hoặc</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Chưa có tài khoản?{' '}
        <Button variant="link" type="button" className="px-0 font-semibold">
          Đăng ký ngay
        </Button>
      </p>
    </div>
  );
};
