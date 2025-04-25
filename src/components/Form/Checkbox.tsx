import React, { forwardRef, useState, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { BaseProps } from '../../types/common';

// Define checkbox variants using CVA
const checkboxVariants = cva(
  // Base checkbox styles
  'h-4 w-4 rounded border border-neutral-300 text-primary-600 focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
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

// Export the checkbox variants for reuse in other components
export { checkboxVariants };

// Checkbox props interface
export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof checkboxVariants>,
    BaseProps {
  /**
   * Label for the checkbox
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
   * Whether to display the checkbox and label inline
   */
  inline?: boolean;
  /**
   * Additional class name for the label
   */
  labelClassName?: string;
  /**
   * Whether the checkbox is indeterminate
   */
  indeterminate?: boolean;
}

/**
 * Checkbox component with proper state management and accessibility features
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Checkbox label="Remember me" />
 * 
 * // With error
 * <Checkbox label="Accept terms" error="You must accept the terms" />
 * 
 * // Different sizes
 * <Checkbox label="Small checkbox" size="sm" />
 * <Checkbox label="Medium checkbox" size="md" />
 * <Checkbox label="Large checkbox" size="lg" />
 * 
 * // Indeterminate state
 * <Checkbox label="Select all" indeterminate />
 * ```
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
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
      indeterminate,
      checked,
      defaultChecked,
      onChange,
      ...props
    },
    ref
  ) => {
    // Generate a unique ID if none is provided
    const checkboxId = id || `checkbox-${Math.random().toString(36).substring(2, 9)}`;
    
    // State for controlled checkbox
    const [isChecked, setIsChecked] = useState<boolean | undefined>(
      checked !== undefined ? checked : defaultChecked || false
    );
    
    // Handle checkbox reference to set indeterminate state
    const handleRef = (element: HTMLInputElement) => {
      if (element) {
        element.indeterminate = indeterminate || false;
        
        // Forward the ref
        if (typeof ref === 'function') {
          ref(element);
        } else if (ref) {
          ref.current = element;
        }
      }
    };
    
    // Handle checkbox change
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
            type="checkbox"
            id={checkboxId}
            ref={handleRef}
            className={cn(
              checkboxVariants({ variant: error ? 'error' : variant, size }),
            )}
            checked={isChecked}
            onChange={handleChange}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error ? `${checkboxId}-error` : 
              helperText ? `${checkboxId}-helper` : 
              undefined
            }
            {...props}
          />
          
          {label && (
            <label
              htmlFor={checkboxId}
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
            id={`${checkboxId}-error`}
            role="alert"
          >
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p 
            className="text-xs text-neutral-500" 
            id={`${checkboxId}-helper`}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
