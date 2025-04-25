import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb, BreadcrumbItem } from './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the breadcrumb items',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    spacing: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The spacing between breadcrumb items',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    separator: {
      control: 'text',
      description: 'Custom separator between breadcrumb items',
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: '/' },
      },
    },
    showHomeIcon: {
      control: 'boolean',
      description: 'Whether to show the home icon',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    ariaLabel: {
      control: 'text',
      description: 'ARIA label for the breadcrumb navigation',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Breadcrumb' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

// Basic example with default breadcrumb
export const Default: Story = {
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/products">Products</BreadcrumbItem>
      <BreadcrumbItem href="/products/categories">Categories</BreadcrumbItem>
      <BreadcrumbItem>Electronics</BreadcrumbItem>
    </Breadcrumb>
  ),
};

// With home icon
export const WithHomeIcon: Story = {
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbItem href="/products">Products</BreadcrumbItem>
      <BreadcrumbItem href="/products/categories">Categories</BreadcrumbItem>
      <BreadcrumbItem>Electronics</BreadcrumbItem>
    </Breadcrumb>
  ),
  args: {
    showHomeIcon: true,
  },
};

// Custom separator
export const CustomSeparator: Story = {
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/products">Products</BreadcrumbItem>
      <BreadcrumbItem href="/products/categories">Categories</BreadcrumbItem>
      <BreadcrumbItem>Electronics</BreadcrumbItem>
    </Breadcrumb>
  ),
  args: {
    separator: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mx-2"
      >
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    ),
  },
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Small</h3>
        <Breadcrumb size="sm" spacing="sm">
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/products">Products</BreadcrumbItem>
          <BreadcrumbItem>Electronics</BreadcrumbItem>
        </Breadcrumb>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Medium (Default)</h3>
        <Breadcrumb size="md" spacing="md">
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/products">Products</BreadcrumbItem>
          <BreadcrumbItem>Electronics</BreadcrumbItem>
        </Breadcrumb>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Large</h3>
        <Breadcrumb size="lg" spacing="lg">
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/products">Products</BreadcrumbItem>
          <BreadcrumbItem>Electronics</BreadcrumbItem>
        </Breadcrumb>
      </div>
    </div>
  ),
};

// With icons
export const WithIcons: Story = {
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbItem 
        href="/"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        }
      >
        Home
      </BreadcrumbItem>
      <BreadcrumbItem 
        href="/products"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
        }
      >
        Products
      </BreadcrumbItem>
      <BreadcrumbItem 
        href="/products/categories"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="8" y1="6" x2="21" y2="6"></line>
            <line x1="8" y1="12" x2="21" y2="12"></line>
            <line x1="8" y1="18" x2="21" y2="18"></line>
            <line x1="3" y1="6" x2="3.01" y2="6"></line>
            <line x1="3" y1="12" x2="3.01" y2="12"></line>
            <line x1="3" y1="18" x2="3.01" y2="18"></line>
          </svg>
        }
      >
        Categories
      </BreadcrumbItem>
      <BreadcrumbItem
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
        }
      >
        Electronics
      </BreadcrumbItem>
    </Breadcrumb>
  ),
};

// Truncated breadcrumbs
export const Truncated: Story = {
  render: (args) => (
    <div className="max-w-md">
      <Breadcrumb {...args}>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/products">Products</BreadcrumbItem>
        <BreadcrumbItem href="/products/categories">Categories</BreadcrumbItem>
        <BreadcrumbItem href="/products/categories/electronics">Electronics</BreadcrumbItem>
        <BreadcrumbItem href="/products/categories/electronics/computers">Computers</BreadcrumbItem>
        <BreadcrumbItem href="/products/categories/electronics/computers/laptops">Laptops</BreadcrumbItem>
        <BreadcrumbItem>MacBook Pro 16-inch</BreadcrumbItem>
      </Breadcrumb>
      <p className="mt-4 text-sm text-neutral-500">
        Note: For very long breadcrumbs, consider implementing a truncation strategy that shows only the first few and last few items with an ellipsis in between.
      </p>
    </div>
  ),
};

// With click handler
export const WithClickHandler: Story = {
  render: () => {
    // Use React hooks in the render function
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
      event.preventDefault();
      alert(`Navigating to: ${path}`);
    };
    
    return (
      <Breadcrumb>
        <BreadcrumbItem 
          href="/"
          onClick={(e) => handleClick(e as React.MouseEvent<HTMLAnchorElement>, '/')}
        >
          Home
        </BreadcrumbItem>
        <BreadcrumbItem 
          href="/products"
          onClick={(e) => handleClick(e as React.MouseEvent<HTMLAnchorElement>, '/products')}
        >
          Products
        </BreadcrumbItem>
        <BreadcrumbItem 
          href="/products/categories"
          onClick={(e) => handleClick(e as React.MouseEvent<HTMLAnchorElement>, '/products/categories')}
        >
          Categories
        </BreadcrumbItem>
        <BreadcrumbItem>
          Electronics
        </BreadcrumbItem>
      </Breadcrumb>
    );
  },
};
