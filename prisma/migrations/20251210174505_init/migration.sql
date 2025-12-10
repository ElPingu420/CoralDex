-- CreateTable
CREATE TABLE "Coral" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rarity" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "light" TEXT NOT NULL,
    "flow" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Coral_pkey" PRIMARY KEY ("id")
);
