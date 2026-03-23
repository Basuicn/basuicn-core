import { Button as AriaButton, type ButtonProps as AriaButtonProps } from 'react-aria-components'
import React from 'react'
import { cn } from '@lib/utils/cn'
import Spinner from '../spinner/Spinner'

interface ButtonProps extends AriaButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'outline' | 'outlineDanger' | 'outlineSuccess' | 'outlineWarning' | 'outlinePrimary' | 'outlineSecondary'|'dashed'|'dashedDanger'|'dashedSuccess'|'dashedWarning'|'dashedPrimary'|'dashedSecondary'|'ghost'|'ghostDanger'|'ghostSuccess'|'ghostWarning'|'ghostPrimary'|'ghostSecondary'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  isLoading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

const variantClasses = {
  primary: 'bg-primary text-white hover:opacity-80',
  secondary: 'bg-secondary text-white hover:opacity-80',
  danger: 'bg-danger text-white hover:opacity-80',
  success: 'bg-success text-white hover:opacity-80',
  warning: 'bg-warning text-black hover:opacity-80',
  ghost: 'bg-transparent text-black hover:bg-gray-100',
  ghostDanger: 'bg-transparent text-red-700 hover:bg-red-100',
  ghostSuccess: 'bg-transparent text-green-700 hover:bg-green-100',
  ghostWarning: 'bg-transparent text-yellow-700 hover:bg-yellow-100',
  ghostPrimary: 'bg-transparent text-blue-700 hover:bg-blue-100',
  ghostSecondary: 'bg-transparent text-gray-700 hover:bg-gray-100',
  outline: 'border hover:bg-gray-50',
  outlineDanger: 'border border-red-300 text-red-700 hover:bg-red-50',
  outlineSuccess: 'border border-green-300 text-green-700 hover:bg-green-50',
  outlineWarning: 'border border-yellow-300 text-yellow-700 hover:bg-yellow-50',
  outlinePrimary: 'border border-blue-300 text-blue-700 hover:bg-blue-50',
  outlineSecondary: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
  dashed: 'border border-dashed hover:bg-gray-50',
  dashedDanger: 'border border-dashed border-red-300 text-red-700 hover:bg-red-50',
  dashedSuccess: 'border border-dashed border-green-300 text-green-700 hover:bg-green-50',
  dashedWarning: 'border border-dashed border-yellow-300 text-yellow-700 hover:bg-yellow-50',
  dashedPrimary: 'border border-dashed border-blue-300 text-blue-700 hover:bg-blue-50',
  dashedSecondary: 'border border-dashed border-gray-300 text-gray-700 hover:bg-gray-50',
}

const sizeClasses = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base'
}

const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading,
  icon,
  iconPosition = 'left',
  className,
  children,
  isDisabled,
  ...props
}: ButtonProps) => {
  return (
    <AriaButton
      isDisabled={isDisabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center gap-1 rounded-md transition cursor-pointer',
        variantClasses[variant],
        sizeClasses[size],
        className,
        isLoading && 'opacity-80 cursor-not-allowed'
      )}
      {...props}
    >
        <>
          {isLoading && iconPosition === 'left' ? <Spinner variant='circle' size={size}/> : icon && iconPosition === 'left' && icon}
          {children}
          {isLoading && iconPosition === 'right' ? <Spinner variant='circle' size={size}/> : icon && iconPosition === 'right' && icon}
        </>
    </AriaButton>
  )
}

export default Button