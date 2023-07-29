import { Album } from "src/album/album.models";
import { Artist } from "src/artist/artist.models";
import { Track } from "src/track/track.model";
import { User } from "src/user/user.models";

export type DataBase = {
    users: Array<User>,
    albums: Array<Album>,
    tracks: Track[],
    artists: Artist[],
    favorites: Favorites,
}

export type Favorites = {
    artists: string[];
    albums: string[];
    tracks: string[];
}