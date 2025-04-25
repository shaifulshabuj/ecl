import React from 'react';
import { render } from '../../utils/test/testUtils';
import { Input } from './Input';

describe('Input snapshots', () => {
  it('renders default input correctly', () => {
    const { container } = render(<Input placeholder="Default Input" />);
    expect(container).toMatchSnapshot();
  });

  it('renders input with label correctly', () => {
    const { container } = render(
      <Input label="Input Label" placeholder="Input with Label" />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders required input correctly', () => {
    const { container } = render(
      <Input label="Required Input" required placeholder="Required Input" />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders disabled input correctly', () => {
    const { container } = render(
      <Input label="Disabled Input" disabled placeholder="Disabled Input" />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders input with error correctly', () => {
    const { container } = render(
      <Input 
        label="Input with Error" 
        error="This field is required" 
        placeholder="Input with Error" 
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders input with helper text correctly', () => {
    const { container } = render(
      <Input 
        label="Input with Helper Text" 
        helperText="This is some helpful information" 
        placeholder="Input with Helper Text" 
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders small input correctly', () => {
    const { container } = render(
      <Input 
        label="Small Input" 
        size="sm" 
        placeholder="Small Input" 
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders large input correctly', () => {
    const { container } = render(
      <Input 
        label="Large Input" 
        size="lg" 
        placeholder="Large Input" 
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders input with left icon correctly', () => {
    const Icon = () => <span data-testid="icon">★</span>;
    const { container } = render(
      <Input 
        label="Input with Left Icon" 
        leftIcon={<Icon />} 
        placeholder="Input with Left Icon" 
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders input with right icon correctly', () => {
    const Icon = () => <span data-testid="icon">★</span>;
    const { container } = render(
      <Input 
        label="Input with Right Icon" 
        rightIcon={<Icon />} 
        placeholder="Input with Right Icon" 
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders input with both icons correctly', () => {
    const LeftIcon = () => <span data-testid="left-icon">★</span>;
    const RightIcon = () => <span data-testid="right-icon">★</span>;
    const { container } = render(
      <Input 
        label="Input with Both Icons" 
        leftIcon={<LeftIcon />} 
        rightIcon={<RightIcon />} 
        placeholder="Input with Both Icons" 
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders input with success variant correctly', () => {
    const { container } = render(
      <Input 
        label="Success Input" 
        variant="success" 
        placeholder="Success Input" 
        helperText="This input is valid" 
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders input with error variant correctly', () => {
    const { container } = render(
      <Input 
        label="Error Input" 
        variant="error" 
        placeholder="Error Input" 
        error="This input has an error" 
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders different input types correctly', () => {
    const { container: textContainer } = render(
      <Input label="Text Input" type="text" placeholder="Text" />
    );
    expect(textContainer).toMatchSnapshot('text-input');

    const { container: emailContainer } = render(
      <Input label="Email Input" type="email" placeholder="Email" />
    );
    expect(emailContainer).toMatchSnapshot('email-input');

    const { container: passwordContainer } = render(
      <Input label="Password Input" type="password" placeholder="Password" />
    );
    expect(passwordContainer).toMatchSnapshot('password-input');

    const { container: numberContainer } = render(
      <Input label="Number Input" type="number" placeholder="Number" />
    );
    expect(numberContainer).toMatchSnapshot('number-input');
  });
});
