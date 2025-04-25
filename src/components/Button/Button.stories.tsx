import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

/**
 * Button Component
 * 
 * A versatile button component that supports multiple variants, sizes, and states.
 */
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with support for multiple variants, sizes, and states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info', 'outline', 'ghost'],
      description: 'The visual style of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'The size of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button should take the full width of its container',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    iconButton: {
      control: 'boolean',
      description: 'Whether the button should be rendered as a square icon button',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether the button is in a loading state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    leftIcon: {
      control: { type: null },
      description: 'Icon to display before the button text',
    },
    rightIcon: {
      control: { type: null },
      description: 'Icon to display after the button text',
    },
    loadingText: {
      control: 'text',
      description: 'Text to display when the button is in loading state',
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/**
 * Default button example
 */
export const Default: Story = {
  args: {
    children: 'Button',
  },
};

/**
 * Primary button variant
 */
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

/**
 * Secondary button variant
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

/**
 * Button size variants
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col items-start space-y-4">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
};

/**
 * Button with different variants
 */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="error">Error</Button>
      <Button variant="info">Info</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};

/**
 * Button in loading state
 */
export const Loading: Story = {
  args: {
    isLoading: true,
    children: 'Loading',
  },
};

/**
 * Button with loading text
 */
export const LoadingWithText: Story = {
  args: {
    isLoading: true,
    loadingText: 'Processing...',
    children: 'Submit',
  },
};

/**
 * Disabled button
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

/**
 * Full width button
 */
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
  parameters: {
    layout: 'padded',
  },
};

/**
 * Button with icon
 */
export const WithIcon: Story = {
  render: () => {
    const IconBefore = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="m8 12 3 3 5-5" />
      </svg>
    );

    const IconAfter = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    );

    return (
      <div className="flex flex-col items-start space-y-4">
        <Button leftIcon={<IconBefore />}>With Left Icon</Button>
        <Button rightIcon={<IconAfter />}>With Right Icon</Button>
        <Button leftIcon={<IconBefore />} rightIcon={<IconAfter />}>
          With Both Icons
        </Button>
      </div>
    );
  },
};

/**
 * Icon button
 */
export const IconButton: Story = {
  render: () => {
    const Icon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" x2="12" y1="15" y2="3" />
      </svg>
    );

    return (
      <div className="flex items-center space-x-4">
        <Button iconButton size="xs"><Icon /></Button>
        <Button iconButton size="sm"><Icon /></Button>
        <Button iconButton size="md"><Icon /></Button>
        <Button iconButton size="lg"><Icon /></Button>
        <Button iconButton size="xl"><Icon /></Button>
      </div>
    );
  },
};

/**
 * Button with all variants in different sizes to showcase the theme's adaptability
 */
export const VariantShowcase: Story = {
  render: () => {
    const variants = [
      'default',
      'primary',
      'secondary',
      'success',
      'warning',
      'error',
      'info',
      'outline',
      'ghost',
    ] as const;

    return (
      <div className="space-y-8 w-full max-w-4xl">
        {variants.map((variant) => (
          <div key={variant} className="space-y-2">
            <h3 className="text-lg font-medium capitalize">{variant}</h3>
            <div className="flex flex-wrap gap-2">
              <Button variant={variant} size="xs">
                Extra Small
              </Button>
              <Button variant={variant} size="sm">
                Small
              </Button>
              <Button variant={variant} size="md">
                Medium
              </Button>
              <Button variant={variant} size="lg">
                Large
              </Button>
              <Button variant={variant} size="xl">
                Extra Large
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};
