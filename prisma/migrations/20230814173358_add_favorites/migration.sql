/*
  Warnings:

  - You are about to drop the column `year` on the `Track` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Track" DROP COLUMN "year";

-- CreateTable
CREATE TABLE "ArtistInFavorites" (
    "artistId" TEXT NOT NULL,
    "favoritesId" TEXT NOT NULL,

    CONSTRAINT "ArtistInFavorites_pkey" PRIMARY KEY ("artistId","favoritesId")
);

-- CreateTable
CREATE TABLE "AlbumInFavorites" (
    "albumId" TEXT NOT NULL,
    "favoritesId" TEXT NOT NULL,

    CONSTRAINT "AlbumInFavorites_pkey" PRIMARY KEY ("albumId","favoritesId")
);

-- CreateTable
CREATE TABLE "TrackInFavorites" (
    "trackId" TEXT NOT NULL,
    "favoritesId" TEXT NOT NULL,

    CONSTRAINT "TrackInFavorites_pkey" PRIMARY KEY ("trackId","favoritesId")
);

-- CreateTable
CREATE TABLE "Favorites" (
    "id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "AlbumInFavorites_albumId_key" ON "AlbumInFavorites"("albumId");

-- CreateIndex
CREATE UNIQUE INDEX "TrackInFavorites_trackId_key" ON "TrackInFavorites"("trackId");

-- CreateIndex
CREATE UNIQUE INDEX "Favorites_id_key" ON "Favorites"("id");

-- AddForeignKey
ALTER TABLE "ArtistInFavorites" ADD CONSTRAINT "ArtistInFavorites_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistInFavorites" ADD CONSTRAINT "ArtistInFavorites_favoritesId_fkey" FOREIGN KEY ("favoritesId") REFERENCES "Favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlbumInFavorites" ADD CONSTRAINT "AlbumInFavorites_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlbumInFavorites" ADD CONSTRAINT "AlbumInFavorites_favoritesId_fkey" FOREIGN KEY ("favoritesId") REFERENCES "Favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackInFavorites" ADD CONSTRAINT "TrackInFavorites_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackInFavorites" ADD CONSTRAINT "TrackInFavorites_favoritesId_fkey" FOREIGN KEY ("favoritesId") REFERENCES "Favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;
