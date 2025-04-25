# Docker Usage Guide for ECL

This document provides instructions for using Docker with the Enterprise Component Library (ECL).

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Available Docker Services

The ECL project includes three Docker services:

1. **ecl** - Development environment with hot reloading
2. **ecl-test** - Testing environment
3. **ecl-prod** - Production environment with built Storybook

## Quick Start

### Development Environment

To start the development environment with Storybook:

```bash
docker compose up ecl
```

This will:
- Build the Docker image (if not already built)
- Start Storybook on port 6006
- Mount your local source code for hot reloading

Access Storybook at: http://localhost:6006

### Running Tests

To run tests in the Docker environment:

```bash
docker compose run ecl-test npm test
```

### Production Environment

To run the production version with pre-built Storybook:

```bash
docker compose up ecl-prod
```

Access the production Storybook at: http://localhost:8080

## Building the Docker Image

If you need to rebuild the Docker image:

```bash
docker compose build
```

Or to build a specific service:

```bash
docker compose build ecl
```

## Common Docker Commands

### View Logs

```bash
docker compose logs -f ecl
```

### Stop Services

```bash
docker compose down
```

### Execute Commands Inside Container

```bash
docker compose exec ecl npm install <package-name>
```

### Clean Up

Remove all containers, networks, and volumes:

```bash
docker compose down -v
```

## Customizing Docker Setup

### Environment Variables

Create a `.env` file in the project root to set environment variables:

```
NODE_ENV=development
PORT=3000
```

### Modifying Docker Configuration

- **Dockerfile**: Contains the instructions for building the Docker image
- **docker compose.yml**: Defines the services, networks, and volumes
- **.dockerignore**: Lists files and directories to exclude from the Docker build

## Troubleshooting

### Permission Issues

If you encounter permission issues with mounted volumes:

```bash
docker compose run --user root ecl-test chown -R node:node /app/node_modules
```

### Port Conflicts

If you have port conflicts, modify the port mappings in `docker compose.yml`:

```yaml
ports:
  - "8000:6006"  # Map host port 8000 to container port 6006
```

### Build Issues

If the build fails, you can debug by building with verbose output:

```bash
docker compose build --no-cache --progress=plain
```
