import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * A utility function that merges multiple class values (including conditional ones)
 * and properly handles Tailwind class conflicts using twMerge
 * 
 * @param inputs - Class values to be merged (strings, objects, arrays, or falsy values)
 * @returns A string of merged and optimized class names
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <div className={cn('text-red-500', 'bg-blue-500')}>
 * 
 * // With conditional classes
 * <div className={cn('base-class', isActive && 'active-class')}>
 * 
 * // With object syntax
 * <div className={cn('base-class', { 'active-class': isActive, 'disabled-class': isDisabled })}>
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
