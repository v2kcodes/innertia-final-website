# 🐳 Docker Setup for Innertia Software Solutions

Your Docker containers are now ready! This guide explains how to use the Docker setup for development and production.

## 🚀 Quick Start

### Current Status
- ✅ **Development Container**: Running on http://localhost:3001
- ✅ **Your original dev server**: Still running on http://localhost:3000
- 📦 **Production setup**: Ready to launch
- 📊 **Monitoring**: Available with Prometheus

## 📋 Available Services

| Service | Development | Production | Purpose |
|---------|------------|------------|---------|
| **Web App** | Port 3001 | Port 80 | Next.js application |
| **Nginx** | - | Port 80/443 | Reverse proxy & load balancer |
| **Redis** | - | Port 6379 | Caching (optional) |
| **Prometheus** | - | Port 9090 | Monitoring (optional) |

## 🛠️ Management Commands

### Using the Management Scripts

**Windows:**
```bash
.\docker-dev.bat [command]
```

**Linux/Mac:**
```bash
./docker-dev.sh [command]
```

### Available Commands

#### Development
```bash
# Start development container (port 3001)
.\docker-dev.bat dev-up

# Stop development container
.\docker-dev.bat dev-down

# View logs
.\docker-dev.bat dev-logs

# Open shell inside container
.\docker-dev.bat dev-shell
```

#### Production
```bash
# Start production containers
.\docker-dev.bat prod-up

# Stop production containers  
.\docker-dev.bat prod-down

# View production logs
.\docker-dev.bat prod-logs
```

#### Monitoring
```bash
# Start production with monitoring
.\docker-dev.bat monitor-up

# Stop monitoring stack
.\docker-dev.bat monitor-down
```

#### Utilities
```bash
# Check status of all containers
.\docker-dev.bat status

# Rebuild all containers
.\docker-dev.bat build

# Clean up everything
.\docker-dev.bat clean

# Show help
.\docker-dev.bat help
```

## 🔧 Manual Docker Commands

If you prefer using docker-compose directly:

### Development
```bash
# Start development container
docker-compose up dev --build -d

# Stop development container
docker-compose stop dev
```

### Production
```bash
# Start production stack
docker-compose --profile production up --build -d

# Start with monitoring
docker-compose --profile production --profile monitoring up --build -d

# Stop everything
docker-compose --profile production --profile monitoring down
```

## 📁 Configuration Files

| File | Purpose |
|------|---------|
| `docker-compose.yml` | Main container orchestration |
| `Dockerfile` | Production container build |
| `Dockerfile.dev` | Development container build |
| `nginx.conf` | Reverse proxy configuration |
| `.env` | Environment variables for containers |
| `prometheus.yml` | Monitoring configuration |

## 🌐 Access Points

### Development Mode
- **Your App (Docker)**: http://localhost:3001
- **Your App (Direct)**: http://localhost:3000 *(your current dev server)*

### Production Mode
- **Web Application**: http://localhost:80
- **Nginx Status**: http://localhost:80/health

### Monitoring Mode
- **Web Application**: http://localhost:80  
- **Prometheus**: http://localhost:9090
- **Redis**: redis://localhost:6379

## 🔐 Environment Variables

The containers use environment variables from `.env` file:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Email Service
RESEND_API_KEY=your_resend_api_key
NOTIFICATION_EMAIL=innertiass@gmail.com

# Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://innertiass.com
```

## 🔍 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Check what's using the port
netstat -ano | findstr :3001

# Stop the conflicting service or use a different port
```

#### Container Won't Start
```bash
# Check logs
docker-compose logs dev

# Rebuild container
docker-compose build --no-cache dev
```

#### Database Connection Issues
Make sure your `.env` file has the correct Supabase credentials from `.env.local`.

### Useful Debug Commands

```bash
# View all containers
docker ps -a

# Check container logs
docker logs final-dev-1

# Execute command in container
docker exec -it final-dev-1 /bin/sh

# View container resource usage
docker stats
```

## 🚀 Production Deployment

### Prerequisites
1. Update `.env` with production values
2. Add SSL certificates to `./ssl/` directory
3. Configure domain in `nginx.conf`

### Deploy Steps
```bash
# 1. Build and start production
.\docker-dev.bat prod-up

# 2. Verify everything is working
.\docker-dev.bat status

# 3. Check logs
.\docker-dev.bat prod-logs
```

## 📊 Monitoring

### Prometheus Metrics
Once monitoring is enabled, you can view metrics at http://localhost:9090

**Available Metrics:**
- Application performance
- HTTP request rates
- Error rates  
- Resource usage

### Health Checks
- **Application Health**: http://localhost:3001/api/health
- **Nginx Health**: http://localhost:80/health

## 🛡️ Security Features

### Nginx Security
- Rate limiting for API endpoints
- Security headers (XSS, CSRF protection)
- SSL/TLS support (when certificates are added)

### Container Security
- Non-root user execution
- Minimal attack surface with Alpine Linux
- Environment variable isolation

## 🎯 Next Steps

1. **SSL Setup**: Add SSL certificates for HTTPS
2. **Domain Configuration**: Update nginx.conf with your domain
3. **Monitoring**: Set up alerts in Prometheus
4. **Scaling**: Add more container instances for high availability

## 🆘 Support

If you encounter issues:

1. Check the logs: `.\docker-dev.bat dev-logs`
2. Verify status: `.\docker-dev.bat status`  
3. Clean and rebuild: `.\docker-dev.bat clean && .\docker-dev.bat build`
4. Check this README for troubleshooting steps

---

**Your Docker setup is now complete and ready to use!** 🎉

The development container is already running at http://localhost:3001, while your original development server continues on port 3000.