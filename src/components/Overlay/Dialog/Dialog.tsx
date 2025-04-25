import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils/cn';
import { BaseProps } from '../../../types/common';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  type ModalProps
} from '../Modal/Modal';

// ==============================
// Dialog Component
// ==============================

export interface DialogProps extends Omit<ModalProps, 'size'>, VariantProps<typeof dialogVariants> {
  /**
   * The variant of the dialog
   */
  variant?: 'default' | 'destructive' | 'info' | 'warning' | 'success';
}

const dialogVariants = cva('', {
  variants: {
    variant: {
      default: '',
      destructive: '',
      info: '',
      warning: '',
      success: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      children,
      className,
      variant,
      ...props
    },
    ref
  ) => {
    return (
      <Modal
        ref={ref}
        className={cn(dialogVariants({ variant }), className)}
        size="sm"
        {...props}
      >
        {children}
      </Modal>
    );
  }
);

Dialog.displayName = 'Dialog';

// ==============================
// Dialog Header
// ==============================

export const DialogHeader = ModalHeader;
DialogHeader.displayName = 'DialogHeader';

// ==============================
// Dialog Title
// ==============================

export const DialogTitle = ModalTitle;
DialogTitle.displayName = 'DialogTitle';

// ==============================
// Dialog Description
// ==============================

export const DialogDescription = ModalDescription;
DialogDescription.displayName = 'DialogDescription';

// ==============================
// Dialog Body
// ==============================

export const DialogBody = ModalBody;
DialogBody.displayName = 'DialogBody';

// ==============================
// Dialog Footer
// ==============================

export const DialogFooter = ModalFooter;
DialogFooter.displayName = 'DialogFooter';

// ==============================
// Dialog Close Button
// ==============================

export interface DialogCloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, BaseProps {
  /**
   * Callback when the button is clicked
   */
  onClose?: () => void;
}

export const DialogCloseButton = React.forwardRef<HTMLButtonElement, DialogCloseButtonProps>(
  (props, ref) => {
    return <ModalCloseButton ref={ref} {...props} />;
  }
);

DialogCloseButton.displayName = 'DialogCloseButton';

// ==============================
// Dialog Actions
// ==============================

export interface DialogActionsProps extends BaseProps {
  /**
   * The primary action button
   */
  primaryAction?: React.ReactNode;
  /**
   * The secondary action button
   */
  secondaryAction?: React.ReactNode;
  /**
   * Alignment of the actions
   */
  align?: 'start' | 'center' | 'end';
  /**
   * Direction of the actions
   */
  direction?: 'row' | 'column';
}

export const DialogActions = React.forwardRef<HTMLDivElement, DialogActionsProps>(
  (
    {
      className,
      primaryAction,
      secondaryAction,
      align = 'end',
      direction = 'row',
      children,
      ...props
    },
    ref
  ) => {
    const alignmentClasses = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
    };

    const directionClasses = {
      row: 'flex-row space-x-2',
      column: 'flex-col-reverse space-y-2 space-y-reverse',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex mt-6',
          alignmentClasses[align],
          directionClasses[direction],
          className
        )}
        {...props}
      >
        {secondaryAction}
        {primaryAction}
        {children}
      </div>
    );
  }
);

DialogActions.displayName = 'DialogActions';
