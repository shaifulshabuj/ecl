# NPM Package Configuration

This document provides information about the npm package configuration for the Enterprise Component Library (ECL).

## Package Information

- **Package Name**: `@yourorg/ecl`
- **Version**: 1.0.0
- **Description**: Enterprise Component Library - A scalable, reusable component library

## Installation

Install the ECL package using npm:

```bash
npm install @yourorg/ecl
```

Or using yarn:

```bash
yarn add @yourorg/ecl
```

## Usage

### Importing Components

You can import individual components from the library:

```jsx
import { Button, Card, Alert } from '@yourorg/ecl';

function MyComponent() {
  return (
    <div>
      <Alert variant="success" title="Success">Operation completed successfully</Alert>
      <Card>
        <Card.Header>Card Title</Card.Header>
        <Card.Body>Card content goes here</Card.Body>
        <Card.Footer>
          <Button variant="primary">Submit</Button>
        </Card.Footer>
      </Card>
    </div>
  );
}
```

### Importing Styles

The library includes pre-built CSS that you can import in your application:

```jsx
// In your app's entry file (e.g., index.js or App.js)
import '@yourorg/ecl/dist/styles.css';
```

If you're using a CSS-in-JS solution, you don't need to import the CSS file.

## Package Structure

The published package includes:

- **dist/index.cjs.js**: CommonJS build (for Node.js and older bundlers)
- **dist/index.esm.js**: ES Modules build (for modern bundlers with tree-shaking)
- **dist/index.d.ts**: TypeScript declarations
- **dist/styles.css**: Pre-built CSS styles

## Peer Dependencies

The ECL has the following peer dependencies that you need to install in your project:

- React: ^18.2.0
- React DOM: ^18.2.0

## Publishing

For maintainers, the package includes several npm scripts for publishing:

```bash
# Publish a new version
npm run release

# Publish a patch version (1.0.0 -> 1.0.1)
npm run release:patch

# Publish a minor version (1.0.0 -> 1.1.0)
npm run release:minor

# Publish a major version (1.0.0 -> 2.0.0)
npm run release:major
```

## Package Configuration

The package is configured with:

- **files**: Only essential files are included in the published package
- **sideEffects: false**: Enables better tree-shaking in modern bundlers
- **main**: Points to the CommonJS build
- **module**: Points to the ES Modules build
- **types**: Points to TypeScript declarations

## Versioning

The ECL follows Semantic Versioning (SemVer):

- **MAJOR** version for incompatible API changes
- **MINOR** version for new functionality in a backward-compatible manner
- **PATCH** version for backward-compatible bug fixes

## Unpublishing

If you need to unpublish a version (within 72 hours of publishing):

```bash
npm unpublish @yourorg/ecl@<version>
```

For deprecating a version:

```bash
npm deprecate @yourorg/ecl@<version> "Reason for deprecation"
```
