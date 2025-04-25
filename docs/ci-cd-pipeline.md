# CI/CD Pipeline Documentation

This document provides an overview of the Continuous Integration and Continuous Deployment (CI/CD) pipeline for the Enterprise Component Library (ECL).

## Overview

The ECL CI/CD pipeline automates the following processes:

1. **Continuous Integration (CI)**:
   - Code linting and style checking
   - Unit and integration testing
   - Accessibility testing
   - Visual regression testing
   - Bundle size monitoring

2. **Continuous Deployment (CD)**:
   - Automated builds
   - Storybook deployment
   - NPM package publishing

## Workflow Files

The CI/CD pipeline is implemented using GitHub Actions with the following workflow files:

### 1. Main CI/CD Pipeline (`ci-cd.yml`)

Triggered on:
- Push to the main branch
- Pull requests to the main branch
- Release creation

Jobs:
- **Lint**: Checks code quality and style
- **Test**: Runs unit, integration, and accessibility tests
- **Build**: Builds the library and Storybook
- **Bundle Analysis**: Analyzes bundle size and composition
- **Visual Regression**: Performs visual regression testing
- **Deploy Storybook**: Deploys Storybook to GitHub Pages (on main branch push)
- **Publish NPM**: Publishes the package to NPM (on release creation)

### 2. Pull Request Checks (`pull-request.yml`)

Triggered on:
- Pull request creation
- Pull request synchronization

Jobs:
- **PR Checks**: 
  - Validates conventional commit messages
  - Lints only changed files
  - Checks bundle size impact
  - Runs tests affected by changes

### 3. Scheduled Maintenance (`scheduled.yml`)

Triggered on:
- Weekly schedule (Monday at 1:00 AM UTC)
- Manual dispatch

Jobs:
- **Dependency Updates**: Checks for outdated dependencies and creates update PRs
- **Security Audit**: Runs security scans and generates reports
- **Stale Issues**: Manages stale issues and PRs

## CI/CD Pipeline Stages

### 1. Code Quality and Testing

- **Linting**: ESLint checks for code quality and style
- **Unit Testing**: Jest runs unit tests
- **Accessibility Testing**: Specialized tests for WCAG compliance
- **Snapshot Testing**: Visual regression testing for components

### 2. Build and Analysis

- **Build**: Compiles TypeScript and bundles with Rollup
- **Storybook Build**: Generates static Storybook site
- **Bundle Analysis**: Analyzes bundle size and composition
- **Visual Regression**: Compares component visuals against baselines

### 3. Deployment

- **Storybook Deployment**: Deploys to GitHub Pages
- **NPM Publishing**: Publishes package to NPM registry

## Release Process

1. **Prepare Release**:
   - Update version in package.json
   - Update CHANGELOG.md
   - Create a GitHub release

2. **Automated Publishing**:
   - CI/CD pipeline detects the release
   - Runs all tests and builds
   - Publishes to NPM automatically

## Environment Variables and Secrets

The following secrets are used in the CI/CD pipeline:

- `GITHUB_TOKEN`: Automatically provided by GitHub Actions
- `NPM_TOKEN`: For publishing to NPM
- `CODECOV_TOKEN`: For uploading coverage reports
- `SNYK_TOKEN`: For security scanning

## Monitoring and Notifications

- **GitHub Status Checks**: Displayed on pull requests
- **CodeCov Reports**: Code coverage visualization
- **Bundle Size Reports**: Size impact on pull requests
- **Security Alerts**: Automated security scanning reports

## Local Development vs CI Environment

While the CI pipeline runs all tests and checks, developers can run the same checks locally:

```bash
# Lint code
npm run lint

# Run tests
npm test

# Build package
npm run build

# Analyze bundle
npm run build:analyze
```

## Troubleshooting Common Issues

### Failed Tests
- Check the test logs for specific failures
- Run the failing tests locally with `npm test -- -t "test name"`

### Build Failures
- Verify TypeScript types are correct
- Check for missing dependencies
- Run `npm run debug:build` locally

### Deployment Issues
- Verify GitHub Pages settings
- Check GitHub Actions permissions
- Validate NPM authentication
