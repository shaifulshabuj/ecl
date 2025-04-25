import React, { forwardRef, useState, useEffect, useRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { BaseProps } from '../../types/common';

// Define textarea variants using CVA
const textareaVariants = cva(
  // Base textarea styles
  'flex w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm transition-colors placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-neutral-300',
        error: 'border-error-500 focus:ring-error-400',
        success: 'border-success-500 focus:ring-success-400',
      },
      resize: {
        none: 'resize-none',
        vertical: 'resize-y',
        horizontal: 'resize-x',
        both: 'resize',
      },
    },
    defaultVariants: {
      variant: 'default',
      resize: 'vertical',
    },
  }
);

// Export the textarea variants for reuse in other components
export { textareaVariants };

// TextArea props interface
export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants>,
    BaseProps {
  /**
   * Label for the textarea
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
   * Whether to auto-resize the textarea based on content
   */
  autoResize?: boolean;
  /**
   * Maximum height for auto-resize (in pixels)
   */
  maxHeight?: number;
  /**
   * Validation function to validate the textarea value
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
 * TextArea component with auto-resize capability and validation
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <TextArea placeholder="Enter your message" />
 * 
 * // With label and helper text
 * <TextArea 
 *   label="Message" 
 *   helperText="Please be concise"
 *   placeholder="Enter your message here"
 * />
 * 
 * // With auto-resize
 * <TextArea 
 *   label="Comments" 
 *   autoResize 
 *   maxHeight={300}
 * />
 * 
 * // With validation
 * <TextArea
 *   label="Feedback"
 *   required
 *   validator={(value) => value.length < 10 ? 'Feedback must be at least 10 characters' : undefined}
 * />
 * ```
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className,
      variant,
      resize,
      label,
      error: externalError,
      helperText,
      required,
      labelClassName,
      id,
      autoResize = false,
      maxHeight,
      validator,
      validateOnBlur = false,
      onValidationChange,
      value,
      defaultValue,
      onChange,
      onBlur,
      ...props
    },
    ref
  ) => {
    // Generate a unique ID if none is provided
    const textareaId = id || `textarea-${Math.random().toString(36).substring(2, 9)}`;
    
    // State for internal validation error
    const [internalError, setInternalError] = useState<string | undefined>(undefined);
    
    // Combine external and internal errors
    const error = externalError || internalError;
    
    // Create a ref for auto-resize functionality
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    
    // Combine refs
    const handleRef = (element: HTMLTextAreaElement) => {
      textareaRef.current = element;
      
      // Forward the ref
      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    };
    
    // Validate the textarea value
    const validateInput = (value: string) => {
      if (!validator) return;
      
      const errorMessage = validator(value);
      setInternalError(errorMessage);
      
      if (onValidationChange) {
        onValidationChange(!errorMessage, errorMessage);
      }
    };
    
    // Handle textarea change
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      // Call the original onChange handler
      if (onChange) {
        onChange(e);
      }
      
      // Auto-resize if enabled
      if (autoResize && textareaRef.current) {
        adjustHeight();
      }
      
      // Validate unless validateOnBlur is true
      if (!validateOnBlur && validator) {
        validateInput(e.target.value);
      }
    };
    
    // Handle textarea blur
    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      // Call the original onBlur handler
      if (onBlur) {
        onBlur(e);
      }
      
      // Validate on blur if validateOnBlur is true
      if (validateOnBlur && validator) {
        validateInput(e.target.value);
      }
    };
    
    // Adjust the height of the textarea based on content
    const adjustHeight = () => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      
      // Reset the height to calculate the scroll height
      textarea.style.height = 'auto';
      
      // Calculate the new height
      let newHeight = textarea.scrollHeight;
      
      // Apply max height if specified
      if (maxHeight && newHeight > maxHeight) {
        newHeight = maxHeight;
        textarea.style.overflowY = 'auto';
      } else {
        textarea.style.overflowY = 'hidden';
      }
      
      // Set the new height
      textarea.style.height = `${newHeight}px`;
    };
    
    // Adjust height on initial render and when value changes
    useEffect(() => {
      if (autoResize && textareaRef.current) {
        adjustHeight();
      }
    }, [autoResize, value, defaultValue]);
    
    return (
      <div className="w-full space-y-2">
        {label && (
          <label 
            htmlFor={textareaId}
            className={cn(
              "block text-sm font-medium text-neutral-700",
              required && "after:content-['*'] after:ml-0.5 after:text-error-500",
              labelClassName
            )}
          >
            {label}
          </label>
        )}
        
        <textarea
          id={textareaId}
          ref={handleRef}
          className={cn(
            textareaVariants({ variant: error ? 'error' : variant, resize }),
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${textareaId}-error` : 
            helperText ? `${textareaId}-helper` : 
            undefined
          }
          required={required}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          onBlur={handleBlur}
          {...props}
        />
        
        {error && (
          <p 
            className="text-xs text-error-500" 
            id={`${textareaId}-error`}
            role="alert"
          >
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p 
            className="text-xs text-neutral-500" 
            id={`${textareaId}-helper`}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
