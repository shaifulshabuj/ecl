# ECL Component Library Testing Guide

This document outlines the testing approach for the Enterprise Component Library (ECL).

## Testing Philosophy

Our testing approach follows these principles:

1. **Component Testing First**: Focus on individual component testing to ensure each building block works correctly.
2. **Accessibility by Default**: All components must pass accessibility tests.
3. **Visual Consistency**: Visual regression testing ensures consistent appearance.
4. **Test Close to User Behavior**: Tests should simulate real user interactions.
5. **Comprehensive Coverage**: Aim for high test coverage without testing implementation details.

## Testing Tools

- **Jest**: JavaScript testing framework
- **React Testing Library**: Testing utilities for React components
- **Jest Axe**: Accessibility testing for Jest
- **User Event**: Simulating user interactions
- **Storybook**: Visual testing through stories

## Test Types

### 1. Unit Tests

Unit tests verify that individual components work correctly in isolation. For each component, we test:

- Rendering with default props
- Prop variations
- State changes
- Event handling
- Edge cases

Files: `*.test.tsx`

### 2. Accessibility Tests

Accessibility tests ensure our components meet WCAG standards:

- Color contrast
- Keyboard navigation
- Screen reader compatibility
- ARIA attributes
- Focus management

Files: `*.a11y.test.tsx`

### 3. Visual Tests (via Storybook)

Visual tests ensure the appearance of components remains consistent:

- Default appearance
- Different states (hover, focus, disabled)
- Responsive behavior
- Theme variations

Files: `*.stories.tsx`

## Test Structure

Each component should have:

1. **Unit Tests**: Testing functionality and behavior
2. **Accessibility Tests**: Testing a11y compliance
3. **Storybook Stories**: Testing visual appearance

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run accessibility tests only
npm run test:a11y
```

## Test Utilities

### 1. Custom Render Function

```tsx
// src/utils/test/testUtils.tsx
import { render } from '@testing-library/react';

const customRender = (ui, options) => {
  // Wraps the component with necessary providers
  return render(ui, { wrapper: ThemeProvider, ...options });
};

export { customRender as render };
```

### 2. Accessibility Test Utility

```tsx
// src/utils/test/a11yTest.tsx
import { axe } from 'jest-axe';

const testA11y = async (ui, options) => {
  // Tests the component for accessibility violations
  const { container } = render(ui, options);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
};
```

## Best Practices

1. **Use Data Attributes for Testing**: Use `data-testid` for elements that don't have accessible roles or text.
2. **Test User Interactions**: Use `userEvent` over `fireEvent` for simulating user actions.
3. **Test Accessibility for All Variants**: Each component variant should be tested for accessibility.
4. **Test Edge Cases**: Include tests for error states, loading states, and empty states.
5. **Avoid Implementation Details**: Test what the user sees and interacts with, not internal implementation.
6. **Mock External Dependencies**: Use Jest mocks for external dependencies.
7. **Keep Tests DRY**: Use setup and cleanup functions to reduce duplication.

## Continuous Integration

Tests run automatically in CI pipelines:
- On pull requests
- Before deployments
- With coverage reports

## Coverage Goals

- Unit Tests: 90%+
- Accessibility Tests: 100% of components

## Example Test

```tsx
// src/components/Button/Button.test.tsx
import { render, screen, userEvent } from '../../utils/test/testUtils';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```
