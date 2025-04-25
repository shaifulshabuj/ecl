import React, { forwardRef, useState, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { BaseProps } from '../../types/common';

// Define radio variants using CVA
const radioVariants = cva(
  // Base radio styles
  'h-4 w-4 border border-neutral-300 text-primary-600 focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-neutral-300',
        error: 'border-error-500',
      },
      size: {
        sm: 'h-3 w-3',
        md: 'h-4 w-4',
        lg: 'h-5 w-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

// Export the radio variants for reuse in other components
export { radioVariants };

// Radio props interface
export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof radioVariants>,
    BaseProps {
  /**
   * Label for the radio button
   */
  label?: string;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Helper text to display
   */
  helperText?: string;
  /**
   * Whether to display the radio button and label inline
   */
  inline?: boolean;
  /**
   * Additional class name for the label
   */
  labelClassName?: string;
}

/**
 * Radio component with proper state management and accessibility features
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Radio name="option" value="option1" label="Option 1" />
 * <Radio name="option" value="option2" label="Option 2" />
 * 
 * // With error
 * <Radio name="gender" value="male" label="Male" error="Please select an option" />
 * <Radio name="gender" value="female" label="Female" />
 * <Radio name="gender" value="other" label="Other" />
 * 
 * // Different sizes
 * <Radio name="size" value="small" label="Small radio" size="sm" />
 * <Radio name="size" value="medium" label="Medium radio" size="md" />
 * <Radio name="size" value="large" label="Large radio" size="lg" />
 * ```
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      className,
      variant,
      size,
      label,
      error,
      helperText,
      inline = false,
      labelClassName,
      id,
      checked,
      defaultChecked,
      onChange,
      ...props
    },
    ref
  ) => {
    // Generate a unique ID if none is provided
    const radioId = id || `radio-${Math.random().toString(36).substring(2, 9)}`;
    
    // State for controlled radio
    const [isChecked, setIsChecked] = useState<boolean | undefined>(
      checked !== undefined ? checked : defaultChecked || false
    );
    
    // Handle radio change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (checked === undefined) {
        setIsChecked(e.target.checked);
      }
      
      if (onChange) {
        onChange(e);
      }
    };
    
    // Update internal state when checked prop changes
    useEffect(() => {
      if (checked !== undefined) {
        setIsChecked(checked);
      }
    }, [checked]);
    
    return (
      <div className={cn(
        'flex',
        inline ? 'items-center' : 'flex-col space-y-1',
        className
      )}>
        <div className="flex items-center">
          <input
            type="radio"
            id={radioId}
            ref={ref}
            className={cn(
              radioVariants({ variant: error ? 'error' : variant, size }),
            )}
            checked={isChecked}
            onChange={handleChange}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error ? `${radioId}-error` : 
              helperText ? `${radioId}-helper` : 
              undefined
            }
            {...props}
          />
          
          {label && (
            <label
              htmlFor={radioId}
              className={cn(
                "ml-2 text-sm font-medium text-neutral-700",
                labelClassName
              )}
            >
              {label}
            </label>
          )}
        </div>
        
        {error && (
          <p 
            className="text-xs text-error-500" 
            id={`${radioId}-error`}
            role="alert"
          >
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p 
            className="text-xs text-neutral-500" 
            id={`${radioId}-helper`}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';
