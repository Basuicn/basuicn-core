import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Lock } from 'lucide-react';
import { Form, FormField } from '@/components/ui/form/Form';
import { Input } from '@/components/ui/input/Input';
import { Button } from '@/components/ui/button/Button';
import { Checkbox } from '@/components/ui/checkbox/Checkbox';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card/Card';
import { toast } from 'sonner';

const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu ít nhất 6 ký tự'),
  rememberMe: z.boolean().optional(),
});

type LoginValues = z.infer<typeof loginSchema>;

export const LoginClassic = () => {
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
    <Card className="w-full max-w-sm animate-in fade-in zoom-in-95 duration-500">
      <CardHeader className="text-center pb-4 pt-8">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <Lock className="h-7 w-7 text-primary" />
        </div>
        <CardTitle className="text-2xl">Chào mừng trở lại</CardTitle>
        <CardDescription>Đăng nhập vào tài khoản của bạn</CardDescription>
      </CardHeader>

      <CardContent className="px-6 pb-8">
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

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Hoặc tiếp tục với</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" type="button">Google</Button>
              <Button variant="outline" type="button">GitHub</Button>
            </div>
          </form>
        </Form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Chưa có tài khoản?{' '}
          <Button variant="link" type="button" className="px-0">
            Đăng ký ngay
          </Button>
        </p>
      </CardContent>
    </Card>
  );
};
