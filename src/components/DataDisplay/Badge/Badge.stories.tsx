import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'DataDisplay/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'info', 'outline'],
      description: 'The visual style of the badge',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the badge',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    interactive: {
      control: 'boolean',
      description: 'Whether the badge is interactive',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    removable: {
      control: 'boolean',
      description: 'Whether the badge has a remove button',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    dot: {
      control: 'boolean',
      description: 'Whether the badge has a dot indicator',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    dotColor: {
      control: 'color',
      description: 'Color of the dot indicator',
      table: {
        type: { summary: 'string' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler for the badge',
    },
    onRemove: {
      action: 'removed',
      description: 'Callback when the remove button is clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

// Basic example with default badge
export const Default: Story = {
  render: (args) => (
    <Badge {...args}>
      Badge
    </Badge>
  ),
};

// Different variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};

// Interactive badge
export const Interactive: Story = {
  render: (args) => (
    <Badge 
      {...args}
      onClick={() => alert('Badge clicked!')}
    >
      Interactive Badge
    </Badge>
  ),
  args: {
    interactive: true,
    variant: 'primary',
  },
};

// Removable badge
export const Removable: Story = {
  render: () => {
    // Use React hooks in the render function
    const [badges, setBadges] = React.useState([
      { id: 1, text: 'React', variant: 'primary' },
      { id: 2, text: 'TypeScript', variant: 'info' },
      { id: 3, text: 'Tailwind', variant: 'secondary' },
      { id: 4, text: 'Storybook', variant: 'success' },
    ]);
    
    const handleRemove = (id: number) => {
      setBadges(badges.filter(badge => badge.id !== id));
    };
    
    return (
      <div className="flex flex-wrap gap-2">
        {badges.map(badge => (
          <Badge 
            key={badge.id}
            variant={badge.variant as any}
            removable
            onRemove={() => handleRemove(badge.id)}
          >
            {badge.text}
          </Badge>
        ))}
        {badges.length === 0 && (
          <p className="text-sm text-neutral-500">All badges removed. Refresh to reset.</p>
        )}
      </div>
    );
  },
};

// Badge with dot indicator
export const WithDot: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default" dot>Default</Badge>
      <Badge variant="primary" dot>Primary</Badge>
      <Badge variant="success" dot>Success</Badge>
      <Badge variant="danger" dot>Danger</Badge>
      <Badge variant="outline" dot>Outline</Badge>
      <Badge variant="default" dot dotColor="#9333ea">Custom Color</Badge>
    </div>
  ),
};

// Badge in context
export const InContext: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="font-medium">Status:</span>
        <Badge variant="success">Active</Badge>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="font-medium">Priority:</span>
        <Badge variant="danger">High</Badge>
      </div>
      
      <div>
        <span className="font-medium">Skills:</span>
        <div className="mt-1 flex flex-wrap gap-1">
          <Badge variant="primary" size="sm">React</Badge>
          <Badge variant="primary" size="sm">TypeScript</Badge>
          <Badge variant="primary" size="sm">Node.js</Badge>
          <Badge variant="primary" size="sm">GraphQL</Badge>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="font-medium">Notifications:</span>
        <Badge variant="danger" dot>3 new</Badge>
      </div>
      
      <div className="rounded border border-neutral-200 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Project Overview</h3>
          <Badge variant="warning">In Progress</Badge>
        </div>
        <p className="mt-2 text-neutral-600">
          This project is currently in development and requires your attention.
        </p>
      </div>
    </div>
  ),
};

// Combined features
export const CombinedFeatures: Story = {
  render: () => {
    // Use React hooks in the render function
    const [isVisible, setIsVisible] = React.useState(true);
    
    return (
      <div className="space-y-4">
        {isVisible && (
          <Badge 
            variant="primary"
            size="lg"
            interactive
            removable
            dot
            onClick={() => alert('Badge clicked!')}
            onRemove={() => setIsVisible(false)}
          >
            Interactive Badge with Dot and Remove
          </Badge>
        )}
        {!isVisible && (
          <button 
            className="rounded bg-neutral-100 px-2 py-1 text-sm"
            onClick={() => setIsVisible(true)}
          >
            Restore Badge
          </button>
        )}
      </div>
    );
  },
};
