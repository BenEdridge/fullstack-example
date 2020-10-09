# Getting Started

```
# Build container images
docker-compose build

# Start
docker-compose up -d

# Create a Book
curl -X POST localhost:3000/book -H "content-type: application/json" --data-raw '{"name":"The Great Gatsby"}'

# View some of the endpoints below to watch metrics, tracing and logging

# Shutdown
docker-compose down --remove-orphans
```

# What is Running?

## Kong Gateway Proxy

http://localhost:8000  
https://localhost:8443  

## Kong Gateway Admin API

http://localhost:8001  
https://localhost:8444  

## Distributed Tracing UI

Jaeger:  
http://localhost:16686 

Zipkins:  
http://localhost:9411

## Metrics and Monitoring

Prometheus:  
http://localhost:9090

Cadvisor (Container Metrics Forwarded to Prometheus):
http://localhost:8080/docker/

## Logging Analysis UI

Kibana:
http://localhost:5601

Grafana:
http://localhost:3001

## Book API

http://localhost:3000