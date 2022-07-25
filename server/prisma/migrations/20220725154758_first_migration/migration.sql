-- CreateEnum
CREATE TYPE "Type" AS ENUM ('FoodStall', 'Restaurant', 'Bakery', 'Bar', 'Cafe', 'Cultural', 'Beach', 'Store', 'ShoppingCenter', 'LocalAttraction', 'NationalPark', 'Park', 'Plaza', 'Museum', 'Entertainment', 'RestStop');

-- CreateTable
CREATE TABLE "Route" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "durationMax" DOUBLE PRECISION NOT NULL,
    "durationMin" DOUBLE PRECISION NOT NULL,
    "userPicture" TEXT,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "whatToDo" TEXT NOT NULL,
    "type" "Type" NOT NULL,
    "routeId" TEXT NOT NULL,
    "creatorId" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RouteTag" (
    "routeId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "RouteTag_pkey" PRIMARY KEY ("routeId","tagId")
);

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RouteTag" ADD CONSTRAINT "RouteTag_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RouteTag" ADD CONSTRAINT "RouteTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
