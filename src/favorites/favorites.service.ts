import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { Album } from "src/album/album.models";
import { Artist } from "src/artist/artist.models";
import { getAlbums, getArtists, getFavorites, getTracks } from "src/database/db";
import { PrismaService } from "src/prisma/prisma.service";
import { Track } from "src/track/track.model";
import { getItemById, validateItemExists } from "src/utils/utils";
import { UtilsService } from "src/utils/utils.service";

@Injectable()
export class FavoritesService {

    private favorites = getFavorites();

    constructor(private prisma: PrismaService, private utils: UtilsService){}

    getAllFavorites() {
        const favAlbums = this.favorites.albums.map(item => {
           return getItemById(item, getAlbums()) as Album;
        }).filter(value => !!value);

        const favTracks = this.favorites.tracks.map(item => {
            return getItemById(item, getTracks()) as Track;
        }).filter(value => !!value);

        const favArtist = this.favorites.artists.map(item => {
            return getItemById(item, getArtists()) as Artist;
        }).filter(value => !!value);

        return {
            artists: favArtist,
            albums: favAlbums,
            tracks: favTracks
        }
    }

    addTrackToFavorites(id: string) {
        const track = validateItemExists(id, getTracks());
        if(track != undefined){
            this.favorites.tracks.push(id);
            return {
                message: "Track successfully added to favorites"
            }
        } else {
            throw new HttpException("Track not found", 422);
        }
    }

    addAlbumToFavorites(id: string) {
        const album = validateItemExists(id, getAlbums());
        if(album != undefined){
            this.favorites.albums.push(id);
            return {
                message: "Album successfully added to favorites"
            }
        } else {
            throw new HttpException("Album not found", 422);
        }
    }

    addArtistToFavorites(id: string) {
        const artist = validateItemExists(id, getArtists());
        if(!!artist){
            this.favorites.artists.push(id);
            return {
                message: "Artist successfully added to favorites"
            }
        } else {
            throw new HttpException("Artist not found", 422);
        }
    }

    deleteTrackFromFavorites(id: string) {
        const index = this.findFavIndex(id, this.favorites.tracks);
       if(index !== -1 ) {
        this.favorites.tracks.splice(index, 1);
       } else {
        throw new NotFoundException('Favorite track not found');
       }       
    }

    deleteAlbumFromFavorites(id: string) {
        const index = this.findFavIndex(id, this.favorites.albums);
        if(index !== -1 ) {
         this.favorites.albums.splice(index, 1);
        } else {
         throw new NotFoundException('Favorite album not found');
        }    
    }

    deleteArtistFromFavorites(id: string) {
        const index = this.findFavIndex(id, this.favorites.artists);
        if(index !== -1 ) {
         this.favorites.artists.splice(index, 1);
        } else {
         throw new NotFoundException('Favorite artist not found');
        }    
    }

    findFavIndex(id: string, items: string[]): number {
       return items.findIndex(item => item === id);
    }
}