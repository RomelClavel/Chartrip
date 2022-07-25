/*
  Warnings:

  - You are about to drop the `_RouteToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_RouteToTag" DROP CONSTRAINT "_RouteToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_RouteToTag" DROP CONSTRAINT "_RouteToTag_B_fkey";

-- DropTable
DROP TABLE "_RouteToTag";

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
