# Component Name

## Overview

Brief description of the component, its purpose, and when to use it.

## Features

- Feature 1
- Feature 2
- Feature 3

## Usage

```tsx
import { ComponentName } from 'ecl';

function Example() {
  return (
    <ComponentName
      prop1="value1"
      prop2="value2"
    >
      Content
    </ComponentName>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `prop1` | `string` | `'default'` | Description of prop1 |
| `prop2` | `number` | `0` | Description of prop2 |
| `children` | `ReactNode` | - | Content to be rendered inside the component |

## Variants

### Variant 1

```tsx
<ComponentName variant="variant1">Content</ComponentName>
```

### Variant 2

```tsx
<ComponentName variant="variant2">Content</ComponentName>
```

## Sizes

### Small

```tsx
<ComponentName size="sm">Content</ComponentName>
```

### Medium

```tsx
<ComponentName size="md">Content</ComponentName>
```

### Large

```tsx
<ComponentName size="lg">Content</ComponentName>
```

## States

### Disabled

```tsx
<ComponentName disabled>Content</ComponentName>
```

### Loading

```tsx
<ComponentName loading>Content</ComponentName>
```

## Accessibility

- ARIA attributes used
- Keyboard navigation support
- Focus management
- Color contrast considerations

## Best Practices

- Do's and don'ts when using this component
- Common patterns and anti-patterns
- Performance considerations

## Composition

Examples of how this component can be composed with other components:

```tsx
<Container>
  <ComponentName>
    <AnotherComponent />
  </ComponentName>
</Container>
```

## Related Components

- [RelatedComponent1](/components/RelatedComponent1)
- [RelatedComponent2](/components/RelatedComponent2)
