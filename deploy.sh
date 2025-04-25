#!/bin/bash
# Make script executable with: chmod +x deploy.sh

# ECL Component Library Deployment Script
# This script helps with deploying and managing the ECL project in Docker

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Print header
echo -e "${GREEN}=======================================${NC}"
echo -e "${GREEN}    ECL Component Library Deployment   ${NC}"
echo -e "${GREEN}=======================================${NC}\n"

# Function to check if Docker and Docker Compose are installed
check_dependencies() {
  echo -e "${YELLOW}Checking dependencies...${NC}"
  
  if ! command -v docker &> /dev/null; then
    echo -e "${RED}Docker is not installed. Please install Docker first.${NC}"
    exit 1
  fi
  
  if ! command -v docker compose &> /dev/null; then
    echo -e "${RED}Docker Compose is not installed. Please install Docker Compose first.${NC}"
    exit 1
  fi
  
  echo -e "${GREEN}All dependencies are installed.${NC}\n"
}

# Function to build Docker images
build() {
  echo -e "${YELLOW}Building Docker images...${NC}"
  # First build the image
  docker compose build
  local build_status=$?
  
  if [ $build_status -eq 0 ]; then
    echo -e "${GREEN}Docker images built successfully.${NC}\n"
  else
    echo -e "${RED}Failed to build Docker images.${NC}\n"
    exit 1
  fi
}

# Function to rebuild completely from scratch
rebuild() {
  echo -e "${YELLOW}Rebuilding Docker images from scratch...${NC}"
  
  # Remove existing containers and images
  echo -e "${YELLOW}Cleaning up existing resources...${NC}"
  docker compose down --remove-orphans
  
  # Build with no cache
  echo -e "${YELLOW}Building images with no cache...${NC}"
  docker compose build --no-cache
  local build_status=$?
  
  if [ $build_status -eq 0 ]; then
    echo -e "${GREEN}Docker images rebuilt successfully.${NC}\n"
  else
    echo -e "${RED}Failed to rebuild Docker images.${NC}\n"
    exit 1
  fi
}

# Function to start development environment
start_dev() {
  echo -e "${YELLOW}Starting development environment...${NC}"
  docker compose up -d
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}Development environment started successfully.${NC}"
    echo -e "${GREEN}Storybook is available at http://localhost:6006${NC}\n"
  else
    echo -e "${RED}Failed to start development environment.${NC}\n"
    exit 1
  fi
}

# Function to start production environment
start_prod() {
  echo -e "${YELLOW}Starting production environment...${NC}"
  docker compose --profile prod up -d
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}Production environment started successfully.${NC}"
    echo -e "${GREEN}Storybook is available at http://localhost:8080${NC}\n"
  else
    echo -e "${RED}Failed to start production environment.${NC}\n"
    exit 1
  fi
}

# Function to stop containers
stop() {
  echo -e "${YELLOW}Stopping containers...${NC}"
  docker compose down
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}Containers stopped successfully.${NC}\n"
  else
    echo -e "${RED}Failed to stop containers.${NC}\n"
    exit 1
  fi
}

# Function to restart containers
restart() {
  echo -e "${YELLOW}Restarting containers...${NC}"
  docker compose restart
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}Containers restarted successfully.${NC}\n"
  else
    echo -e "${RED}Failed to restart containers.${NC}\n"
    exit 1
  fi
}

# Function to display container logs
logs() {
  echo -e "${YELLOW}Displaying container logs...${NC}"
  docker compose logs -f
}

# Function to display container status
status() {
  echo -e "${YELLOW}Container status:${NC}"
  docker compose ps
  echo
}

# Function to clean up (remove containers, images, volumes)
cleanup() {
  echo -e "${YELLOW}Cleaning up Docker resources...${NC}"
  docker compose down --rmi all --volumes --remove-orphans
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}Cleanup completed successfully.${NC}\n"
  else
    echo -e "${RED}Failed to clean up resources.${NC}\n"
    exit 1
  fi
}

# Function to run tests inside Docker
test() {
  echo -e "${YELLOW}Running tests inside Docker...${NC}"
  # Use the ecl-test service which runs as root to avoid permission issues
  docker compose run --rm ecl-test npm test
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}Tests completed successfully.${NC}\n"
  else
    echo -e "${RED}Tests failed.${NC}\n"
    exit 1
  fi
}

# Function to run tests with coverage
test_coverage() {
  echo -e "${YELLOW}Running tests with coverage inside Docker...${NC}"
  # Use the ecl-test service which runs as root to avoid permission issues
  docker compose run --rm ecl-test npm run test:coverage
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}Tests with coverage completed successfully.${NC}\n"
  else
    echo -e "${RED}Tests with coverage failed.${NC}\n"
    exit 1
  fi
}

# Function to run accessibility tests
test_a11y() {
  echo -e "${YELLOW}Running accessibility tests inside Docker...${NC}"
  # Use the ecl-test service which runs as root to avoid permission issues
  docker compose run --rm ecl-test npm run test:a11y
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}Accessibility tests completed successfully.${NC}\n"
  else
    echo -e "${RED}Accessibility tests failed.${NC}\n"
    exit 1
  fi
}

# Function to run snapshot tests
test_snapshot() {
  echo -e "${YELLOW}Running snapshot tests inside Docker...${NC}"
  # Use the ecl-test service which runs as root to avoid permission issues
  docker compose run --rm ecl-test npm run test:snapshot
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}Snapshot tests completed successfully.${NC}\n"
  else
    echo -e "${RED}Snapshot tests failed.${NC}\n"
    exit 1
  fi
}

# Function to run build debugging
debug_build() {
  echo -e "${YELLOW}Running build debugging inside Docker...${NC}"
  docker compose run --rm ecl npm run debug:build
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}Debug completed.${NC}\n"
  else
    echo -e "${RED}Debug failed.${NC}\n"
    exit 1
  fi
}

# Function to update snapshots
update_snapshots() {
  echo -e "${YELLOW}Updating snapshots inside Docker...${NC}"
  docker compose run --rm ecl npm run test:update-snapshots
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}Snapshots updated successfully.${NC}\n"
  else
    echo -e "${RED}Failed to update snapshots.${NC}\n"
    exit 1
  fi
}

# Function to build Storybook inside Docker
build_storybook() {
  echo -e "${YELLOW}Building Storybook inside Docker...${NC}"
  docker compose run --rm ecl npm run build-storybook
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}Storybook build completed successfully.${NC}\n"
  else
    echo -e "${RED}Storybook build failed.${NC}\n"
    exit 1
  fi
}

# Display help message
show_help() {
  echo "Usage: ./deploy.sh [COMMAND]"
  echo
  echo "Commands:"
  echo "  build           Build Docker images"
  echo "  rebuild         Rebuild Docker images from scratch (no cache)"
  echo "  start-dev       Start development environment"
  echo "  start-prod      Start production environment"
  echo "  stop            Stop containers"
  echo "  restart         Restart containers"
  echo "  logs            Display container logs"
  echo "  status          Display container status"
  echo "  cleanup         Remove containers, images, and volumes"
  echo "  test            Run tests inside Docker"
  echo "  test:coverage   Run tests with coverage inside Docker"
  echo "  test:a11y       Run accessibility tests inside Docker"
  echo "  test:snapshot   Run snapshot tests inside Docker"
  echo "  update-snapshots Update test snapshots inside Docker"
  echo "  build-storybook Build Storybook inside Docker"
  echo "  debug           Run build debugging inside Docker"
  echo "  help            Display this help message"
  echo
}

# Check dependencies first
check_dependencies

# Parse command-line arguments
if [ $# -eq 0 ]; then
  show_help
  exit 0
fi

case "$1" in
  build)
    build
    ;;
  rebuild)
    rebuild
    ;;
  start-dev)
    start_dev
    ;;
  start-prod)
    start_prod
    ;;
  stop)
    stop
    ;;
  restart)
    restart
    ;;
  logs)
    logs
    ;;
  status)
    status
    ;;
  cleanup)
    cleanup
    ;;
  test)
    test
    ;;
  test:coverage)
    test_coverage
    ;;
  test:a11y)
    test_a11y
    ;;
  test:snapshot)
    test_snapshot
    ;;
  update-snapshots)
    update_snapshots
    ;;
  build-storybook)
    build_storybook
    ;;
  debug)
    debug_build
    ;;
  help)
    show_help
    ;;
  *)
    echo -e "${RED}Unknown command: $1${NC}"
    show_help
    exit 1
    ;;
esac

exit 0
