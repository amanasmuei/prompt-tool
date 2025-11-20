#!/bin/bash

# Development Database Management Script
# Manages PostgreSQL and Redis containers for local development

set -e

COMPOSE_FILE="docker-compose.dev.yml"
PROJECT_NAME="easyprompt"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper function to print colored messages
print_message() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

# Check if Docker is installed
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_message "$RED" "❌ Docker is not installed. Please install Docker first."
        echo "   Visit: https://docs.docker.com/get-docker/"
        exit 1
    fi

    if ! docker info &> /dev/null; then
        print_message "$RED" "❌ Docker daemon is not running. Please start Docker."
        exit 1
    fi
}

# Start services
start() {
    print_message "$BLUE" "🚀 Starting development databases..."

    if [ "$1" = "--tools" ]; then
        print_message "$YELLOW" "   Including PgAdmin and Redis Commander..."
        docker-compose -f $COMPOSE_FILE --profile tools up -d
    else
        docker-compose -f $COMPOSE_FILE up -d
    fi

    print_message "$GREEN" "✅ Services started successfully!"
    echo ""
    status
}

# Stop services
stop() {
    print_message "$BLUE" "🛑 Stopping development databases..."
    docker-compose -f $COMPOSE_FILE down
    print_message "$GREEN" "✅ Services stopped successfully!"
}

# Restart services
restart() {
    print_message "$BLUE" "🔄 Restarting development databases..."
    stop
    start "$@"
}

# Show status
status() {
    print_message "$BLUE" "📊 Service Status:"
    echo ""
    docker-compose -f $COMPOSE_FILE ps
    echo ""

    # Show connection strings
    print_message "$GREEN" "📝 Connection Details:"
    echo ""
    echo "  PostgreSQL:"
    echo "    Host:     localhost"
    echo "    Port:     5432"
    echo "    Database: easyprompt_dev"
    echo "    User:     postgres"
    echo "    Password: password"
    echo "    URL:      postgresql://postgres:password@localhost:5432/easyprompt_dev"
    echo ""
    echo "  Redis:"
    echo "    Host:     localhost"
    echo "    Port:     6379"
    echo "    Password: devpassword"
    echo "    URL:      redis://localhost:6379"
    echo ""

    # Show web UIs if running
    if docker ps | grep -q "easyprompt-pgadmin"; then
        echo "  PgAdmin:"
        echo "    URL:      http://localhost:5050"
        echo "    Email:    admin@easyprompt.local"
        echo "    Password: admin"
        echo ""
    fi

    if docker ps | grep -q "easyprompt-redis-commander"; then
        echo "  Redis Commander:"
        echo "    URL:      http://localhost:8081"
        echo ""
    fi
}

# View logs
logs() {
    if [ -z "$1" ]; then
        print_message "$BLUE" "📋 Showing all logs (Ctrl+C to exit)..."
        docker-compose -f $COMPOSE_FILE logs -f
    else
        print_message "$BLUE" "📋 Showing logs for $1 (Ctrl+C to exit)..."
        docker-compose -f $COMPOSE_FILE logs -f "$1"
    fi
}

# Clean up (remove containers and volumes)
clean() {
    print_message "$YELLOW" "⚠️  This will remove all containers and DATA!"
    read -p "Are you sure? (yes/no): " confirm

    if [ "$confirm" = "yes" ]; then
        print_message "$RED" "🗑️  Cleaning up..."
        docker-compose -f $COMPOSE_FILE down -v
        print_message "$GREEN" "✅ Cleanup complete!"
    else
        print_message "$BLUE" "❌ Cleanup cancelled."
    fi
}

# Reset database (drop and recreate)
reset_db() {
    print_message "$YELLOW" "⚠️  This will DESTROY all database data!"
    read -p "Are you sure? (yes/no): " confirm

    if [ "$confirm" = "yes" ]; then
        print_message "$RED" "🗑️  Resetting database..."

        # Stop the services
        docker-compose -f $COMPOSE_FILE stop postgres

        # Remove the volume
        docker volume rm ${PROJECT_NAME}_postgres_data 2>/dev/null || true

        # Restart
        docker-compose -f $COMPOSE_FILE up -d postgres

        # Wait for database to be ready
        print_message "$BLUE" "⏳ Waiting for database to be ready..."
        sleep 5

        print_message "$GREEN" "✅ Database reset complete!"
        print_message "$YELLOW" "   Run: npm run prisma migrate dev"
    else
        print_message "$BLUE" "❌ Reset cancelled."
    fi
}

# Connect to PostgreSQL CLI
psql() {
    print_message "$BLUE" "🔌 Connecting to PostgreSQL..."
    docker exec -it easyprompt-postgres-dev psql -U postgres -d easyprompt_dev
}

# Connect to Redis CLI
redis_cli() {
    print_message "$BLUE" "🔌 Connecting to Redis..."
    docker exec -it easyprompt-redis-dev redis-cli -a devpassword
}

# Backup database
backup() {
    local backup_file="backup_$(date +%Y%m%d_%H%M%S).sql"
    print_message "$BLUE" "💾 Creating backup: $backup_file"

    docker exec easyprompt-postgres-dev pg_dump -U postgres easyprompt_dev > "$backup_file"

    print_message "$GREEN" "✅ Backup created: $backup_file"
}

# Show help
help() {
    echo "Development Database Management Script"
    echo ""
    echo "Usage: $0 <command> [options]"
    echo ""
    echo "Commands:"
    echo "  start [--tools]  Start PostgreSQL and Redis containers"
    echo "                   Use --tools to also start PgAdmin and Redis Commander"
    echo "  stop             Stop all containers"
    echo "  restart          Restart all containers"
    echo "  status           Show container status and connection details"
    echo "  logs [service]   View logs (all services or specific service)"
    echo "  clean            Remove containers and volumes (WARNING: deletes data)"
    echo "  reset-db         Reset PostgreSQL database (WARNING: deletes data)"
    echo "  psql             Connect to PostgreSQL CLI"
    echo "  redis-cli        Connect to Redis CLI"
    echo "  backup           Create a database backup"
    echo "  help             Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 start                    # Start databases"
    echo "  $0 start --tools            # Start databases with web UIs"
    echo "  $0 logs postgres            # View PostgreSQL logs"
    echo "  $0 psql                     # Connect to database"
    echo ""
}

# Main script
check_docker

case "$1" in
    start)
        start "$2"
        ;;
    stop)
        stop
        ;;
    restart)
        restart "$2"
        ;;
    status)
        status
        ;;
    logs)
        logs "$2"
        ;;
    clean)
        clean
        ;;
    reset-db)
        reset_db
        ;;
    psql)
        psql
        ;;
    redis-cli)
        redis_cli
        ;;
    backup)
        backup
        ;;
    help|--help|-h)
        help
        ;;
    *)
        print_message "$RED" "❌ Unknown command: $1"
        echo ""
        help
        exit 1
        ;;
esac
