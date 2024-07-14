/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "email" TEXT;

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "fresh" BOOLEAN;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");
