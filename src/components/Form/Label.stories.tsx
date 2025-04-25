import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';

/**
 * Label Component
 * 
 * An accessible label component for form controls with support for required indicators and different sizes.
 */
const meta: Meta<typeof Label> = {
  title: 'Components/Form/Label',
  component: Label,
  parameters: {
    docs: {
      description: {
        component: 'An accessible label component for form controls with support for required indicators and different sizes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    required: {
      control: 'boolean',
      description: 'Whether the associated field is required',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    showRequiredIndicator: {
      control: 'boolean',
      description: 'Whether to show the required indicator (asterisk)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the label',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    srOnly: {
      control: 'boolean',
      description: 'Whether the label should be visually hidden but still accessible to screen readers',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    htmlFor: {
      control: 'text',
      description: 'The ID of the form control this label is associated with',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

/**
 * Default Label example
 */
export const Default: Story = {
  args: {
    children: 'Full Name',
    htmlFor: 'name',
  },
};

/**
 * Required field
 */
export const Required: Story = {
  args: {
    children: 'Email Address',
    htmlFor: 'email',
    required: true,
  },
};

/**
 * Without required indicator
 */
export const WithoutRequiredIndicator: Story = {
  args: {
    children: 'Password',
    htmlFor: 'password',
    required: true,
    showRequiredIndicator: false,
  },
};

/**
 * Different sizes
 */
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="small" size="sm">Small Label</Label>
        <input
          id="small"
          type="text"
          className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md"
        />
      </div>
      
      <div>
        <Label htmlFor="medium" size="md">Medium Label (Default)</Label>
        <input
          id="medium"
          type="text"
          className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md"
        />
      </div>
      
      <div>
        <Label htmlFor="large" size="lg">Large Label</Label>
        <input
          id="large"
          type="text"
          className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md"
        />
      </div>
    </div>
  ),
};

/**
 * Screen reader only (visually hidden)
 */
export const ScreenReaderOnly: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="visible">Visible Label</Label>
        <input
          id="visible"
          type="text"
          className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md"
        />
      </div>
      
      <div>
        <Label htmlFor="sr-only" srOnly>Screen Reader Only Label (not visible)</Label>
        <input
          id="sr-only"
          type="text"
          placeholder="This input has a label only visible to screen readers"
          className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md"
        />
      </div>
    </div>
  ),
};
