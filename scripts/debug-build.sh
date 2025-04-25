#!/bin/bash

# Debug build script for the ECL project
echo "ECL Project Build Debugging Utility"
echo "======================================"

# Check if TypeScript is installed
echo "Checking TypeScript installation..."
if ! command -v tsc &> /dev/null; then
  echo "TypeScript is not installed globally. Checking local installation..."
  if [ -f "./node_modules/.bin/tsc" ]; then
    echo "TypeScript is installed locally."
    TSC="./node_modules/.bin/tsc"
  else
    echo "ERROR: TypeScript is not installed. Please run 'npm install' first."
    exit 1
  fi
else
  echo "TypeScript is installed globally."
  TSC="tsc"
fi

# Check if tsconfig.json exists
echo "Checking for tsconfig.json..."
if [ ! -f "./tsconfig.json" ]; then
  echo "ERROR: tsconfig.json not found."
  exit 1
else
  echo "tsconfig.json found."
fi

# Check for source files
echo "Checking for source files..."
SRC_FILES=$(find ./src -name "*.ts" -o -name "*.tsx" | wc -l)
if [ "$SRC_FILES" -eq 0 ]; then
  echo "ERROR: No TypeScript source files found in src directory."
  exit 1
else
  echo "Found $SRC_FILES TypeScript source files."
fi

# Try to run TypeScript compiler with verbose output
echo "Running TypeScript compiler in verbose mode..."
$TSC -p tsconfig.json --listFiles --traceResolution

# Check if dist directory was created
echo "Checking build output..."
if [ ! -d "./dist" ]; then
  echo "WARNING: dist directory was not created."
else
  echo "dist directory exists. Counting output files..."
  OUTPUT_FILES=$(find ./dist -name "*.js" | wc -l)
  echo "Found $OUTPUT_FILES JavaScript files in output directory."
fi

echo "======================================"
echo "Debug information complete."
