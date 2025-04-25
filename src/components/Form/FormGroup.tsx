import React from 'react';
import { cn } from '../../utils/cn';
import { BaseProps } from '../../types/common';

export interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement>, BaseProps {
  /**
   * Label for the form group
   */
  label?: string;
  /**
   * Whether the field is required
   */
  required?: boolean;
  /**
   * Helper text to display below the form group
   */
  helperText?: string;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * ID for the form group
   */
  id?: string;
  /**
   * Additional class name for the label
   */
  labelClassName?: string;
  /**
   * Whether to display the form group inline (horizontal layout)
   */
  inline?: boolean;
  /**
   * The spacing between the label and the input
   */
  spacing?: 'sm' | 'md' | 'lg';
}

/**
 * FormGroup component for grouping form elements with labels, helper text, and error messages
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <FormGroup label="Full Name" required>
 *   <Input placeholder="Enter your full name" />
 * </FormGroup>
 * 
 * // With helper text
 * <FormGroup 
 *   label="Email" 
 *   helperText="We'll never share your email with anyone else."
 * >
 *   <Input type="email" />
 * </FormGroup>
 * 
 * // With error message
 * <FormGroup 
 *   label="Username" 
 *   error="Username is already taken"
 * >
 *   <Input />
 * </FormGroup>
 * 
 * // Inline layout
 * <FormGroup 
 *   label="Subscribe" 
 *   inline
 * >
 *   <Checkbox />
 * </FormGroup>
 * ```
 */
export const FormGroup = React.forwardRef<HTMLDivElement, FormGroupProps>(
  (
    {
      className,
      children,
      label,
      required,
      helperText,
      error,
      id,
      labelClassName,
      inline = false,
      spacing = 'md',
      ...props
    },
    ref
  ) => {
    // Generate a unique ID if none is provided
    const groupId = id || `form-group-${Math.random().toString(36).substring(2, 9)}`;
    
    // Determine spacing class based on the spacing prop
    const spacingClasses = {
      sm: 'space-y-1',
      md: 'space-y-2',
      lg: 'space-y-3',
    };
    
    // Determine the layout class based on the inline prop
    const layoutClass = inline 
      ? 'flex items-center gap-2' 
      : spacingClasses[spacing];
    
    return (
      <div
        ref={ref}
        className={cn(
          'w-full',
          layoutClass,
          className
        )}
        {...props}
      >
        {label && (
          <label
            htmlFor={groupId}
            className={cn(
              "block text-sm font-medium text-neutral-700",
              required && "after:content-['*'] after:ml-0.5 after:text-error-500",
              inline && "min-w-[120px]",
              labelClassName
            )}
          >
            {label}
          </label>
        )}
        
        <div className={inline ? 'flex-1' : ''}>
          {children}
          
          {error && (
            <p 
              className="mt-1 text-xs text-error-500" 
              id={`${groupId}-error`}
              role="alert"
            >
              {error}
            </p>
          )}
          
          {helperText && !error && (
            <p 
              className="mt-1 text-xs text-neutral-500" 
              id={`${groupId}-helper`}
            >
              {helperText}
            </p>
          )}
        </div>
      </div>
    );
  }
);

FormGroup.displayName = 'FormGroup';
