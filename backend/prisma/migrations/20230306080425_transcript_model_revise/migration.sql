/*
  Warnings:

  - You are about to drop the `TranscriptPart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TranscriptResult` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `partsUrl` to the `Transcript` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TranscriptPart" DROP CONSTRAINT "TranscriptPart_transcriptId_fkey";

-- DropForeignKey
ALTER TABLE "TranscriptResult" DROP CONSTRAINT "TranscriptResult_transcriptPartId_fkey";

-- AlterTable
ALTER TABLE "Transcript" ADD COLUMN     "partsUrl" TEXT NOT NULL;

-- DropTable
DROP TABLE "TranscriptPart";

-- DropTable
DROP TABLE "TranscriptResult";
