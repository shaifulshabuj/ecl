import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Size, Variant, BaseProps } from '../../types/common';

// Define button variants and sizes using CVA (class-variance-authority)
const buttonVariants = cva(
  // Base button styles
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-neutral-800 text-white hover:bg-neutral-700',
        primary: 'bg-primary-600 text-white hover:bg-primary-700',
        secondary: 'bg-secondary-600 text-white hover:bg-secondary-700',
        success: 'bg-success-500 text-white hover:bg-success-700',
        warning: 'bg-warning-500 text-white hover:bg-warning-700',
        error: 'bg-error-500 text-white hover:bg-error-700',
        info: 'bg-info-500 text-white hover:bg-info-700',
        outline: 'border border-neutral-300 bg-transparent text-neutral-700 hover:bg-neutral-50',
        ghost: 'bg-transparent text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900',
      },
      size: {
        xs: 'text-xs px-2 py-1 h-6',
        sm: 'text-sm px-3 py-1.5 h-8',
        md: 'text-sm px-4 py-2 h-10',
        lg: 'text-base px-5 py-2.5 h-12',
        xl: 'text-lg px-6 py-3 h-14',
      },
      fullWidth: {
        true: 'w-full',
      },
      iconButton: {
        true: 'p-0',
      },
    },
    compoundVariants: [
      {
        iconButton: true,
        size: 'xs',
        class: 'h-6 w-6',
      },
      {
        iconButton: true,
        size: 'sm',
        class: 'h-8 w-8',
      },
      {
        iconButton: true,
        size: 'md',
        class: 'h-10 w-10',
      },
      {
        iconButton: true,
        size: 'lg',
        class: 'h-12 w-12',
      },
      {
        iconButton: true,
        size: 'xl',
        class: 'h-14 w-14',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'md',
      fullWidth: false,
      iconButton: false,
    },
  }
);

// Export the button variants for reuse in other components
export { buttonVariants };

// Button props interface extending HTML button attributes
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants>,
    BaseProps {
  /**
   * Whether the button is in a loading state
   */
  isLoading?: boolean;
  /**
   * Icon to display before the button text
   */
  leftIcon?: React.ReactNode;
  /**
   * Icon to display after the button text
   */
  rightIcon?: React.ReactNode;
  /**
   * Loading spinner to show when isLoading is true
   */
  loadingIndicator?: React.ReactNode;
  /**
   * Text to show when the button is in loading state
   */
  loadingText?: string;
}

/**
 * Button component with multiple variants and sizes
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Button>Click me</Button>
 * 
 * // With variants and sizes
 * <Button variant="primary" size="lg">Primary Large</Button>
 * <Button variant="outline" size="sm">Outline Small</Button>
 * 
 * // With icons
 * <Button leftIcon={<Icon />}>With Icon</Button>
 * 
 * // Loading state
 * <Button isLoading loadingText="Processing...">Submit</Button>
 * 
 * // Full width
 * <Button fullWidth>Full Width Button</Button>
 * 
 * // Icon button (square button with just an icon)
 * <Button iconButton variant="ghost"><Icon /></Button>
 * ```
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      iconButton,
      isLoading = false,
      leftIcon,
      rightIcon,
      loadingIndicator,
      loadingText,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    // Default loading indicator (can be replaced with a custom spinner component)
    const defaultLoadingIndicator = (
      <svg
        className="animate-spin -ml-1 mr-2 h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    );

    // Use custom or default loading indicator
    const spinner = loadingIndicator || defaultLoadingIndicator;

    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, iconButton }), className)}
        disabled={disabled || isLoading}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <>
            {spinner}
            {loadingText || children}
          </>
        ) : (
          <>
            {leftIcon && <span className="mr-2">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="ml-2">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
