-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Booking" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "workspaceId" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "startTime" TEXT NOT NULL DEFAULT '09:00',
    "seatsRequired" INTEGER NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "loginEmail" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    CONSTRAINT "Booking_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Booking" ("date", "email", "fullName", "id", "loginEmail", "phone", "seatsRequired", "status", "workspaceId") SELECT "date", "email", "fullName", "id", "loginEmail", "phone", "seatsRequired", "status", "workspaceId" FROM "Booking";
DROP TABLE "Booking";
ALTER TABLE "new_Booking" RENAME TO "Booking";
CREATE UNIQUE INDEX "Booking_workspaceId_date_startTime_email_key" ON "Booking"("workspaceId", "date", "startTime", "email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
