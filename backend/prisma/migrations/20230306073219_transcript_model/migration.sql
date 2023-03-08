/*
  Warnings:

  - You are about to drop the column `partsUrl` on the `Transcript` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transcript" DROP COLUMN "partsUrl";

-- CreateTable
CREATE TABLE "TranscriptPart" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "duration" DOUBLE PRECISION NOT NULL,
    "unsaved" BOOLEAN NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "transcriptId" TEXT NOT NULL,

    CONSTRAINT "TranscriptPart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TranscriptResult" (
    "id" TEXT NOT NULL,
    "timestamp" DOUBLE PRECISION NOT NULL,
    "text" TEXT NOT NULL,
    "translation" TEXT NOT NULL,
    "transcriptPartId" TEXT NOT NULL,

    CONSTRAINT "TranscriptResult_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TranscriptPart" ADD CONSTRAINT "TranscriptPart_transcriptId_fkey" FOREIGN KEY ("transcriptId") REFERENCES "Transcript"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TranscriptResult" ADD CONSTRAINT "TranscriptResult_transcriptPartId_fkey" FOREIGN KEY ("transcriptPartId") REFERENCES "TranscriptPart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
