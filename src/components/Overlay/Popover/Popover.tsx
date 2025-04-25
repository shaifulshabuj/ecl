import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils/cn';
import { BaseProps } from '../../../types/common';

// ==============================
// Popover Component
// ==============================

type PopoverPlacement = 
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end';

const popoverVariants = cva(
  'z-50 bg-white rounded-md shadow-md border border-neutral-200 p-4 max-w-[calc(100vw-1rem)] max-h-[calc(100vh-1rem)] overflow-auto',
  {
    variants: {
      placement: {
        'top': 'origin-bottom',
        'top-start': 'origin-bottom-left',
        'top-end': 'origin-bottom-right',
        'right': 'origin-left',
        'right-start': 'origin-top-left',
        'right-end': 'origin-bottom-left',
        'bottom': 'origin-top',
        'bottom-start': 'origin-top-left',
        'bottom-end': 'origin-top-right',
        'left': 'origin-right',
        'left-start': 'origin-top-right',
        'left-end': 'origin-bottom-right',
      },
      isOpen: {
        true: 'opacity-100 scale-100',
        false: 'opacity-0 scale-95 pointer-events-none',
      },
    },
    defaultVariants: {
      placement: 'bottom',
      isOpen: false,
    },
  }
);

export interface PopoverProps extends BaseProps, VariantProps<typeof popoverVariants> {
  /**
   * The reference element to position the popover
   */
  referenceElement: HTMLElement | null;
  /**
   * Whether the popover is open
   */
  isOpen?: boolean;
  /**
   * Callback when the popover is closed
   */
  onClose?: () => void;
  /**
   * The placement of the popover
   */
  placement?: PopoverPlacement;
  /**
   * Whether to close the popover when clicking outside
   */
  closeOnOutsideClick?: boolean;
  /**
   * Whether to close the popover when the escape key is pressed
   */
  closeOnEsc?: boolean;
  /**
   * The offset from the reference element in pixels
   */
  offset?: number;
  /**
   * Whether to render the popover in a portal
   */
  usePortal?: boolean;
  /**
   * ARIA label for the popover
   */
  ariaLabel?: string;
  /**
   * ARIA labelledby for the popover
   */
  ariaLabelledby?: string;
  /**
   * ARIA describedby for the popover
   */
  ariaDescribedby?: string;
}

export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      children,
      className,
      referenceElement,
      isOpen = false,
      onClose,
      placement = 'bottom',
      closeOnOutsideClick = true,
      closeOnEsc = true,
      offset = 8,
      usePortal = true,
      ariaLabel,
      ariaLabelledby,
      ariaDescribedby,
      ...props
    },
    ref
  ) => {
    // Use MutableRefObject instead of RefObject to allow assignment
    const popoverRef = useRef<HTMLDivElement | null>(null);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [container, setContainer] = useState<HTMLElement | null>(null);

    // Create portal container
    useEffect(() => {
      if (usePortal) {
        const existingContainer = document.getElementById('popover-container');
        if (existingContainer) {
          setContainer(existingContainer);
        } else {
          const newContainer = document.createElement('div');
          newContainer.id = 'popover-container';
          document.body.appendChild(newContainer);
          setContainer(newContainer);
        }

        // Cleanup on unmount
        return () => {
          const containerToRemove = document.getElementById('popover-container');
          if (containerToRemove && containerToRemove.childNodes.length === 0) {
            document.body.removeChild(containerToRemove);
          }
        };
      }
    }, [usePortal]);

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

    // Handle outside click
    useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
        if (!isOpen) return;

        const target = event.target as Node;
        const isClickInside = popoverRef.current?.contains(target) || referenceElement?.contains(target);

        if (!isClickInside && closeOnOutsideClick) {
          onClose?.();
        }
      };

      if (isOpen && closeOnOutsideClick) {
        document.addEventListener('mousedown', handleOutsideClick);
      }

      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }, [isOpen, closeOnOutsideClick, onClose, referenceElement]);

    // Calculate position
    useEffect(() => {
      if (!referenceElement || !isOpen || !popoverRef.current) return;

      const updatePosition = () => {
        if (!referenceElement || !popoverRef.current) return;

        const referenceRect = referenceElement.getBoundingClientRect();
        const popoverRect = popoverRef.current.getBoundingClientRect();

        let top = 0;
        let left = 0;

        // Calculate position based on placement
        switch (placement) {
          case 'top':
            top = referenceRect.top - popoverRect.height - offset;
            left = referenceRect.left + (referenceRect.width / 2) - (popoverRect.width / 2);
            break;
          case 'top-start':
            top = referenceRect.top - popoverRect.height - offset;
            left = referenceRect.left;
            break;
          case 'top-end':
            top = referenceRect.top - popoverRect.height - offset;
            left = referenceRect.right - popoverRect.width;
            break;
          case 'right':
            top = referenceRect.top + (referenceRect.height / 2) - (popoverRect.height / 2);
            left = referenceRect.right + offset;
            break;
          case 'right-start':
            top = referenceRect.top;
            left = referenceRect.right + offset;
            break;
          case 'right-end':
            top = referenceRect.bottom - popoverRect.height;
            left = referenceRect.right + offset;
            break;
          case 'bottom':
            top = referenceRect.bottom + offset;
            left = referenceRect.left + (referenceRect.width / 2) - (popoverRect.width / 2);
            break;
          case 'bottom-start':
            top = referenceRect.bottom + offset;
            left = referenceRect.left;
            break;
          case 'bottom-end':
            top = referenceRect.bottom + offset;
            left = referenceRect.right - popoverRect.width;
            break;
          case 'left':
            top = referenceRect.top + (referenceRect.height / 2) - (popoverRect.height / 2);
            left = referenceRect.left - popoverRect.width - offset;
            break;
          case 'left-start':
            top = referenceRect.top;
            left = referenceRect.left - popoverRect.width - offset;
            break;
          case 'left-end':
            top = referenceRect.bottom - popoverRect.height;
            left = referenceRect.left - popoverRect.width - offset;
            break;
          default:
            top = referenceRect.bottom + offset;
            left = referenceRect.left + (referenceRect.width / 2) - (popoverRect.width / 2);
        }

        // Ensure popover stays within viewport
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Adjust horizontally if needed
        if (left < 10) {
          left = 10;
        } else if (left + popoverRect.width > viewportWidth - 10) {
          left = viewportWidth - popoverRect.width - 10;
        }

        // Adjust vertically if needed
        if (top < 10) {
          top = 10;
        } else if (top + popoverRect.height > viewportHeight - 10) {
          top = viewportHeight - popoverRect.height - 10;
        }

        setPosition({ top, left });
      };

      updatePosition();

      // Update position on scroll and resize
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);

      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    }, [referenceElement, isOpen, placement, offset]);

    const popoverContent = (
      <div
        ref={(node) => {
          // Handle the forwarded ref properly
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            // We can't directly assign to ref.current as it's read-only in TypeScript
            // This is a workaround that's commonly used in React libraries
            (ref as any).current = node;
          }
          
          // Set our internal ref (using the same technique)
          popoverRef.current = node;
        }}
        role="dialog"
        aria-modal="false"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        className={cn(popoverVariants({ placement, isOpen }), className)}
        style={{
          position: 'fixed',
          top: `${position.top}px`,
          left: `${position.left}px`,
          zIndex: 1000,
          transition: 'opacity 150ms ease-in-out, transform 150ms ease-in-out',
        }}
        {...props}
      >
        {children}
      </div>
    );

    if (!isOpen) return null;

    if (usePortal && container) {
      return createPortal(popoverContent, container);
    }

    return popoverContent;
  }
);

Popover.displayName = 'Popover';

// ==============================
// Popover Trigger
// ==============================

export interface PopoverTriggerProps extends BaseProps {
  /**
   * Callback when the trigger is clicked
   */
  onClick?: () => void;
}

export const PopoverTrigger = React.forwardRef<HTMLDivElement, PopoverTriggerProps>(
  (
    {
      className,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn('inline-block', className)}
        onClick={onClick}
        {...props}
      >
        {children}
      </div>
    );
  }
);

PopoverTrigger.displayName = 'PopoverTrigger';

// ==============================
// Popover Content
// ==============================

export interface PopoverContentProps extends BaseProps {}

export const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
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
        className={cn('', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

PopoverContent.displayName = 'PopoverContent';

// ==============================
// Popover Header
// ==============================

export interface PopoverHeaderProps extends BaseProps {}

export const PopoverHeader = React.forwardRef<HTMLDivElement, PopoverHeaderProps>(
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
        className={cn('mb-2 pb-2 border-b border-neutral-200', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

PopoverHeader.displayName = 'PopoverHeader';

// ==============================
// Popover Body
// ==============================

export interface PopoverBodyProps extends BaseProps {}

export const PopoverBody = React.forwardRef<HTMLDivElement, PopoverBodyProps>(
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
        className={cn('', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

PopoverBody.displayName = 'PopoverBody';

// ==============================
// Popover Footer
// ==============================

export interface PopoverFooterProps extends BaseProps {}

export const PopoverFooter = React.forwardRef<HTMLDivElement, PopoverFooterProps>(
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
        className={cn('mt-2 pt-2 border-t border-neutral-200', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

PopoverFooter.displayName = 'PopoverFooter';

// ==============================
// Popover Arrow
// ==============================

export interface PopoverArrowProps extends BaseProps {
  /**
   * The placement of the popover
   */
  placement?: PopoverPlacement;
}

export const PopoverArrow = React.forwardRef<HTMLDivElement, PopoverArrowProps>(
  (
    {
      className,
      placement = 'bottom',
      ...props
    },
    ref
  ) => {
    const arrowStyles: React.CSSProperties = {
      position: 'absolute',
      width: '8px',
      height: '8px',
      transform: 'rotate(45deg)',
      backgroundColor: 'white',
      border: '1px solid #e5e5e5',
    };

    // Position the arrow based on placement
    if (placement.startsWith('top')) {
      arrowStyles.bottom = '-4px';
      arrowStyles.borderTop = 'none';
      arrowStyles.borderLeft = 'none';
    } else if (placement.startsWith('right')) {
      arrowStyles.left = '-4px';
      arrowStyles.borderRight = 'none';
      arrowStyles.borderTop = 'none';
    } else if (placement.startsWith('bottom')) {
      arrowStyles.top = '-4px';
      arrowStyles.borderBottom = 'none';
      arrowStyles.borderRight = 'none';
    } else if (placement.startsWith('left')) {
      arrowStyles.right = '-4px';
      arrowStyles.borderLeft = 'none';
      arrowStyles.borderBottom = 'none';
    }

    // Adjust horizontal position
    if (placement === 'top' || placement === 'bottom') {
      arrowStyles.left = '50%';
      arrowStyles.marginLeft = '-4px';
    } else if (placement === 'top-start' || placement === 'bottom-start') {
      arrowStyles.left = '12px';
    } else if (placement === 'top-end' || placement === 'bottom-end') {
      arrowStyles.right = '12px';
    }

    // Adjust vertical position
    if (placement === 'left' || placement === 'right') {
      arrowStyles.top = '50%';
      arrowStyles.marginTop = '-4px';
    } else if (placement === 'left-start' || placement === 'right-start') {
      arrowStyles.top = '12px';
    } else if (placement === 'left-end' || placement === 'right-end') {
      arrowStyles.bottom = '12px';
    }

    return (
      <div
        ref={ref}
        className={cn('', className)}
        style={arrowStyles}
        {...props}
      />
    );
  }
);

PopoverArrow.displayName = 'PopoverArrow';
