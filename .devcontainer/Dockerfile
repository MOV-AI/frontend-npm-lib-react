ARG VARIANT=16
FROM "mcr.microsoft.com/vscode/devcontainers/javascript-node":${VARIANT}

LABEL description="Frontend development environment"
LABEL maintaner="frontend@mov.ai"

USER 1000:1000

RUN npm install standard --global
