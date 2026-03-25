FROM oven/bun:latest

WORKDIR /usr/src/app

COPY package.json bun.lock* ./

RUN bun install --frozen-lockfile

COPY . .

RUN bunx prisma generate

RUN mkdir -p /usr/src/app/database

EXPOSE 3123

CMD ["sh", "-c", "bunx prisma migrate deploy && bun index.ts"]
