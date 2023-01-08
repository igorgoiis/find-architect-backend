/*
  Warnings:

  - You are about to drop the column `role` on the `Architect` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Client` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Architect" DROP COLUMN "role";

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "role";

-- DropEnum
DROP TYPE "Role";
