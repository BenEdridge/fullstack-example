FROM alpine:3.11
WORKDIR /usr/src/app
RUN apk add --update --no-cache tshark && rm -rf /var/cache/apk/*
ENTRYPOINT [ "tshark" ]