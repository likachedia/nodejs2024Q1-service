import { DataBase } from "./db.models";

const db: DataBase = {
    users: [],
    albums: [],
    tracks: [],
    artists: [],
}

export const getUsers = () => db.artists;

export const getAlbums = () => db.albums;

export const getTracks = () => db.tracks;

export const getArtists = () => db.artists;