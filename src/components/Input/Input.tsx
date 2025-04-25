import React, { forwardRef, useState, useEffect, useCallback } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { BaseProps } from '../../types/common';

// Define input variants and sizes using CVA
const inputVariants = cva(
  // Base input styles
  'flex w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm transition-colors placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
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

// Export the input variants for reuse in other components
export { inputVariants };

/**
 * Input mask pattern type
 */
export type InputMaskPattern = {
  /**
   * The regex pattern to match
   */
  pattern: RegExp;
  /**
   * The placeholder character to show when the input is empty
   */
  placeholder?: string;
};

/**
 * Input validation function type
 */
export type InputValidator = (value: string) => string | undefined;

// Input props interface extending HTML input attributes
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants>,
    BaseProps {
  /**
   * Left icon to display inside the input
   */
  leftIcon?: React.ReactNode;
  /**
   * Right icon to display inside the input
   */
  rightIcon?: React.ReactNode;
  /**
   * Element to be rendered as a wrapper (for adding icons, etc.)
   */
  wrapperClassName?: string;
  /**
   * Error message to display below the input
   */
  error?: string;
  /**
   * Helper text to display below the input
   */
  helperText?: string;
  /**
   * Label text for the input
   */
  label?: string;
  /**
   * Whether the field is required
   */
  required?: boolean;
  /**
   * Additional class name for the label
   */
  labelClassName?: string;
  /**
   * Input mask pattern (e.g., for phone numbers, credit cards, etc.)
   */
  mask?: InputMaskPattern | string;
  /**
   * Validation function to validate the input value
   */
  validator?: InputValidator;
  /**
   * Whether to show the password toggle button for password inputs
   */
  showPasswordToggle?: boolean;
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
 * Input component with support for icons, error states, different sizes, input masking, and validation
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Input placeholder="Enter your name" />
 * 
 * // With variants and sizes
 * <Input variant="error" size="lg" error="This field is required" />
 * <Input variant="success" size="sm" helperText="Looks good!" />
 * 
 * // With icons
 * <Input 
 *   leftIcon={<Icon name="search" />} 
 *   placeholder="Search..." 
 * />
 * 
 * // With label
 * <Input
 *   label="Email Address"
 *   required
 *   type="email"
 * />
 * 
 * // With input masking (phone number)
 * <Input
 *   label="Phone Number"
 *   mask="(999) 999-9999"
 *   placeholder="(___) ___-____"
 * />
 * 
 * // With validation
 * <Input
 *   label="Username"
 *   validator={(value) => value.length < 3 ? 'Username must be at least 3 characters' : undefined}
 * />
 * 
 * // Password with toggle
 * <Input
 *   type="password"
 *   label="Password"
 *   showPasswordToggle
 * />
 * ```
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      leftIcon,
      rightIcon,
      wrapperClassName,
      error: externalError,
      helperText,
      label,
      required,
      labelClassName,
      id,
      mask,
      validator,
      showPasswordToggle,
      validateOnBlur = false,
      onValidationChange,
      type = 'text',
      value,
      defaultValue,
      onChange,
      onBlur,
      ...props
    },
    ref
  ) => {
    // Generate a unique ID if none is provided
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
    
    // State for internal validation error
    const [internalError, setInternalError] = useState<string | undefined>(undefined);
    // State for masked value
    const [maskedValue, setMaskedValue] = useState<string>(
      (value as string) || defaultValue as string || ''
    );
    // State for password visibility
    const [showPassword, setShowPassword] = useState(false);
    
    // Combine external and internal errors
    const error = externalError || internalError;
    
    // Determine the actual input type for password fields
    const actualType = type === 'password' && showPassword ? 'text' : type;
    
    // Apply mask to the input value
    const applyMask = useCallback((value: string) => {
      if (!mask) return value;
      
      if (typeof mask === 'string') {
        // Simple string mask (e.g., "999-999-9999")
        let maskedValue = '';
        let valueIndex = 0;
        
        for (let i = 0; i < mask.length && valueIndex < value.length; i++) {
          const maskChar = mask[i];
          
          if (maskChar === '9') {
            // Digit placeholder
            if (/\d/.test(value[valueIndex])) {
              maskedValue += value[valueIndex];
              valueIndex++;
            } else {
              // Skip non-digit characters in the input
              valueIndex++;
              i--; // Try this mask position again
            }
          } else if (maskChar === 'a') {
            // Letter placeholder
            if (/[a-zA-Z]/.test(value[valueIndex])) {
              maskedValue += value[valueIndex];
              valueIndex++;
            } else {
              // Skip non-letter characters in the input
              valueIndex++;
              i--; // Try this mask position again
            }
          } else if (maskChar === '*') {
            // Any character placeholder
            maskedValue += value[valueIndex];
            valueIndex++;
          } else {
            // Literal character in the mask
            maskedValue += maskChar;
            
            // If the input matches the mask character, consume it
            if (value[valueIndex] === maskChar) {
              valueIndex++;
            }
          }
        }
        
        return maskedValue;
      } else {
        // RegExp mask
        const { pattern } = mask;
        return value.replace(pattern, '');
      }
    }, [mask]);
    
    // Validate the input value
    const validateInput = useCallback((value: string) => {
      if (!validator) return;
      
      const errorMessage = validator(value);
      setInternalError(errorMessage);
      
      if (onValidationChange) {
        onValidationChange(!errorMessage, errorMessage);
      }
    }, [validator, onValidationChange]);
    
    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      let processedValue = newValue;
      
      // Apply mask if provided
      if (mask) {
        processedValue = applyMask(newValue);
        setMaskedValue(processedValue);
        
        // Create a new synthetic event with the masked value
        const syntheticEvent = {
          ...e,
          target: {
            ...e.target,
            value: processedValue
          }
        } as React.ChangeEvent<HTMLInputElement>;
        
        // Call the original onChange handler with the masked value
        if (onChange) {
          onChange(syntheticEvent);
        }
      } else if (onChange) {
        onChange(e);
      }
      
      // Validate unless validateOnBlur is true
      if (!validateOnBlur && validator) {
        validateInput(processedValue);
      }
    };
    
    // Handle input blur
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      // Call the original onBlur handler
      if (onBlur) {
        onBlur(e);
      }
      
      // Validate on blur if validateOnBlur is true
      if (validateOnBlur && validator) {
        validateInput(e.target.value);
      }
    };
    
    // Toggle password visibility
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
    
    // Password toggle icon
    const PasswordToggleIcon = () => (
      <button
        type="button"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 focus:outline-none"
        onClick={togglePasswordVisibility}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
        tabIndex={-1} // Remove from tab order
      >
        {showPassword ? (
          // Hide password icon (eye-slash)
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
            <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
            <line x1="2" x2="22" y1="2" y2="22"></line>
          </svg>
        ) : (
          // Show password icon (eye)
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        )}
      </button>
    );
    
    // Update maskedValue when external value changes
    useEffect(() => {
      if (value !== undefined && mask) {
        setMaskedValue(applyMask(value as string));
      }
    }, [value, mask, applyMask]);
    
    // If we have icons or password toggle, we need to wrap the input
    const hasIcons = leftIcon || rightIcon || (type === 'password' && showPasswordToggle);
    
    // Determine if we need to add padding for icons
    const leftPadding = leftIcon ? 'pl-10' : '';
    const rightPadding = rightIcon || (type === 'password' && showPasswordToggle) ? 'pr-10' : '';

    // Base input element
    const inputElement = (
      <input
        className={cn(
          inputVariants({ variant: error ? 'error' : variant, size: size as "sm" | "md" | "lg" | null | undefined }),
          leftPadding,
          rightPadding,
          className
        )}
        id={inputId}
        ref={ref}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={
          error ? `${inputId}-error` : 
          helperText ? `${inputId}-helper` : 
          undefined
        }
        required={required}
        type={actualType}
        value={mask ? maskedValue : value}
        onChange={handleChange}
        onBlur={handleBlur}
        {...props}
      />
    );

    return (
      <div className="w-full space-y-2">
        {label && (
          <label 
            htmlFor={inputId}
            className={cn(
              "block text-sm font-medium text-neutral-700",
              required && "after:content-['*'] after:ml-0.5 after:text-error-500",
              labelClassName
            )}
          >
            {label}
          </label>
        )}
        
        <div className={cn("relative", wrapperClassName)}>
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
              {leftIcon}
            </div>
          )}
          
          {inputElement}
          
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500">
              {rightIcon}
            </div>
          )}
          
          {type === 'password' && showPasswordToggle && !rightIcon && (
            <PasswordToggleIcon />
          )}
        </div>
        
        {error && (
          <p 
            className="text-xs text-error-500" 
            id={`${inputId}-error`}
            role="alert"
          >
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p 
            className="text-xs text-neutral-500" 
            id={`${inputId}-helper`}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
