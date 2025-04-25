import React from 'react';
import { cn } from '../../utils/cn';
import { BaseProps } from '../../types/common';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement>, BaseProps {
  /**
   * Whether the associated field is required
   */
  required?: boolean;
  /**
   * Whether to show the required indicator (asterisk)
   */
  showRequiredIndicator?: boolean;
  /**
   * The size of the label
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Whether the label should be visually hidden but still accessible to screen readers
   */
  srOnly?: boolean;
}

/**
 * Label component with proper accessibility attributes
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Label htmlFor="name">Full Name</Label>
 * 
 * // Required field
 * <Label htmlFor="email" required>Email Address</Label>
 * 
 * // Different size
 * <Label htmlFor="phone" size="lg">Phone Number</Label>
 * 
 * // Screen reader only (visually hidden)
 * <Label htmlFor="search" srOnly>Search</Label>
 * ```
 */
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      className,
      children,
      required,
      showRequiredIndicator = true,
      size = 'md',
      srOnly,
      ...props
    },
    ref
  ) => {
    // Size classes
    const sizeClasses = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    };
    
    return (
      <label
        ref={ref}
        className={cn(
          "block font-medium text-neutral-700",
          sizeClasses[size],
          required && showRequiredIndicator && "after:content-['*'] after:ml-0.5 after:text-error-500",
          srOnly && "sr-only",
          className
        )}
        {...props}
      >
        {children}
      </label>
    );
  }
);

Label.displayName = 'Label';
