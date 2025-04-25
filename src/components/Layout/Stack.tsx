import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { BaseProps } from '../../types/common';
import { Box, BoxProps } from './Box';

// Define stack variants using CVA
const stackVariants = cva(
  // Base stack styles
  'flex',
  {
    variants: {
      direction: {
        row: 'flex-row',
        column: 'flex-col',
        'row-reverse': 'flex-row-reverse',
        'column-reverse': 'flex-col-reverse',
      },
      spacing: {
        none: 'gap-0',
        xs: 'gap-1',
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-6',
        xl: 'gap-8',
      },
      align: {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
        baseline: 'items-baseline',
      },
      justify: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly',
      },
      wrap: {
        wrap: 'flex-wrap',
        nowrap: 'flex-nowrap',
        'wrap-reverse': 'flex-wrap-reverse',
      },
    },
    defaultVariants: {
      direction: 'column',
      spacing: 'md',
      align: 'stretch',
      justify: 'start',
      wrap: 'nowrap',
    },
  }
);

// Export the stack variants for reuse in other components
export { stackVariants };

// Stack props interface
export interface StackProps
  extends Omit<BoxProps, 'display'>,
    VariantProps<typeof stackVariants> {
  /**
   * Whether to add dividers between items
   */
  dividers?: boolean;
  /**
   * Class name for the dividers
   */
  dividerClassName?: string;
}

/**
 * Stack component for consistent spacing between elements
 * 
 * @example
 * ```tsx
 * // Basic usage (vertical stack)
 * <Stack spacing="md">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Stack>
 * 
 * // Horizontal stack
 * <Stack direction="row" spacing="sm" align="center">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Stack>
 * 
 * // With dividers
 * <Stack dividers spacing="lg">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Stack>
 * ```
 */
export const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      className,
      children,
      direction,
      spacing,
      align,
      justify,
      wrap,
      dividers,
      dividerClassName,
      ...props
    },
    ref
  ) => {
    // Create an array of children to work with
    const childrenArray = React.Children.toArray(children).filter(Boolean);
    
    // If there are no dividers, render a simple stack
    if (!dividers) {
      return (
        <Box
          ref={ref}
          className={cn(
            stackVariants({ direction, spacing, align, justify, wrap }),
            className
          )}
          display="flex"
          {...props}
        >
          {children}
        </Box>
      );
    }
    
    // With dividers, we need to interleave dividers between children
    return (
      <Box
        ref={ref}
        className={cn(
          stackVariants({ direction, spacing, align, justify, wrap }),
          className
        )}
        display="flex"
        {...props}
      >
        {childrenArray.map((child, index) => {
          const isLast = index === childrenArray.length - 1;
          
          if (isLast) {
            return child;
          }
          
          const dividerOrientation = direction === 'row' || direction === 'row-reverse' ? 'vertical' : 'horizontal';
          
          return (
            <React.Fragment key={index}>
              {child}
              <div
                className={cn(
                  'flex-shrink-0',
                  dividerOrientation === 'vertical' ? 'self-stretch w-px' : 'h-px w-full',
                  dividerClassName || 'bg-neutral-200',
                )}
                role="separator"
                aria-orientation={dividerOrientation}
              />
            </React.Fragment>
          );
        })}
      </Box>
    );
  }
);

Stack.displayName = 'Stack';
