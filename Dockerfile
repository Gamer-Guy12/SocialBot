FROM node:22-bookworm-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

ENV DATABASE_URL=""
ENV LOGS_CHANNEL="1265144667444351060"
ENV GULAG_ROLE="1238698923007414314"
ENV LEADER_ROLE="1265467890782699540"
ENV BOT_TOKEN=""
ENV CLIENT_ID=""
ENV SERVER_ID=""
ENV GULAG_LOCKED="1203156993133650000,"

RUN corepack enable
RUN mkdir /app
COPY package.json /app
COPY pnpm-lock.yaml /app
WORKDIR /app

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
COPY . /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpx prisma generate
RUN apt-get update -y
RUN apt-get install -y openssl
RUN pnpm run build

FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/.output /app/.output
RUN apt-get update -y
RUN apt-get install -y openssl
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]