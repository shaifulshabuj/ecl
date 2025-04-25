import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';
import { Box } from './Box';

/**
 * Divider Component
 * 
 * A component for visually separating content with horizontal or vertical lines.
 */
const meta: Meta<typeof Divider> = {
  title: 'Components/Layout/Divider',
  component: Divider,
  parameters: {
    docs: {
      description: {
        component: 'A component for visually separating content with horizontal or vertical lines.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the divider',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'horizontal' },
      },
    },
    thickness: {
      control: 'select',
      options: ['thin', 'medium', 'thick'],
      description: 'The thickness of the divider',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'thin' },
      },
    },
    variant: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted'],
      description: 'The style of the divider',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'solid' },
      },
    },
    label: {
      control: 'text',
      description: 'Label to display in the middle of the divider',
    },
    color: {
      control: 'text',
      description: 'Border color class (Tailwind class)',
    },
    spacing: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Vertical spacing for horizontal dividers',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    horizontalSpacing: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Horizontal spacing for vertical dividers',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    labelGutter: {
      control: 'boolean',
      description: 'Whether to add a gutter (space) around the label',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

/**
 * Default Divider example
 */
export const Default: Story = {
  args: {},
  decorators: [
    (Story) => (
      <Box padding="lg" bgColor="bg-white" rounded="md" shadow="sm">
        <p className="mb-4">Content above the divider</p>
        <Story />
        <p className="mt-4">Content below the divider</p>
      </Box>
    ),
  ],
};

/**
 * Different thicknesses
 */
export const Thicknesses: Story = {
  render: () => (
    <Box padding="lg" bgColor="bg-white" rounded="md" shadow="sm" className="space-y-8">
      <div>
        <p className="mb-2 font-medium">Thin (default)</p>
        <Divider thickness="thin" />
      </div>
      
      <div>
        <p className="mb-2 font-medium">Medium</p>
        <Divider thickness="medium" />
      </div>
      
      <div>
        <p className="mb-2 font-medium">Thick</p>
        <Divider thickness="thick" />
      </div>
    </Box>
  ),
};

/**
 * Different variants
 */
export const Variants: Story = {
  render: () => (
    <Box padding="lg" bgColor="bg-white" rounded="md" shadow="sm" className="space-y-8">
      <div>
        <p className="mb-2 font-medium">Solid (default)</p>
        <Divider variant="solid" />
      </div>
      
      <div>
        <p className="mb-2 font-medium">Dashed</p>
        <Divider variant="dashed" />
      </div>
      
      <div>
        <p className="mb-2 font-medium">Dotted</p>
        <Divider variant="dotted" />
      </div>
    </Box>
  ),
};

/**
 * With different colors
 */
export const Colors: Story = {
  render: () => (
    <Box padding="lg" bgColor="bg-white" rounded="md" shadow="sm" className="space-y-8">
      <div>
        <p className="mb-2 font-medium">Default (Neutral)</p>
        <Divider />
      </div>
      
      <div>
        <p className="mb-2 font-medium">Primary</p>
        <Divider color="border-primary-500" />
      </div>
      
      <div>
        <p className="mb-2 font-medium">Success</p>
        <Divider color="border-success-500" />
      </div>
      
      <div>
        <p className="mb-2 font-medium">Error</p>
        <Divider color="border-error-500" />
      </div>
    </Box>
  ),
};

/**
 * With label
 */
export const WithLabel: Story = {
  args: {
    label: 'OR',
  },
  decorators: [
    (Story) => (
      <Box padding="lg" bgColor="bg-white" rounded="md" shadow="sm">
        <p className="mb-4">Content above the divider</p>
        <Story />
        <p className="mt-4">Content below the divider</p>
      </Box>
    ),
  ],
};

/**
 * Different label styles
 */
export const LabelStyles: Story = {
  render: () => (
    <Box padding="lg" bgColor="bg-white" rounded="md" shadow="sm" className="space-y-8">
      <div>
        <p className="mb-2 font-medium">Default Label</p>
        <Divider label="OR" />
      </div>
      
      <div>
        <p className="mb-2 font-medium">Colored Label and Divider</p>
        <Divider 
          label="OR" 
          color="border-primary-500" 
          labelClassName="text-primary-500 font-semibold"
        />
      </div>
      
      <div>
        <p className="mb-2 font-medium">Label with No Gutter</p>
        <Divider label="OR" labelGutter={false} />
      </div>
      
      <div>
        <p className="mb-2 font-medium">Styled Label</p>
        <Divider 
          label="SECTION BREAK" 
          thickness="medium" 
          color="border-neutral-400" 
          labelClassName="bg-neutral-100 px-4 py-1 rounded-full text-xs uppercase tracking-wider"
        />
      </div>
    </Box>
  ),
};

/**
 * Vertical divider
 */
export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  decorators: [
    (Story) => (
      <Box 
        padding="lg" 
        bgColor="bg-white" 
        rounded="md" 
        shadow="sm" 
        display="flex" 
        height="h-32"
      >
        <div className="flex-1 flex items-center justify-center">
          Left content
        </div>
        <Story />
        <div className="flex-1 flex items-center justify-center">
          Right content
        </div>
      </Box>
    ),
  ],
};

/**
 * Vertical with label
 */
export const VerticalWithLabel: Story = {
  args: {
    orientation: 'vertical',
    label: 'OR',
  },
  decorators: [
    (Story) => (
      <Box 
        padding="lg" 
        bgColor="bg-white" 
        rounded="md" 
        shadow="sm" 
        display="flex" 
        height="h-40"
      >
        <div className="flex-1 flex items-center justify-center">
          Left content
        </div>
        <Story />
        <div className="flex-1 flex items-center justify-center">
          Right content
        </div>
      </Box>
    ),
  ],
};

/**
 * Different spacing options
 */
export const SpacingOptions: Story = {
  render: () => (
    <Box padding="lg" bgColor="bg-white" rounded="md" shadow="sm" className="space-y-8">
      <div>
        <p className="mb-2 font-medium">No Spacing</p>
        <Divider spacing="none" />
      </div>
      
      <div>
        <p className="mb-2 font-medium">Extra Small Spacing (xs)</p>
        <Divider spacing="xs" />
      </div>
      
      <div>
        <p className="mb-2 font-medium">Small Spacing (sm)</p>
        <Divider spacing="sm" />
      </div>
      
      <div>
        <p className="mb-2 font-medium">Medium Spacing (md - default)</p>
        <Divider spacing="md" />
      </div>
      
      <div>
        <p className="mb-2 font-medium">Large Spacing (lg)</p>
        <Divider spacing="lg" />
      </div>
      
      <div>
        <p className="mb-2 font-medium">Extra Large Spacing (xl)</p>
        <Divider spacing="xl" />
      </div>
    </Box>
  ),
};

/**
 * Usage examples
 */
export const UsageExamples: Story = {
  render: () => (
    <Box padding="lg" bgColor="bg-white" rounded="md" shadow="sm" className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Form Sections</h3>
        <Box padding="md" bgColor="bg-neutral-50" rounded="md">
          <h4 className="font-medium mb-2">Personal Information</h4>
          <div className="space-y-2 mb-4">
            <div className="h-10 bg-white rounded border border-neutral-200 px-3 flex items-center">
              Full Name
            </div>
            <div className="h-10 bg-white rounded border border-neutral-200 px-3 flex items-center">
              Email Address
            </div>
          </div>
          
          <Divider label="Contact Details" spacing="sm" />
          
          <div className="space-y-2 mt-4">
            <div className="h-10 bg-white rounded border border-neutral-200 px-3 flex items-center">
              Phone Number
            </div>
            <div className="h-10 bg-white rounded border border-neutral-200 px-3 flex items-center">
              Address
            </div>
          </div>
        </Box>
      </div>
      
      <Divider thickness="medium" color="border-neutral-300" />
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Content Separation</h3>
        <Box>
          <p className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. 
            Vivamus hendrerit arcu sed erat molestie vehicula.
          </p>
          
          <Divider variant="dashed" color="border-neutral-300" />
          
          <p className="mt-4">
            Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. 
            Phasellus molestie magna non est bibendum non venenatis nisl tempor.
          </p>
        </Box>
      </div>
      
      <Divider thickness="medium" color="border-neutral-300" />
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Side-by-Side Comparison</h3>
        <Box 
          display="flex" 
          height="h-40" 
          bgColor="bg-neutral-50" 
          rounded="md"
        >
          <div className="flex-1 p-4">
            <h4 className="font-medium mb-2">Basic Plan</h4>
            <ul className="text-sm space-y-2">
              <li>✓ Feature One</li>
              <li>✓ Feature Two</li>
              <li>✗ Feature Three</li>
            </ul>
          </div>
          
          <Divider 
            orientation="vertical" 
            thickness="medium" 
            color="border-primary-200"
          />
          
          <div className="flex-1 p-4 bg-primary-50">
            <h4 className="font-medium mb-2">Premium Plan</h4>
            <ul className="text-sm space-y-2">
              <li>✓ Feature One</li>
              <li>✓ Feature Two</li>
              <li>✓ Feature Three</li>
            </ul>
          </div>
        </Box>
      </div>
    </Box>
  ),
};
