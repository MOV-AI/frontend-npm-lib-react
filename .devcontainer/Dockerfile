ARG VARIANT=16-bullseye
FROM mcr.microsoft.com/devcontainers/javascript-node:0-${VARIANT}

LABEL description="Frontend development environment"
LABEL maintaner="frontend@mov.ai"

USER 1000:1000

RUN npm install standard --global
