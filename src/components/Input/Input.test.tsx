import React from 'react';
import { render, setupUserEvent, screen } from '../../utils/test/testUtils';
import { Input } from './Input';

describe('Input', () => {
  it('renders correctly with default props', () => {
    render(<Input placeholder="Enter text" />);
    
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
    expect(input).not.toBeDisabled();
    expect(input).toHaveClass('w-full');
  });

  it('renders a disabled input when disabled prop is true', () => {
    render(<Input disabled placeholder="Disabled input" />);
    
    const input = screen.getByPlaceholderText('Disabled input');
    expect(input).toBeDisabled();
  });

  it('applies the correct classes for different variants', () => {
    const { rerender } = render(<Input variant="default" placeholder="Default" />);
    
    let input = screen.getByPlaceholderText('Default');
    expect(input).toHaveClass('border-neutral-300');
    
    rerender(<Input variant="success" placeholder="Success" />);
    input = screen.getByPlaceholderText('Success');
    expect(input).toHaveClass('border-success-500');
    
    rerender(<Input variant="error" placeholder="Error" />);
    input = screen.getByPlaceholderText('Error');
    expect(input).toHaveClass('border-error-500');
  });

  it('shows an error message when error prop is provided', () => {
    render(
      <Input 
        placeholder="Username" 
        error="Username is required" 
      />
    );
    
    expect(screen.getByText('Username is required')).toBeInTheDocument();
    
    // Input should have error styles
    const input = screen.getByPlaceholderText('Username');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('shows helper text when helperText prop is provided', () => {
    render(
      <Input 
        placeholder="Password" 
        helperText="Password must be at least 8 characters" 
      />
    );
    
    expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument();
  });

  it('renders with a label when label prop is provided', () => {
    render(<Input label="Full Name" placeholder="Enter your name" />);
    
    const label = screen.getByText('Full Name');
    expect(label).toBeInTheDocument();
    
    // Label should be associated with the input
    const input = screen.getByLabelText('Full Name');
    expect(input).toBeInTheDocument();
  });

  it('indicates required fields with an asterisk', () => {
    render(<Input label="Email" required placeholder="Enter your email" />);
    
    const label = screen.getByText('Email');
    expect(label.parentElement).toHaveTextContent(/Email\*/);
  });

  it('applies the correct classes for different sizes', () => {
    const { rerender } = render(<Input size="sm" placeholder="Small" />);
    
    let input = screen.getByPlaceholderText('Small');
    expect(input).toHaveClass('h-8');
    
    rerender(<Input size="md" placeholder="Medium" />);
    input = screen.getByPlaceholderText('Medium');
    expect(input).toHaveClass('h-10');
    
    rerender(<Input size="lg" placeholder="Large" />);
    input = screen.getByPlaceholderText('Large');
    expect(input).toHaveClass('h-12');
  });

  it('renders left and right icons correctly', () => {
    const LeftIcon = () => <span data-testid="left-icon">Left</span>;
    const RightIcon = () => <span data-testid="right-icon">Right</span>;
    
    render(
      <Input 
        placeholder="With Icons"
        leftIcon={<LeftIcon />} 
        rightIcon={<RightIcon />}
      />
    );
    
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    
    // Input should have padding for icons
    const input = screen.getByPlaceholderText('With Icons');
    expect(input).toHaveClass('pl-10');
    expect(input).toHaveClass('pr-10');
  });

  it('calls onChange handler when input changes', async () => {
    const handleChange = jest.fn();
    const user = setupUserEvent();
    
    render(<Input placeholder="Changeable" onChange={handleChange} />);
    
    const input = screen.getByPlaceholderText('Changeable');
    await user.type(input, 'Hello');
    
    expect(handleChange).toHaveBeenCalledTimes(5); // Once for each character
  });

  it('forwards ref to the input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} placeholder="Ref Input" />);
    
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('INPUT');
    expect(ref.current?.placeholder).toBe('Ref Input');
  });

  it('passes additional HTML attributes to the input element', () => {
    render(
      <Input
        type="email"
        placeholder="Email Input"
        maxLength={50}
        autoComplete="email"
        data-testid="email-input"
      />
    );
    
    const input = screen.getByTestId('email-input');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('maxlength', '50');
    expect(input).toHaveAttribute('autocomplete', 'email');
  });

  it('prioritizes error message over helper text', () => {
    render(
      <Input
        placeholder="Conflicting Messages"
        helperText="This is helpful"
        error="This is an error"
      />
    );
    
    expect(screen.getByText('This is an error')).toBeInTheDocument();
    expect(screen.queryByText('This is helpful')).not.toBeInTheDocument();
  });

  it('generates a unique ID if not provided', () => {
    render(<Input label="Generated ID" placeholder="Test" />);
    
    const input = screen.getByPlaceholderText('Test');
    const label = screen.getByText('Generated ID');
    
    // The input should have an ID and the label's htmlFor should match it
    expect(input).toHaveAttribute('id');
    expect(label).toHaveAttribute('for', input.getAttribute('id'));
  });

  it('uses provided ID if specified', () => {
    render(<Input label="Specific ID" id="custom-id" placeholder="Test" />);
    
    const input = screen.getByPlaceholderText('Test');
    expect(input).toHaveAttribute('id', 'custom-id');
    
    const label = screen.getByText('Specific ID');
    expect(label).toHaveAttribute('for', 'custom-id');
  });
});
