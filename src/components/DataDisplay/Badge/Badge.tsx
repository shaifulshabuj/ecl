import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils/cn';
import { BaseProps } from '../../../types/common';

const badgeVariants = cva(
  'inline-flex items-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200',
        primary: 'bg-primary-100 text-primary-800 hover:bg-primary-200',
        secondary: 'bg-secondary-100 text-secondary-800 hover:bg-secondary-200',
        success: 'bg-success-100 text-success-800 hover:bg-success-200',
        warning: 'bg-warning-100 text-warning-800 hover:bg-warning-200',
        danger: 'bg-danger-100 text-danger-800 hover:bg-danger-200',
        info: 'bg-info-100 text-info-800 hover:bg-info-200',
        outline: 'border border-neutral-200 text-neutral-800 hover:bg-neutral-100',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-sm',
        lg: 'px-3 py-1 text-base',
      },
      interactive: {
        true: 'cursor-pointer',
        false: '',
      },
      removable: {
        true: 'pr-1',
        false: '',
      },
      dot: {
        true: 'pl-1.5',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      interactive: false,
      removable: false,
      dot: false,
    },
  }
);

export interface BadgeProps extends BaseProps, VariantProps<typeof badgeVariants> {
  /**
   * Whether the badge is interactive
   */
  interactive?: boolean;
  /**
   * Whether the badge has a remove button
   */
  removable?: boolean;
  /**
   * Callback when the remove button is clicked
   */
  onRemove?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Whether the badge has a dot indicator
   */
  dot?: boolean;
  /**
   * Color of the dot indicator
   */
  dotColor?: string;
  /**
   * Click handler for the badge
   */
  onClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      className,
      variant,
      size,
      interactive,
      removable,
      onRemove,
      dot,
      dotColor,
      onClick,
      ...props
    },
    ref
  ) => {
    const handleRemoveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onRemove?.(e);
    };

    return (
      <span
        ref={ref}
        className={cn(
          badgeVariants({
            variant,
            size,
            interactive,
            removable,
            dot,
          }),
          className
        )}
        onClick={interactive ? onClick : undefined}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        {...props}
      >
        {dot && (
          <span 
            className={cn(
              'mr-1.5 h-2 w-2 rounded-full',
              dotColor || (variant === 'outline' ? 'bg-neutral-400' : `bg-${variant}-500`)
            )}
          />
        )}
        {children}
        {removable && (
          <button
            type="button"
            className="ml-1 rounded-full p-0.5 hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-ring"
            onClick={handleRemoveClick}
            aria-label="Remove"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
