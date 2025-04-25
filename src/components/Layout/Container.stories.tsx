import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './Container';
import { Box } from './Box';

/**
 * Container Component
 * 
 * A layout component that centers content horizontally with responsive width constraints.
 */
const meta: Meta<typeof Container> = {
  title: 'Components/Layout/Container',
  component: Container,
  parameters: {
    docs: {
      description: {
        component: 'A layout component that centers content horizontally with responsive width constraints.',
      },
    },
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'],
      description: 'The maximum width constraint',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'lg' },
      },
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Horizontal padding',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    centerContent: {
      control: 'boolean',
      description: 'Whether to center the content horizontally and vertically',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
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
  },
};

export default meta;
type Story = StoryObj<typeof Container>;

/**
 * Default Container example
 */
export const Default: Story = {
  args: {
    children: (
      <Box
        padding="lg"
        bgColor="bg-white"
        rounded="md"
        shadow="sm"
        border="thin"
        borderColor="border-neutral-200"
      >
        <h2 className="text-xl font-semibold mb-4">Container Example</h2>
        <p className="text-neutral-600">
          This content is wrapped in a container with default settings (size: lg, padding: md).
          The container centers content horizontally with a maximum width constraint.
        </p>
      </Box>
    ),
  },
};

/**
 * Different sizes
 */
export const Sizes: Story = {
  render: () => (
    <Box className="space-y-12">
      <Box>
        <h3 className="text-lg font-medium mb-2 px-4">Extra Small (xs)</h3>
        <Container size="xs" bgColor="bg-neutral-50" padding="sm">
          <Box
            padding="md"
            bgColor="bg-white"
            rounded="md"
            shadow="sm"
            border="thin"
            borderColor="border-neutral-200"
          >
            <p className="text-neutral-600">
              Extra small container with maximum width of 320px.
            </p>
          </Box>
        </Container>
      </Box>
      
      <Box>
        <h3 className="text-lg font-medium mb-2 px-4">Small (sm)</h3>
        <Container size="sm" bgColor="bg-neutral-50" padding="sm">
          <Box
            padding="md"
            bgColor="bg-white"
            rounded="md"
            shadow="sm"
            border="thin"
            borderColor="border-neutral-200"
          >
            <p className="text-neutral-600">
              Small container with maximum width of 640px.
            </p>
          </Box>
        </Container>
      </Box>
      
      <Box>
        <h3 className="text-lg font-medium mb-2 px-4">Medium (md)</h3>
        <Container size="md" bgColor="bg-neutral-50" padding="sm">
          <Box
            padding="md"
            bgColor="bg-white"
            rounded="md"
            shadow="sm"
            border="thin"
            borderColor="border-neutral-200"
          >
            <p className="text-neutral-600">
              Medium container with maximum width of 768px.
            </p>
          </Box>
        </Container>
      </Box>
      
      <Box>
        <h3 className="text-lg font-medium mb-2 px-4">Large (lg - default)</h3>
        <Container size="lg" bgColor="bg-neutral-50" padding="sm">
          <Box
            padding="md"
            bgColor="bg-white"
            rounded="md"
            shadow="sm"
            border="thin"
            borderColor="border-neutral-200"
          >
            <p className="text-neutral-600">
              Large container with maximum width of 1024px.
            </p>
          </Box>
        </Container>
      </Box>
      
      <Box>
        <h3 className="text-lg font-medium mb-2 px-4">Extra Large (xl)</h3>
        <Container size="xl" bgColor="bg-neutral-50" padding="sm">
          <Box
            padding="md"
            bgColor="bg-white"
            rounded="md"
            shadow="sm"
            border="thin"
            borderColor="border-neutral-200"
          >
            <p className="text-neutral-600">
              Extra large container with maximum width of 1280px.
            </p>
          </Box>
        </Container>
      </Box>
      
      <Box>
        <h3 className="text-lg font-medium mb-2 px-4">2XL (2xl)</h3>
        <Container size="2xl" bgColor="bg-neutral-50" padding="sm">
          <Box
            padding="md"
            bgColor="bg-white"
            rounded="md"
            shadow="sm"
            border="thin"
            borderColor="border-neutral-200"
          >
            <p className="text-neutral-600">
              2XL container with maximum width of 1536px.
            </p>
          </Box>
        </Container>
      </Box>
    </Box>
  ),
};

/**
 * Different padding options
 */
export const PaddingOptions: Story = {
  render: () => (
    <Box className="space-y-8">
      <Box>
        <h3 className="text-lg font-medium mb-2 px-4">No Padding</h3>
        <Container size="md" padding="none" bgColor="bg-neutral-50">
          <Box
            padding="md"
            bgColor="bg-white"
            rounded="md"
            shadow="sm"
            border="thin"
            borderColor="border-neutral-200"
          >
            <p className="text-neutral-600">
              Container with no horizontal padding.
            </p>
          </Box>
        </Container>
      </Box>
      
      <Box>
        <h3 className="text-lg font-medium mb-2 px-4">Small Padding (sm)</h3>
        <Container size="md" padding="sm" bgColor="bg-neutral-50">
          <Box
            padding="md"
            bgColor="bg-white"
            rounded="md"
            shadow="sm"
            border="thin"
            borderColor="border-neutral-200"
          >
            <p className="text-neutral-600">
              Container with small horizontal padding (1rem).
            </p>
          </Box>
        </Container>
      </Box>
      
      <Box>
        <h3 className="text-lg font-medium mb-2 px-4">Medium Padding (md - default)</h3>
        <Container size="md" padding="md" bgColor="bg-neutral-50">
          <Box
            padding="md"
            bgColor="bg-white"
            rounded="md"
            shadow="sm"
            border="thin"
            borderColor="border-neutral-200"
          >
            <p className="text-neutral-600">
              Container with medium horizontal padding (1.5rem).
            </p>
          </Box>
        </Container>
      </Box>
      
      <Box>
        <h3 className="text-lg font-medium mb-2 px-4">Large Padding (lg)</h3>
        <Container size="md" padding="lg" bgColor="bg-neutral-50">
          <Box
            padding="md"
            bgColor="bg-white"
            rounded="md"
            shadow="sm"
            border="thin"
            borderColor="border-neutral-200"
          >
            <p className="text-neutral-600">
              Container with large horizontal padding (2rem).
            </p>
          </Box>
        </Container>
      </Box>
      
      <Box>
        <h3 className="text-lg font-medium mb-2 px-4">Extra Large Padding (xl)</h3>
        <Container size="md" padding="xl" bgColor="bg-neutral-50">
          <Box
            padding="md"
            bgColor="bg-white"
            rounded="md"
            shadow="sm"
            border="thin"
            borderColor="border-neutral-200"
          >
            <p className="text-neutral-600">
              Container with extra large horizontal padding (3rem).
            </p>
          </Box>
        </Container>
      </Box>
    </Box>
  ),
};

/**
 * Centered content
 */
export const CenteredContent: Story = {
  args: {
    size: 'md',
    centerContent: true,
    bgColor: 'bg-neutral-50',
    height: 'h-96',
    children: (
      <Box
        padding="lg"
        bgColor="bg-white"
        rounded="md"
        shadow="md"
        border="thin"
        borderColor="border-neutral-200"
        width="w-64"
        height="h-64"
        display="flex"
        className="items-center justify-center"
      >
        <p className="text-center text-neutral-600">
          This content is centered both horizontally and vertically.
        </p>
      </Box>
    ),
  },
};

/**
 * Page layout example
 */
export const PageLayoutExample: Story = {
  render: () => (
    <Box className="min-h-screen bg-neutral-100">
      {/* Header */}
      <Box
        bgColor="bg-primary-600"
        textColor="text-white"
        padding="md"
      >
        <Container>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">ECL Demo</h1>
            <nav>
              <ul className="flex space-x-6">
                <li>Home</li>
                <li>Features</li>
                <li>Docs</li>
                <li>About</li>
              </ul>
            </nav>
          </div>
        </Container>
      </Box>
      
      {/* Hero section */}
      <Box
        bgColor="bg-primary-700"
        textColor="text-white"
        padding="xl"
      >
        <Container centerContent className="py-16">
          <h2 className="text-3xl font-bold mb-4 text-center">Enterprise Component Library</h2>
          <p className="text-xl text-primary-100 max-w-2xl text-center mb-8">
            A comprehensive library of React components for building enterprise applications.
          </p>
          <Box
            as="button"
            padding="md"
            rounded="md"
            bgColor="bg-white"
            textColor="text-primary-700"
            className="font-medium hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-700"
          >
            Get Started
          </Box>
        </Container>
      </Box>
      
      {/* Main content */}
      <Container padding="md" className="py-12">
        <Box className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Box
            padding="lg"
            bgColor="bg-white"
            rounded="lg"
            shadow="md"
            border="thin"
            borderColor="border-neutral-200"
          >
            <h3 className="text-xl font-semibold mb-4">Flexible Layout</h3>
            <p className="text-neutral-600">
              The Container component provides flexible layout options with different size constraints and padding settings.
            </p>
          </Box>
          
          <Box
            padding="lg"
            bgColor="bg-white"
            rounded="lg"
            shadow="md"
            border="thin"
            borderColor="border-neutral-200"
          >
            <h3 className="text-xl font-semibold mb-4">Responsive Design</h3>
            <p className="text-neutral-600">
              Containers automatically adjust to different screen sizes, ensuring a consistent experience across devices.
            </p>
          </Box>
          
          <Box
            padding="lg"
            bgColor="bg-white"
            rounded="lg"
            shadow="md"
            border="thin"
            borderColor="border-neutral-200"
          >
            <h3 className="text-xl font-semibold mb-4">Customizable</h3>
            <p className="text-neutral-600">
              Easily customize the appearance with different sizes, padding, and styling options.
            </p>
          </Box>
        </Box>
      </Container>
      
      {/* Footer */}
      <Box
        bgColor="bg-neutral-800"
        textColor="text-white"
        padding="md"
        className="py-8"
      >
        <Container>
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Enterprise Component Library</h3>
              <p className="text-neutral-400">Building better interfaces, faster.</p>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-neutral-400">© 2025 ECL. All rights reserved.</p>
            </div>
          </div>
        </Container>
      </Box>
    </Box>
  ),
};
