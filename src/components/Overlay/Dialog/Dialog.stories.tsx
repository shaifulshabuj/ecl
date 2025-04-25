import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  Dialog, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogBody, 
  DialogFooter, 
  DialogCloseButton,
  DialogActions
} from './Dialog';
import { Button } from '../../Button/Button';

const meta: Meta<typeof Dialog> = {
  title: 'Overlay/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the dialog is open',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'info', 'warning', 'success'],
      description: 'The visual style of the dialog',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    closeOnEsc: {
      control: 'boolean',
      description: 'Whether to close the dialog when the escape key is pressed',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: 'Whether to close the dialog when clicking outside',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    onClose: {
      action: 'closed',
      description: 'Callback when the dialog is closed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

// Basic dialog with trigger button
export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
        <Dialog 
          {...args} 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)}
        >
          <DialogCloseButton onClose={() => setIsOpen(false)} />
          <DialogHeader>
            <DialogTitle>Confirmation</DialogTitle>
            <DialogDescription>
              Please confirm your action.
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <p>Are you sure you want to proceed with this action?</p>
          </DialogBody>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsOpen(false)}>Confirm</Button>
          </DialogFooter>
        </Dialog>
      </div>
    );
  },
};

// Dialog with different variants
export const Variants: Story = {
  render: () => {
    const [variant, setVariant] = useState<'default' | 'destructive' | 'info' | 'warning' | 'success'>('default');
    const [isOpen, setIsOpen] = useState(false);
    
    const variantConfig = {
      default: {
        title: 'Information',
        description: 'This is a standard dialog.',
        buttonText: 'Default',
        buttonVariant: 'primary' as const,
        actionText: 'OK',
        actionVariant: 'primary' as const,
      },
      destructive: {
        title: 'Delete Confirmation',
        description: 'This action cannot be undone.',
        buttonText: 'Destructive',
        buttonVariant: 'error' as const,
        actionText: 'Delete',
        actionVariant: 'error' as const,
      },
      info: {
        title: 'Information',
        description: 'Here is some important information.',
        buttonText: 'Info',
        buttonVariant: 'info' as const,
        actionText: 'Got it',
        actionVariant: 'info' as const,
      },
      warning: {
        title: 'Warning',
        description: 'Please proceed with caution.',
        buttonText: 'Warning',
        buttonVariant: 'warning' as const,
        actionText: 'Proceed',
        actionVariant: 'warning' as const,
      },
      success: {
        title: 'Success',
        description: 'Your action was completed successfully.',
        buttonText: 'Success',
        buttonVariant: 'success' as const,
        actionText: 'Continue',
        actionVariant: 'success' as const,
      },
    };
    
    return (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-2">
          <Button variant="primary" onClick={() => { setVariant('default'); setIsOpen(true); }}>
            Default
          </Button>
          <Button variant="error" onClick={() => { setVariant('destructive'); setIsOpen(true); }}>
            Destructive
          </Button>
          <Button variant="info" onClick={() => { setVariant('info'); setIsOpen(true); }}>
            Info
          </Button>
          <Button variant="warning" onClick={() => { setVariant('warning'); setIsOpen(true); }}>
            Warning
          </Button>
          <Button variant="success" onClick={() => { setVariant('success'); setIsOpen(true); }}>
            Success
          </Button>
        </div>
        
        <Dialog 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)}
          variant={variant}
        >
          <DialogHeader>
            <DialogTitle>{variantConfig[variant].title}</DialogTitle>
            <DialogDescription>
              {variantConfig[variant].description}
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <p>This is a {variant} dialog that demonstrates the visual styling for this variant.</p>
          </DialogBody>
          <DialogActions
            primaryAction={
              <Button 
                variant={variantConfig[variant].actionVariant} 
                onClick={() => setIsOpen(false)}
              >
                {variantConfig[variant].actionText}
              </Button>
            }
            secondaryAction={
              <Button 
                variant="outline" 
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
            }
          />
        </Dialog>
      </div>
    );
  },
};

// Confirmation Dialog
export const ConfirmationDialog: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    
    const handleConfirm = () => {
      setIsConfirmed(true);
      setIsOpen(false);
    };
    
    const handleOpenDialog = () => {
      setIsConfirmed(false);
      setIsOpen(true);
    };
    
    return (
      <div className="flex flex-col gap-4">
        <Button onClick={handleOpenDialog}>Perform Action</Button>
        
        {isConfirmed && (
          <div className="p-4 bg-success-50 text-success-700 rounded-md">
            Action confirmed and executed successfully!
          </div>
        )}
        
        <Dialog 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogDescription>
              Please confirm that you want to perform this action.
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <p>This action will make changes to your account settings.</p>
          </DialogBody>
          <DialogActions
            primaryAction={
              <Button onClick={handleConfirm}>
                Confirm
              </Button>
            }
            secondaryAction={
              <Button 
                variant="outline" 
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
            }
          />
        </Dialog>
      </div>
    );
  },
};

// Alert Dialog
export const AlertDialog: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div>
        <Button variant="error" onClick={() => setIsOpen(true)}>Delete Account</Button>
        
        <Dialog 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)}
          variant="destructive"
          closeOnOverlayClick={false}
        >
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <p className="text-danger-600 font-medium">
              Are you absolutely sure you want to delete your account?
            </p>
          </DialogBody>
          <DialogActions
            primaryAction={
              <Button 
                variant="error" 
                onClick={() => setIsOpen(false)}
              >
                Delete Account
              </Button>
            }
            secondaryAction={
              <Button 
                variant="outline" 
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
            }
          />
        </Dialog>
      </div>
    );
  },
};

// Dialog with custom content
export const CustomContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    
    const options = [
      { id: '1', name: 'Option 1', description: 'Description for option 1' },
      { id: '2', name: 'Option 2', description: 'Description for option 2' },
      { id: '3', name: 'Option 3', description: 'Description for option 3' },
    ];
    
    return (
      <div className="flex flex-col gap-4">
        <Button onClick={() => setIsOpen(true)}>Select an Option</Button>
        
        {selectedOption && (
          <div className="p-4 bg-info-50 text-info-700 rounded-md">
            You selected: {options.find(o => o.id === selectedOption)?.name}
          </div>
        )}
        
        <Dialog 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Select an Option</DialogTitle>
            <DialogDescription>
              Please select one of the following options.
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <div className="space-y-2">
              {options.map((option) => (
                <div 
                  key={option.id}
                  className={cn(
                    "p-4 border rounded-md cursor-pointer transition-colors",
                    selectedOption === option.id 
                      ? "border-primary-500 bg-primary-50" 
                      : "border-neutral-200 hover:border-primary-300"
                  )}
                  onClick={() => setSelectedOption(option.id)}
                >
                  <h3 className="font-medium">{option.name}</h3>
                  <p className="text-sm text-neutral-500">{option.description}</p>
                </div>
              ))}
            </div>
          </DialogBody>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={() => setIsOpen(false)}
              disabled={!selectedOption}
            >
              Confirm
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    );
  },
};

// Function to create a reusable cn utility
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
