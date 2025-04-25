import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from './Stack';
import { Box } from './Box';

/**
 * Stack Component
 * 
 * A layout component that arranges its children in a vertical or horizontal stack with consistent spacing.
 */
const meta: Meta<typeof Stack> = {
  title: 'Components/Layout/Stack',
  component: Stack,
  parameters: {
    docs: {
      description: {
        component: 'A layout component that arranges its children in a vertical or horizontal stack with consistent spacing.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'column', 'row-reverse', 'column-reverse'],
      description: 'The direction of the stack',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'column' },
      },
    },
    spacing: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
      description: 'The spacing between items',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
      description: 'The alignment of items along the cross axis',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'stretch' },
      },
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
      description: 'The alignment of items along the main axis',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'start' },
      },
    },
    wrap: {
      control: 'select',
      options: ['wrap', 'nowrap', 'wrap-reverse'],
      description: 'Whether items should wrap',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'nowrap' },
      },
    },
    dividers: {
      control: 'boolean',
      description: 'Whether to add dividers between items',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    dividerClassName: {
      control: 'text',
      description: 'Class name for the dividers',
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
      description: 'Border radius size',
    },
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Shadow size',
    },
    border: {
      control: 'select',
      options: ['none', 'thin', 'medium', 'thick'],
      description: 'Border width',
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
  },
};

export default meta;
type Story = StoryObj<typeof Stack>;

// Helper component for consistent box items
const BoxItem = ({ children, ...props }: React.PropsWithChildren<any>) => (
  <Box
    padding="md"
    bgColor="bg-white"
    rounded="md"
    shadow="sm"
    border="thin"
    borderColor="border-neutral-200"
    {...props}
  >
    {children}
  </Box>
);

/**
 * Default Stack example (vertical)
 */
export const Default: Story = {
  args: {
    spacing: 'md',
    padding: 'md',
    bgColor: 'bg-neutral-50',
    rounded: 'md',
    children: [
      <BoxItem key="1">Item 1</BoxItem>,
      <BoxItem key="2">Item 2</BoxItem>,
      <BoxItem key="3">Item 3</BoxItem>,
    ],
  },
};

/**
 * Horizontal Stack
 */
export const Horizontal: Story = {
  args: {
    direction: 'row',
    spacing: 'md',
    padding: 'md',
    bgColor: 'bg-neutral-50',
    rounded: 'md',
    children: [
      <BoxItem key="1" width="w-32" height="h-24" display="flex items-center justify-center">Item 1</BoxItem>,
      <BoxItem key="2" width="w-32" height="h-24" display="flex items-center justify-center">Item 2</BoxItem>,
      <BoxItem key="3" width="w-32" height="h-24" display="flex items-center justify-center">Item 3</BoxItem>,
    ],
  },
};

/**
 * Different spacing options
 */
export const SpacingOptions: Story = {
  render: () => (
    <Stack spacing="md">
      <h3 className="text-lg font-medium mb-2">Extra Small Spacing (xs)</h3>
      <Stack direction="row" spacing="xs" padding="md" bgColor="bg-neutral-50" rounded="md">
        <BoxItem width="w-24" height="h-24" display="flex items-center justify-center">1</BoxItem>
        <BoxItem width="w-24" height="h-24" display="flex items-center justify-center">2</BoxItem>
        <BoxItem width="w-24" height="h-24" display="flex items-center justify-center">3</BoxItem>
      </Stack>
      
      <h3 className="text-lg font-medium mb-2 mt-6">Small Spacing (sm)</h3>
      <Stack direction="row" spacing="sm" padding="md" bgColor="bg-neutral-50" rounded="md">
        <BoxItem width="w-24" height="h-24" display="flex items-center justify-center">1</BoxItem>
        <BoxItem width="w-24" height="h-24" display="flex items-center justify-center">2</BoxItem>
        <BoxItem width="w-24" height="h-24" display="flex items-center justify-center">3</BoxItem>
      </Stack>
      
      <h3 className="text-lg font-medium mb-2 mt-6">Medium Spacing (md - default)</h3>
      <Stack direction="row" spacing="md" padding="md" bgColor="bg-neutral-50" rounded="md">
        <BoxItem width="w-24" height="h-24" display="flex items-center justify-center">1</BoxItem>
        <BoxItem width="w-24" height="h-24" display="flex items-center justify-center">2</BoxItem>
        <BoxItem width="w-24" height="h-24" display="flex items-center justify-center">3</BoxItem>
      </Stack>
      
      <h3 className="text-lg font-medium mb-2 mt-6">Large Spacing (lg)</h3>
      <Stack direction="row" spacing="lg" padding="md" bgColor="bg-neutral-50" rounded="md">
        <BoxItem width="w-24" height="h-24" display="flex items-center justify-center">1</BoxItem>
        <BoxItem width="w-24" height="h-24" display="flex items-center justify-center">2</BoxItem>
        <BoxItem width="w-24" height="h-24" display="flex items-center justify-center">3</BoxItem>
      </Stack>
      
      <h3 className="text-lg font-medium mb-2 mt-6">Extra Large Spacing (xl)</h3>
      <Stack direction="row" spacing="xl" padding="md" bgColor="bg-neutral-50" rounded="md">
        <BoxItem width="w-24" height="h-24" display="flex items-center justify-center">1</BoxItem>
        <BoxItem width="w-24" height="h-24" display="flex items-center justify-center">2</BoxItem>
        <BoxItem width="w-24" height="h-24" display="flex items-center justify-center">3</BoxItem>
      </Stack>
    </Stack>
  ),
};

/**
 * With dividers
 */
export const WithDividers: Story = {
  args: {
    dividers: true,
    spacing: 'md',
    padding: 'md',
    bgColor: 'bg-neutral-50',
    rounded: 'md',
    children: [
      <BoxItem key="1">Item 1</BoxItem>,
      <BoxItem key="2">Item 2</BoxItem>,
      <BoxItem key="3">Item 3</BoxItem>,
    ],
  },
};

/**
 * Horizontal with dividers
 */
export const HorizontalWithDividers: Story = {
  args: {
    direction: 'row',
    dividers: true,
    spacing: 'md',
    padding: 'md',
    bgColor: 'bg-neutral-50',
    rounded: 'md',
    children: [
      <BoxItem key="1" width="w-32" height="h-24" display="flex items-center justify-center">Item 1</BoxItem>,
      <BoxItem key="2" width="w-32" height="h-24" display="flex items-center justify-center">Item 2</BoxItem>,
      <BoxItem key="3" width="w-32" height="h-24" display="flex items-center justify-center">Item 3</BoxItem>,
    ],
  },
};

/**
 * Different alignment options
 */
export const AlignmentOptions: Story = {
  render: () => (
    <Stack spacing="lg">
      <h3 className="text-lg font-medium mb-2">Align Start</h3>
      <Stack 
        direction="row" 
        align="start" 
        spacing="md" 
        padding="md" 
        bgColor="bg-neutral-50" 
        rounded="md"
        height="h-40"
      >
        <BoxItem width="w-24" height="h-16" display="flex items-center justify-center">Short</BoxItem>
        <BoxItem width="w-24" height="h-24" display="flex items-center justify-center">Medium</BoxItem>
        <BoxItem width="w-24" height="h-32" display="flex items-center justify-center">Tall</BoxItem>
      </Stack>
      
      <h3 className="text-lg font-medium mb-2">Align Center</h3>
      <Stack 
        direction="row" 
        align="center" 
        spacing="md" 
        padding="md" 
        bgColor="bg-neutral-50" 
        rounded="md"
        height="h-40"
      >
        <BoxItem width="w-24" height="h-16" display="flex items-center justify-center">Short</BoxItem>
        <BoxItem width="w-24" height="h-24" display="flex items-center justify-center">Medium</BoxItem>
        <BoxItem width="w-24" height="h-32" display="flex items-center justify-center">Tall</BoxItem>
      </Stack>
      
      <h3 className="text-lg font-medium mb-2">Align End</h3>
      <Stack 
        direction="row" 
        align="end" 
        spacing="md" 
        padding="md" 
        bgColor="bg-neutral-50" 
        rounded="md"
        height="h-40"
      >
        <BoxItem width="w-24" height="h-16" display="flex items-center justify-center">Short</BoxItem>
        <BoxItem width="w-24" height="h-24" display="flex items-center justify-center">Medium</BoxItem>
        <BoxItem width="w-24" height="h-32" display="flex items-center justify-center">Tall</BoxItem>
      </Stack>
    </Stack>
  ),
};

/**
 * Different justification options
 */
export const JustificationOptions: Story = {
  render: () => (
    <Stack spacing="lg">
      <h3 className="text-lg font-medium mb-2">Justify Start (default)</h3>
      <Stack 
        direction="row" 
        justify="start" 
        spacing="md" 
        padding="md" 
        bgColor="bg-neutral-50" 
        rounded="md"
        fullWidth
      >
        <BoxItem width="w-24" display="flex items-center justify-center">1</BoxItem>
        <BoxItem width="w-24" display="flex items-center justify-center">2</BoxItem>
        <BoxItem width="w-24" display="flex items-center justify-center">3</BoxItem>
      </Stack>
      
      <h3 className="text-lg font-medium mb-2">Justify Center</h3>
      <Stack 
        direction="row" 
        justify="center" 
        spacing="md" 
        padding="md" 
        bgColor="bg-neutral-50" 
        rounded="md"
        fullWidth
      >
        <BoxItem width="w-24" display="flex items-center justify-center">1</BoxItem>
        <BoxItem width="w-24" display="flex items-center justify-center">2</BoxItem>
        <BoxItem width="w-24" display="flex items-center justify-center">3</BoxItem>
      </Stack>
      
      <h3 className="text-lg font-medium mb-2">Justify End</h3>
      <Stack 
        direction="row" 
        justify="end" 
        spacing="md" 
        padding="md" 
        bgColor="bg-neutral-50" 
        rounded="md"
        fullWidth
      >
        <BoxItem width="w-24" display="flex items-center justify-center">1</BoxItem>
        <BoxItem width="w-24" display="flex items-center justify-center">2</BoxItem>
        <BoxItem width="w-24" display="flex items-center justify-center">3</BoxItem>
      </Stack>
      
      <h3 className="text-lg font-medium mb-2">Justify Between</h3>
      <Stack 
        direction="row" 
        justify="between" 
        spacing="md" 
        padding="md" 
        bgColor="bg-neutral-50" 
        rounded="md"
        fullWidth
      >
        <BoxItem width="w-24" display="flex items-center justify-center">1</BoxItem>
        <BoxItem width="w-24" display="flex items-center justify-center">2</BoxItem>
        <BoxItem width="w-24" display="flex items-center justify-center">3</BoxItem>
      </Stack>
      
      <h3 className="text-lg font-medium mb-2">Justify Around</h3>
      <Stack 
        direction="row" 
        justify="around" 
        spacing="md" 
        padding="md" 
        bgColor="bg-neutral-50" 
        rounded="md"
        fullWidth
      >
        <BoxItem width="w-24" display="flex items-center justify-center">1</BoxItem>
        <BoxItem width="w-24" display="flex items-center justify-center">2</BoxItem>
        <BoxItem width="w-24" display="flex items-center justify-center">3</BoxItem>
      </Stack>
      
      <h3 className="text-lg font-medium mb-2">Justify Evenly</h3>
      <Stack 
        direction="row" 
        justify="evenly" 
        spacing="md" 
        padding="md" 
        bgColor="bg-neutral-50" 
        rounded="md"
        fullWidth
      >
        <BoxItem width="w-24" display="flex items-center justify-center">1</BoxItem>
        <BoxItem width="w-24" display="flex items-center justify-center">2</BoxItem>
        <BoxItem width="w-24" display="flex items-center justify-center">3</BoxItem>
      </Stack>
    </Stack>
  ),
};

/**
 * Responsive layout example
 */
export const ResponsiveLayout: Story = {
  render: () => (
    <Stack spacing="lg" padding="md" bgColor="bg-neutral-50" rounded="lg">
      <h2 className="text-xl font-semibold">Responsive Layout Example</h2>
      <p className="text-neutral-600 mb-4">
        This example demonstrates how Stack can be used to create responsive layouts.
        Resize your browser window to see how the layout changes.
      </p>
      
      <Box 
        className="md:flex-row" 
        display="flex flex-col" 
        bgColor="bg-white" 
        rounded="lg" 
        shadow="md" 
        padding="lg"
        border="thin"
        borderColor="border-neutral-200"
      >
        <Stack spacing="md" width="w-full md:w-1/3" padding="md">
          <h3 className="font-medium text-lg">Sidebar</h3>
          <Stack spacing="sm">
            <BoxItem padding="sm">Navigation Item 1</BoxItem>
            <BoxItem padding="sm">Navigation Item 2</BoxItem>
            <BoxItem padding="sm">Navigation Item 3</BoxItem>
            <BoxItem padding="sm">Navigation Item 4</BoxItem>
          </Stack>
        </Stack>
        
        <Box 
          width="w-full md:w-2/3" 
          padding="md" 
          className="md:ml-6 mt-6 md:mt-0"
        >
          <h3 className="font-medium text-lg mb-4">Main Content</h3>
          <Stack spacing="md">
            <BoxItem>
              <h4 className="font-medium mb-2">Section 1</h4>
              <p className="text-sm text-neutral-600">
                This is an example of how Stack components can be used to create
                responsive layouts that adapt to different screen sizes.
              </p>
            </BoxItem>
            
            <Stack direction="row" spacing="md" className="flex-col md:flex-row">
              <BoxItem width="w-full md:w-1/2">
                <h4 className="font-medium mb-2">Section 2</h4>
                <p className="text-sm text-neutral-600">
                  On smaller screens, these boxes stack vertically.
                </p>
              </BoxItem>
              
              <BoxItem width="w-full md:w-1/2">
                <h4 className="font-medium mb-2">Section 3</h4>
                <p className="text-sm text-neutral-600">
                  On larger screens, they appear side by side.
                </p>
              </BoxItem>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Stack>
  ),
};
