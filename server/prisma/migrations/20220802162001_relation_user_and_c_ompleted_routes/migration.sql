-- CreateTable
CREATE TABLE "CompletedRoute" (
    "routeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CompletedRoute_pkey" PRIMARY KEY ("routeId","userId")
);

-- AddForeignKey
ALTER TABLE "CompletedRoute" ADD CONSTRAINT "CompletedRoute_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompletedRoute" ADD CONSTRAINT "CompletedRoute_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
