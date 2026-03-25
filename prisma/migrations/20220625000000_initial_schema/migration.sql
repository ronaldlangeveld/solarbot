-- CreateTable
CREATE TABLE "grid_status" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" REAL NOT NULL,
    "timestamp" BIGINT NOT NULL DEFAULT 0,
    "loadshedding" INTEGER,
    "battery_level" INTEGER,
    "consumption" REAL,
    "production" REAL
);

-- CreateTable
CREATE TABLE "tokens" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "access" TEXT NOT NULL,
    "refresh" TEXT NOT NULL,
    "expires" BIGINT
);
