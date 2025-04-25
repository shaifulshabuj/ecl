import React from 'react';
import { testA11y } from '../../utils/test/a11yTest';
import { Input } from './Input';

describe('Input - Accessibility', () => {
  it('passes accessibility tests for default input', async () => {
    await testA11y(<Input placeholder="Default input" />);
  });

  it('passes accessibility tests for input with label', async () => {
    await testA11y(<Input label="Full Name" placeholder="Enter your full name" />);
  });

  it('passes accessibility tests for required input', async () => {
    await testA11y(<Input label="Email" required placeholder="Enter your email" />);
  });

  it('passes accessibility tests for disabled input', async () => {
    await testA11y(<Input disabled label="Disabled Field" />);
  });

  it('passes accessibility tests for input with error', async () => {
    await testA11y(
      <Input 
        label="Username" 
        error="Username is required" 
        placeholder="Enter username" 
      />
    );
  });

  it('passes accessibility tests for input with helper text', async () => {
    await testA11y(
      <Input 
        label="Password" 
        helperText="Password must be at least 8 characters" 
        type="password" 
      />
    );
  });

  it('passes accessibility tests for input with icons', async () => {
    const IconPlaceholder = () => <span aria-hidden="true">★</span>;
    await testA11y(
      <Input 
        label="Search" 
        placeholder="Search..." 
        leftIcon={<IconPlaceholder />} 
        rightIcon={<IconPlaceholder />} 
      />
    );
  });

  it('passes accessibility tests for different input types', async () => {
    await testA11y(<Input label="Email" type="email" placeholder="Enter email" />);
    await testA11y(<Input label="Number" type="number" placeholder="Enter number" />);
    await testA11y(<Input label="Password" type="password" placeholder="Enter password" />);
    await testA11y(<Input label="Date" type="date" />);
  });
});
