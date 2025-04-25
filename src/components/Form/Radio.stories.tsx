import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';

/**
 * Radio Component
 * 
 * An accessible radio button component with support for labels, error states, and different sizes.
 */
const meta: Meta<typeof Radio> = {
  title: 'Components/Form/Radio',
  component: Radio,
  parameters: {
    docs: {
      description: {
        component: 'An accessible radio button component with support for labels, error states, and different sizes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the radio button',
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
      description: 'Whether to display the radio button and label inline',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the radio button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'error'],
      description: 'The visual style of the radio button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    checked: {
      control: 'boolean',
      description: 'Whether the radio button is checked (controlled)',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Whether the radio button is initially checked (uncontrolled)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the radio button is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    name: {
      control: 'text',
      description: 'Name attribute for the radio button (used for grouping)',
    },
    value: {
      control: 'text',
      description: 'Value attribute for the radio button',
    },
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

/**
 * Default Radio example
 */
export const Default: Story = {
  args: {
    label: 'Option 1',
    name: 'option',
    value: 'option1',
  },
};

/**
 * Checked Radio
 */
export const Checked: Story = {
  args: {
    label: 'Selected option',
    name: 'selected',
    value: 'selected',
    defaultChecked: true,
  },
};

/**
 * With helper text
 */
export const WithHelperText: Story = {
  args: {
    label: 'Premium plan',
    name: 'plan',
    value: 'premium',
    helperText: 'Includes all premium features',
  },
};

/**
 * With error message
 */
export const WithError: Story = {
  args: {
    label: 'Accept terms',
    name: 'terms',
    value: 'accept',
    error: 'You must select an option to continue',
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    label: 'Disabled option',
    name: 'disabled',
    value: 'disabled',
    disabled: true,
  },
};

/**
 * Different sizes
 */
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Radio label="Small radio" size="sm" name="size" value="small" />
      <Radio label="Medium radio (default)" size="md" name="size" value="medium" />
      <Radio label="Large radio" size="lg" name="size" value="large" />
    </div>
  ),
};

/**
 * Radio Group
 */
export const RadioGroup: Story = {
  render: function RadioGroupExample() {
    const [selected, setSelected] = useState<string>('');
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSelected(e.target.value);
    };
    
    return (
      <div className="space-y-4 p-4 border rounded-md">
        <h3 className="font-medium">Select your preferred contact method:</h3>
        
        <div className="space-y-2">
          <Radio
            label="Email"
            name="contact"
            value="email"
            checked={selected === 'email'}
            onChange={handleChange}
          />
          <Radio
            label="Phone"
            name="contact"
            value="phone"
            checked={selected === 'phone'}
            onChange={handleChange}
          />
          <Radio
            label="Text message"
            name="contact"
            value="text"
            checked={selected === 'text'}
            onChange={handleChange}
          />
          <Radio
            label="Mail"
            name="contact"
            value="mail"
            checked={selected === 'mail'}
            onChange={handleChange}
          />
        </div>
        
        {selected && (
          <p className="text-sm text-neutral-600 pt-2">
            Selected option: {selected}
          </p>
        )}
      </div>
    );
  }
};

/**
 * Horizontal Radio Group
 */
export const HorizontalRadioGroup: Story = {
  render: function HorizontalRadioGroupExample() {
    const [rating, setRating] = useState<string>('');
    
    return (
      <div className="p-4 border rounded-md">
        <h3 className="font-medium mb-3">How would you rate your experience?</h3>
        
        <div className="flex space-x-4">
          <Radio
            inline
            label="Poor"
            name="rating"
            value="1"
            checked={rating === '1'}
            onChange={(e) => setRating(e.target.value)}
          />
          <Radio
            inline
            label="Fair"
            name="rating"
            value="2"
            checked={rating === '2'}
            onChange={(e) => setRating(e.target.value)}
          />
          <Radio
            inline
            label="Good"
            name="rating"
            value="3"
            checked={rating === '3'}
            onChange={(e) => setRating(e.target.value)}
          />
          <Radio
            inline
            label="Excellent"
            name="rating"
            value="4"
            checked={rating === '4'}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        
        {rating && (
          <p className="text-sm text-neutral-600 mt-3">
            You selected: {
              rating === '1' ? 'Poor' :
              rating === '2' ? 'Fair' :
              rating === '3' ? 'Good' :
              'Excellent'
            }
          </p>
        )}
      </div>
    );
  }
};
