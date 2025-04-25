import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  Modal, 
  ModalHeader, 
  ModalTitle, 
  ModalDescription, 
  ModalBody, 
  ModalFooter, 
  ModalCloseButton 
} from './Modal';
import { Button } from '../../Button/Button';

const meta: Meta<typeof Modal> = {
  title: 'Overlay/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the modal is open',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
      description: 'The size of the modal',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    closeOnEsc: {
      control: 'boolean',
      description: 'Whether to close the modal when the escape key is pressed',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: 'Whether to close the modal when clicking outside',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    onClose: {
      action: 'closed',
      description: 'Callback when the modal is closed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// Modal with trigger button
export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal 
          {...args} 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)}
        >
          <ModalCloseButton onClose={() => setIsOpen(false)} />
          <ModalHeader>
            <ModalTitle>Modal Title</ModalTitle>
            <ModalDescription>
              This is a description of the modal content.
            </ModalDescription>
          </ModalHeader>
          <ModalBody>
            <p>This is the main content of the modal.</p>
            <p className="mt-4">You can put any content here.</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsOpen(false)}>Continue</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  },
};

// Different sizes
export const Sizes: Story = {
  render: () => {
    const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'>('md');
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-2">
          <Button size="sm" onClick={() => { setSize('sm'); setIsOpen(true); }}>Small</Button>
          <Button size="sm" onClick={() => { setSize('md'); setIsOpen(true); }}>Medium</Button>
          <Button size="sm" onClick={() => { setSize('lg'); setIsOpen(true); }}>Large</Button>
          <Button size="sm" onClick={() => { setSize('xl'); setIsOpen(true); }}>X-Large</Button>
          <Button size="sm" onClick={() => { setSize('2xl'); setIsOpen(true); }}>2X-Large</Button>
          <Button size="sm" onClick={() => { setSize('full'); setIsOpen(true); }}>Full Width</Button>
        </div>
        
        <Modal 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)}
          size={size}
        >
          <ModalCloseButton onClose={() => setIsOpen(false)} />
          <ModalHeader>
            <ModalTitle>{size.toUpperCase()} Modal</ModalTitle>
            <ModalDescription>
              This is a {size} sized modal.
            </ModalDescription>
          </ModalHeader>
          <ModalBody>
            <p>The content area adjusts based on the modal size.</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  },
};

// Alert/Confirmation Modal
export const AlertModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    
    const handleConfirm = () => {
      setIsConfirmed(true);
      setIsOpen(false);
    };
    
    const handleOpenModal = () => {
      setIsConfirmed(false);
      setIsOpen(true);
    };
    
    return (
      <div className="flex flex-col gap-4">
        <Button variant="error" onClick={handleOpenModal}>Delete Item</Button>
        
        {isConfirmed && (
          <div className="p-4 bg-success-50 text-success-700 rounded-md">
            Item was successfully deleted.
          </div>
        )}
        
        <Modal 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)}
          size="sm"
        >
          <ModalHeader>
            <ModalTitle>Confirm Deletion</ModalTitle>
            <ModalDescription>
              This action cannot be undone.
            </ModalDescription>
          </ModalHeader>
          <ModalBody>
            <p className="text-danger-600">
              Are you sure you want to delete this item? This action cannot be reversed.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button variant="error" onClick={handleConfirm}>Delete</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  },
};

// Form Modal
export const FormModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitted(true);
      setIsOpen(false);
    };
    
    const handleOpenModal = () => {
      setName('');
      setEmail('');
      setIsSubmitted(false);
      setIsOpen(true);
    };
    
    return (
      <div className="flex flex-col gap-4">
        <Button onClick={handleOpenModal}>Open Form</Button>
        
        {isSubmitted && (
          <div className="p-4 bg-success-50 text-success-700 rounded-md">
            Form submitted with Name: {name} and Email: {email}
          </div>
        )}
        
        <Modal 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)}
        >
          <ModalCloseButton onClose={() => setIsOpen(false)} />
          <ModalHeader>
            <ModalTitle>Contact Form</ModalTitle>
            <ModalDescription>
              Fill out the form below to contact us.
            </ModalDescription>
          </ModalHeader>
          <ModalBody>
            <form id="contact-form" onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button type="submit" form="contact-form">Submit</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  },
};

// Nested Modals
export const NestedModals: Story = {
  render: () => {
    const [isFirstOpen, setIsFirstOpen] = useState(false);
    const [isSecondOpen, setIsSecondOpen] = useState(false);
    
    return (
      <div>
        <Button onClick={() => setIsFirstOpen(true)}>Open First Modal</Button>
        
        <Modal 
          isOpen={isFirstOpen} 
          onClose={() => setIsFirstOpen(false)}
        >
          <ModalCloseButton onClose={() => setIsFirstOpen(false)} />
          <ModalHeader>
            <ModalTitle>First Modal</ModalTitle>
            <ModalDescription>
              This is the first level modal.
            </ModalDescription>
          </ModalHeader>
          <ModalBody>
            <p>Click the button below to open a nested modal.</p>
            <Button 
              className="mt-4" 
              onClick={() => setIsSecondOpen(true)}
            >
              Open Nested Modal
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setIsFirstOpen(false)}>Close</Button>
          </ModalFooter>
        </Modal>
        
        <Modal 
          isOpen={isSecondOpen} 
          onClose={() => setIsSecondOpen(false)}
          size="sm"
        >
          <ModalCloseButton onClose={() => setIsSecondOpen(false)} />
          <ModalHeader>
            <ModalTitle>Nested Modal</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <p>This is a nested modal that appears on top of the first modal.</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setIsSecondOpen(false)}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  },
};
