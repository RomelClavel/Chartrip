/*
  Warnings:

  - You are about to drop the `RoutesOnTags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RoutesOnTags" DROP CONSTRAINT "RoutesOnTags_routeId_fkey";

-- DropForeignKey
ALTER TABLE "RoutesOnTags" DROP CONSTRAINT "RoutesOnTags_tagId_fkey";

-- DropTable
DROP TABLE "RoutesOnTags";

-- CreateTable
CREATE TABLE "_RouteToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RouteToTag_AB_unique" ON "_RouteToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_RouteToTag_B_index" ON "_RouteToTag"("B");

-- AddForeignKey
ALTER TABLE "_RouteToTag" ADD CONSTRAINT "_RouteToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Route"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RouteToTag" ADD CONSTRAINT "_RouteToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
