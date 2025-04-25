import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from './TextArea';

/**
 * TextArea Component
 * 
 * A flexible textarea component with support for labels, error states, auto-resize, and validation.
 */
const meta: Meta<typeof TextArea> = {
  title: 'Components/Form/TextArea',
  component: TextArea,
  parameters: {
    docs: {
      description: {
        component: 'A flexible textarea component with support for labels, error states, auto-resize, and validation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the textarea',
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
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the textarea',
    },
    variant: {
      control: 'select',
      options: ['default', 'error', 'success'],
      description: 'The visual style of the textarea',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
      description: 'How the textarea can be resized',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'vertical' },
      },
    },
    autoResize: {
      control: 'boolean',
      description: 'Whether to auto-resize the textarea based on content',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    maxHeight: {
      control: 'number',
      description: 'Maximum height for auto-resize (in pixels)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    rows: {
      control: 'number',
      description: 'Number of visible text lines',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 3 },
      },
    },
    onChange: { action: 'changed' },
    onBlur: { action: 'blurred' },
    onValidationChange: { action: 'validation changed' },
  },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

/**
 * Default TextArea example
 */
export const Default: Story = {
  args: {
    placeholder: 'Enter your message here',
    rows: 3,
  },
};

/**
 * With label
 */
export const WithLabel: Story = {
  args: {
    label: 'Message',
    placeholder: 'Enter your message here',
    rows: 3,
  },
};

/**
 * Required field
 */
export const Required: Story = {
  args: {
    label: 'Feedback',
    placeholder: 'Please provide your feedback',
    required: true,
    rows: 3,
  },
};

/**
 * With helper text
 */
export const WithHelperText: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself',
    helperText: 'Keep it brief and to the point',
    rows: 3,
  },
};

/**
 * With error message
 */
export const WithError: Story = {
  args: {
    label: 'Comments',
    placeholder: 'Enter your comments',
    error: 'Comments must be at least 10 characters',
    rows: 3,
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    label: 'Read-only content',
    value: 'This content cannot be edited',
    disabled: true,
    rows: 3,
  },
};

/**
 * Different variants
 */
export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <TextArea
        label="Default variant"
        placeholder="Default textarea"
        variant="default"
      />
      
      <TextArea
        label="Success variant"
        placeholder="Success textarea"
        variant="success"
        helperText="Input is valid"
      />
      
      <TextArea
        label="Error variant"
        placeholder="Error textarea"
        variant="error"
        error="Please check this field"
      />
    </div>
  ),
};

/**
 * Resize options
 */
export const ResizeOptions: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <TextArea
        label="No resize"
        placeholder="Cannot be resized"
        resize="none"
      />
      
      <TextArea
        label="Vertical resize (default)"
        placeholder="Can be resized vertically"
        resize="vertical"
      />
      
      <TextArea
        label="Horizontal resize"
        placeholder="Can be resized horizontally"
        resize="horizontal"
      />
      
      <TextArea
        label="Both directions"
        placeholder="Can be resized in both directions"
        resize="both"
      />
    </div>
  ),
};

/**
 * Auto-resize
 */
export const AutoResize: Story = {
  render: function AutoResizeExample() {
    const [value, setValue] = useState('');
    
    return (
      <div className="space-y-4 w-80">
        <TextArea
          label="Auto-resize textarea"
          placeholder="Start typing to see auto-resize in action..."
          autoResize
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        
        <TextArea
          label="Auto-resize with max height"
          placeholder="This will stop growing at 150px..."
          autoResize
          maxHeight={150}
        />
        
        <div className="pt-4">
          <button
            className="px-3 py-1 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            onClick={() => setValue('This is an example of auto-resizing textarea.\n\nAs you can see, the textarea grows as you type more content.\n\nIt adjusts its height based on the content, making it more user-friendly for longer text inputs.')}
          >
            Add sample text
          </button>
          
          <button
            className="ml-2 px-3 py-1 bg-neutral-200 text-neutral-700 rounded-md hover:bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2"
            onClick={() => setValue('')}
          >
            Clear
          </button>
        </div>
      </div>
    );
  }
};

/**
 * With validation
 */
export const WithValidation: Story = {
  render: function ValidationExample() {
    const [value, setValue] = useState('');
    const [error, setError] = useState<string | undefined>(undefined);
    
    const validateFeedback = (text: string) => {
      if (text.length < 10) {
        return 'Feedback must be at least 10 characters';
      }
      if (text.length > 200) {
        return 'Feedback must be less than 200 characters';
      }
      return undefined;
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      setError(validateFeedback(newValue));
    };
    
    return (
      <div className="space-y-4 w-80">
        <TextArea
          label="Feedback"
          placeholder="Please provide your feedback"
          required
          helperText="Between 10-200 characters"
          value={value}
          onChange={handleChange}
          error={error}
        />
        
        <div className="text-sm">
          Character count: {value.length}/200
        </div>
      </div>
    );
  }
};
