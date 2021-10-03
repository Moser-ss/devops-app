FROM node:12-alpine
LABEL org.opencontainers.image.source=https://github.com/Moser-ss/devops-app
LABEL org.opencontainers.image.authors="@StMoser"

CMD ["node", "/app/src/app.js"]
USER nobody

COPY node_modules/ /app/node_modules
COPY src/ /app/src