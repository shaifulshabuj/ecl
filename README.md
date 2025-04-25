# Enterprise Component Library (ECL)

A scalable, reusable component library built with React, TypeScript, TailwindCSS, and Storybook. This library showcases frontend architectural leadership, with a focus on maintainability, reusability, and developer experience.

## Features

- 🎨 **Theming System** - Supports light, dark, and high-contrast modes with CSS variables
- ♿ **Accessibility (a11y)** - Components designed with accessibility in mind
- 📱 **Responsive** - Mobile-first approach with responsive components
- 🧩 **Modular** - Independent, composable components
- 📚 **Storybook Documentation** - Interactive component documentation
- 🔄 **TypeScript** - Full TypeScript support with type definitions
- 🧪 **Testing** - Unit and accessibility testing setup

## Getting Started

### Installation

#### For Users of the Library

Install the ECL package in your project:

```bash
npm install @yourorg/ecl
```

Or using yarn:

```bash
yarn add @yourorg/ecl
```

#### For Library Contributors

```bash
# Clone the repository
git clone https://github.com/yourorg/ecl.git
cd ecl

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

### Development

Run Storybook to develop and test components:

```bash
npm run storybook
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run accessibility tests only
npm run test:a11y

# Run snapshot tests only
npm run test:snapshot

# Update snapshots
npm run test:update-snapshots

# Run visual regression tests
npm run test:visual

# Update visual regression baselines
npm run test:visual:update
```

## CI/CD Pipeline

The ECL uses GitHub Actions for continuous integration and deployment:

- **Automated Testing**: All tests run on every pull request and push to main
- **Visual Regression**: Ensures components maintain visual consistency
- **Bundle Size Monitoring**: Tracks and reports bundle size changes
- **Storybook Deployment**: Automatically deploys Storybook to GitHub Pages
- **NPM Publishing**: Publishes new versions to NPM on release

For more details, see the [CI/CD Pipeline Documentation](./docs/ci-cd-pipeline.md).

### Building

The ECL uses an optimized build process with Rollup for better tree-shaking and smaller bundle sizes:

```bash
# Complete optimized build
npm run build

# Generate TypeScript declarations only
npm run build:types

# Build with bundle analysis
npm run build:analyze
```

For more details on the build optimizations, see the [Build Optimization Guide](./docs/build-optimization.md).

## Docker Integration

The ECL project is containerized using Docker and Docker Compose to ensure consistent development and deployment environments.

### Prerequisites

- Docker: [Installation Guide](https://docs.docker.com/get-docker/)
- Docker Compose: [Installation Guide](https://docs.docker.com/compose/install/)

### Using Docker with npm Scripts

We've added convenient npm scripts for Docker operations:

```bash
# Start development environment with hot reloading
npm run docker:dev

# Run tests in Docker
npm run docker:test

# Start production environment
npm run docker:prod

# Build Docker images
npm run docker:build

# Clean up Docker resources (containers, networks, volumes)
npm run docker:clean
```

### Using the Deployment Script

Alternatively, you can use the included deployment script for more advanced operations:

```bash
# Make the script executable
chmod +x deploy.sh

# Show all available commands
./deploy.sh help

# Start development environment
./deploy.sh start-dev

# Start production environment
./deploy.sh start-prod

# Stop all containers
./deploy.sh stop

# Rebuild containers
./deploy.sh build

# Run tests in Docker
./deploy.sh test

# Debug build issues in Docker
./deploy.sh debug

# Rebuild Docker completely from scratch
./deploy.sh rebuild
```

### Docker Environments

- **Development**: Uses mounted volumes for hot-reloading during development
  - Storybook available at http://localhost:6006

- **Production**: Uses optimized build for deployment
  - Storybook available at http://localhost:8080

### Detailed Docker Documentation

For more detailed information about using Docker with ECL, please refer to the [Docker Usage Guide](./docs/docker-usage.md).

## Architecture

The ECL is designed with these architectural principles:

- **Component-Driven Development** - Build small components first, then compose them into larger ones
- **Design Tokens** - Use CSS variables for consistent theming
- **Composition over Inheritance** - Components are composable and reusable
- **Minimal Dependencies** - Limited external dependencies for better performance
- **Developer Experience** - Well-documented components with interactive examples

## Documentation

Comprehensive documentation is available in the `src/docs` directory:

- **Component Templates** - Standardized documentation format for all components
- **Theming System** - Detailed explanation of the theming architecture
- **Accessibility Guidelines** - Best practices for creating accessible interfaces
- **Usage Examples** - Real-world examples showing how to use components together

To view the documentation, navigate to the specific files in the `src/docs` directory:

## Project Structure

```
src/
├── components/       # UI components
│   ├── Button/
│   ├── Input/
│   └── ...
├── hooks/            # Custom React hooks
├── styles/           # Global styles and design tokens
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

## Usage Example

```tsx
import { Button, Input } from '@yourorg/ecl';
// Import styles (if not using CSS-in-JS)
import '@yourorg/ecl/dist/styles.css';

function MyForm() {
  return (
    <div>
      <Input 
        placeholder="Enter your name" 
        aria-label="Name input"
      />
      <Button variant="primary" size="md">
        Submit
      </Button>
    </div>
  );
}
```

## Theming

The ECL uses CSS variables for theming, making it easy to customize the look and feel of components. Three themes are included by default:

- Light (default)
- Dark
- High Contrast

## Accessibility

All components are built with accessibility in mind, following WCAG 2.1 guidelines. Accessibility features include:

- Proper ARIA attributes
- Keyboard navigation
- Focus management
- Color contrast compliance
- Screen reader support

## Contributing

1. Create a new branch for your feature/fix
2. Add or modify components
3. Add Storybook documentation
4. Ensure tests pass
5. Submit a pull request

## License

MIT
