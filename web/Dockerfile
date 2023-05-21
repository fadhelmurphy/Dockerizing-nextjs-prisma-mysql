# 1. Install dependencies nya dulu gasii
FROM node:18-alpine AS deps

WORKDIR /web_dir_nya_cuy
RUN apk update \
  && apk add openssl1.1-compat
COPY package.json ./
COPY prisma ./prisma
# COPY .yarnrc ./
# COPY .npmrc ./
RUN yarn cache clean
RUN yarn install

# 2. Build app nya
FROM node:18-alpine AS builder

RUN apk update \
  && apk add openssl1.1-compat
WORKDIR /web_dir_nya_cuy
COPY --from=deps /web_dir_nya_cuy/node_modules ./node_modules
COPY . .
# This will do the trick, use the corresponding env file for each environment.
# COPY .env.prod .env
# RUN npm install -g npm@9.6.7

RUN yarn prisma:generate
RUN yarn build

# 3. Production image, copy all the files and run next
FROM node:18-alpine AS runner

# RUN apk update
WORKDIR /web_dir_nya_cuy
RUN apk update \
  && apk add openssl1.1-compat
# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /web_dir_nya_cuy/next.config.js ./
COPY --from=builder /web_dir_nya_cuy/public ./public
COPY --from=builder /web_dir_nya_cuy/package.json ./package.json

# Automatically leverage output traces to reduce image size 
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder /web_dir_nya_cuy/.next/standalone ./
COPY --from=builder /web_dir_nya_cuy/.next/static ./.next/static
COPY --from=builder /web_dir_nya_cuy/package.json ./package.json
COPY --from=builder /web_dir_nya_cuy/prisma ./prisma

EXPOSE 3000

# ENV PORT 3000

CMD ["node", "server.js"] # ini dari hasil build yg ada di standalone