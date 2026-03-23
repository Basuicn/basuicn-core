import { Input as AriaInput, type InputProps as AriaInputProps, Button } from 'react-aria-components'
import { cn } from '@lib/utils/cn'
import { useState } from 'react'
import { Eye, EyeOff } from '@components/icons'
interface Props extends Omit<AriaInputProps, 'size'> {
    className?: string
    size?: 'sm' | 'md' | 'lg'
    placeholder?: string
    type?: 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url'
    label?: string
}

const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
}
const textClasses = {
    sm: 'text-sm',
    md: 'text-sm',
    lg: 'text-base'
}

function Input({ className, label, size = 'md', placeholder, type = 'text', ...props }: Props) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label && (
        <label className={cn("font-medium text-gray-700", textClasses[size])}>
          {label}
        </label>
      )}
      <AriaInput
        type={type}
        placeholder={placeholder}
        className={cn(
          'border border-gray-300 rounded-md outline-none transition-colors focus:ring-2 focus:ring-primary ', 
          sizeClasses[size] 
        )}
        {...props}
      />
    </div>
  );
}
function InputPassword({ className, label, size = 'md', placeholder, ...props }: Props) {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className={cn('flex flex-col gap-1', className)}>
            {label && (
                <label className={cn("font-medium text-gray-700", textClasses[size])}>
                    {label}
                </label>
            )}
            <div className="relative w-full group">
                <AriaInput
                    type={showPassword ? 'text' : 'password'}
                    className={cn(
                        'w-full border border-gray-300 rounded-md outline-none transition-colors focus:ring-2 focus:ring-primary pr-10',
                        sizeClasses[size]
                    )}
                    placeholder={placeholder || 'Nhập...'}
                    {...props}
                />
                <Button
                    onPress={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600 outline-none transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? (
                        <EyeOff className={cn("w-4 h-4", size === 'lg' && "w-5 h-5")} />
                    ) : (
                        <Eye className={cn("w-4 h-4", size === 'lg' && "w-5 h-5")} />
                    )}
                </Button>
            </div>
        </div>
    )
}


export { Input, InputPassword }