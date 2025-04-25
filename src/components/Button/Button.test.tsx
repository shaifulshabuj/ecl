import React from 'react';
import { render, setupUserEvent, screen } from '../../utils/test/testUtils';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click me</Button>);
    
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
    expect(button).toHaveClass('inline-flex');
  });

  it('renders a disabled button when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    
    const button = screen.getByRole('button', { name: /disabled/i });
    expect(button).toBeDisabled();
  });

  it('applies the correct classes for different variants', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    
    let button = screen.getByRole('button', { name: /primary/i });
    expect(button).toHaveClass('bg-primary-600');
    
    rerender(<Button variant="secondary">Secondary</Button>);
    button = screen.getByRole('button', { name: /secondary/i });
    expect(button).toHaveClass('bg-secondary-600');
    
    rerender(<Button variant="outline">Outline</Button>);
    button = screen.getByRole('button', { name: /outline/i });
    expect(button).toHaveClass('border-neutral-300');
  });

  it('applies the correct classes for different sizes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    
    let button = screen.getByRole('button', { name: /small/i });
    expect(button).toHaveClass('text-sm');
    
    rerender(<Button size="lg">Large</Button>);
    button = screen.getByRole('button', { name: /large/i });
    expect(button).toHaveClass('text-base');
  });

  it('renders a full-width button when fullWidth prop is true', () => {
    render(<Button fullWidth>Full Width</Button>);
    
    const button = screen.getByRole('button', { name: /full width/i });
    expect(button).toHaveClass('w-full');
  });

  it('renders a loading state with spinner when isLoading is true', () => {
    render(<Button isLoading>Loading</Button>);
    
    const button = screen.getByRole('button', { name: /loading/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    
    // Check for the SVG (spinner)
    const svg = button.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('animate-spin');
  });

  it('renders with custom loading text when provided', () => {
    render(<Button isLoading loadingText="Processing...">Submit</Button>);
    
    // The button should show "Processing..." instead of "Submit"
    const button = screen.getByRole('button', { name: /processing/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toHaveTextContent('Submit');
  });

  it('calls the onClick handler when clicked', async () => {
    const handleClick = jest.fn();
    const user = setupUserEvent();
    
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByRole('button', { name: /click me/i });
    await user.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders left and right icons correctly', () => {
    const LeftIcon = () => <span data-testid="left-icon">Left</span>;
    const RightIcon = () => <span data-testid="right-icon">Right</span>;
    
    render(
      <Button leftIcon={<LeftIcon />} rightIcon={<RightIcon />}>
        With Icons
      </Button>
    );
    
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('renders as an icon button when iconButton prop is true', () => {
    render(
      <Button iconButton>
        <span data-testid="icon">Icon</span>
      </Button>
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('p-0');
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('passes additional HTML attributes to the button element', () => {
    render(
      <Button
        data-testid="custom-button"
        aria-label="Custom Button"
        title="Custom Title"
      >
        Custom Attributes
      </Button>
    );
    
    const button = screen.getByTestId('custom-button');
    expect(button).toHaveAttribute('aria-label', 'Custom Button');
    expect(button).toHaveAttribute('title', 'Custom Title');
  });

  it('forwards ref to the button element', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref Button</Button>);
    
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('BUTTON');
    expect(ref.current?.textContent).toBe('Ref Button');
  });
});
