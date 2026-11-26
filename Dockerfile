ARG APP_DIR
ARG DATA_DIR
ARG APP_UID
ARG APP_GID
ARG APP_PORT

FROM node:22-bookworm-slim AS build-dependencies
ARG APP_DIR
WORKDIR ${APP_DIR}
COPY package*.json ./
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ \
 && rm -rf /var/lib/apt/lists/*
RUN npm ci

FROM build-dependencies AS build
ARG APP_DIR
WORKDIR ${APP_DIR}
COPY . .
RUN npm run build

FROM node:22-bookworm-slim AS production-dependencies
ARG APP_DIR
WORKDIR ${APP_DIR}
COPY package*.json ./
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ \
 && rm -rf /var/lib/apt/lists/*
RUN npm ci --omit=dev

FROM node:22-bookworm-slim AS runtime
ARG APP_DIR
ARG DATA_DIR
ARG APP_UID
ARG APP_GID
ARG APP_PORT
WORKDIR ${APP_DIR}
ENV NODE_ENV=production
ENV PORT=${APP_PORT}
COPY --from=production-dependencies ${APP_DIR}/node_modules ./node_modules
COPY --from=build ${APP_DIR}/dist ./dist
COPY --from=build ${APP_DIR}/server ./server
# RUN mkdir -p "${DATA_DIR}" && chown -R "${APP_UID}:${APP_GID}" "${DATA_DIR}"
USER ${APP_UID}:${APP_GID}
EXPOSE ${APP_PORT}
CMD ["node", "server/index.mjs"]
