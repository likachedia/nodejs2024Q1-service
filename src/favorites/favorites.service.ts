import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Album } from "src/album/album.models";
import { Artist } from "src/artist/artist.models";
import { getAlbums, getArtists, getFavorites, getTracks } from "src/database/db";
import { PrismaService } from "src/prisma/prisma.service";
import { Track } from "src/track/track.model";
import { getItemById, validateItemExists } from "src/utils/utils";
import { UtilsService } from "src/utils/utils.service";

@Injectable()
export class FavoritesService {

    // private favorites = getFavorites();

    constructor(private prisma: PrismaService, private utils: UtilsService){}

    async getAllFavorites() {
        const [albumFavs, artistFavs, trackFavs] = await Promise.all([
            this.prisma.albumInFavorites.findMany({ include: { album: true } }),
            this.prisma.artistInFavorites.findMany({ include: { artist: true } }),
            this.prisma.trackInFavorites.findMany({ include: { track: true } }),
          ]);
      
          const response = {
            albums: albumFavs.map((fav) => fav.album),
            artists: artistFavs.map((fav) => fav.artist),
            tracks: trackFavs.map((fav) => fav.track),
          };
      
          return response;
    }

    async addTrackToFavorites(id: string) {
        try {
            await this.prisma.trackInFavorites.create({ data: { trackId: id } });
      
            return true;
          } catch (err) {
            if (
              err instanceof PrismaClientKnownRequestError &&
              err.code === 'P2003'
            ) {
              return false;
            }
      
            throw err;
          }
    }

    async addAlbumToFavorites(id: string) {
        try {
            await this.prisma.albumInFavorites.create({ data: { albumId: id } });
      
            return true;
          } catch (err) {
            if (
              err instanceof PrismaClientKnownRequestError &&
              err.code === 'P2003'
            ) {
              return false;
            }
      
            throw err;
          }
        // const album = validateItemExists(id, getAlbums());
        // if(album != undefined){
        //     this.favorites.albums.push(id);
        //     return {
        //         message: "Album successfully added to favorites"
        //     }
        // } else {
        //     throw new HttpException("Album not found", 422);
        // }
    }

    async addArtistToFavorites(id: string) {
        try {
            await this.prisma.artistInFavorites.create({ data: { artistId: id } });
      
            return true;
          } catch (err) {
            if (
              err instanceof PrismaClientKnownRequestError &&
              err.code === 'P2003'
            ) {
              return false;
            }
      
            throw err;
          }
        // const artist = validateItemExists(id, getArtists());
        // if(!!artist){
        //     this.favorites.artists.push(id);
        //     return {
        //         message: "Artist successfully added to favorites"
        //     }
        // } else {
        //     throw new HttpException("Artist not found", 422);
        // }
    }

    async deleteTrackFromFavorites(id: string) {
        try {
            await this.prisma.trackInFavorites.delete({ where: { trackId: id } });
      
            return true;
          } catch (err) {
            if (
              err instanceof PrismaClientKnownRequestError &&
              err.code === 'P2025'
            ) {
              return false;
            }
      
            throw err;
          }
    //     const index = this.findFavIndex(id, this.favorites.tracks);
    //    if(index !== -1 ) {
    //     this.favorites.tracks.splice(index, 1);
    //    } else {
    //     throw new NotFoundException('Favorite track not found');
    //    }       
    }

    async deleteAlbumFromFavorites(id: string) {
        try {
            await this.prisma.albumInFavorites.delete({ where: { albumId: id } });
      
            return true;
          } catch (err) {
            if (
              err instanceof PrismaClientKnownRequestError &&
              err.code === 'P2025'
            ) {
              return false;
            }
      
            throw err;
          }
        // const index = this.findFavIndex(id, this.favorites.albums);
        // if(index !== -1 ) {
        //  this.favorites.albums.splice(index, 1);
        // } else {
        //  throw new NotFoundException('Favorite album not found');
        // }    
    }

    async deleteArtistFromFavorites(id: string) {
        try {
            await this.prisma.artistInFavorites.delete({ where: { artistId: id } });
      
            return true;
          } catch (err) {
            if (
              err instanceof PrismaClientKnownRequestError &&
              err.code === 'P2025'
            ) {
              return false;
            }
      
            throw err;
          }
        // const index = this.findFavIndex(id, this.favorites.artists);
        // if(index !== -1 ) {
        //  this.favorites.artists.splice(index, 1);
        // } else {
        //  throw new NotFoundException('Favorite artist not found');
        // }    
    }

    // findFavIndex(id: string, items: string[]): number {
    //    return items.findIndex(item => item === id);
    // }
}