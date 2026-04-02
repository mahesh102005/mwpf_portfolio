# Step 1: Build React app with pnpm
FROM node:18 AS build

RUN npm install -g pnpm

WORKDIR /app
COPY package*.json pnpm-lock.yaml* ./
RUN pnpm install
COPY . .
RUN pnpm run build

# Step 2: Serve with Nginx
FROM nginx:latest
COPY --from=build /app/dist /usr/share/nginx/html