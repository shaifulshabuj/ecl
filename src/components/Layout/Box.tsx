import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { BaseProps } from '../../types/common';

// Define box variants using CVA
const boxVariants = cva(
  // Base box styles
  '',
  {
    variants: {
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-full',
      },
      shadow: {
        none: 'shadow-none',
        sm: 'shadow-sm',
        md: 'shadow',
        lg: 'shadow-lg',
        xl: 'shadow-xl',
      },
      border: {
        none: 'border-0',
        thin: 'border',
        medium: 'border-2',
        thick: 'border-4',
      },
      padding: {
        none: 'p-0',
        xs: 'p-1',
        sm: 'p-2',
        md: 'p-4',
        lg: 'p-6',
        xl: 'p-8',
      },
    },
    defaultVariants: {
      rounded: 'none',
      shadow: 'none',
      border: 'none',
      padding: 'none',
    },
  }
);

// Export the box variants for reuse in other components
export { boxVariants };

// Box props interface
export interface BoxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof boxVariants>,
    BaseProps {
  /**
   * The HTML element to render
   * @default div
   */
  as?: React.ElementType;
  /**
   * Whether the box should take up the full width of its container
   */
  fullWidth?: boolean;
  /**
   * Whether the box should take up the full height of its container
   */
  fullHeight?: boolean;
  /**
   * Border color class (Tailwind class)
   */
  borderColor?: string;
  /**
   * Background color class (Tailwind class)
   */
  bgColor?: string;
  /**
   * Text color class (Tailwind class)
   */
  textColor?: string;
  /**
   * Width class (Tailwind class)
   */
  width?: string;
  /**
   * Height class (Tailwind class)
   */
  height?: string;
  /**
   * Margin class (Tailwind class)
   */
  margin?: string;
  /**
   * Position class (Tailwind class)
   */
  position?: string;
  /**
   * Display class (Tailwind class)
   */
  display?: string;
  /**
   * Overflow class (Tailwind class)
   */
  overflow?: string;
}

/**
 * Box component as a base layout primitive
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Box>Content goes here</Box>
 * 
 * // With variants
 * <Box rounded="lg" shadow="md" padding="md">
 *   Content with rounded corners, shadow, and padding
 * </Box>
 * 
 * // With custom styles
 * <Box 
 *   bgColor="bg-primary-100" 
 *   borderColor="border-primary-500" 
 *   border="thin" 
 *   padding="md"
 * >
 *   Content with custom background and border
 * </Box>
 * 
 * // As another element
 * <Box as="section" padding="lg">
 *   Section content
 * </Box>
 * ```
 */
export const Box = forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      className,
      as: Component = 'div',
      children,
      rounded,
      shadow,
      border,
      padding,
      fullWidth,
      fullHeight,
      borderColor,
      bgColor,
      textColor,
      width,
      height,
      margin,
      position,
      display,
      overflow,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          boxVariants({ rounded, shadow, border, padding }),
          fullWidth && 'w-full',
          fullHeight && 'h-full',
          borderColor,
          bgColor,
          textColor,
          width,
          height,
          margin,
          position,
          display,
          overflow,
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Box.displayName = 'Box';
