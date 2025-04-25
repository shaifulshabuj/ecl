import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { BaseProps } from '../../types/common';
import { Box, BoxProps } from './Box';

// Define container variants using CVA
const containerVariants = cva(
  // Base container styles
  'mx-auto',
  {
    variants: {
      size: {
        xs: 'max-w-screen-xs',
        sm: 'max-w-screen-sm',
        md: 'max-w-screen-md',
        lg: 'max-w-screen-lg',
        xl: 'max-w-screen-xl',
        '2xl': 'max-w-screen-2xl',
        full: 'max-w-full',
      },
      padding: {
        none: 'px-0',
        sm: 'px-4',
        md: 'px-6',
        lg: 'px-8',
        xl: 'px-12',
      },
    },
    defaultVariants: {
      size: 'lg',
      padding: 'md',
    },
  }
);

// Export the container variants for reuse in other components
export { containerVariants };

// Container props interface
export interface ContainerProps
  extends Omit<BoxProps, 'width' | 'padding'>,
    VariantProps<typeof containerVariants> {
  /**
   * Whether to center the content horizontally
   */
  centerContent?: boolean;
}

/**
 * Container component for page layout
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Container>
 *   <h1>Page Title</h1>
 *   <p>Page content goes here</p>
 * </Container>
 * 
 * // With different size
 * <Container size="md">
 *   Content with medium width constraint
 * </Container>
 * 
 * // With different padding
 * <Container padding="lg">
 *   Content with larger horizontal padding
 * </Container>
 * 
 * // With centered content
 * <Container centerContent>
 *   <div>This content will be centered vertically and horizontally</div>
 * </Container>
 * ```
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      className,
      children,
      size,
      padding,
      centerContent,
      ...props
    },
    ref
  ) => {
    // We need to separate props to avoid conflicts
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ...restProps } = props;
  
    return (
      <Box
        ref={ref}
        className={cn(
          containerVariants({ size, padding }),
          centerContent && 'flex flex-col items-center justify-center',
          className
        )}
        {...restProps}
      >
        {children}
      </Box>
    );
  }
);

Container.displayName = 'Container';
