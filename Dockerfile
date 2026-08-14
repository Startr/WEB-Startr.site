# Build the static site, then serve it. Cloudflare Pages does not need this —
# it is here for CapRover, a VPS, or anywhere else that wants a container.

FROM oven/bun:1 AS build
WORKDIR /app
COPY package.json ./
RUN bun install
COPY src ./src
RUN bun run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
