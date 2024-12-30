-- CreateTable
CREATE TABLE "PageView" (
    "id" SERIAL NOT NULL,
    "page" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "PageView_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PageView_page_key" ON "PageView"("page");
