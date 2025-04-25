import React from 'react';
import { testA11y } from '../../utils/test/a11yTest';
import { Button } from './Button';

describe('Button - Accessibility', () => {
  it('passes accessibility tests for default button', async () => {
    await testA11y(<Button>Click me</Button>);
  });

  it('passes accessibility tests for primary button', async () => {
    await testA11y(<Button variant="primary">Primary Button</Button>);
  });

  it('passes accessibility tests for disabled button', async () => {
    await testA11y(<Button disabled>Disabled Button</Button>);
  });

  it('passes accessibility tests for loading button', async () => {
    await testA11y(<Button isLoading>Loading Button</Button>);
  });

  it('passes accessibility tests for button with icons', async () => {
    const IconPlaceholder = () => <span aria-hidden="true">↓</span>;
    await testA11y(
      <Button leftIcon={<IconPlaceholder />} rightIcon={<IconPlaceholder />}>
        Button with Icons
      </Button>
    );
  });

  it('passes accessibility tests for icon button', async () => {
    const IconPlaceholder = () => <span>↓</span>;
    await testA11y(
      <Button 
        iconButton 
        aria-label="Download" 
      >
        <IconPlaceholder />
      </Button>
    );
  });
});
