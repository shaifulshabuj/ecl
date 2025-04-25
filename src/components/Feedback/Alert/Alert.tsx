import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils/cn';
import { BaseProps } from '../../../types/common';

// ==============================
// Alert Component
// ==============================

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-neutral-50 text-neutral-900 border-neutral-200',
        primary: 'bg-primary-50 text-primary-900 border-primary-200',
        secondary: 'bg-secondary-50 text-secondary-900 border-secondary-200',
        success: 'bg-success-50 text-success-900 border-success-200',
        warning: 'bg-warning-50 text-warning-900 border-warning-200',
        danger: 'bg-danger-50 text-danger-900 border-danger-200',
        info: 'bg-info-50 text-info-900 border-info-200',
      },
      size: {
        sm: 'text-sm p-3',
        md: 'text-base p-4',
        lg: 'text-lg p-5',
      },
      hasIcon: {
        true: 'pl-11',
        false: '',
      },
      hasDismiss: {
        true: 'pr-10',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      hasIcon: false,
      hasDismiss: false,
    },
  }
);

export interface AlertProps extends BaseProps, VariantProps<typeof alertVariants> {
  /**
   * Icon to display in the alert
   */
  icon?: React.ReactNode;
  /**
   * Whether the alert can be dismissed
   */
  dismissible?: boolean;
  /**
   * Callback when the alert is dismissed
   */
  onDismiss?: () => void;
  /**
   * Title of the alert
   */
  title?: string;
  /**
   * Whether the alert is visible
   */
  isOpen?: boolean;
  /**
   * ARIA role for the alert
   */
  role?: 'alert' | 'status' | 'log' | 'marquee' | 'timer';
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      children,
      className,
      variant,
      size,
      icon,
      dismissible = false,
      onDismiss,
      title,
      isOpen = true,
      role = 'alert',
      ...props
    },
    ref
  ) => {
    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        role={role}
        className={cn(
          alertVariants({
            variant,
            size,
            hasIcon: !!icon,
            hasDismiss: dismissible,
          }),
          className
        )}
        {...props}
      >
        {icon && <span className="mr-2">{icon}</span>}
        <div className="flex-1">
          {title && <AlertTitle>{title}</AlertTitle>}
          <AlertDescription>{children}</AlertDescription>
        </div>
        {dismissible && (
          <button
            type="button"
            onClick={onDismiss}
            className="absolute right-4 top-4 rounded-md p-1 text-neutral-500 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

// ==============================
// Alert Title
// ==============================

export interface AlertTitleProps extends BaseProps {}

export const AlertTitle = React.forwardRef<HTMLParagraphElement, AlertTitleProps>(
  (
    {
      children,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <h5
        ref={ref}
        className={cn('mb-1 font-medium leading-none tracking-tight', className)}
        {...props}
      >
        {children}
      </h5>
    );
  }
);

AlertTitle.displayName = 'AlertTitle';

// ==============================
// Alert Description
// ==============================

export interface AlertDescriptionProps extends BaseProps {}

export const AlertDescription = React.forwardRef<HTMLParagraphElement, AlertDescriptionProps>(
  (
    {
      children,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn('text-sm [&_p]:leading-relaxed', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AlertDescription.displayName = 'AlertDescription';
