/*
  Warnings:

  - You are about to drop the `RouteTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RouteTag" DROP CONSTRAINT "RouteTag_routeId_fkey";

-- DropForeignKey
ALTER TABLE "RouteTag" DROP CONSTRAINT "RouteTag_tagId_fkey";

-- DropTable
DROP TABLE "RouteTag";

-- CreateTable
CREATE TABLE "RoutesOnTags" (
    "routeId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "RoutesOnTags_pkey" PRIMARY KEY ("routeId","tagId")
);

-- AddForeignKey
ALTER TABLE "RoutesOnTags" ADD CONSTRAINT "RoutesOnTags_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutesOnTags" ADD CONSTRAINT "RoutesOnTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
