/*
  Warnings:

  - You are about to drop the column `aRequestId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `cRequestId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_aRequestId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_cRequestId_fkey";

-- AlterTable
ALTER TABLE "ServiceRequest" ADD COLUMN     "aRequestId" TEXT,
ADD COLUMN     "cRequestId" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "aRequestId",
DROP COLUMN "cRequestId";

-- AddForeignKey
ALTER TABLE "ServiceRequest" ADD CONSTRAINT "ServiceRequest_cRequestId_fkey" FOREIGN KEY ("cRequestId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceRequest" ADD CONSTRAINT "ServiceRequest_aRequestId_fkey" FOREIGN KEY ("aRequestId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
