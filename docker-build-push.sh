#!/bin/bash

# Docker Build and Push Script for EasyPrompt
# This script builds and pushes the Docker image to Docker Hub

set -e  # Exit on error

# Configuration
DOCKER_USERNAME="amanasmuei"
IMAGE_NAME="easyprompt"
VERSION="1.0.0-beta"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}EasyPrompt Docker Build & Push${NC}"
echo -e "${GREEN}=====================================${NC}"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}Error: Docker is not running!${NC}"
    echo "Please start Docker Desktop and try again."
    exit 1
fi

echo -e "${YELLOW}Step 1: Building Docker image...${NC}"
docker build \
    --platform linux/amd64,linux/arm64 \
    -t ${DOCKER_USERNAME}/${IMAGE_NAME}:latest \
    -t ${DOCKER_USERNAME}/${IMAGE_NAME}:${VERSION} \
    -t ${DOCKER_USERNAME}/${IMAGE_NAME}:1.0 \
    -t ${DOCKER_USERNAME}/${IMAGE_NAME}:1 \
    .

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Build successful!${NC}"
else
    echo -e "${RED}✗ Build failed!${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}Step 2: Logging in to Docker Hub...${NC}"
echo "Please enter your Docker Hub credentials:"
docker login

if [ $? -ne 0 ]; then
    echo -e "${RED}✗ Docker login failed!${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}Step 3: Pushing images to Docker Hub...${NC}"

# Push all tags
docker push ${DOCKER_USERNAME}/${IMAGE_NAME}:latest
docker push ${DOCKER_USERNAME}/${IMAGE_NAME}:${VERSION}
docker push ${DOCKER_USERNAME}/${IMAGE_NAME}:1.0
docker push ${DOCKER_USERNAME}/${IMAGE_NAME}:1

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Push successful!${NC}"
else
    echo -e "${RED}✗ Push failed!${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}Success! Images pushed to Docker Hub${NC}"
echo -e "${GREEN}=====================================${NC}"
echo ""
echo "Available tags:"
echo "  - ${DOCKER_USERNAME}/${IMAGE_NAME}:latest"
echo "  - ${DOCKER_USERNAME}/${IMAGE_NAME}:${VERSION}"
echo "  - ${DOCKER_USERNAME}/${IMAGE_NAME}:1.0"
echo "  - ${DOCKER_USERNAME}/${IMAGE_NAME}:1"
echo ""
echo "Users can now run:"
echo "  docker pull ${DOCKER_USERNAME}/${IMAGE_NAME}:latest"
echo "  docker run -p 3000:3000 ${DOCKER_USERNAME}/${IMAGE_NAME}:latest"
echo ""
echo "Or use docker-compose with the pre-built image!"
