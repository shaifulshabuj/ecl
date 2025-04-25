import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FormGroup } from './FormGroup';
import { Input } from '../Input/Input';

/**
 * FormGroup Component
 * 
 * A container component for form elements that provides consistent layout, labels, helper text, and error messages.
 */
const meta: Meta<typeof FormGroup> = {
  title: 'Components/Form/FormGroup',
  component: FormGroup,
  parameters: {
    docs: {
      description: {
        component: 'A container component for form elements that provides consistent layout, labels, helper text, and error messages.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the form group',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    helperText: {
      control: 'text',
      description: 'Helper text to display below the form group',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    inline: {
      control: 'boolean',
      description: 'Whether to display the form group inline (horizontal layout)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    spacing: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The spacing between the label and the input',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormGroup>;

/**
 * Default FormGroup example
 */
export const Default: Story = {
  args: {
    label: 'Full Name',
    children: <Input placeholder="Enter your full name" />,
  },
};

/**
 * Required field
 */
export const Required: Story = {
  args: {
    label: 'Email Address',
    required: true,
    children: <Input type="email" placeholder="Enter your email" />,
  },
};

/**
 * With helper text
 */
export const WithHelperText: Story = {
  args: {
    label: 'Password',
    helperText: 'Password must be at least 8 characters long',
    children: <Input type="password" />,
  },
};

/**
 * With error message
 */
export const WithError: Story = {
  args: {
    label: 'Username',
    error: 'Username is already taken',
    children: <Input value="johndoe" />,
  },
};

/**
 * Inline layout
 */
export const Inline: Story = {
  args: {
    label: 'Email Notifications',
    inline: true,
    children: (
      <div className="flex items-center h-5">
        <input
          type="checkbox"
          className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
        />
      </div>
    ),
  },
};

/**
 * Different spacing options
 */
export const Spacing: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <FormGroup
        label="Small Spacing"
        spacing="sm"
      >
        <Input placeholder="Small spacing between label and input" />
      </FormGroup>
      
      <FormGroup
        label="Medium Spacing (Default)"
        spacing="md"
      >
        <Input placeholder="Medium spacing between label and input" />
      </FormGroup>
      
      <FormGroup
        label="Large Spacing"
        spacing="lg"
      >
        <Input placeholder="Large spacing between label and input" />
      </FormGroup>
    </div>
  ),
};

/**
 * Form layout example
 */
export const FormLayout: Story = {
  render: () => (
    <div className="w-full max-w-md p-6 border rounded-lg shadow-sm space-y-6">
      <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
      
      <FormGroup
        label="Full Name"
        required
      >
        <Input placeholder="John Doe" />
      </FormGroup>
      
      <FormGroup
        label="Email Address"
        required
        helperText="We'll never share your email with anyone else."
      >
        <Input type="email" placeholder="john.doe@example.com" />
      </FormGroup>
      
      <FormGroup
        label="Phone Number"
        helperText="Optional"
      >
        <Input type="tel" placeholder="(___) ___-____" mask="(999) 999-9999" />
      </FormGroup>
      
      <FormGroup
        label="Message"
      >
        <textarea
          className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
          rows={4}
          placeholder="How can we help you?"
        />
      </FormGroup>
      
      <FormGroup inline>
        <div className="flex items-center h-5">
          <input
            id="terms"
            type="checkbox"
            className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
          />
          <label htmlFor="terms" className="ml-2 text-sm text-neutral-700">
            I agree to the terms and conditions
          </label>
        </div>
      </FormGroup>
      
      <div className="pt-4">
        <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
          Submit
        </button>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded'
  }
};
