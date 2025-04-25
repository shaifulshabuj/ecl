import React, { useState, useEffect, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils/cn';
import { BaseProps } from '../../../types/common';

// ==============================
// Toast Context
// ==============================

type ToastPosition = 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';

interface ToastContextType {
  addToast: (toast: Omit<ToastProps, 'id'>) => string;
  removeToast: (id: string) => void;
  updateToast: (id: string, toast: Partial<Omit<ToastProps, 'id'>>) => void;
  toasts: ToastProps[];
  position: ToastPosition;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// ==============================
// Toast Provider
// ==============================

export interface ToastProviderProps {
  /**
   * Children components
   */
  children: React.ReactNode;
  /**
   * Position of the toasts
   */
  position?: ToastPosition;
  /**
   * Maximum number of toasts to display at once
   */
  maxToasts?: number;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = 'bottom-right',
  maxToasts = 5,
}) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Create container for toasts if it doesn't exist
    const existingContainer = document.getElementById('toast-container');
    if (existingContainer) {
      setContainer(existingContainer);
    } else {
      const newContainer = document.createElement('div');
      newContainer.id = 'toast-container';
      document.body.appendChild(newContainer);
      setContainer(newContainer);
    }

    // Cleanup on unmount
    return () => {
      const containerToRemove = document.getElementById('toast-container');
      if (containerToRemove && containerToRemove.childNodes.length === 0) {
        document.body.removeChild(containerToRemove);
      }
    };
  }, []);

  // Add a new toast
  const addToast = (toast: Omit<ToastProps, 'id'>): string => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastProps = {
      ...toast,
      id,
    };

    setToasts((prevToasts) => {
      // Limit the number of toasts
      const updatedToasts = [...prevToasts, newToast];
      if (updatedToasts.length > maxToasts) {
        return updatedToasts.slice(updatedToasts.length - maxToasts);
      }
      return updatedToasts;
    });

    // Auto-dismiss if duration is provided
    if (toast.duration && toast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration);
    }

    return id;
  };

  // Remove a toast by id
  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  // Update an existing toast
  const updateToast = (id: string, toast: Partial<Omit<ToastProps, 'id'>>) => {
    setToasts((prevToasts) =>
      prevToasts.map((prevToast) =>
        prevToast.id === id ? { ...prevToast, ...toast } : prevToast
      )
    );
  };

  const contextValue: ToastContextType = {
    addToast,
    removeToast,
    updateToast,
    toasts,
    position,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {container &&
        createPortal(<ToastContainer position={position} toasts={toasts} />, container)}
    </ToastContext.Provider>
  );
};

// ==============================
// Toast Container
// ==============================

interface ToastContainerProps {
  position: ToastPosition;
  toasts: ToastProps[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ position, toasts }) => {
  const positionClasses = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'top-center': 'top-0 left-1/2 -translate-x-1/2',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2',
  };

  const isTop = position.startsWith('top');

  return (
    <div
      className={cn(
        'fixed z-50 flex flex-col p-4 gap-2 max-h-screen overflow-hidden w-full max-w-md',
        positionClasses[position],
        isTop ? 'flex-col-reverse' : 'flex-col'
      )}
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
};

// ==============================
// Toast Component
// ==============================

const toastVariants = cva(
  'relative flex w-full items-center justify-between overflow-hidden rounded-md border p-4 pr-8 shadow-md transition-all data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default: 'bg-white border-neutral-200 text-neutral-900',
        primary: 'bg-primary-50 border-primary-200 text-primary-900',
        secondary: 'bg-secondary-50 border-secondary-200 text-secondary-900',
        success: 'bg-success-50 border-success-200 text-success-900',
        warning: 'bg-warning-50 border-warning-200 text-warning-900',
        danger: 'bg-danger-50 border-danger-200 text-danger-900',
        info: 'bg-info-50 border-info-200 text-info-900',
      },
      hasIcon: {
        true: 'pl-10',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      hasIcon: false,
    },
  }
);

export interface ToastProps extends BaseProps, VariantProps<typeof toastVariants> {
  /**
   * Unique identifier for the toast
   */
  id?: string;
  /**
   * Title of the toast
   */
  title?: string;
  /**
   * Description of the toast
   */
  description?: React.ReactNode;
  /**
   * Action component to render
   */
  action?: React.ReactNode;
  /**
   * Duration in milliseconds before the toast is automatically dismissed
   */
  duration?: number;
  /**
   * Whether the toast can be dismissed
   */
  dismissible?: boolean;
  /**
   * Callback when the toast is dismissed
   */
  onDismiss?: () => void;
  /**
   * Icon to display in the toast
   */
  icon?: React.ReactNode;
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      id,
      className,
      variant,
      title,
      description,
      action,
      dismissible = true,
      onDismiss,
      icon,
      hasIcon,
      ...props
    },
    ref
  ) => {
    const { removeToast } = useToast();

    const handleDismiss = () => {
      if (id) removeToast(id);
      onDismiss?.();
    };

    return (
      <div
        ref={ref}
        className={cn(
          toastVariants({
            variant,
            hasIcon: !!icon,
          }),
          className
        )}
        data-state="open"
        {...props}
      >
        {icon && <span className="absolute left-4 top-4">{icon}</span>}
        <div className="grid gap-1">
          {title && <ToastTitle>{title}</ToastTitle>}
          {description && <ToastDescription>{description}</ToastDescription>}
        </div>
        {action && <div className="ml-auto pl-4">{action}</div>}
        {dismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            className="absolute right-2 top-2 rounded-md p-1 text-neutral-500 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2"
            aria-label="Close"
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
        )}
      </div>
    );
  }
);

Toast.displayName = 'Toast';

// ==============================
// Toast Title
// ==============================

export interface ToastTitleProps extends BaseProps {}

export const ToastTitle = React.forwardRef<HTMLDivElement, ToastTitleProps>(
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
        className={cn('text-sm font-semibold', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ToastTitle.displayName = 'ToastTitle';

// ==============================
// Toast Description
// ==============================

export interface ToastDescriptionProps extends BaseProps {}

export const ToastDescription = React.forwardRef<HTMLDivElement, ToastDescriptionProps>(
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
        className={cn('text-sm opacity-90', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ToastDescription.displayName = 'ToastDescription';
