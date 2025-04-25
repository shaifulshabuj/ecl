import { ReactNode } from 'react';

/**
 * Common size variants used across multiple components
 */
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Common variant types for components with different visual styles
 */
export type Variant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'outline' | 'ghost';

/**
 * Base props that can be applied to any component
 */
export interface BaseProps {
  /** Additional class names to apply to the component */
  className?: string;
  /** Children elements */
  children?: ReactNode;
  /** ID attribute for the component */
  id?: string;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** Data attributes for testing or custom attributes */
  [key: `data-${string}`]: string | undefined;
}

/**
 * Animation states for components with transitions
 */
export type AnimationState = 'enter' | 'leave' | 'idle';

/**
 * Status types for components that display state
 */
export type Status = 'idle' | 'loading' | 'success' | 'error';

/**
 * Alignment options
 */
export type Alignment = 'left' | 'center' | 'right';

/**
 * Direction options
 */
export type Direction = 'horizontal' | 'vertical';

/**
 * Position options
 */
export type Position = 'top' | 'right' | 'bottom' | 'left' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
