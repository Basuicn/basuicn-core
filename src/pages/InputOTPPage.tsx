import * as React from 'react';
import { PageHeader, ShowcaseCard } from '@components/ui/Showcase';
import { InputOTP } from '@components/ui/input-otp/InputOtp';
import { Button } from '@components/ui/button/Button';

const InputOTPPage = () => {
  const [value1, setValue1] = React.useState('');
  const [value2, setValue2] = React.useState('');
  const [verifyState, setVerifyState] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [maskValue, setMaskValue] = React.useState('');

  const handleVerify = (code: string) => {
    if (code === '123456') {
      setVerifyState('success');
    } else {
      setVerifyState('error');
    }
    setTimeout(() => setVerifyState('idle'), 2500);
  };

  return (
    <div className="max-w-2xl">
      <PageHeader
        title="Input OTP"
        description="Component nhập mã OTP linh hoạt, hỗ trợ nhiều variant, kích thước, hình dạng, separator, mask, validate, và keyboard navigation."
      />

      {/* Variants */}
      <ShowcaseCard title="Variants">
        <div className="w-full space-y-6">
          <InputOTP variant="outline" length={6} label="Outline (default)" placeholder="000000" />
          <InputOTP variant="filled" length={6} label="Filled" placeholder="000000" />
          <InputOTP variant="underline" length={6} label="Underline" placeholder="000000" />
          <InputOTP variant="glass" length={6} label="Glass" placeholder="000000" />
        </div>
      </ShowcaseCard>

      {/* Sizes */}
      <ShowcaseCard title="Sizes">
        <div className="w-full space-y-6">
          <InputOTP size="sm" length={6} label="Small" />
          <InputOTP size="md" length={6} label="Medium (default)" />
          <InputOTP size="lg" length={6} label="Large" />
        </div>
      </ShowcaseCard>

      {/* Shapes */}
      <ShowcaseCard title="Shapes">
        <div className="w-full space-y-6">
          <InputOTP shape="square" length={6} label="Square (default)" />
          <InputOTP shape="rounded" length={6} label="Rounded" />
          <InputOTP shape="circle" length={6} label="Circle" />
        </div>
      </ShowcaseCard>

      {/* Separators */}
      <ShowcaseCard title="Separators">
        <div className="w-full space-y-6">
          <InputOTP length={6} separatorAfter={[2]} separator="dash" label="Dash after 3rd digit" />
          <InputOTP length={6} separatorAfter={2} separator="dot" label="Dot every 2 slots" />
          <InputOTP length={6} separatorAfter={3} separator="space" label="Space every 3 slots" />
          <InputOTP
            length={8}
            separatorAfter={[1, 3, 5]}
            separator={<span className="text-primary font-bold">/</span>}
            label="Custom separator (date format)"
            placeholder="DDMMYYYY"
          />
        </div>
      </ShowcaseCard>

      {/* Input Modes */}
      <ShowcaseCard title="Input Modes">
        <div className="w-full space-y-6">
          <InputOTP length={6} inputMode="numeric" label="Numeric only (default)" />
          <InputOTP length={6} inputMode="alpha" label="Letters only" />
          <InputOTP length={6} inputMode="alphanumeric" label="Letters + Numbers" />
        </div>
      </ShowcaseCard>

      {/* Mask */}
      <ShowcaseCard title="Masked Input (Password Style)">
        <div className="w-full space-y-6">
          <InputOTP length={6} mask label="Default mask (bullet)" value={maskValue} onChange={setMaskValue} />
          <InputOTP length={6} mask="*" label='Custom mask ("*")' value={maskValue} onChange={setMaskValue} />
          <p className="text-xs text-muted-foreground">
            Actual value: <code className="bg-muted px-2 py-0.5 rounded">{maskValue || '(empty)'}</code>
          </p>
        </div>
      </ShowcaseCard>

      {/* Controlled + Verify */}
      <ShowcaseCard title="Verification Flow (try 123456)">
        <div className="w-full space-y-4">
          <InputOTP
            length={6}
            variant="filled"
            shape="rounded"
            value={value1}
            onChange={(v) => { setValue1(v); setVerifyState('idle'); }}
            error={verifyState === 'error'}
            errorMessage={verifyState === 'error' ? 'Mã OTP không chính xác. Vui lòng thử lại.' : undefined}
            successOnComplete={verifyState === 'success'}
            label="Nhập mã xác thực"
            description="Mã gồm 6 chữ số đã được gửi đến email của bạn."
            separatorAfter={[2]}
          />
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              disabled={value1.length < 6}
              onClick={() => handleVerify(value1)}
            >
              Xác nhận
            </Button>
            <Button size="sm" variant="ghost" onClick={() => { setValue1(''); setVerifyState('idle'); }}>
              Xoá
            </Button>
            {verifyState === 'success' && (
              <span className="text-sm text-success font-medium animate-in fade-in">Xác thực thành công!</span>
            )}
          </div>
        </div>
      </ShowcaseCard>

      {/* Disabled */}
      <ShowcaseCard title="States">
        <div className="w-full space-y-6">
          <InputOTP length={6} disabled label="Disabled" />
          <InputOTP length={4} error errorMessage="Mã OTP đã hết hạn." label="Error state" />
        </div>
      </ShowcaseCard>

      {/* Custom Length */}
      <ShowcaseCard title="Custom Lengths">
        <div className="w-full space-y-6">
          <InputOTP length={4} label="4-digit PIN" size="lg" shape="circle" variant="filled" />
          <InputOTP
            length={8}
            label="8-character License Key"
            inputMode="alphanumeric"
            separatorAfter={[3]}
            separator="dash"
            size="sm"
          />
        </div>
      </ShowcaseCard>

      {/* Controlled two-way binding */}
      <ShowcaseCard title="Controlled (Two-way Binding)">
        <div className="w-full space-y-4">
          <InputOTP
            length={6}
            value={value2}
            onChange={setValue2}
            label="Type here"
            variant="glass"
            shape="rounded"
          />
          <div className="flex items-center gap-3">
            <p className="text-sm text-muted-foreground">
              Value: <code className="bg-muted px-2 py-0.5 rounded font-mono">{value2 || '(empty)'}</code>
            </p>
            <Button size="sm" variant="outline" onClick={() => setValue2('428619')}>
              Fill "428619"
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setValue2('')}>
              Clear
            </Button>
          </div>
        </div>
      </ShowcaseCard>
    </div>
  );
};

export default InputOTPPage;
