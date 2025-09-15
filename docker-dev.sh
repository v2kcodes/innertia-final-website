#!/bin/bash

# Docker Development Management Script for Innertia Website
# Usage: ./docker-dev.sh [command]

set -e

COMPOSE_FILE="docker-compose.yml"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_help() {
    echo -e "${BLUE}Innertia Docker Management Script${NC}"
    echo -e "${BLUE}================================${NC}"
    echo ""
    echo "Available commands:"
    echo ""
    echo -e "${GREEN}Development:${NC}"
    echo "  dev-up      - Start development container (port 3001)"
    echo "  dev-down    - Stop development container"
    echo "  dev-logs    - View development container logs"
    echo "  dev-shell   - Open shell in development container"
    echo ""
    echo -e "${GREEN}Production:${NC}"
    echo "  prod-up     - Start production containers (port 80)"
    echo "  prod-down   - Stop production containers"
    echo "  prod-logs   - View production container logs"
    echo ""
    echo -e "${GREEN}Monitoring:${NC}"
    echo "  monitor-up  - Start with monitoring (Prometheus on port 9090)"
    echo "  monitor-down - Stop monitoring stack"
    echo ""
    echo -e "${GREEN}Utilities:${NC}"
    echo "  build       - Rebuild all containers"
    echo "  clean       - Clean up containers and images"
    echo "  status      - Show container status"
    echo "  help        - Show this help message"
    echo ""
    echo -e "${YELLOW}Examples:${NC}"
    echo "  ./docker-dev.sh dev-up     # Start development container"
    echo "  ./docker-dev.sh prod-up    # Start production with nginx"
    echo "  ./docker-dev.sh status     # Check container status"
}

case "${1:-help}" in
    "dev-up")
        echo -e "${GREEN}Starting development container...${NC}"
        docker-compose up dev --build -d
        echo -e "${GREEN}Development container started at http://localhost:3001${NC}"
        ;;
    
    "dev-down")
        echo -e "${YELLOW}Stopping development container...${NC}"
        docker-compose stop dev
        docker-compose rm -f dev
        ;;
    
    "dev-logs")
        echo -e "${BLUE}Showing development container logs...${NC}"
        docker-compose logs -f dev
        ;;
    
    "dev-shell")
        echo -e "${BLUE}Opening shell in development container...${NC}"
        docker-compose exec dev /bin/sh
        ;;
    
    "prod-up")
        echo -e "${GREEN}Starting production containers...${NC}"
        docker-compose --profile production up --build -d
        echo -e "${GREEN}Production containers started:${NC}"
        echo -e "  - Web app: http://localhost:80"
        echo -e "  - Nginx proxy: http://localhost:80"
        ;;
    
    "prod-down")
        echo -e "${YELLOW}Stopping production containers...${NC}"
        docker-compose --profile production down
        ;;
    
    "prod-logs")
        echo -e "${BLUE}Showing production container logs...${NC}"
        docker-compose --profile production logs -f
        ;;
    
    "monitor-up")
        echo -e "${GREEN}Starting production with monitoring...${NC}"
        docker-compose --profile production --profile monitoring up --build -d
        echo -e "${GREEN}All services started:${NC}"
        echo -e "  - Web app: http://localhost:80"
        echo -e "  - Prometheus: http://localhost:9090"
        echo -e "  - Redis: redis://localhost:6379"
        ;;
    
    "monitor-down")
        echo -e "${YELLOW}Stopping monitoring stack...${NC}"
        docker-compose --profile production --profile monitoring down
        ;;
    
    "build")
        echo -e "${GREEN}Rebuilding all containers...${NC}"
        docker-compose build --no-cache
        ;;
    
    "clean")
        echo -e "${RED}Cleaning up containers and images...${NC}"
        docker-compose down --volumes --remove-orphans
        docker system prune -f
        ;;
    
    "status")
        echo -e "${BLUE}Container Status:${NC}"
        docker ps -a --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}\t{{.Image}}"
        echo ""
        echo -e "${BLUE}Available Services:${NC}"
        if docker ps --format '{{.Names}}' | grep -q final-dev; then
            echo -e "${GREEN}✓ Development: http://localhost:3001${NC}"
        else
            echo -e "${RED}✗ Development: Not running${NC}"
        fi
        
        if docker ps --format '{{.Names}}' | grep -q nginx; then
            echo -e "${GREEN}✓ Production: http://localhost:80${NC}"
        else
            echo -e "${RED}✗ Production: Not running${NC}"
        fi
        
        if docker ps --format '{{.Names}}' | grep -q prometheus; then
            echo -e "${GREEN}✓ Monitoring: http://localhost:9090${NC}"
        else
            echo -e "${RED}✗ Monitoring: Not running${NC}"
        fi
        ;;
    
    "help"|*)
        print_help
        ;;
esac