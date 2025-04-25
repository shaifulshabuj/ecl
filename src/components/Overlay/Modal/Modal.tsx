import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils/cn';
import { BaseProps } from '../../../types/common';

// ==============================
// Modal Overlay
// ==============================

const modalOverlayVariants = cva(
  'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity',
  {
    variants: {
      isOpen: {
        true: 'opacity-100',
        false: 'opacity-0 pointer-events-none',
      },
    },
    defaultVariants: {
      isOpen: false,
    },
  }
);

export interface ModalOverlayProps extends BaseProps, VariantProps<typeof modalOverlayVariants> {
  /**
   * Whether the modal is open
   */
  isOpen?: boolean;
  /**
   * Callback when the overlay is clicked
   */
  onClick?: () => void;
}

export const ModalOverlay = React.forwardRef<HTMLDivElement, ModalOverlayProps>(
  (
    {
      className,
      isOpen,
      onClick,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(modalOverlayVariants({ isOpen }), className)}
        onClick={onClick}
        {...props}
      />
    );
  }
);

ModalOverlay.displayName = 'ModalOverlay';

// ==============================
// Modal Container
// ==============================

const modalVariants = cva(
  'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-lg',
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        full: 'max-w-full mx-4',
      },
      isOpen: {
        true: 'opacity-100',
        false: 'opacity-0 pointer-events-none',
      },
    },
    defaultVariants: {
      size: 'md',
      isOpen: false,
    },
  }
);

export interface ModalProps extends BaseProps, VariantProps<typeof modalVariants> {
  /**
   * Whether the modal is open
   */
  isOpen?: boolean;
  /**
   * Callback when the modal is closed
   */
  onClose?: () => void;
  /**
   * Whether to close the modal when the escape key is pressed
   */
  closeOnEsc?: boolean;
  /**
   * Whether to close the modal when clicking outside
   */
  closeOnOverlayClick?: boolean;
  /**
   * Whether to render the modal in a portal
   */
  usePortal?: boolean;
  /**
   * ID for the modal
   */
  id?: string;
  /**
   * ARIA label for the modal
   */
  ariaLabel?: string;
  /**
   * ARIA labelledby for the modal
   */
  ariaLabelledby?: string;
  /**
   * ARIA describedby for the modal
   */
  ariaDescribedby?: string;
  /**
   * Whether to trap focus within the modal
   */
  trapFocus?: boolean;
  /**
   * Whether to return focus to the element that had focus before the modal was opened
   */
  returnFocus?: boolean;
  /**
   * Whether to block scrolling when the modal is open
   */
  blockScroll?: boolean;
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      children,
      className,
      isOpen = false,
      onClose,
      closeOnEsc = true,
      closeOnOverlayClick = true,
      usePortal = true,
      size,
      id,
      ariaLabel,
      ariaLabelledby,
      ariaDescribedby,
      trapFocus = true,
      returnFocus = true,
      blockScroll = true,
      ...props
    },
    ref
  ) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);

    // Handle escape key press
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && isOpen && closeOnEsc) {
          onClose?.();
        }
      };

      if (isOpen) {
        document.addEventListener('keydown', handleKeyDown);
      }

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [isOpen, closeOnEsc, onClose]);

    // Handle focus trapping
    useEffect(() => {
      if (!isOpen || !trapFocus) return;

      const handleFocusTrap = (event: KeyboardEvent) => {
        if (event.key !== 'Tab') return;

        if (!modalRef.current) return;

        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        // If shift + tab and on first element, move to last element
        if (event.shiftKey && document.activeElement === firstElement) {
          lastElement.focus();
          event.preventDefault();
        }
        // If tab and on last element, move to first element
        else if (!event.shiftKey && document.activeElement === lastElement) {
          firstElement.focus();
          event.preventDefault();
        }
      };

      document.addEventListener('keydown', handleFocusTrap);

      return () => {
        document.removeEventListener('keydown', handleFocusTrap);
      };
    }, [isOpen, trapFocus]);

    // Handle focus management
    useEffect(() => {
      if (isOpen && trapFocus) {
        previousFocusRef.current = document.activeElement as HTMLElement;

        // Focus the first focusable element in the modal
        setTimeout(() => {
          if (modalRef.current) {
            const focusableElements = modalRef.current.querySelectorAll(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (focusableElements.length > 0) {
              (focusableElements[0] as HTMLElement).focus();
            } else {
              modalRef.current.focus();
            }
          }
        }, 0);
      }

      return () => {
        if (isOpen && returnFocus && previousFocusRef.current) {
          setTimeout(() => {
            previousFocusRef.current?.focus();
          }, 0);
        }
      };
    }, [isOpen, trapFocus, returnFocus]);

    // Handle scroll blocking
    useEffect(() => {
      if (isOpen && blockScroll) {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';

        return () => {
          document.body.style.overflow = originalStyle;
        };
      }
    }, [isOpen, blockScroll]);

    // Handle overlay click
    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget && closeOnOverlayClick) {
        onClose?.();
      }
    };

    const modalContent = (
      <>
        <ModalOverlay isOpen={isOpen} onClick={closeOnOverlayClick ? onClose : undefined} />
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          aria-describedby={ariaDescribedby}
          id={id}
          className={cn(modalVariants({ size, isOpen }), className)}
          onClick={handleOverlayClick}
          tabIndex={-1}
          {...props}
        >
          {children}
        </div>
      </>
    );

    if (!isOpen) return null;

    if (usePortal) {
      return createPortal(modalContent, document.body);
    }

    return modalContent;
  }
);

Modal.displayName = 'Modal';

// ==============================
// Modal Header
// ==============================

export interface ModalHeaderProps extends BaseProps {}

export const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  (
    {
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ModalHeader.displayName = 'ModalHeader';

// ==============================
// Modal Title
// ==============================

export interface ModalTitleProps extends BaseProps {}

export const ModalTitle = React.forwardRef<HTMLHeadingElement, ModalTitleProps>(
  (
    {
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <h2
        ref={ref}
        className={cn('text-lg font-semibold leading-none tracking-tight', className)}
        {...props}
      >
        {children}
      </h2>
    );
  }
);

ModalTitle.displayName = 'ModalTitle';

// ==============================
// Modal Description
// ==============================

export interface ModalDescriptionProps extends BaseProps {}

export const ModalDescription = React.forwardRef<HTMLParagraphElement, ModalDescriptionProps>(
  (
    {
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <p
        ref={ref}
        className={cn('text-sm text-neutral-500', className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);

ModalDescription.displayName = 'ModalDescription';

// ==============================
// Modal Body
// ==============================

export interface ModalBodyProps extends BaseProps {}

export const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(
  (
    {
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn('py-4', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ModalBody.displayName = 'ModalBody';

// ==============================
// Modal Footer
// ==============================

export interface ModalFooterProps extends BaseProps {}

export const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
  (
    {
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ModalFooter.displayName = 'ModalFooter';

// ==============================
// Modal Close Button
// ==============================

export interface ModalCloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, BaseProps {
  /**
   * Callback when the button is clicked
   */
  onClose?: () => void;
}

export const ModalCloseButton = React.forwardRef<HTMLButtonElement, ModalCloseButtonProps>(
  (
    {
      className,
      onClose,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 disabled:pointer-events-none',
          className
        )}
        onClick={onClose}
        aria-label="Close"
        type="button"
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    );
  }
);

ModalCloseButton.displayName = 'ModalCloseButton';
