import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  Toast, 
  ToastTitle, 
  ToastDescription, 
  ToastProvider, 
  useToast 
} from './Toast';
import { Button } from '../../Button/Button';

const meta: Meta<typeof Toast> = {
  title: 'Feedback/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'info'],
      description: 'The visual style of the toast',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    title: {
      control: 'text',
      description: 'Title of the toast',
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      control: 'text',
      description: 'Description of the toast',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    duration: {
      control: 'number',
      description: 'Duration in milliseconds before the toast is automatically dismissed',
      table: {
        type: { summary: 'number' },
      },
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the toast can be dismissed',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    onDismiss: {
      action: 'dismissed',
      description: 'Callback when the toast is dismissed',
    },
  },
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toast>;

// Basic example with default toast
export const Default: Story = {
  render: (args) => (
    <div className="w-[350px]">
      <Toast {...args} />
    </div>
  ),
  args: {
    title: 'Toast Title',
    description: 'This is a toast message.',
  },
};

// Different variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[350px]">
      <Toast variant="default" title="Default Toast" description="This is a default toast." />
      <Toast variant="primary" title="Primary Toast" description="This is a primary toast." />
      <Toast variant="secondary" title="Secondary Toast" description="This is a secondary toast." />
      <Toast variant="success" title="Success Toast" description="This is a success toast." />
      <Toast variant="warning" title="Warning Toast" description="This is a warning toast." />
      <Toast variant="danger" title="Danger Toast" description="This is a danger toast." />
      <Toast variant="info" title="Info Toast" description="This is an info toast." />
    </div>
  ),
};

// Toast with icon
export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[350px]">
      <Toast 
        variant="success" 
        title="Success" 
        description="Your changes have been saved successfully."
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-success-500"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        }
      />
      
      <Toast 
        variant="warning" 
        title="Warning" 
        description="Your session is about to expire in 5 minutes."
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-warning-500"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        }
      />
      
      <Toast 
        variant="danger" 
        title="Error" 
        description="There was an error processing your request."
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-danger-500"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        }
      />
    </div>
  ),
};

// Toast with action
export const WithAction: Story = {
  render: () => (
    <div className="w-[350px]">
      <Toast 
        variant="info" 
        title="Update Available" 
        description="A new version is available. Update now to get the latest features."
        action={
          <Button size="sm" variant="primary">
            Update
          </Button>
        }
      />
    </div>
  ),
};

// Toast with custom duration
export const WithDuration: Story = {
  render: (args) => {
    const [visible, setVisible] = useState(true);
    
    return (
      <div className="w-[350px]">
        {visible ? (
          <Toast 
            {...args} 
            duration={5000}
            onDismiss={() => setVisible(false)}
          />
        ) : (
          <div className="text-center p-4 border border-dashed border-neutral-300 rounded-md">
            <p className="text-sm text-neutral-500 mb-2">Toast dismissed after 5 seconds</p>
            <Button size="sm" onClick={() => setVisible(true)}>
              Show Again
            </Button>
          </div>
        )}
        <p className="mt-2 text-xs text-neutral-500">
          This toast will automatically dismiss after 5 seconds.
        </p>
      </div>
    );
  },
  args: {
    title: 'Auto-dismiss Toast',
    description: 'This toast will disappear in 5 seconds.',
    variant: 'primary',
  },
};

// Toast system example
export const ToastSystem: Story = {
  render: () => {
    // Create a component that uses the useToast hook
    const ToastDemo = () => {
      const { addToast } = useToast();
      
      const showToast = (variant: any) => {
        addToast({
          variant,
          title: `${variant.charAt(0).toUpperCase() + variant.slice(1)} Toast`,
          description: `This is a ${variant} toast notification.`,
          duration: 5000,
          dismissible: true,
        });
      };
      
      const showSuccessToast = () => {
        addToast({
          variant: 'success',
          title: 'Success',
          description: 'Your changes have been saved successfully.',
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-success-500"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          ),
          duration: 5000,
        });
      };
      
      const showActionToast = () => {
        const id = addToast({
          variant: 'info',
          title: 'Update Available',
          description: 'A new version is available. Update now to get the latest features.',
          action: (
            <Button 
              size="sm" 
              variant="primary"
              onClick={() => {
                alert('Update initiated!');
              }}
            >
              Update
            </Button>
          ),
          duration: 0, // No auto-dismiss
        });
      };
      
      return (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={() => showToast('default')}>Default</Button>
            <Button onClick={() => showToast('primary')} variant="primary">Primary</Button>
            <Button onClick={() => showToast('warning')} variant="warning">Warning</Button>
            <Button onClick={() => showToast('danger')} variant="error">Danger</Button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={showSuccessToast} variant="success">With Icon</Button>
            <Button onClick={showActionToast} variant="info">With Action</Button>
          </div>
          <p className="text-xs text-neutral-500 mt-2">
            Click the buttons above to trigger different toast notifications.
            They will appear at the bottom right of the screen.
          </p>
        </div>
      );
    };
    
    return <ToastDemo />;
  },
};

// Different positions
export const Positions: Story = {
  render: () => {
    // Create a component that demonstrates different positions
    const PositionDemo = () => {
      const positions = [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ] as const;
      
      return (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-2">
            {positions.map((position) => (
              <Button 
                key={position}
                onClick={() => {
                  // We can't actually change the position in this demo
                  // since it's set at the provider level
                  alert(`In a real app, toasts would appear at the ${position} position.`);
                }}
              >
                {position}
              </Button>
            ))}
          </div>
          <p className="text-xs text-neutral-500 mt-2">
            In a real application, you would configure the position by setting the
            <code className="mx-1 px-1 bg-neutral-100 rounded">position</code>
            prop on the ToastProvider component.
          </p>
        </div>
      );
    };
    
    return <PositionDemo />;
  },
};
