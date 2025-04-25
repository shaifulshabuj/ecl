import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { BaseProps } from '../../types/common';

// Define divider variants using CVA
const dividerVariants = cva(
  // Base divider styles
  'shrink-0',
  {
    variants: {
      orientation: {
        horizontal: 'w-full h-px',
        vertical: 'h-full w-px',
      },
      thickness: {
        thin: 'border-t border-l',
        medium: 'border-t-2 border-l-2',
        thick: 'border-t-4 border-l-4',
      },
      variant: {
        solid: 'border-solid',
        dashed: 'border-dashed',
        dotted: 'border-dotted',
      },
    },
    compoundVariants: [
      {
        orientation: 'horizontal',
        thickness: 'thin',
        className: 'border-t border-l-0',
      },
      {
        orientation: 'horizontal',
        thickness: 'medium',
        className: 'border-t-2 border-l-0',
      },
      {
        orientation: 'horizontal',
        thickness: 'thick',
        className: 'border-t-4 border-l-0',
      },
      {
        orientation: 'vertical',
        thickness: 'thin',
        className: 'border-l border-t-0',
      },
      {
        orientation: 'vertical',
        thickness: 'medium',
        className: 'border-l-2 border-t-0',
      },
      {
        orientation: 'vertical',
        thickness: 'thick',
        className: 'border-l-4 border-t-0',
      },
    ],
    defaultVariants: {
      orientation: 'horizontal',
      thickness: 'thin',
      variant: 'solid',
    },
  }
);

// Export the divider variants for reuse in other components
export { dividerVariants };

// Divider props interface
export interface DividerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dividerVariants>,
    BaseProps {
  /**
   * Label to display in the middle of the divider
   */
  label?: string;
  /**
   * Border color class (Tailwind class)
   */
  color?: string;
  /**
   * Vertical spacing for horizontal dividers
   */
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Horizontal spacing for vertical dividers
   */
  horizontalSpacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Whether to add a gutter (space) around the label
   */
  labelGutter?: boolean;
  /**
   * Additional class name for the label
   */
  labelClassName?: string;
}

/**
 * Divider component for separating content
 * 
 * @example
 * ```tsx
 * // Basic horizontal divider
 * <Divider />
 * 
 * // Vertical divider
 * <div className="h-24 flex">
 *   <div>Left content</div>
 *   <Divider orientation="vertical" />
 *   <div>Right content</div>
 * </div>
 * 
 * // Divider with label
 * <Divider label="OR" />
 * 
 * // Styled divider
 * <Divider 
 *   thickness="medium" 
 *   variant="dashed" 
 *   color="border-primary-500" 
 * />
 * ```
 */
export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      className,
      orientation,
      thickness,
      variant,
      label,
      color,
      spacing = 'md',
      horizontalSpacing = 'md',
      labelGutter = true,
      labelClassName,
      ...props
    },
    ref
  ) => {
    // Determine spacing classes
    const spacingClasses = {
      none: 'my-0',
      xs: 'my-1',
      sm: 'my-2',
      md: 'my-4',
      lg: 'my-6',
      xl: 'my-8',
    };
    
    const horizontalSpacingClasses = {
      none: 'mx-0',
      xs: 'mx-1',
      sm: 'mx-2',
      md: 'mx-4',
      lg: 'mx-6',
      xl: 'mx-8',
    };
    
    // Apply spacing based on orientation
    const spacingClass = orientation === 'horizontal' 
      ? spacingClasses[spacing]
      : horizontalSpacingClasses[horizontalSpacing];
    
    // If there's no label, render a simple divider
    if (!label) {
      return (
        <div
          ref={ref}
          className={cn(
            dividerVariants({ orientation, thickness, variant }),
            spacingClass,
            color || 'border-neutral-200',
            className
          )}
          role="separator"
          aria-orientation={orientation || 'horizontal'}
          {...props}
        />
      );
    }
    
    // With label, render a divider with a centered label
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center',
          orientation === 'horizontal' ? 'w-full' : 'h-full flex-col',
          spacingClass,
          className
        )}
        role="separator"
        aria-orientation={orientation === 'horizontal' ? 'horizontal' : 'vertical'}
        {...props}
      >
        <div
          className={cn(
            dividerVariants({ orientation, thickness, variant }),
            color || 'border-neutral-200',
            orientation === 'horizontal' ? 'flex-grow' : 'flex-grow-0',
          )}
        />
        
        <div
          className={cn(
            'text-neutral-500 text-sm font-medium',
            orientation === 'horizontal' 
              ? labelGutter ? 'px-3' : 'px-0'
              : labelGutter ? 'py-3' : 'py-0',
            labelClassName
          )}
        >
          {label}
        </div>
        
        <div
          className={cn(
            dividerVariants({ orientation, thickness, variant }),
            color || 'border-neutral-200',
            orientation === 'horizontal' ? 'flex-grow' : 'flex-grow-0',
          )}
        />
      </div>
    );
  }
);

Divider.displayName = 'Divider';
