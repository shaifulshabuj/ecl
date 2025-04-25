# Accessibility Guidelines

## Overview

The Enterprise Component Library (ECL) is committed to creating accessible components that follow the Web Content Accessibility Guidelines (WCAG) 2.1 AA standards. This document provides guidelines for using ECL components in an accessible manner.

## Core Principles

### 1. Perceivable

Information and user interface components must be presentable to users in ways they can perceive.

- **Text Alternatives**: Provide text alternatives for non-text content
- **Time-based Media**: Provide alternatives for time-based media
- **Adaptable**: Create content that can be presented in different ways
- **Distinguishable**: Make it easier for users to see and hear content

### 2. Operable

User interface components and navigation must be operable.

- **Keyboard Accessible**: Make all functionality available from a keyboard
- **Enough Time**: Provide users enough time to read and use content
- **Seizures and Physical Reactions**: Do not design content in a way that is known to cause seizures
- **Navigable**: Provide ways to help users navigate, find content, and determine where they are

### 3. Understandable

Information and the operation of user interface must be understandable.

- **Readable**: Make text content readable and understandable
- **Predictable**: Make web pages appear and operate in predictable ways
- **Input Assistance**: Help users avoid and correct mistakes

### 4. Robust

Content must be robust enough that it can be interpreted by a wide variety of user agents, including assistive technologies.

- **Compatible**: Maximize compatibility with current and future user agents, including assistive technologies

## Component-Specific Guidelines

### Buttons

- Always provide a descriptive label that clearly indicates the button's action
- Use the `aria-label` attribute when a button has only an icon
- Ensure buttons have sufficient color contrast (4.5:1 for normal text, 3:1 for large text)
- Provide a visible focus state for keyboard navigation

```tsx
// Good
<Button aria-label="Close dialog">
  <CloseIcon />
</Button>

// Bad
<Button>
  <CloseIcon />
</Button>
```

### Forms

- Associate labels with form controls using the `htmlFor` attribute
- Group related form controls with `fieldset` and `legend`
- Provide clear error messages and validation feedback
- Use `aria-describedby` to associate error messages with form controls
- Ensure form controls have sufficient color contrast

```tsx
// Good
<FormGroup>
  <Label htmlFor="email">Email</Label>
  <Input 
    id="email" 
    type="email" 
    aria-describedby="email-error"
    aria-invalid={hasError}
  />
  {hasError && (
    <FormError id="email-error">
      Please enter a valid email address
    </FormError>
  )}
</FormGroup>

// Bad
<div>
  <label>Email</label>
  <input type="email" />
  {hasError && <div>Please enter a valid email address</div>}
</div>
```

### Navigation

- Provide a way to skip repetitive navigation (skip links)
- Ensure navigation elements are keyboard accessible
- Use appropriate ARIA roles for navigation elements
- Provide a visible focus indicator for navigation items

```tsx
// Good
<a href="#main-content" className="skip-link">
  Skip to main content
</a>

// Good
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>
```

### Images

- Provide alternative text for all images using the `alt` attribute
- Use empty `alt` attributes for decorative images
- Ensure complex images have detailed descriptions

```tsx
// Informative image
<img src="chart.png" alt="Sales chart showing 20% increase in Q4" />

// Decorative image
<img src="decorative-line.png" alt="" role="presentation" />
```

### Tables

- Use proper table markup with `<table>`, `<thead>`, `<tbody>`, and `<th>` elements
- Associate data cells with headers using the `scope` attribute
- Provide a caption or summary for complex tables
- Avoid using tables for layout purposes

```tsx
// Good
<Table>
  <caption>Monthly sales by region</caption>
  <thead>
    <tr>
      <th scope="col">Region</th>
      <th scope="col">January</th>
      <th scope="col">February</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">North</th>
      <td>$10,000</td>
      <td>$12,000</td>
    </tr>
  </tbody>
</Table>
```

### Modals and Dialogs

- Trap focus within the modal when it's open
- Return focus to the triggering element when the modal is closed
- Use appropriate ARIA roles and attributes
- Provide a way to close the modal using the keyboard (Escape key)

```tsx
<Button onClick={() => setIsOpen(true)}>Open Modal</Button>
<Modal 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)}
  aria-labelledby="modal-title"
>
  <ModalHeader>
    <h2 id="modal-title">Modal Title</h2>
  </ModalHeader>
  <ModalBody>
    Modal content goes here
  </ModalBody>
  <ModalFooter>
    <Button onClick={() => setIsOpen(false)}>Close</Button>
  </ModalFooter>
</Modal>
```

## Testing for Accessibility

### Automated Testing

ECL includes automated accessibility testing using:

- **Jest and React Testing Library**: For component-level testing
- **Storybook a11y addon**: For visual testing during development

```tsx
// Example test for accessibility
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

test('Button has no accessibility violations', async () => {
  const { container } = render(<Button>Click me</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Manual Testing

In addition to automated testing, perform these manual checks:

1. **Keyboard Navigation**: Ensure all interactive elements are accessible via keyboard
2. **Screen Reader Testing**: Test with screen readers (NVDA, VoiceOver, JAWS)
3. **Zoom Testing**: Ensure content is usable when zoomed to 200%
4. **Color Contrast**: Verify sufficient contrast using tools like the WebAIM Contrast Checker
5. **Reduced Motion**: Test with reduced motion preferences enabled

## Resources

- [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/TR/WCAG21/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- [MDN Accessibility Documentation](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Inclusive Components by Heydon Pickering](https://inclusive-components.design/)
