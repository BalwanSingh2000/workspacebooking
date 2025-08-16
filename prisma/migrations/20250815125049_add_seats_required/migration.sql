/*
  Warnings:

  - You are about to drop the column `time` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `seatsRequired` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Booking" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "workspaceId" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "seatsRequired" INTEGER NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    CONSTRAINT "Booking_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Booking" ("date", "email", "fullName", "id", "phone", "workspaceId") SELECT "date", "email", "fullName", "id", "phone", "workspaceId" FROM "Booking";
DROP TABLE "Booking";
ALTER TABLE "new_Booking" RENAME TO "Booking";
CREATE UNIQUE INDEX "Booking_workspaceId_date_email_key" ON "Booking"("workspaceId", "date", "email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
