import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box } from './Box';

/**
 * Box Component
 * 
 * A versatile layout primitive that serves as the foundation for building other components and layouts.
 */
const meta: Meta<typeof Box> = {
  title: 'Components/Layout/Box',
  component: Box,
  parameters: {
    docs: {
      description: {
        component: 'A versatile layout primitive that serves as the foundation for building other components and layouts.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'text',
      description: 'The HTML element to render',
      table: {
        type: { summary: 'React.ElementType' },
        defaultValue: { summary: 'div' },
      },
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
      description: 'Border radius size',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'none' },
      },
    },
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Shadow size',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'none' },
      },
    },
    border: {
      control: 'select',
      options: ['none', 'thin', 'medium', 'thick'],
      description: 'Border width',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'none' },
      },
    },
    padding: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Padding size',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'none' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the box should take up the full width of its container',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    fullHeight: {
      control: 'boolean',
      description: 'Whether the box should take up the full height of its container',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    borderColor: {
      control: 'text',
      description: 'Border color class (Tailwind class)',
    },
    bgColor: {
      control: 'text',
      description: 'Background color class (Tailwind class)',
    },
    textColor: {
      control: 'text',
      description: 'Text color class (Tailwind class)',
    },
    width: {
      control: 'text',
      description: 'Width class (Tailwind class)',
    },
    height: {
      control: 'text',
      description: 'Height class (Tailwind class)',
    },
    margin: {
      control: 'text',
      description: 'Margin class (Tailwind class)',
    },
    position: {
      control: 'text',
      description: 'Position class (Tailwind class)',
    },
    display: {
      control: 'text',
      description: 'Display class (Tailwind class)',
    },
    overflow: {
      control: 'text',
      description: 'Overflow class (Tailwind class)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Box>;

/**
 * Default Box example
 */
export const Default: Story = {
  args: {
    children: 'This is a basic Box component',
    padding: 'md',
  },
};

/**
 * With rounded corners and shadow
 */
export const RoundedWithShadow: Story = {
  args: {
    children: 'Box with rounded corners and shadow',
    rounded: 'lg',
    shadow: 'md',
    padding: 'md',
    border: 'thin',
    borderColor: 'border-neutral-200',
  },
};

/**
 * With background color
 */
export const WithBackgroundColor: Story = {
  args: {
    children: 'Box with background color',
    bgColor: 'bg-primary-100',
    padding: 'md',
    rounded: 'md',
  },
};

/**
 * As another element
 */
export const AsAnotherElement: Story = {
  args: {
    as: 'section',
    children: 'This Box is rendered as a section element',
    padding: 'lg',
    bgColor: 'bg-neutral-100',
    rounded: 'md',
  },
};

/**
 * Full width
 */
export const FullWidth: Story = {
  args: {
    children: 'This Box takes up the full width of its container',
    fullWidth: true,
    padding: 'md',
    bgColor: 'bg-primary-50',
    textColor: 'text-primary-700',
    border: 'thin',
    borderColor: 'border-primary-200',
    rounded: 'md',
  },
};

/**
 * With custom dimensions
 */
export const CustomDimensions: Story = {
  args: {
    children: 'Box with custom width and height',
    width: 'w-64',
    height: 'h-32',
    padding: 'md',
    bgColor: 'bg-success-100',
    display: 'flex items-center justify-center',
    rounded: 'lg',
  },
};

/**
 * Card-like Box
 */
export const CardLike: Story = {
  render: () => (
    <Box
      rounded="lg"
      shadow="md"
      border="thin"
      borderColor="border-neutral-200"
      padding="lg"
      bgColor="bg-white"
      width="w-80"
    >
      <h3 className="text-lg font-semibold mb-2">Card Title</h3>
      <p className="text-neutral-600 mb-4">
        This is a card-like box that can be used for content that needs to stand out from the rest of the page.
      </p>
      <Box
        as="button"
        padding="sm"
        rounded="md"
        bgColor="bg-primary-600"
        textColor="text-white"
        className="hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        Learn More
      </Box>
    </Box>
  ),
};

/**
 * Nested Boxes
 */
export const NestedBoxes: Story = {
  render: () => (
    <Box
      padding="lg"
      bgColor="bg-neutral-100"
      rounded="lg"
      width="w-96"
    >
      <h3 className="text-lg font-semibold mb-4">Nested Boxes</h3>
      
      <Box
        padding="md"
        bgColor="bg-white"
        rounded="md"
        shadow="sm"
        border="thin"
        borderColor="border-neutral-200"
        margin="mb-4"
      >
        <h4 className="font-medium mb-2">First Child Box</h4>
        <p className="text-sm text-neutral-600">
          This is a nested box with its own styling.
        </p>
      </Box>
      
      <Box
        padding="md"
        bgColor="bg-primary-50"
        rounded="md"
        shadow="sm"
        border="thin"
        borderColor="border-primary-200"
      >
        <h4 className="font-medium text-primary-700 mb-2">Second Child Box</h4>
        <p className="text-sm text-primary-600">
          Another nested box with different styling.
        </p>
      </Box>
    </Box>
  ),
};

/**
 * Layout example
 */
export const LayoutExample: Story = {
  render: () => (
    <Box
      padding="md"
      bgColor="bg-neutral-50"
      rounded="lg"
      width="w-full max-w-4xl"
      border="thin"
      borderColor="border-neutral-200"
    >
      <Box
        as="header"
        padding="md"
        bgColor="bg-white"
        rounded="md"
        shadow="sm"
        margin="mb-4"
        display="flex items-center justify-between"
      >
        <h2 className="text-xl font-bold">Dashboard</h2>
        <Box
          as="button"
          padding="xs"
          rounded="md"
          bgColor="bg-primary-600"
          textColor="text-white"
          className="px-3 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          New Item
        </Box>
      </Box>
      
      <Box
        display="flex"
        className="gap-4"
      >
        <Box
          width="w-1/3"
          padding="md"
          bgColor="bg-white"
          rounded="md"
          shadow="sm"
          border="thin"
          borderColor="border-neutral-200"
        >
          <h3 className="font-medium mb-2">Sidebar</h3>
          <ul className="space-y-2 text-sm">
            <li className="text-primary-600 font-medium">Dashboard</li>
            <li>Analytics</li>
            <li>Reports</li>
            <li>Settings</li>
          </ul>
        </Box>
        
        <Box
          width="w-2/3"
          padding="md"
          bgColor="bg-white"
          rounded="md"
          shadow="sm"
          border="thin"
          borderColor="border-neutral-200"
        >
          <h3 className="font-medium mb-4">Main Content</h3>
          <p className="text-neutral-600 mb-4">
            This is an example of how Box components can be used to create layouts.
            The Box component is a versatile primitive that can be composed to build
            complex UI structures.
          </p>
          <Box
            padding="sm"
            bgColor="bg-neutral-100"
            rounded="md"
            margin="mb-4"
          >
            <p className="text-sm text-neutral-600">
              Nested content can be easily added with consistent styling.
            </p>
          </Box>
          <Box
            display="flex"
            className="justify-end"
          >
            <Box
              as="button"
              padding="xs"
              rounded="md"
              bgColor="bg-neutral-200"
              textColor="text-neutral-700"
              className="px-3 hover:bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2"
            >
              Cancel
            </Box>
            <Box
              as="button"
              padding="xs"
              rounded="md"
              bgColor="bg-primary-600"
              textColor="text-white"
              className="px-3 ml-2 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Save
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  ),
};
