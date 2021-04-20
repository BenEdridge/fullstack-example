# What does this include?

# Gateway
- NodeJS gateway?

# Microservices
- OAuth service 
- API
- UI

# Monitoring
- Logging (docker ps, fluentd, kibana)
- Metrics (kibana, cadvisor)
- Tracing (open tracing)

# External API links

# DNS
coreDNS used as local DNS resolver and forwarder to external DNS

# Why?

This demo exposes the following endpoints:

## Kong Gateway Proxy
http://localhost:8000
https://localhost:8443

## Kong Gateway Admin API
http://localhost:8001
https://localhost:8444

## Distributed Tracing UI
Jaeger at http://localhost:16686
Zipkins at http://localhost:9411

## Metrics and Monitoring UI
Prometheus at http://localhost:9090

## Container Metric UI (Forwarded to Prometheus)
Cadvisor at http://localhost:8080/docker/

# Logging Analysis UI
Kibana at http://localhost:5601



https://docs.fluentd.org/v/0.12/container-deployment/docker-compose

# References

https://github.com/blacktop/docker-elastic-stack

https://elk-docker.readthedocs.io/

https://github.com/elastic/logstash/blob/master/docker/templates/Dockerfile.j2

https://www.elastic.co/guide/en/elasticsearch/reference/7.5/docker.html

https://stackoverflow.com/questions/45727489/how-to-setup-elk-with-node-js


https://logz.io/blog/docker-logging/

 <!-- --log-driver=syslog \
 --log-opt syslog-address=tcp://:5000
 \ --log-opt syslog-facility=daemon -->



Use Open Telemetry Plugins Instead??

https://alanstorm.com/tracing-nodejs-services-with-open-telemetry/


https://github.com/open-telemetry/opentelemetry-js/tree/master/examples/prometheus


https://github.com/open-telemetry/opentelemetry-js/tree/master/packages/opentelemetry-node



# ELK Flow

https://logz.io/learn/complete-guide-elk-stack/  


https://github.com/shazChaudhry/docker-elastic/blob/master/elk/beats/filebeat/config/filebeat.yml

![Interesting Image](./image6-1024x422.png)


# https://prometheus.io/docs/guides/cadvisor/


https://raw.githubusercontent.com/open-telemetry/opentelemetry-collector/master/examples/demo/docker-compose.yaml


  # https://www.elastic.co/guide/en/beats/filebeat/6.8/config-filebeat-logstash.html


    # Inspired by: https://github.com/deviantony/docker-elk/blob/master/docker-compose.yml



    https://docs.docker.com/compose/extends/#understanding-multiple-compose-files


    https://news.ycombinator.com/item?id=23906635
    

    https://www.eisfunke.com/article/docker-wireguard-systemd.html