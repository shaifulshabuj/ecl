import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertTitle, AlertDescription } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'info'],
      description: 'The visual style of the alert',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the alert',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the alert can be dismissed',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    title: {
      control: 'text',
      description: 'Title of the alert',
      table: {
        type: { summary: 'string' },
      },
    },
    isOpen: {
      control: 'boolean',
      description: 'Whether the alert is visible',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    role: {
      control: 'select',
      options: ['alert', 'status', 'log', 'marquee', 'timer'],
      description: 'ARIA role for the alert',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'alert' },
      },
    },
    onDismiss: {
      action: 'dismissed',
      description: 'Callback when the alert is dismissed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

// Basic example with default alert
export const Default: Story = {
  render: (args) => (
    <Alert {...args} className="w-[450px]">
      This is a default alert message.
    </Alert>
  ),
};

// Alert with title
export const WithTitle: Story = {
  render: (args) => (
    <Alert {...args} className="w-[450px]">
      This is an alert with a title. It provides more context for the alert message.
    </Alert>
  ),
  args: {
    title: 'Alert Title',
  },
};

// Different variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[450px]">
      <Alert variant="default">
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>This is a default alert.</AlertDescription>
      </Alert>
      
      <Alert variant="primary">
        <AlertTitle>Primary Alert</AlertTitle>
        <AlertDescription>This is a primary alert.</AlertDescription>
      </Alert>
      
      <Alert variant="secondary">
        <AlertTitle>Secondary Alert</AlertTitle>
        <AlertDescription>This is a secondary alert.</AlertDescription>
      </Alert>
      
      <Alert variant="success">
        <AlertTitle>Success Alert</AlertTitle>
        <AlertDescription>This is a success alert.</AlertDescription>
      </Alert>
      
      <Alert variant="warning">
        <AlertTitle>Warning Alert</AlertTitle>
        <AlertDescription>This is a warning alert.</AlertDescription>
      </Alert>
      
      <Alert variant="danger">
        <AlertTitle>Danger Alert</AlertTitle>
        <AlertDescription>This is a danger alert.</AlertDescription>
      </Alert>
      
      <Alert variant="info">
        <AlertTitle>Info Alert</AlertTitle>
        <AlertDescription>This is an info alert.</AlertDescription>
      </Alert>
    </div>
  ),
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[450px]">
      <Alert size="sm">
        <AlertTitle>Small Alert</AlertTitle>
        <AlertDescription>This is a small alert with less padding and smaller text.</AlertDescription>
      </Alert>
      
      <Alert size="md">
        <AlertTitle>Medium Alert</AlertTitle>
        <AlertDescription>This is a medium alert with default padding and text size.</AlertDescription>
      </Alert>
      
      <Alert size="lg">
        <AlertTitle>Large Alert</AlertTitle>
        <AlertDescription>This is a large alert with more padding and larger text.</AlertDescription>
      </Alert>
    </div>
  ),
};

// Alert with icon
export const WithIcon: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 w-[450px]">
      <Alert 
        variant="info" 
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-info-500"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        }
      >
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>This alert includes an information icon.</AlertDescription>
      </Alert>
      
      <Alert 
        variant="success" 
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
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
      >
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Your changes have been saved successfully.</AlertDescription>
      </Alert>
      
      <Alert 
        variant="warning" 
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
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
      >
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Your session is about to expire in 5 minutes.</AlertDescription>
      </Alert>
      
      <Alert 
        variant="danger" 
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
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
      >
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>There was an error processing your request.</AlertDescription>
      </Alert>
    </div>
  ),
};

// Dismissible alert
export const Dismissible: Story = {
  render: () => {
    // Use React hooks in the render function
    const [isVisible, setIsVisible] = React.useState(true);
    
    return (
      <div className="w-[450px]">
        {isVisible ? (
          <Alert 
            variant="info" 
            dismissible 
            onDismiss={() => setIsVisible(false)}
          >
            <AlertTitle>Dismissible Alert</AlertTitle>
            <AlertDescription>
              This alert can be dismissed by clicking the X button.
            </AlertDescription>
          </Alert>
        ) : (
          <button 
            className="px-4 py-2 bg-neutral-100 rounded-md hover:bg-neutral-200"
            onClick={() => setIsVisible(true)}
          >
            Show Alert Again
          </button>
        )}
      </div>
    );
  },
};

// Multiple alerts with different roles
export const AccessibilityRoles: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[450px]">
      <Alert role="alert" variant="danger">
        <AlertTitle>Alert Role</AlertTitle>
        <AlertDescription>
          This uses role="alert" for critical information that needs immediate attention.
        </AlertDescription>
      </Alert>
      
      <Alert role="status" variant="success">
        <AlertTitle>Status Role</AlertTitle>
        <AlertDescription>
          This uses role="status" for status messages that don't require immediate attention.
        </AlertDescription>
      </Alert>
      
      <Alert role="log" variant="info">
        <AlertTitle>Log Role</AlertTitle>
        <AlertDescription>
          This uses role="log" for messages that are part of a log or ongoing activity.
        </AlertDescription>
      </Alert>
    </div>
  ),
};

// Alert with custom content
export const CustomContent: Story = {
  render: (args) => (
    <Alert {...args} variant="primary" className="w-[450px]">
      <div className="flex flex-col gap-2">
        <AlertTitle>Your trial is ending soon</AlertTitle>
        <AlertDescription>
          Your free trial will expire in 3 days. Upgrade now to maintain access to all features.
        </AlertDescription>
        <div className="mt-3 flex gap-3">
          <button className="px-3 py-1 bg-primary-500 text-white rounded-md text-sm font-medium hover:bg-primary-600">
            Upgrade Now
          </button>
          <button className="px-3 py-1 bg-transparent text-primary-700 rounded-md text-sm font-medium hover:bg-primary-50">
            Learn More
          </button>
        </div>
      </div>
    </Alert>
  ),
};
