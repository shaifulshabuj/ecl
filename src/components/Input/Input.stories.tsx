import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

/**
 * Input Component
 * 
 * A flexible input component that supports icons, labels, error states, different sizes, input masking, validation, and password toggling.
 */
const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible input component with support for icons, labels, error states, different sizes, input masking, validation, and password toggling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error', 'success'],
      description: 'The visual style of the input',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the input',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'date', 'time', 'datetime-local', 'month', 'week', 'color'],
      description: 'The type of the input',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'text' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    leftIcon: {
      control: { type: null },
      description: 'Icon to display on the left side of the input',
    },
    rightIcon: {
      control: { type: null },
      description: 'Icon to display on the right side of the input',
    },
    error: {
      control: 'text',
      description: 'Error message to display below the input',
    },
    helperText: {
      control: 'text',
      description: 'Helper text to display below the input',
    },
    label: {
      control: 'text',
      description: 'Label text for the input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
    mask: {
      control: 'text',
      description: 'Input mask pattern (e.g., "999-999-9999" for phone numbers)',
    },
    showPasswordToggle: {
      control: 'boolean',
      description: 'Whether to show the password toggle button for password inputs',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    validateOnBlur: {
      control: 'boolean',
      description: 'Whether to validate on blur instead of on change',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    validator: {
      control: { type: null },
      description: 'Validation function to validate the input value',
    },
    onChange: { action: 'changed' },
    onFocus: { action: 'focused' },
    onBlur: { action: 'blurred' },
    onValidationChange: { action: 'validation changed' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

/**
 * Default input example
 */
export const Default: Story = {
  args: {
    placeholder: 'Enter text here',
  },
};

/**
 * Input with label
 */
export const WithLabel: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
  },
};

/**
 * Required input with label
 */
export const Required: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email',
    required: true,
  },
};

/**
 * Input with helper text
 */
export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    helperText: 'Password must be at least 8 characters',
  },
};

/**
 * Input with error
 */
export const WithError: Story = {
  args: {
    label: 'Username',
    value: 'invalid_name!',
    error: 'Username can only contain letters and numbers',
  },
};

/**
 * Input sizes
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col space-y-4 w-80">
      <Input size="sm" placeholder="Small input" />
      <Input size="md" placeholder="Medium input" />
      <Input size="lg" placeholder="Large input" />
    </div>
  ),
};

/**
 * Input variants
 */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col space-y-4 w-80">
      <Input variant="default" label="Default Input" placeholder="Default variant" />
      <Input variant="success" label="Success Input" placeholder="Success variant" helperText="Input is valid" />
      <Input variant="error" label="Error Input" placeholder="Error variant" error="Please check this field" />
    </div>
  ),
};

/**
 * Disabled input
 */
export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'This input is disabled',
    disabled: true,
  },
};

/**
 * Input with icons
 */
export const WithIcons: Story = {
  render: () => {
    const SearchIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    );

    const EmailIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    );

    const LockIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    );

    const EyeIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );

    const CalendarIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
      </svg>
    );

    const PhoneIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    );

    return (
      <div className="flex flex-col space-y-4 w-80">
        <Input
          leftIcon={<SearchIcon />}
          placeholder="Search..."
          type="search"
        />
        
        <Input
          leftIcon={<EmailIcon />}
          placeholder="Email address"
          type="email"
        />
        
        <Input
          leftIcon={<LockIcon />}
          placeholder="Password"
          type="password"
          showPasswordToggle
        />
        
        <Input
          rightIcon={<CalendarIcon />}
          placeholder="Select date"
          type="date"
        />

        <Input
          leftIcon={<PhoneIcon />}
          placeholder="(___) ___-____"
          mask="(999) 999-9999"
          type="tel"
        />
      </div>
    );
  }
};

/**
 * Input types
 */
export const InputTypes: Story = {
  render: () => (
    <div className="flex flex-col space-y-4 w-80">
      <Input type="text" label="Text" placeholder="Text input" />
      <Input type="email" label="Email" placeholder="Email input" />
      <Input type="password" label="Password" placeholder="Password input" />
      <Input type="number" label="Number" placeholder="Number input" />
      <Input type="tel" label="Telephone" placeholder="Tel input" />
      <Input type="url" label="URL" placeholder="URL input" />
      <Input type="search" label="Search" placeholder="Search input" />
      <Input type="date" label="Date" />
      <Input type="time" label="Time" />
      <Input type="datetime-local" label="Date & Time" />
      <Input type="month" label="Month" />
      <Input type="week" label="Week" />
      <Input type="color" label="Color" />
    </div>
  )
};

/**
 * Form example with multiple inputs
 */
export const FormExample: Story = {
  render: () => (
    <div className="w-full max-w-md p-6 border rounded-lg shadow-sm space-y-6">
      <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
      
      <div className="space-y-4">
        <Input
          label="Full Name"
          placeholder="John Doe"
          required
          validator={(value) => value.length < 2 ? 'Name must be at least 2 characters' : undefined}
        />
        
        <Input
          label="Email Address"
          type="email"
          placeholder="john.doe@example.com"
          required
          helperText="We'll never share your email with anyone else."
          validator={(value) => (/^\S+@\S+\.\S+$/.test(value) ? undefined : 'Please enter a valid email address')}
          validateOnBlur
        />
        
        <Input
          label="Phone Number"
          type="tel"
          placeholder="(___) ___-____"
          mask="(999) 999-9999"
          helperText="U.S. phone number format"
        />
        
        <Input
          label="Password"
          type="password"
          required
          helperText="Password must be at least 8 characters long."
          showPasswordToggle
          validator={(value) => value.length < 8 ? 'Password must be at least 8 characters' : undefined}
        />
        
        <div className="pt-4">
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
            Submit
          </button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded'
  }
};
