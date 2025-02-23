# =============================
# Development Stage
# =============================
FROM node:22-alpine AS development

WORKDIR /usr/src/app

# Copy package files first to leverage Docker cache
COPY package.json yarn.lock ./

# Install all dependencies (including devDependencies)
RUN yarn install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application in development mode
CMD ["yarn", "dev"]

# =============================
# Build Stage
# =============================
FROM node:22-alpine AS build

WORKDIR /usr/src/app

# Copy only necessary files for dependencies installation
COPY package.json yarn.lock ./

# Install all dependencies (including devDependencies for build)
RUN yarn install --frozen-lockfile

# Copy the source code
COPY . .

# Run the build command
RUN yarn build

# =============================
# Production Stage
# =============================
FROM node:22-alpine AS production

WORKDIR /usr/src/app

# Copy only necessary files from the build stage
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/config ./config
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./package.json

# Expose the application port
EXPOSE 3000

# Start the server in production mode
CMD ["node", "dist/src/server.js"]