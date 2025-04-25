import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { BaseProps } from '../../types/common';

// Define select variants using CVA
const selectVariants = cva(
  // Base select styles
  'flex w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm transition-colors placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none pr-8',
  {
    variants: {
      variant: {
        default: 'border-neutral-300',
        error: 'border-error-500 focus:ring-error-400',
        success: 'border-success-500 focus:ring-success-400',
      },
      size: {
        sm: 'h-8 px-2 text-xs',
        md: 'h-10 px-3 text-sm',
        lg: 'h-12 px-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

// Export the select variants for reuse in other components
export { selectVariants };

// Select option type
export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

// Select option group type
export type SelectOptionGroup = {
  label: string;
  options: SelectOption[];
};

// Select props interface
export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    VariantProps<typeof selectVariants>,
    BaseProps {
  /**
   * Options for the select
   */
  options?: (SelectOption | SelectOptionGroup)[];
  /**
   * Label for the select
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
   * Whether the field is required
   */
  required?: boolean;
  /**
   * Additional class name for the label
   */
  labelClassName?: string;
  /**
   * Validation function to validate the select value
   */
  validator?: (value: string) => string | undefined;
  /**
   * Whether to validate on blur instead of on change
   */
  validateOnBlur?: boolean;
  /**
   * Callback when validation state changes
   */
  onValidationChange?: (isValid: boolean, errorMessage?: string) => void;
}

/**
 * Select component with keyboard navigation and accessibility features
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Select
 *   label="Country"
 *   options={[
 *     { value: 'us', label: 'United States' },
 *     { value: 'ca', label: 'Canada' },
 *     { value: 'mx', label: 'Mexico' },
 *   ]}
 * />
 * 
 * // With option groups
 * <Select
 *   label="Car"
 *   options={[
 *     {
 *       label: 'Japanese',
 *       options: [
 *         { value: 'honda', label: 'Honda' },
 *         { value: 'toyota', label: 'Toyota' },
 *       ]
 *     },
 *     {
 *       label: 'German',
 *       options: [
 *         { value: 'bmw', label: 'BMW' },
 *         { value: 'mercedes', label: 'Mercedes' },
 *       ]
 *     }
 *   ]}
 * />
 * 
 * // With validation
 * <Select
 *   label="Preferred Language"
 *   required
 *   options={languageOptions}
 *   validator={(value) => !value ? 'Please select a language' : undefined}
 * />
 * ```
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      variant,
      size,
      options = [],
      label,
      error: externalError,
      helperText,
      required,
      labelClassName,
      id,
      validator,
      validateOnBlur = false,
      onValidationChange,
      value,
      defaultValue,
      onChange,
      onBlur,
      children,
      ...props
    },
    ref
  ) => {
    // Generate a unique ID if none is provided
    const selectId = id || `select-${Math.random().toString(36).substring(2, 9)}`;
    
    // State for internal validation error
    const [internalError, setInternalError] = useState<string | undefined>(undefined);
    
    // Combine external and internal errors
    const error = externalError || internalError;
    
    // Create a ref for the select element
    const selectRef = useRef<HTMLSelectElement | null>(null);
    
    // Combine refs
    const handleRef = (element: HTMLSelectElement) => {
      selectRef.current = element;
      
      // Forward the ref
      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    };
    
    // Validate the select value
    const validateInput = (value: string) => {
      if (!validator) return;
      
      const errorMessage = validator(value);
      setInternalError(errorMessage);
      
      if (onValidationChange) {
        onValidationChange(!errorMessage, errorMessage);
      }
    };
    
    // Handle select change
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      // Call the original onChange handler
      if (onChange) {
        onChange(e);
      }
      
      // Validate unless validateOnBlur is true
      if (!validateOnBlur && validator) {
        validateInput(e.target.value);
      }
    };
    
    // Handle select blur
    const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
      // Call the original onBlur handler
      if (onBlur) {
        onBlur(e);
      }
      
      // Validate on blur if validateOnBlur is true
      if (validateOnBlur && validator) {
        validateInput(e.target.value);
      }
    };
    
    // Helper function to check if an option is a group
    const isOptionGroup = (option: SelectOption | SelectOptionGroup): option is SelectOptionGroup => {
      return 'options' in option;
    };
    
    // Render options from the options prop
    const renderOptions = () => {
      return options.map((option, index) => {
        if (isOptionGroup(option)) {
          return (
            <optgroup key={`group-${index}`} label={option.label}>
              {option.options.map((groupOption, groupIndex) => (
                <option
                  key={`group-${index}-option-${groupIndex}`}
                  value={groupOption.value}
                  disabled={groupOption.disabled}
                >
                  {groupOption.label}
                </option>
              ))}
            </optgroup>
          );
        } else {
          return (
            <option
              key={`option-${index}`}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          );
        }
      });
    };
    
    return (
      <div className="w-full space-y-2">
        {label && (
          <label 
            htmlFor={selectId}
            className={cn(
              "block text-sm font-medium text-neutral-700",
              required && "after:content-['*'] after:ml-0.5 after:text-error-500",
              labelClassName
            )}
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          <select
            id={selectId}
            ref={handleRef}
            className={cn(
              selectVariants({ variant: error ? 'error' : variant, size }),
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error ? `${selectId}-error` : 
              helperText ? `${selectId}-helper` : 
              undefined
            }
            required={required}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            onBlur={handleBlur}
            {...props}
          >
            {children || renderOptions()}
          </select>
          
          {/* Custom dropdown arrow */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-500">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </div>
        </div>
        
        {error && (
          <p 
            className="text-xs text-error-500" 
            id={`${selectId}-error`}
            role="alert"
          >
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p 
            className="text-xs text-neutral-500" 
            id={`${selectId}-helper`}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
