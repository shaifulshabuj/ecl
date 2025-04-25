import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

/**
 * Select Component
 * 
 * A flexible select component with support for labels, option groups, error states, and different sizes.
 */
const meta: Meta<typeof Select> = {
  title: 'Components/Form/Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component: 'A flexible select component with support for labels, option groups, error states, and different sizes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the select',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    helperText: {
      control: 'text',
      description: 'Helper text to display',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'error', 'success'],
      description: 'The visual style of the select',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the select',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    options: {
      control: 'object',
      description: 'Options for the select',
    },
    onChange: { action: 'changed' },
    onBlur: { action: 'blurred' },
    onValidationChange: { action: 'validation changed' },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

// Sample options for the select
const countryOptions = [
  { value: '', label: 'Select a country' },
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'mx', label: 'Mexico' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'fr', label: 'France' },
  { value: 'de', label: 'Germany' },
  { value: 'jp', label: 'Japan' },
  { value: 'au', label: 'Australia' },
];

// Sample option groups for the select
const carOptions = [
  { value: '', label: 'Select a car' },
  {
    label: 'Japanese Cars',
    options: [
      { value: 'honda', label: 'Honda' },
      { value: 'toyota', label: 'Toyota' },
      { value: 'nissan', label: 'Nissan' },
      { value: 'mazda', label: 'Mazda' },
    ]
  },
  {
    label: 'German Cars',
    options: [
      { value: 'bmw', label: 'BMW' },
      { value: 'mercedes', label: 'Mercedes-Benz' },
      { value: 'audi', label: 'Audi' },
      { value: 'volkswagen', label: 'Volkswagen' },
    ]
  },
  {
    label: 'American Cars',
    options: [
      { value: 'ford', label: 'Ford' },
      { value: 'chevrolet', label: 'Chevrolet' },
      { value: 'tesla', label: 'Tesla' },
      { value: 'jeep', label: 'Jeep' },
    ]
  }
];

/**
 * Default Select example
 */
export const Default: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
  },
};

/**
 * Required field
 */
export const Required: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    required: true,
  },
};

/**
 * With helper text
 */
export const WithHelperText: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    helperText: 'Select your country of residence',
  },
};

/**
 * With error message
 */
export const WithError: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    error: 'Please select a country',
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    disabled: true,
    defaultValue: 'us',
  },
};

/**
 * With option groups
 */
export const WithOptionGroups: Story = {
  args: {
    label: 'Car',
    options: carOptions,
  },
};

/**
 * Different sizes
 */
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Select
        label="Small select"
        size="sm"
        options={countryOptions}
      />
      
      <Select
        label="Medium select (default)"
        size="md"
        options={countryOptions}
      />
      
      <Select
        label="Large select"
        size="lg"
        options={countryOptions}
      />
    </div>
  ),
};

/**
 * Different variants
 */
export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Select
        label="Default variant"
        variant="default"
        options={countryOptions}
      />
      
      <Select
        label="Success variant"
        variant="success"
        options={countryOptions}
        helperText="Valid selection"
      />
      
      <Select
        label="Error variant"
        variant="error"
        options={countryOptions}
        error="Please make a selection"
      />
    </div>
  ),
};

/**
 * With validation
 */
export const WithValidation: Story = {
  render: function ValidationExample() {
    const [value, setValue] = useState('');
    const [error, setError] = useState<string | undefined>('Please select a country');
    
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      
      if (!newValue) {
        setError('Please select a country');
      } else {
        setError(undefined);
      }
    };
    
    return (
      <div className="space-y-4 w-80">
        <Select
          label="Country"
          required
          options={countryOptions}
          value={value}
          onChange={handleChange}
          error={error}
        />
        
        {value && !error && (
          <p className="text-sm text-success-600">
            You selected: {countryOptions.find(option => option.value === value)?.label}
          </p>
        )}
      </div>
    );
  }
};

/**
 * Form with multiple selects
 */
export const FormExample: Story = {
  render: function FormExample() {
    const [formData, setFormData] = useState({
      country: '',
      car: '',
      deliveryOption: 'standard',
    });
    
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
    
    const deliveryOptions = [
      { value: 'standard', label: 'Standard Delivery (3-5 days)' },
      { value: 'express', label: 'Express Delivery (1-2 days)' },
      { value: 'overnight', label: 'Overnight Delivery' },
    ];
    
    return (
      <div className="w-full max-w-md p-6 border rounded-lg shadow-sm space-y-6">
        <h2 className="text-xl font-semibold mb-4">Order Information</h2>
        
        <Select
          label="Country"
          name="country"
          required
          options={countryOptions}
          value={formData.country}
          onChange={handleChange}
          helperText="Select your shipping country"
        />
        
        <Select
          label="Car Model"
          name="car"
          required
          options={carOptions}
          value={formData.car}
          onChange={handleChange}
        />
        
        <Select
          label="Delivery Option"
          name="deliveryOption"
          options={deliveryOptions}
          value={formData.deliveryOption}
          onChange={handleChange}
        />
        
        <div className="pt-4">
          <button 
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            disabled={!formData.country || !formData.car}
          >
            Place Order
          </button>
        </div>
      </div>
    );
  }
};
