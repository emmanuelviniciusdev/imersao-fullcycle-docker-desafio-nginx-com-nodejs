FROM nginx:1.15.0-alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY server.conf /etc/nginx/conf.d

RUN touch index.js
