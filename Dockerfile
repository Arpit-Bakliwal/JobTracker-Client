# ── Stage 1: Build React app ───────────────────────────────────────────────
FROM node:20-alpine AS build

WORKDIR /app

ARG VITE_API_URL
ARG VITE_SOCKET_URL

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all client code
COPY . .

# Make them available as env variables during build
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_SOCKET_URL=$VITE_SOCKET_URL

# Build for production
# Creates /app/dist folder with static files
RUN npm run build

# ── Stage 2: Serve with nginx ──────────────────────────────────────────────
# Throw away the Node image — we don't need it anymore
# Only keep the built files
FROM nginx:alpine AS production

# Copy built React files to nginx's serving directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy our custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]