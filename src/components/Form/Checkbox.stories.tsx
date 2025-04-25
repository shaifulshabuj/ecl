import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

/**
 * Checkbox Component
 * 
 * An accessible checkbox component with support for labels, error states, different sizes, and indeterminate state.
 */
const meta: Meta<typeof Checkbox> = {
  title: 'Components/Form/Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component: 'An accessible checkbox component with support for labels, error states, different sizes, and indeterminate state.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the checkbox',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    helperText: {
      control: 'text',
      description: 'Helper text to display',
    },
    inline: {
      control: 'boolean',
      description: 'Whether to display the checkbox and label inline',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the checkbox',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'error'],
      description: 'The visual style of the checkbox',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    indeterminate: {
      control: 'boolean',
      description: 'Whether the checkbox is in an indeterminate state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked (controlled)',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Whether the checkbox is initially checked (uncontrolled)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

/**
 * Default Checkbox example
 */
export const Default: Story = {
  args: {
    label: 'Remember me',
  },
};

/**
 * Checked Checkbox
 */
export const Checked: Story = {
  args: {
    label: 'Agree to terms',
    defaultChecked: true,
  },
};

/**
 * With helper text
 */
export const WithHelperText: Story = {
  args: {
    label: 'Subscribe to newsletter',
    helperText: 'You can unsubscribe at any time',
  },
};

/**
 * With error message
 */
export const WithError: Story = {
  args: {
    label: 'Accept terms and conditions',
    error: 'You must accept the terms to continue',
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    disabled: true,
  },
};

/**
 * Indeterminate state
 */
export const Indeterminate: Story = {
  args: {
    label: 'Select all items',
    indeterminate: true,
  },
};

/**
 * Different sizes
 */
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Checkbox label="Small checkbox" size="sm" />
      <Checkbox label="Medium checkbox (default)" size="md" />
      <Checkbox label="Large checkbox" size="lg" />
    </div>
  ),
};

/**
 * Controlled Checkbox
 */
export const Controlled: Story = {
  render: function ControlledCheckbox() {
    const [checked, setChecked] = useState(false);
    
    return (
      <div className="space-y-4">
        <Checkbox 
          label={`Controlled checkbox (${checked ? 'checked' : 'unchecked'})`}
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        
        <button
          className="px-3 py-1 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          onClick={() => setChecked(!checked)}
        >
          Toggle checkbox
        </button>
      </div>
    );
  }
};

/**
 * Checkbox Group
 */
export const CheckboxGroup: Story = {
  render: function CheckboxGroupExample() {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const options = ['React', 'Vue', 'Angular', 'Svelte'];
    
    const handleChange = (option: string) => {
      setSelectedOptions(prev => 
        prev.includes(option)
          ? prev.filter(item => item !== option)
          : [...prev, option]
      );
    };
    
    const allSelected = selectedOptions.length === options.length;
    const someSelected = selectedOptions.length > 0 && selectedOptions.length < options.length;
    
    return (
      <div className="space-y-3 p-4 border rounded-md">
        <h3 className="font-medium">Select your favorite frameworks:</h3>
        
        <Checkbox
          label="Select All"
          checked={allSelected}
          indeterminate={someSelected}
          onChange={() => {
            if (allSelected || someSelected) {
              setSelectedOptions([]);
            } else {
              setSelectedOptions([...options]);
            }
          }}
        />
        
        <div className="ml-6 space-y-2 pt-2 border-t">
          {options.map(option => (
            <Checkbox
              key={option}
              label={option}
              checked={selectedOptions.includes(option)}
              onChange={() => handleChange(option)}
            />
          ))}
        </div>
        
        {selectedOptions.length > 0 && (
          <p className="text-sm text-neutral-600 pt-2">
            Selected: {selectedOptions.join(', ')}
          </p>
        )}
      </div>
    );
  }
};
