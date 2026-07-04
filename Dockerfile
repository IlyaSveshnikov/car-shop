# --- Сборка клиента ---
FROM node:18-alpine AS client
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install --include=dev
COPY client/ ./
RUN npm run build

# --- Сборка сервера ---
FROM node:18-alpine AS server
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install --include=dev
COPY server/ ./
RUN npm run build

# --- Рантайм ---
FROM node:18-alpine
ENV NODE_ENV=production
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install --omit=dev
COPY --from=server /app/server/dist ./dist
COPY server/static ./static
# Клиент кладём рядом (сервер ищет ../../client/dist относительно server/dist).
COPY --from=client /app/client/dist ../client/dist
EXPOSE 4000
CMD ["node", "dist/main.js"]
