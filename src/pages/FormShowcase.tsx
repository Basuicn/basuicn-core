import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, ShieldCheck, Mail, User, Info, DollarSign } from 'lucide-react';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../components/ui/form/Form';

import { Button } from '../components/ui/button/Button';
import { Input } from '../components/ui/input/Input';
import { Select } from '../components/ui/select/Select';
import { DatePicker } from '../components/ui/datepicker/DatePicker';
import { Switch } from '../components/ui/switch/Switch';
import { Checkbox } from '../components/ui/checkbox/Checkbox';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card/Card';
import { toast } from 'sonner';

// Define the schema using Zod
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Tên người dùng phải có ít nhất 2 ký tự.",
  }),
  email: z.string().email({
    message: "Email không đúng định dạng.",
  }),
  password: z.string().min(8, {
    message: "Mật khẩu phải chứa ít nhất 8 ký tự.",
  }),
  role: z.string({
    message: "Vui lòng chọn một chức vụ."
  }).min(1, "Vui lòng chọn một chức vụ."),
  
  dob: z.date({
    message: "Vui lòng chọn ngày sinh hợp lệ."
  }),
  salary: z.string().min(1, "Vui lòng nhập mức lương mong muốn."),
  emails: z.boolean(),
  terms: z.boolean().refine((val) => val === true, {
    message: "Bạn phải đồng ý với điều khoản sử dụng.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const PageHeader = ({ title, description }: { title: string; description: string }) => (
  <div className="mb-10 animate-in fade-in slide-in-from-left-4 duration-500">
    <h1 className="text-3xl font-bold text-foreground tracking-tight">{title}</h1>
    <p className="text-muted-foreground mt-2 max-w-2xl">{description}</p>
  </div>
);

export const FormShowcase = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      salary: "",
      emails: false,
      terms: false,
    },
  });

  const onSubmit = (data: FormValues) => {
    toast.success('Gửi Form Thành Công!', {
      description: (
        <pre className="mt-2 rounded-md bg-muted p-4 border border-border">
          <code className="text-foreground">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <div className="max-w-5xl mx-auto py-8">
      <PageHeader
        title="Advanced Forms"
        description="Quản lý state form toàn diện bằng React Hook Form kết hợp với kiểm duyệt validate sử dụng Zod."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Card className="animate-in fade-in zoom-in-95 duration-500">
          <CardHeader className="bg-muted/50 border-b border-border/50">
            <CardTitle>Cập nhật hồ sơ nhân sự</CardTitle>
            <CardDescription>
              Điền đầy đủ thông tin bên dưới để tiếp tục. Form này sử dụng Zod để kiểm tra dữ liệu đầu vào.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field, fieldState }) => (
                      <Input
                        label="Họ và Tên"
                        placeholder="Nguyễn Văn A"
                        icon={<User className="w-4 h-4" />}
                        error={fieldState.error?.message}
                        {...field}
                      />
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                      <Input
                        label="Địa chỉ Email"
                        placeholder="email@example.com"
                        type="email"
                        icon={<Mail className="w-4 h-4" />}
                        error={fieldState.error?.message}
                        {...field}
                      />
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field, fieldState }) => (
                      <Input
                        label="Mật khẩu"
                        type="password"
                        placeholder="••••••••"
                        icon={<ShieldCheck className="w-4 h-4" />}
                        error={fieldState.error?.message}
                        {...field}
                      />
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="salary"
                    render={({ field, fieldState }) => (
                      <Input
                        label="Mức lương mong muốn"
                        type="number"
                        placeholder="Ví dụ: 15000000"
                        icon={<DollarSign className="w-4 h-4" />}
                        error={fieldState.error?.message}
                        {...field}
                      />
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field, fieldState }) => (
                      <Select
                        label="Chức vụ"
                        placeholder="Chọn chức vụ"
                        error={fieldState.error?.message}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        options={[
                          { label: "Nhân viên", value: "employee" },
                          { label: "Quản lý", value: "manager" },
                          { label: "Giám đốc", value: "director" },
                        ]}
                      />
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dob"
                    render={({ field, fieldState }) => (
                      <DatePicker
                        label="Ngày sinh"
                        placeholder="Lựa chọn ngày"
                        error={fieldState.error?.message}
                        onDateChange={field.onChange}
                        date={field.value as Date | undefined}
                        disablePastDates={false}
                      />
                    )}
                  />
                </div>

                <div className="border border-border rounded-lg p-5 bg-muted/20 space-y-5">
                  <FormField
                    control={form.control}
                    name="emails"
                    render={({ field }) => (
                      <div className="flex flex-row items-center justify-between rounded-lg">
                        <div className="space-y-0.5">
                          <label className="text-sm font-semibold text-foreground">
                            Thông báo qua Email
                          </label>
                          <p className="text-[0.8rem] text-muted-foreground">
                            Nhận thông báo về các bản tin nâng cấp sản phẩm.
                          </p>
                        </div>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </div>
                    )}
                  />

                  <div className="border-t border-border/50 pt-5">
                    <FormField
                      control={form.control}
                      name="terms"
                      render={({ field, fieldState }) => (
                         <div className="space-y-2">
                           <div className="flex flex-row items-start gap-3">
                             <Checkbox
                               checked={field.value}
                               onCheckedChange={(checked) => field.onChange(checked === true)}
                             />
                             <div className="space-y-1 leading-none">
                               <label className="text-sm font-medium">
                                 Đồng ý với điều khoản & dịch vụ
                               </label>
                               <p className="text-[0.8rem] text-muted-foreground">
                                 Bảo mật tuyệt đối, tuân thủ tiêu chuẩn Flexpay Global.
                               </p>
                             </div>
                           </div>
                           {fieldState.error && (
                               <p className="text-[0.8rem] font-medium text-danger">{fieldState.error.message}</p>
                           )}
                         </div>
                      )}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => form.reset()}
                  >
                    Reset
                  </Button>
                  <Button type="submit">Lưu thông tin</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Info Column */}
        <div className="space-y-6">
          <Card className="bg-primary/5 border-primary/20 animate-in fade-in slide-in-from-right-8 duration-700">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/20 text-primary">
                  <Info className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-1">Kiến trúc Form chuyên nghiệp</h4>
                  <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside mt-3">
                    <li>Sử dụng <b>react-hook-form</b> để optimize re-renders.</li>
                    <li>Tích hợp <b>zod</b> schema cho strict validation.</li>
                    <li>Sử dụng các Components tùy chỉnh được thiết kế hoàn hảo.</li>
                    <li>Lỗi được report tự động từ schema xuồng UI Components (viền đỏ, text lỗi).</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-in fade-in slide-in-from-right-8 duration-1000">
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground uppercase">State Debugger (Live)</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="p-4 bg-muted border border-border rounded-lg text-emerald-500 dark:text-emerald-400 text-xs overflow-auto h-[300px]">
                {JSON.stringify(form.watch(), null, 2)}
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
