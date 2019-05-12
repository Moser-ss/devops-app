FROM node:10-alpine

COPY . /app
WORKDIR /app
RUN npm ci --prodution
USER nobody

CMD ["node", "/app/src/app.js"]