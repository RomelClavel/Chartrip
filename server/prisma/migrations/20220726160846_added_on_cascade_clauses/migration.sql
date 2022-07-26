-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_routeId_fkey";

-- DropForeignKey
ALTER TABLE "RoutesOnTags" DROP CONSTRAINT "RoutesOnTags_routeId_fkey";

-- DropForeignKey
ALTER TABLE "RoutesOnTags" DROP CONSTRAINT "RoutesOnTags_tagId_fkey";

-- AlterTable
ALTER TABLE "Route" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutesOnTags" ADD CONSTRAINT "RoutesOnTags_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutesOnTags" ADD CONSTRAINT "RoutesOnTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
