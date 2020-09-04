# Final Image

# Builder
FROM node:14.8.0-alpine3.11 as builder

ARG JAEGER_COLLECTOR_URL
ENV JAEGER_COLLECTOR_URL {$JAEGER_COLLECTOR_URL}

WORKDIR /usr/src/app
COPY . .

RUN npm ci

FROM node:14.8.0-alpine3.11 
WORKDIR /usr/src/app

# DISABLE npm update checker...
# https://docs.npmjs.com/misc/config#update-notifier
ENV NO_UPDATE_NOTIFIER true

# Node Modules
COPY --from=builder --chown=node:node /usr/src/app/node_modules node_modules

# Source
COPY --chown=node:node crud.js package*.json ./

USER node
CMD [ "npm", "run", "start" ]

EXPOSE 3000