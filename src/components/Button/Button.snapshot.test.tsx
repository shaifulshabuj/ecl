import React from 'react';
import { render } from '../../utils/test/testUtils';
import { Button } from './Button';

describe('Button snapshots', () => {
  it('renders default button correctly', () => {
    const { container } = render(<Button>Default Button</Button>);
    expect(container).toMatchSnapshot();
  });

  it('renders primary button correctly', () => {
    const { container } = render(<Button variant="primary">Primary Button</Button>);
    expect(container).toMatchSnapshot();
  });

  it('renders secondary button correctly', () => {
    const { container } = render(<Button variant="secondary">Secondary Button</Button>);
    expect(container).toMatchSnapshot();
  });

  it('renders outline button correctly', () => {
    const { container } = render(<Button variant="outline">Outline Button</Button>);
    expect(container).toMatchSnapshot();
  });

  it('renders ghost button correctly', () => {
    const { container } = render(<Button variant="ghost">Ghost Button</Button>);
    expect(container).toMatchSnapshot();
  });

  it('renders disabled button correctly', () => {
    const { container } = render(<Button disabled>Disabled Button</Button>);
    expect(container).toMatchSnapshot();
  });

  it('renders loading button correctly', () => {
    const { container } = render(<Button isLoading>Loading Button</Button>);
    expect(container).toMatchSnapshot();
  });

  it('renders small button correctly', () => {
    const { container } = render(<Button size="sm">Small Button</Button>);
    expect(container).toMatchSnapshot();
  });

  it('renders large button correctly', () => {
    const { container } = render(<Button size="lg">Large Button</Button>);
    expect(container).toMatchSnapshot();
  });

  it('renders full width button correctly', () => {
    const { container } = render(<Button fullWidth>Full Width Button</Button>);
    expect(container).toMatchSnapshot();
  });

  it('renders button with left icon correctly', () => {
    const Icon = () => <span data-testid="icon">★</span>;
    const { container } = render(
      <Button leftIcon={<Icon />}>Button with Left Icon</Button>
    );
    expect(container).toMatchSnapshot();
  });

  it('renders button with right icon correctly', () => {
    const Icon = () => <span data-testid="icon">★</span>;
    const { container } = render(
      <Button rightIcon={<Icon />}>Button with Right Icon</Button>
    );
    expect(container).toMatchSnapshot();
  });

  it('renders icon button correctly', () => {
    const Icon = () => <span data-testid="icon">★</span>;
    const { container } = render(
      <Button iconButton aria-label="Icon Button">
        <Icon />
      </Button>
    );
    expect(container).toMatchSnapshot();
  });
});
