import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { mkdirSync } from "fs";
import { dirname } from "path";

const url = process.env.DATABASE_URL ?? "file:./database/app.sqlite";

// Ensure the directory exists before libsql tries to open the file
const filePath = url.replace(/^file:/, "");
mkdirSync(dirname(filePath), { recursive: true });

const adapter = new PrismaLibSql({ url });

const prisma = new PrismaClient({ adapter });

export default prisma;
