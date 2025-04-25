import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from './Grid';
import { Box } from './Box';

/**
 * Grid Component
 * 
 * A layout component that creates a responsive grid system with customizable columns, rows, and gaps.
 */
const meta: Meta<typeof Grid> = {
  title: 'Components/Layout/Grid',
  component: Grid,
  parameters: {
    docs: {
      description: {
        component: 'A layout component that creates a responsive grid system with customizable columns, rows, and gaps.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    cols: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'none'],
      description: 'Number of columns in the grid',
      table: {
        type: { summary: 'number | "none"' },
        defaultValue: { summary: 1 },
      },
    },
    rows: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6, 'none'],
      description: 'Number of rows in the grid',
    },
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Gap between grid items (both rows and columns)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    colGap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Gap between columns',
    },
    rowGap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Gap between rows',
    },
    flow: {
      control: 'select',
      options: ['row', 'col', 'dense', 'row-dense', 'col-dense'],
      description: 'The flow of the grid',
    },
    autoRows: {
      control: 'select',
      options: ['auto', 'min', 'max', 'fr'],
      description: 'Auto rows behavior',
    },
    autoCols: {
      control: 'select',
      options: ['auto', 'min', 'max', 'fr'],
      description: 'Auto columns behavior',
    },
    smCols: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'none'],
      description: 'Number of columns for small screens (sm: 640px)',
    },
    mdCols: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'none'],
      description: 'Number of columns for medium screens (md: 768px)',
    },
    lgCols: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'none'],
      description: 'Number of columns for large screens (lg: 1024px)',
    },
    xlCols: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'none'],
      description: 'Number of columns for extra large screens (xl: 1280px)',
    },
    xxlCols: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'none'],
      description: 'Number of columns for 2xl screens (2xl: 1536px)',
    },
    padding: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Padding size',
    },
    bgColor: {
      control: 'text',
      description: 'Background color class (Tailwind class)',
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
      description: 'Border radius size',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Grid>;

// Helper component for grid items
const GridItem = ({ children, ...props }: React.PropsWithChildren<any>) => (
  <Box
    padding="md"
    bgColor="bg-white"
    rounded="md"
    shadow="sm"
    border="thin"
    borderColor="border-neutral-200"
    display="flex"
    className="items-center justify-center"
    {...props}
  >
    {children}
  </Box>
);

/**
 * Default Grid example
 */
export const Default: Story = {
  args: {
    cols: 3,
    gap: 'md',
    padding: 'md',
    bgColor: 'bg-neutral-50',
    rounded: 'md',
    children: [
      <GridItem key="1">Item 1</GridItem>,
      <GridItem key="2">Item 2</GridItem>,
      <GridItem key="3">Item 3</GridItem>,
      <GridItem key="4">Item 4</GridItem>,
      <GridItem key="5">Item 5</GridItem>,
      <GridItem key="6">Item 6</GridItem>,
    ],
  },
};

/**
 * Different column counts
 */
export const ColumnCounts: Story = {
  render: () => (
    <Box className="space-y-8">
      <Box>
        <h3 className="text-lg font-medium mb-2">2 Columns</h3>
        <Grid cols={2} gap="md" padding="md" bgColor="bg-neutral-50" rounded="md">
          <GridItem>Item 1</GridItem>
          <GridItem>Item 2</GridItem>
          <GridItem>Item 3</GridItem>
          <GridItem>Item 4</GridItem>
        </Grid>
      </Box>
      
      <Box>
        <h3 className="text-lg font-medium mb-2">3 Columns</h3>
        <Grid cols={3} gap="md" padding="md" bgColor="bg-neutral-50" rounded="md">
          <GridItem>Item 1</GridItem>
          <GridItem>Item 2</GridItem>
          <GridItem>Item 3</GridItem>
          <GridItem>Item 4</GridItem>
          <GridItem>Item 5</GridItem>
          <GridItem>Item 6</GridItem>
        </Grid>
      </Box>
      
      <Box>
        <h3 className="text-lg font-medium mb-2">4 Columns</h3>
        <Grid cols={4} gap="md" padding="md" bgColor="bg-neutral-50" rounded="md">
          <GridItem>Item 1</GridItem>
          <GridItem>Item 2</GridItem>
          <GridItem>Item 3</GridItem>
          <GridItem>Item 4</GridItem>
          <GridItem>Item 5</GridItem>
          <GridItem>Item 6</GridItem>
          <GridItem>Item 7</GridItem>
          <GridItem>Item 8</GridItem>
        </Grid>
      </Box>
    </Box>
  ),
};

/**
 * Different gap sizes
 */
export const GapSizes: Story = {
  render: () => (
    <Box className="space-y-8">
      <Box>
        <h3 className="text-lg font-medium mb-2">No Gap</h3>
        <Grid cols={3} gap="none" padding="md" bgColor="bg-neutral-50" rounded="md">
          <GridItem rounded="none">Item 1</GridItem>
          <GridItem rounded="none">Item 2</GridItem>
          <GridItem rounded="none">Item 3</GridItem>
          <GridItem rounded="none">Item 4</GridItem>
          <GridItem rounded="none">Item 5</GridItem>
          <GridItem rounded="none">Item 6</GridItem>
        </Grid>
      </Box>
      
      <Box>
        <h3 className="text-lg font-medium mb-2">Small Gap</h3>
        <Grid cols={3} gap="sm" padding="md" bgColor="bg-neutral-50" rounded="md">
          <GridItem>Item 1</GridItem>
          <GridItem>Item 2</GridItem>
          <GridItem>Item 3</GridItem>
          <GridItem>Item 4</GridItem>
          <GridItem>Item 5</GridItem>
          <GridItem>Item 6</GridItem>
        </Grid>
      </Box>
      
      <Box>
        <h3 className="text-lg font-medium mb-2">Medium Gap (Default)</h3>
        <Grid cols={3} gap="md" padding="md" bgColor="bg-neutral-50" rounded="md">
          <GridItem>Item 1</GridItem>
          <GridItem>Item 2</GridItem>
          <GridItem>Item 3</GridItem>
          <GridItem>Item 4</GridItem>
          <GridItem>Item 5</GridItem>
          <GridItem>Item 6</GridItem>
        </Grid>
      </Box>
      
      <Box>
        <h3 className="text-lg font-medium mb-2">Large Gap</h3>
        <Grid cols={3} gap="lg" padding="md" bgColor="bg-neutral-50" rounded="md">
          <GridItem>Item 1</GridItem>
          <GridItem>Item 2</GridItem>
          <GridItem>Item 3</GridItem>
          <GridItem>Item 4</GridItem>
          <GridItem>Item 5</GridItem>
          <GridItem>Item 6</GridItem>
        </Grid>
      </Box>
    </Box>
  ),
};

/**
 * Different row and column gaps
 */
export const DifferentRowAndColumnGaps: Story = {
  args: {
    cols: 3,
    colGap: 'sm',
    rowGap: 'lg',
    padding: 'md',
    bgColor: 'bg-neutral-50',
    rounded: 'md',
    children: [
      <GridItem key="1">Item 1</GridItem>,
      <GridItem key="2">Item 2</GridItem>,
      <GridItem key="3">Item 3</GridItem>,
      <GridItem key="4">Item 4</GridItem>,
      <GridItem key="5">Item 5</GridItem>,
      <GridItem key="6">Item 6</GridItem>,
    ],
  },
};

/**
 * Responsive grid
 */
export const ResponsiveGrid: Story = {
  args: {
    cols: 1,
    smCols: 2,
    mdCols: 3,
    lgCols: 4,
    gap: 'md',
    padding: 'md',
    bgColor: 'bg-neutral-50',
    rounded: 'md',
    children: [
      <GridItem key="1">Item 1</GridItem>,
      <GridItem key="2">Item 2</GridItem>,
      <GridItem key="3">Item 3</GridItem>,
      <GridItem key="4">Item 4</GridItem>,
      <GridItem key="5">Item 5</GridItem>,
      <GridItem key="6">Item 6</GridItem>,
      <GridItem key="7">Item 7</GridItem>,
      <GridItem key="8">Item 8</GridItem>,
    ],
  },
};

/**
 * Auto rows and columns
 */
export const AutoRowsAndColumns: Story = {
  args: {
    cols: 3,
    autoRows: 'min',
    gap: 'md',
    padding: 'md',
    bgColor: 'bg-neutral-50',
    rounded: 'md',
    children: [
      <GridItem key="1" className="h-24">Taller Item</GridItem>,
      <GridItem key="2">Item 2</GridItem>,
      <GridItem key="3" className="h-32">Even Taller Item</GridItem>,
      <GridItem key="4">Item 4</GridItem>,
      <GridItem key="5" className="h-20">Tall Item</GridItem>,
      <GridItem key="6">Item 6</GridItem>,
    ],
  },
};

/**
 * Grid with spanning items
 */
export const SpanningItems: Story = {
  render: () => (
    <Grid 
      cols={3} 
      gap="md" 
      padding="md" 
      bgColor="bg-neutral-50" 
      rounded="md"
      className="grid-rows-3"
    >
      <GridItem className="col-span-2">Span 2 columns</GridItem>
      <GridItem>Item 2</GridItem>
      <GridItem>Item 3</GridItem>
      <GridItem className="col-span-3">Span all 3 columns</GridItem>
      <GridItem>Item 5</GridItem>
      <GridItem className="row-span-2">Span 2 rows</GridItem>
      <GridItem>Item 7</GridItem>
    </Grid>
  ),
};

/**
 * Grid layout example
 */
export const GridLayoutExample: Story = {
  render: () => (
    <Grid 
      cols={4} 
      gap="md" 
      padding="md" 
      bgColor="bg-neutral-50" 
      rounded="lg"
      className="grid-rows-[auto_1fr_auto]"
      height="h-screen max-h-[600px]"
    >
      {/* Header */}
      <Box 
        className="col-span-4" 
        padding="md" 
        bgColor="bg-primary-600" 
        textColor="text-white" 
        rounded="md"
      >
        <h2 className="text-xl font-bold">Dashboard Header</h2>
      </Box>
      
      {/* Sidebar */}
      <Box 
        className="row-span-1" 
        padding="md" 
        bgColor="bg-white" 
        rounded="md" 
        shadow="sm"
        border="thin"
        borderColor="border-neutral-200"
      >
        <h3 className="font-medium mb-4">Navigation</h3>
        <ul className="space-y-2">
          <li className="p-2 bg-primary-50 text-primary-700 rounded-md">Dashboard</li>
          <li className="p-2 hover:bg-neutral-50 rounded-md">Analytics</li>
          <li className="p-2 hover:bg-neutral-50 rounded-md">Reports</li>
          <li className="p-2 hover:bg-neutral-50 rounded-md">Settings</li>
        </ul>
      </Box>
      
      {/* Main content */}
      <Box 
        className="col-span-3 overflow-auto" 
        padding="md" 
        bgColor="bg-white" 
        rounded="md" 
        shadow="sm"
        border="thin"
        borderColor="border-neutral-200"
      >
        <h3 className="font-medium mb-4">Main Content</h3>
        <Grid cols={2} gap="md">
          <GridItem>
            <h4 className="font-medium mb-2">Recent Activity</h4>
            <p className="text-sm text-neutral-600">
              This is an example of a complex grid layout that demonstrates
              how the Grid component can be used to create sophisticated UI structures.
            </p>
          </GridItem>
          <GridItem>
            <h4 className="font-medium mb-2">Statistics</h4>
            <p className="text-sm text-neutral-600">
              The Grid component supports nested grids, allowing for complex layouts.
            </p>
          </GridItem>
          <GridItem className="col-span-2">
            <h4 className="font-medium mb-2">Latest Updates</h4>
            <p className="text-sm text-neutral-600">
              Items can span multiple columns or rows as needed.
            </p>
          </GridItem>
        </Grid>
      </Box>
      
      {/* Footer */}
      <Box 
        className="col-span-4" 
        padding="md" 
        bgColor="bg-neutral-800" 
        textColor="text-white" 
        rounded="md"
      >
        <p className="text-sm">© 2025 Enterprise Component Library. All rights reserved.</p>
      </Box>
    </Grid>
  ),
};
