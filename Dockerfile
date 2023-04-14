# Step 1 Insttall the dependencies
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
# Installing dependencies
COPY package.json package-lock.json ./
RUN  npm install

# Step 2 Build the code
FROM node:18-alpine AS builder
# Copying dependencies
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Building the code
ENV NEXT_TELEMETRY_DISABLED 1
#TODO: KALO DIBULD MASIH KELUAR ERROR, @FE TOLONG BENERIN
# RUN npm run build 

# Step 3 run the artifact
FROM node:18-alpine AS runner
WORKDIR /app
# Disable next telemetry for performance gain
ENV NEXT_TELEMETRY_DISABLED 1
# Copying build artifact
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
# Run the application
EXPOSE 3000
ENV PORT 3000
CMD ["npm", "start"]