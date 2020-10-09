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

```
IMAGE                                       NAMES               SIZE
otel/opentelemetry-collector                otel-agent          0B (virtual 91.4MB)
prom/prometheus:latest                      prometheus          0B (virtual 145MB)
otel/opentelemetry-collector                otel-collector      0B (virtual 91.4MB)
gcr.io/google-containers/cadvisor:latest    cadvisor            0B (virtual 185MB)
jaegertracing/all-in-one:latest             jaeger              0B (virtual 47.4MB)
kibana:7.9.1                                kibana              579kB (virtual 1.18GB)
grafana/grafana                             grafana             487kB (virtual 181MB)
redis:alpine                                redis-cadvisor      0B (virtual 32.1MB)
fullstack-example_api                       api                 0B (virtual 135MB)
elasticsearch:7.9.1                         elasticsearch       12.1MB (virtual 774MB)
kong:alpine                                 gateway             22.4kB (virtual 147MB)
timberio/vector:latest-alpine               vector              0B (virtual 80.7MB)
postgres:13-alpine                          database            63B (virtual 158MB)
registry:2.7.1                              registry            0B (virtual 26.2MB)
```

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
