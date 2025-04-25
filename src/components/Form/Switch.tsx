import React, { forwardRef, useState, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { BaseProps } from '../../types/common';

// Define switch variants using CVA
const switchVariants = cva(
  // Base switch styles
  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-neutral-200',
        error: 'bg-error-100',
      },
      size: {
        sm: 'h-5 w-9',
        md: 'h-6 w-11',
        lg: 'h-7 w-14',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

// Define switch thumb variants using CVA
const switchThumbVariants = cva(
  // Base thumb styles
  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
      },
      checked: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        size: 'sm',
        checked: true,
        className: 'translate-x-4',
      },
      {
        size: 'sm',
        checked: false,
        className: 'translate-x-0',
      },
      {
        size: 'md',
        checked: true,
        className: 'translate-x-5',
      },
      {
        size: 'md',
        checked: false,
        className: 'translate-x-0',
      },
      {
        size: 'lg',
        checked: true,
        className: 'translate-x-7',
      },
      {
        size: 'lg',
        checked: false,
        className: 'translate-x-0',
      },
    ],
    defaultVariants: {
      size: 'md',
      checked: false,
    },
  }
);

// Export the switch variants for reuse in other components
export { switchVariants, switchThumbVariants };

// Switch props interface
export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
    VariantProps<typeof switchVariants>,
    BaseProps {
  /**
   * Label for the switch
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
   * Whether to display the switch and label inline
   */
  inline?: boolean;
  /**
   * Position of the label relative to the switch
   */
  labelPosition?: 'left' | 'right';
  /**
   * Additional class name for the label
   */
  labelClassName?: string;
  /**
   * Additional class name for the active (checked) state
   */
  activeClassName?: string;
}

/**
 * Switch component (toggle) with proper state management and accessibility features
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Switch label="Enable notifications" />
 * 
 * // With error
 * <Switch label="Accept terms" error="You must accept the terms" />
 * 
 * // Different sizes
 * <Switch label="Small switch" size="sm" />
 * <Switch label="Medium switch" size="md" />
 * <Switch label="Large switch" size="lg" />
 * 
 * // Label position
 * <Switch label="Label on left" labelPosition="left" />
 * <Switch label="Label on right" labelPosition="right" />
 * ```
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      className,
      variant,
      size,
      label,
      error,
      helperText,
      inline = false,
      labelPosition = 'right',
      labelClassName,
      activeClassName,
      id,
      checked,
      defaultChecked,
      onChange,
      ...props
    },
    ref
  ) => {
    // Generate a unique ID if none is provided
    const switchId = id || `switch-${Math.random().toString(36).substring(2, 9)}`;
    
    // State for controlled switch
    const [isChecked, setIsChecked] = useState<boolean>(
      checked !== undefined ? checked : defaultChecked || false
    );
    
    // Handle switch change
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
    
    // Determine the active class for the switch
    const activeClass = isChecked ? cn('bg-primary-600', activeClassName) : '';
    
    return (
      <div className={cn(
        'flex',
        inline ? 'items-center' : 'flex-col space-y-1',
        labelPosition === 'left' ? 'flex-row-reverse justify-end' : 'flex-row',
        className
      )}>
        <div className={cn(
          "flex items-center",
          labelPosition === 'left' ? 'space-x-reverse space-x-2' : 'space-x-2'
        )}>
          <button
            type="button"
            className={cn(
              switchVariants({ variant: error ? 'error' : variant, size }),
              activeClass
            )}
            onClick={() => {
              const input = document.getElementById(switchId) as HTMLInputElement;
              if (input) {
                const newChecked = !isChecked;
                
                // Update the input's checked state
                input.checked = newChecked;
                
                // Create and dispatch a change event
                const event = new Event('change', { bubbles: true });
                input.dispatchEvent(event);
              }
            }}
            aria-checked={isChecked}
            role="switch"
            tabIndex={0}
            aria-labelledby={label ? `${switchId}-label` : undefined}
            aria-describedby={
              error ? `${switchId}-error` : 
              helperText ? `${switchId}-helper` : 
              undefined
            }
            {...(props.disabled && { 'aria-disabled': true })}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                const input = document.getElementById(switchId) as HTMLInputElement;
                if (input && !props.disabled) {
                  const newChecked = !isChecked;
                  
                  // Update the input's checked state
                  input.checked = newChecked;
                  
                  // Create and dispatch a change event
                  const event = new Event('change', { bubbles: true });
                  input.dispatchEvent(event);
                }
              }
            }}
          >
            <span
              className={cn(
                switchThumbVariants({ size, checked: isChecked })
              )}
            />
            
            {/* Hidden input for form submission */}
            <input
              type="checkbox"
              id={switchId}
              ref={ref}
              checked={isChecked}
              onChange={handleChange}
              className="sr-only"
              aria-hidden="true"
              tabIndex={-1}
              {...props}
            />
          </button>
          
          {label && (
            <label
              id={`${switchId}-label`}
              htmlFor={switchId}
              className={cn(
                "text-sm font-medium text-neutral-700",
                props.disabled && "opacity-50",
                labelClassName
              )}
              onClick={(e) => {
                // Prevent the label click from triggering the hidden input
                e.preventDefault();
                
                if (!props.disabled) {
                  const button = e.currentTarget.previousElementSibling as HTMLButtonElement;
                  if (button) {
                    button.click();
                  }
                }
              }}
            >
              {label}
            </label>
          )}
        </div>
        
        {error && (
          <p 
            className="text-xs text-error-500" 
            id={`${switchId}-error`}
            role="alert"
          >
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p 
            className="text-xs text-neutral-500" 
            id={`${switchId}-helper`}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';
