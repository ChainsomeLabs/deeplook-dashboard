#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Check if correct number of arguments is provided
if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <version>"
  echo "Example: $0 1.0.2"
  exit 1
fi

# Assign positional parameters
SERVICE=dashboard
VERSION=$1

# Docker registry (change if needed)
REGISTRY=europe-west1-docker.pkg.dev/carmine-api-381920/docker-repository

# Define Dockerfile path
DOCKERFILE=Dockerfile

# Define Docker image name
IMAGE="$REGISTRY/deeplook-$SERVICE:$VERSION"

# Check if Dockerfile exists
if [ ! -f "$DOCKERFILE" ]; then
  echo "Error: Dockerfile for '$SERVICE' not found at '$DOCKERFILE'"
  exit 1
fi

# Build the Docker image
echo "Building $IMAGE using $DOCKERFILE..."
docker build --platform=linux/amd64 -t "$IMAGE" -f "$DOCKERFILE" .

# Push the Docker image
echo "Pushing $IMAGE..."
docker push "$IMAGE"

echo "Deployment of $SERVICE:$VERSION completed successfully."
