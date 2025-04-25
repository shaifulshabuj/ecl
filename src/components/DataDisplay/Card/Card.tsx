import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils/cn';
import { BaseProps } from '../../../types/common';

// ==============================
// Card Container
// ==============================

const cardVariants = cva(
  'rounded-lg border bg-card text-card-foreground shadow-sm',
  {
    variants: {
      variant: {
        default: 'bg-white border-neutral-200',
        primary: 'bg-primary-50 border-primary-200',
        secondary: 'bg-secondary-50 border-secondary-200',
        success: 'bg-success-50 border-success-200',
        warning: 'bg-warning-50 border-warning-200',
        danger: 'bg-danger-50 border-danger-200',
        info: 'bg-info-50 border-info-200',
      },
      size: {
        sm: 'p-3',
        md: 'p-5',
        lg: 'p-6',
      },
      bordered: {
        true: 'border',
        false: 'border-0',
      },
      hoverable: {
        true: 'transition-shadow duration-200 hover:shadow-md',
      },
      clickable: {
        true: 'cursor-pointer active:translate-y-0.5 transition-transform duration-200',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      bordered: true,
    },
  }
);

export interface CardProps extends BaseProps, VariantProps<typeof cardVariants> {
  /**
   * Whether the card has a hover effect
   */
  hoverable?: boolean;
  /**
   * Whether the card is clickable
   */
  clickable?: boolean;
  /**
   * Click handler for the card
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /**
   * Whether the card is selected
   */
  selected?: boolean;
  /**
   * Whether the card is disabled
   */
  disabled?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      className,
      variant,
      size,
      bordered,
      hoverable,
      clickable,
      onClick,
      selected,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({
            variant,
            size,
            bordered,
            hoverable: !disabled && hoverable,
            clickable: !disabled && clickable,
          }),
          selected && 'ring-2 ring-primary-500',
          disabled && 'opacity-60 cursor-not-allowed',
          className
        )}
        onClick={!disabled && onClick ? onClick : undefined}
        tabIndex={!disabled && clickable ? 0 : undefined}
        role={clickable ? 'button' : undefined}
        aria-disabled={disabled}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// ==============================
// Card Header
// ==============================

export interface CardHeaderProps extends BaseProps {}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  (
    {
      children,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col space-y-1.5 pb-4', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

// ==============================
// Card Title
// ==============================

export interface CardTitleProps extends BaseProps {
  /**
   * HTML tag to render
   */
  as?: React.ElementType;
}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  (
    {
      children,
      className,
      as: Component = 'h3',
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn('text-lg font-semibold leading-none tracking-tight', className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

CardTitle.displayName = 'CardTitle';

// ==============================
// Card Description
// ==============================

export interface CardDescriptionProps extends BaseProps {}

export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  (
    {
      children,
      className,
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

CardDescription.displayName = 'CardDescription';

// ==============================
// Card Content
// ==============================

export interface CardContentProps extends BaseProps {}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  (
    {
      children,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn('py-2', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardContent.displayName = 'CardContent';

// ==============================
// Card Footer
// ==============================

export interface CardFooterProps extends BaseProps {}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  (
    {
      children,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center pt-4', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

// ==============================
// Card Image
// ==============================

export interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement>, BaseProps {
  /**
   * Image position
   */
  position?: 'top' | 'bottom';
}

export const CardImage = React.forwardRef<HTMLImageElement, CardImageProps>(
  (
    {
      children,
      className,
      position = 'top',
      alt = '',
      ...props
    },
    ref
  ) => {
    const positionClasses = {
      top: 'rounded-t-lg -mt-5 -mx-5 mb-5',
      bottom: 'rounded-b-lg -mb-5 -mx-5 mt-5',
    };

    return (
      <img
        ref={ref}
        className={cn(
          'w-full object-cover',
          positionClasses[position],
          className
        )}
        alt={alt}
        {...props}
      />
    );
  }
);

CardImage.displayName = 'CardImage';

// ==============================
// Card Actions
// ==============================

export interface CardActionsProps extends BaseProps {
  /**
   * Alignment of the actions
   */
  align?: 'left' | 'center' | 'right' | 'between' | 'around' | 'evenly';
}

export const CardActions = React.forwardRef<HTMLDivElement, CardActionsProps>(
  (
    {
      children,
      className,
      align = 'right',
      ...props
    },
    ref
  ) => {
    const alignmentClasses = {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-2 pt-4',
          alignmentClasses[align],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardActions.displayName = 'CardActions';

// Components are exported individually above
