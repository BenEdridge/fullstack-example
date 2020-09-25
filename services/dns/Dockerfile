FROM alpine:3.12
WORKDIR /usr/src/app
RUN apk add --update --no-cache dnsmasq && rm -rf /var/cache/apk/*
ENTRYPOINT [ "dnsmasq"]