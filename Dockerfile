# Step 1 Insttall the dependencies
FROM node:lts-slim AS deps
WORKDIR /app
# Installing dependencies
COPY package.json package-lock.json ./
RUN  npm install --omit-dev

# Step 2 Build the code
FROM node:lts-slim AS builder
# Copying dependencies
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Building the code
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build 

# Step 3 run the artifact
FROM node:lts-slim AS runner
WORKDIR /app
# Disable next telemetry for performance gain
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
# Copying build artifact
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
# Run the application
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
