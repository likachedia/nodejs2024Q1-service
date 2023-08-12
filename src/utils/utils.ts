import { Album } from "src/album/album.models";
import { Artist } from "src/artist/artist.models";
import { getAlbums, getTracks } from "src/database/db";
import { Track } from "src/track/track.model";

export const removeArtistId = (id: string) => {
    removeArtistIdFromAlbum(id);
    removeArtistIdFromTrack(id);
}

const removeArtistIdFromAlbum = (id: string) => {
    const albums = getAlbums();
    const {index, objectToUpdate } = findArtist(id, albums);
    if(index !== -1) {
        objectToUpdate.artistId = null;
        albums[index] = objectToUpdate as Album;
    }
}
const removeArtistIdFromTrack = (id: string) => {
    const tracks = getTracks();
    const {index, objectToUpdate } = findArtist(id, tracks);
    if(index !== -1) {
        objectToUpdate.artistId = null;
        tracks[index] = objectToUpdate as Track;
    }
}
export const findArtist = (id: string, arr: Array<Album | Track>) => {
    const objectToUpdate = arr.find(album => album.artistId == id);
    const index = arr.findIndex(album => album.artistId == id);
    return {
        objectToUpdate,
        index
    }
}

export const findAlbum = (id: string, arr: Array<Track>) => {
    const objectToUpdate = arr.find(track => track.albumId == id);
    const index = arr.findIndex(track => track.albumId == id);
    return {
        objectToUpdate,
        index
    }
}

export const removeAlbumId = (id:string) => {
    const tracks = getTracks();
    const {index, objectToUpdate } = findAlbum(id, tracks);
    if(index !== -1) {
        objectToUpdate.albumId = null;
        tracks[index] = objectToUpdate;
    }

}

export const getItemById = (id: string, item: Array<Track | Artist | Album>) => item.find(album => album.id == id);

export const validateItemExists = (id: string, items: Array<Track | Artist | Album>) => items.find(item => item.id == id);