import React, { useState, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  Popover, 
  PopoverTrigger, 
  PopoverContent, 
  PopoverHeader, 
  PopoverBody, 
  PopoverFooter,
  PopoverArrow
} from './Popover';
import { Button } from '../../Button/Button';

const meta: Meta<typeof Popover> = {
  title: 'Overlay/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'right',
        'right-start',
        'right-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
      ],
      description: 'The placement of the popover',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'bottom' },
      },
    },
    offset: {
      control: 'number',
      description: 'The offset from the reference element in pixels',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 8 },
      },
    },
    closeOnOutsideClick: {
      control: 'boolean',
      description: 'Whether to close the popover when clicking outside',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    closeOnEsc: {
      control: 'boolean',
      description: 'Whether to close the popover when the escape key is pressed',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

// Basic popover with trigger button
export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    
    return (
      <div>
        <Button ref={buttonRef} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'Close Popover' : 'Open Popover'}
        </Button>
        
        <Popover
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          referenceElement={buttonRef.current}
        >
          <PopoverArrow placement={args.placement} />
          <PopoverContent>
            <PopoverHeader>Popover Title</PopoverHeader>
            <PopoverBody>
              <p>This is the content of the popover.</p>
            </PopoverBody>
            <PopoverFooter>
              <Button size="sm" onClick={() => setIsOpen(false)}>Close</Button>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
  args: {
    placement: 'bottom',
    offset: 8,
    closeOnOutsideClick: true,
    closeOnEsc: true,
  },
};

// Different placements
export const Placements: Story = {
  render: () => {
    const [placement, setPlacement] = useState<any>('bottom');
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    
    const placements = [
      'top',
      'top-start',
      'top-end',
      'right',
      'right-start',
      'right-end',
      'bottom',
      'bottom-start',
      'bottom-end',
      'left',
      'left-start',
      'left-end',
    ];
    
    return (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-4 gap-2">
          {placements.map((p) => (
            <Button 
              key={p} 
              size="sm" 
              onClick={() => { setPlacement(p); setIsOpen(true); }}
              variant={placement === p ? 'primary' : 'outline'}
            >
              {p}
            </Button>
          ))}
        </div>
        
        <div className="mt-8 flex justify-center">
          <Button 
            ref={buttonRef} 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? 'Close Popover' : 'Open Popover'}
          </Button>
        </div>
        
        <Popover
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          referenceElement={buttonRef.current}
          placement={placement}
        >
          <PopoverArrow placement={placement} />
          <PopoverContent>
            <PopoverHeader>Placement: {placement}</PopoverHeader>
            <PopoverBody>
              <p>This popover is positioned at the <strong>{placement}</strong> placement.</p>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};

// Interactive popover
export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [count, setCount] = useState(0);
    const buttonRef = useRef<HTMLButtonElement>(null);
    
    return (
      <div>
        <Button ref={buttonRef} onClick={() => setIsOpen(!isOpen)}>
          Counter: {count}
        </Button>
        
        <Popover
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          referenceElement={buttonRef.current}
        >
          <PopoverArrow />
          <PopoverContent>
            <PopoverHeader>Interactive Popover</PopoverHeader>
            <PopoverBody>
              <p className="mb-4">Current count: {count}</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setCount(count - 1)}>
                  Decrement
                </Button>
                <Button size="sm" onClick={() => setCount(count + 1)}>
                  Increment
                </Button>
              </div>
            </PopoverBody>
            <PopoverFooter>
              <Button size="sm" variant="outline" onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};

// Popover with form
export const WithForm: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
      setTimeout(() => setIsOpen(false), 1000);
    };
    
    const handleOpen = () => {
      setIsOpen(true);
      setSubmitted(false);
    };
    
    return (
      <div>
        <Button ref={buttonRef} onClick={handleOpen}>
          Quick Contact
        </Button>
        
        <Popover
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          referenceElement={buttonRef.current}
          placement="bottom"
        >
          <PopoverArrow placement="bottom" />
          <PopoverContent>
            <PopoverHeader>Contact Form</PopoverHeader>
            <PopoverBody>
              {submitted ? (
                <div className="p-2 bg-success-50 text-success-700 rounded-md">
                  Thank you for your submission!
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-1 text-sm border border-neutral-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-1 text-sm border border-neutral-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <Button size="sm" variant="outline" type="button" onClick={() => setIsOpen(false)}>
                      Cancel
                    </Button>
                    <Button size="sm" type="submit">
                      Submit
                    </Button>
                  </div>
                </form>
              )}
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};

// Popover with rich content
export const RichContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    
    return (
      <div>
        <Button ref={buttonRef} onClick={() => setIsOpen(!isOpen)}>
          View Profile
        </Button>
        
        <Popover
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          referenceElement={buttonRef.current}
          placement="right"
        >
          <PopoverArrow placement="right" />
          <PopoverContent className="w-64">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-600 font-semibold">
                JD
              </div>
              <div>
                <h3 className="font-medium">John Doe</h3>
                <p className="text-sm text-neutral-500">Product Designer</p>
              </div>
            </div>
            <div className="space-y-2 mb-3">
              <div className="flex items-center gap-2">
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
                  className="text-neutral-500"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
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
                  className="text-neutral-500"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span className="text-sm">john.doe@example.com</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1">Message</Button>
              <Button size="sm" className="flex-1">View Profile</Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};
