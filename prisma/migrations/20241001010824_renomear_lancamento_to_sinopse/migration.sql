/*
  Warnings:

  - You are about to drop the column `lancamento` on the `Filme` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Filme" DROP COLUMN "lancamento",
ADD COLUMN     "sinopse" TEXT;
