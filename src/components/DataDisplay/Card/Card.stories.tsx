import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter,
  CardImage,
  CardActions
} from './Card';
import { Button } from '../../Button/Button';

const meta: Meta<typeof Card> = {
  title: 'DataDisplay/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'info'],
      description: 'The visual style of the card',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the card padding',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    bordered: {
      control: 'boolean',
      description: 'Whether the card has a border',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    hoverable: {
      control: 'boolean',
      description: 'Whether the card has a hover effect',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    clickable: {
      control: 'boolean',
      description: 'Whether the card is clickable',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    selected: {
      control: 'boolean',
      description: 'Whether the card is selected',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the card is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler for the card',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// Basic example with default card
export const Default: Story = {
  render: (args) => (
    <Card {...args} className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the main content of the card. You can put any content here.</p>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-neutral-500">Last updated: 2 hours ago</p>
      </CardFooter>
    </Card>
  ),
};

// Different variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Card variant="default" className="w-[250px]">
        <CardHeader>
          <CardTitle>Default</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Default card variant</p>
        </CardContent>
      </Card>
      
      <Card variant="primary" className="w-[250px]">
        <CardHeader>
          <CardTitle>Primary</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Primary card variant</p>
        </CardContent>
      </Card>
      
      <Card variant="secondary" className="w-[250px]">
        <CardHeader>
          <CardTitle>Secondary</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Secondary card variant</p>
        </CardContent>
      </Card>
      
      <Card variant="success" className="w-[250px]">
        <CardHeader>
          <CardTitle>Success</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Success card variant</p>
        </CardContent>
      </Card>
      
      <Card variant="warning" className="w-[250px]">
        <CardHeader>
          <CardTitle>Warning</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Warning card variant</p>
        </CardContent>
      </Card>
      
      <Card variant="danger" className="w-[250px]">
        <CardHeader>
          <CardTitle>Danger</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Danger card variant</p>
        </CardContent>
      </Card>
      
      <Card variant="info" className="w-[250px]">
        <CardHeader>
          <CardTitle>Info</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Info card variant</p>
        </CardContent>
      </Card>
    </div>
  ),
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Card size="sm" className="w-[350px]">
        <CardHeader>
          <CardTitle>Small Card</CardTitle>
          <CardDescription>Small size with less padding</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is a small card with less padding.</p>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-neutral-500">Small footer</p>
        </CardFooter>
      </Card>
      
      <Card size="md" className="w-[350px]">
        <CardHeader>
          <CardTitle>Medium Card</CardTitle>
          <CardDescription>Medium size (default)</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is a medium card with default padding.</p>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-neutral-500">Medium footer</p>
        </CardFooter>
      </Card>
      
      <Card size="lg" className="w-[350px]">
        <CardHeader>
          <CardTitle>Large Card</CardTitle>
          <CardDescription>Large size with more padding</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is a large card with more padding.</p>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-neutral-500">Large footer</p>
        </CardFooter>
      </Card>
    </div>
  ),
};

// Hoverable card
export const Hoverable: Story = {
  render: (args) => (
    <Card {...args} className="w-[350px]">
      <CardHeader>
        <CardTitle>Hoverable Card</CardTitle>
        <CardDescription>This card has a hover effect</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Hover over this card to see the shadow effect.</p>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-neutral-500">Try hovering!</p>
      </CardFooter>
    </Card>
  ),
  args: {
    hoverable: true,
  },
};

// Clickable card
export const Clickable: Story = {
  render: (args) => (
    <Card 
      {...args} 
      className="w-[350px]"
      onClick={() => alert('Card clicked!')}
    >
      <CardHeader>
        <CardTitle>Clickable Card</CardTitle>
        <CardDescription>This card is clickable</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Click on this card to trigger an action.</p>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-neutral-500">Click me!</p>
      </CardFooter>
    </Card>
  ),
  args: {
    clickable: true,
    hoverable: true,
  },
};

// Selected card
export const Selected: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Card className="w-[350px]" selected>
        <CardHeader>
          <CardTitle>Selected Card</CardTitle>
          <CardDescription>This card is selected</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card has a highlight ring to indicate it's selected.</p>
        </CardContent>
      </Card>
      
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Regular Card</CardTitle>
          <CardDescription>This card is not selected</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is a regular card without selection.</p>
        </CardContent>
      </Card>
    </div>
  ),
};

// Disabled card
export const Disabled: Story = {
  render: (args) => (
    <Card 
      {...args} 
      className="w-[350px]"
      onClick={() => alert('This should not trigger when disabled')}
    >
      <CardHeader>
        <CardTitle>Disabled Card</CardTitle>
        <CardDescription>This card is disabled</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card is disabled and cannot be interacted with.</p>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-neutral-500">Interactions disabled</p>
      </CardFooter>
    </Card>
  ),
  args: {
    disabled: true,
    clickable: true,
    hoverable: true,
  },
};

// Card with image
export const WithImage: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6">
      <Card {...args} className="w-[350px]">
        <CardImage 
          src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
          alt="Colorful gradient"
          position="top"
        />
        <CardHeader>
          <CardTitle>Card with Top Image</CardTitle>
          <CardDescription>Image positioned at the top</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card has an image at the top.</p>
        </CardContent>
      </Card>
      
      <Card {...args} className="w-[350px]">
        <CardHeader>
          <CardTitle>Card with Bottom Image</CardTitle>
          <CardDescription>Image positioned at the bottom</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card has an image at the bottom.</p>
        </CardContent>
        <CardImage 
          src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
          alt="Colorful gradient"
          position="bottom"
        />
      </Card>
    </div>
  ),
};

// Card with actions
export const WithActions: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6">
      <Card {...args} className="w-[350px]">
        <CardHeader>
          <CardTitle>Card with Actions</CardTitle>
          <CardDescription>Right-aligned actions (default)</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card has action buttons in the footer.</p>
        </CardContent>
        <CardActions>
          <Button variant="outline" size="sm">Cancel</Button>
          <Button size="sm">Save</Button>
        </CardActions>
      </Card>
      
      <Card {...args} className="w-[350px]">
        <CardHeader>
          <CardTitle>Card with Actions</CardTitle>
          <CardDescription>Left-aligned actions</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card has left-aligned action buttons.</p>
        </CardContent>
        <CardActions align="left">
          <Button variant="outline" size="sm">Cancel</Button>
          <Button size="sm">Save</Button>
        </CardActions>
      </Card>
      
      <Card {...args} className="w-[350px]">
        <CardHeader>
          <CardTitle>Card with Actions</CardTitle>
          <CardDescription>Justified actions</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card has justified action buttons.</p>
        </CardContent>
        <CardActions align="between">
          <Button variant="outline" size="sm">Cancel</Button>
          <Button size="sm">Save</Button>
        </CardActions>
      </Card>
    </div>
  ),
};

// Complex example
export const ComplexExample: Story = {
  render: (args) => (
    <Card {...args} className="w-[400px]" hoverable>
      <CardImage 
        src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
        alt="Mountain landscape"
        position="top"
        className="h-48"
      />
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Mountain Retreat</CardTitle>
            <CardDescription>Peaceful getaway in the mountains</CardDescription>
          </div>
          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
            Available
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>
            Experience tranquility in this beautiful mountain retreat. Perfect for weekend getaways and reconnecting with nature.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <path d="M2 3h20"></path>
                <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"></path>
                <path d="M12 17v4"></path>
                <path d="M8 21h8"></path>
              </svg>
              <span>3 bedrooms</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <path d="M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"></path>
                <path d="M2 10h20"></path>
              </svg>
              <span>2 bathrooms</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
              </svg>
              <span>1500 sq ft</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-lg font-bold">$250 / night</div>
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0" className="text-yellow-400 mr-1">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <span className="text-sm font-medium">4.9 (128 reviews)</span>
        </div>
      </CardFooter>
      <CardActions>
        <Button variant="outline" size="sm">View Details</Button>
        <Button size="sm">Book Now</Button>
      </CardActions>
    </Card>
  ),
};
