import React, { ReactElement } from 'react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { render } from './testUtils';

expect.extend(toHaveNoViolations);

/**
 * Tests a component for accessibility violations using jest-axe
 * 
 * @param ui The React element to test
 * @param options Optional configuration options for the test
 * @returns A promise that resolves when the test is complete
 * 
 * @example
 * ```tsx
 * it('should have no accessibility violations', async () => {
 *   await testA11y(<Button>Accessible Button</Button>);
 * });
 * ```
 */
export const testA11y = async (
  ui: ReactElement,
  options?: {
    axeOptions?: Parameters<typeof axe>[1];
    renderOptions?: Parameters<typeof render>[1];
  }
) => {
  const { axeOptions, renderOptions } = options || {};
  const { container } = render(ui, renderOptions);
  
  const results = await axe(container, axeOptions);
  expect(results).toHaveNoViolations();
};
