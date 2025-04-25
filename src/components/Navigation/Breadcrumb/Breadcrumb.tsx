import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils/cn';
import { BaseProps } from '../../../types/common';

// ==============================
// Breadcrumb Container
// ==============================

const breadcrumbVariants = cva(
  'flex items-center',
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
      spacing: {
        sm: 'space-x-1',
        md: 'space-x-2',
        lg: 'space-x-3',
      },
    },
    defaultVariants: {
      size: 'md',
      spacing: 'md',
    },
  }
);

export interface BreadcrumbProps extends BaseProps, VariantProps<typeof breadcrumbVariants> {
  /**
   * Custom separator between breadcrumb items
   */
  separator?: React.ReactNode;
  /**
   * Whether to show the home icon
   */
  showHomeIcon?: boolean;
  /**
   * Custom home icon
   */
  homeIcon?: React.ReactNode;
  /**
   * ARIA label for the breadcrumb navigation
   */
  ariaLabel?: string;
}

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      children,
      className,
      size,
      spacing,
      separator = '/',
      showHomeIcon = false,
      homeIcon,
      ariaLabel = 'Breadcrumb',
      ...props
    },
    ref
  ) => {
    // Default home icon if showHomeIcon is true and no custom icon is provided
    const defaultHomeIcon = (
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
        aria-hidden="true"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
    );

    // Clone children to inject separator and props
    const items = React.Children.toArray(children).filter(Boolean);
    
    const clonedChildren = items.map((child, index) => {
      if (!React.isValidElement(child)) return child;
      
      // Add separator between items
      const isLast = index === items.length - 1;
      
      // Pass size prop to BreadcrumbItem
      const childProps = {
        ...child.props,
        size,
        isLast,
      };
      
      return (
        <React.Fragment key={child.key || index}>
          {React.cloneElement(child, childProps)}
          {!isLast && (
            <li 
              className="flex items-center text-neutral-400" 
              aria-hidden="true"
            >
              {separator}
            </li>
          )}
        </React.Fragment>
      );
    });

    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        className={cn(breadcrumbVariants({ size, spacing }), className)}
        {...props}
      >
        <ol className="flex items-center">
          {showHomeIcon && (
            <li className="flex items-center">
              <BreadcrumbItem href="/" size={size} isLast={items.length === 0}>
                {homeIcon || defaultHomeIcon}
              </BreadcrumbItem>
              {items.length > 0 && (
                <span className="flex items-center text-neutral-400" aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          )}
          {clonedChildren}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

// ==============================
// Breadcrumb Item
// ==============================

const breadcrumbItemVariants = cva(
  'flex items-center',
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
      isLast: {
        true: 'font-medium text-neutral-900',
        false: 'text-neutral-600 hover:text-neutral-900 hover:underline',
      },
    },
    defaultVariants: {
      size: 'md',
      isLast: false,
    },
  }
);

export interface BreadcrumbItemProps extends BaseProps, VariantProps<typeof breadcrumbItemVariants> {
  /**
   * The URL the breadcrumb item links to
   */
  href?: string;
  /**
   * Whether this is the last item in the breadcrumb
   * @internal
   */
  isLast?: boolean;
  /**
   * Icon to display before the item text
   */
  icon?: React.ReactNode;
  /**
   * Click handler
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement | HTMLSpanElement>) => void;
}

export const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  (
    {
      children,
      className,
      size,
      href,
      isLast = false,
      icon,
      onClick,
      ...props
    },
    ref
  ) => {
    const content = (
      <>
        {icon && <span className="mr-1">{icon}</span>}
        {children}
      </>
    );

    return (
      <li
        ref={ref}
        className={cn(
          breadcrumbItemVariants({ size, isLast }),
          className
        )}
        {...props}
      >
        {isLast ? (
          <span 
            className="flex items-center" 
            aria-current="page"
          >
            {content}
          </span>
        ) : (
          <a
            href={href}
            className="flex items-center"
            onClick={onClick}
          >
            {content}
          </a>
        )}
      </li>
    );
  }
);

BreadcrumbItem.displayName = 'BreadcrumbItem';

// BreadcrumbItem is exported individually above
