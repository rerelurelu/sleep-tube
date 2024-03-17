-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);
