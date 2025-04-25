import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { BaseProps } from '../../types/common';
import { Box, BoxProps } from './Box';

// Define grid variants using CVA
const gridVariants = cva(
  // Base grid styles
  'grid',
  {
    variants: {
      cols: {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
        5: 'grid-cols-5',
        6: 'grid-cols-6',
        7: 'grid-cols-7',
        8: 'grid-cols-8',
        9: 'grid-cols-9',
        10: 'grid-cols-10',
        11: 'grid-cols-11',
        12: 'grid-cols-12',
        none: 'grid-cols-none',
      },
      rows: {
        1: 'grid-rows-1',
        2: 'grid-rows-2',
        3: 'grid-rows-3',
        4: 'grid-rows-4',
        5: 'grid-rows-5',
        6: 'grid-rows-6',
        none: 'grid-rows-none',
      },
      gap: {
        none: 'gap-0',
        xs: 'gap-1',
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-6',
        xl: 'gap-8',
      },
      colGap: {
        none: 'gap-x-0',
        xs: 'gap-x-1',
        sm: 'gap-x-2',
        md: 'gap-x-4',
        lg: 'gap-x-6',
        xl: 'gap-x-8',
      },
      rowGap: {
        none: 'gap-y-0',
        xs: 'gap-y-1',
        sm: 'gap-y-2',
        md: 'gap-y-4',
        lg: 'gap-y-6',
        xl: 'gap-y-8',
      },
      flow: {
        row: 'grid-flow-row',
        col: 'grid-flow-col',
        dense: 'grid-flow-dense',
        'row-dense': 'grid-flow-row-dense',
        'col-dense': 'grid-flow-col-dense',
      },
      autoRows: {
        auto: 'auto-rows-auto',
        min: 'auto-rows-min',
        max: 'auto-rows-max',
        fr: 'auto-rows-fr',
      },
      autoCols: {
        auto: 'auto-cols-auto',
        min: 'auto-cols-min',
        max: 'auto-cols-max',
        fr: 'auto-cols-fr',
      },
    },
    defaultVariants: {
      cols: 1,
      gap: 'md',
    },
  }
);

// Export the grid variants for reuse in other components
export { gridVariants };

// Grid props interface
export interface GridProps
  extends Omit<BoxProps, 'display'>,
    VariantProps<typeof gridVariants> {
  /**
   * Number of columns for small screens (sm: 640px)
   */
  smCols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'none';
  /**
   * Number of columns for medium screens (md: 768px)
   */
  mdCols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'none';
  /**
   * Number of columns for large screens (lg: 1024px)
   */
  lgCols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'none';
  /**
   * Number of columns for extra large screens (xl: 1280px)
   */
  xlCols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'none';
  /**
   * Number of columns for 2xl screens (2xl: 1536px)
   */
  xxlCols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'none';
}

/**
 * Grid component with responsive props
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Grid cols={3} gap="md">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 *   <div>Item 4</div>
 *   <div>Item 5</div>
 *   <div>Item 6</div>
 * </Grid>
 * 
 * // Responsive grid
 * <Grid 
 *   cols={1} 
 *   smCols={2} 
 *   mdCols={3} 
 *   lgCols={4} 
 *   gap="md"
 * >
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 *   <div>Item 4</div>
 * </Grid>
 * 
 * // With different row and column gaps
 * <Grid 
 *   cols={3} 
 *   colGap="md" 
 *   rowGap="lg"
 * >
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 *   <div>Item 4</div>
 *   <div>Item 5</div>
 *   <div>Item 6</div>
 * </Grid>
 * ```
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      className,
      children,
      cols,
      rows,
      gap,
      colGap,
      rowGap,
      flow,
      autoRows,
      autoCols,
      smCols,
      mdCols,
      lgCols,
      xlCols,
      xxlCols,
      ...props
    },
    ref
  ) => {
    // Build responsive classes for grid columns
    const responsiveColsClasses = cn(
      smCols && `sm:grid-cols-${smCols}`,
      mdCols && `md:grid-cols-${mdCols}`,
      lgCols && `lg:grid-cols-${lgCols}`,
      xlCols && `xl:grid-cols-${xlCols}`,
      xxlCols && `2xl:grid-cols-${xxlCols}`
    );
    
    return (
      <Box
        ref={ref}
        className={cn(
          gridVariants({ cols, rows, gap, colGap, rowGap, flow, autoRows, autoCols }),
          responsiveColsClasses,
          className
        )}
        display="grid"
        {...props}
      >
        {children}
      </Box>
    );
  }
);

Grid.displayName = 'Grid';
