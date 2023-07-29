import { Album } from "src/album/album.models";
import { Artist } from "src/artist/artist.models";
import { Track } from "src/track/track.model";

export class FavoritesResponseDto {
    artists: Artist[];
    albums: Album[];
    tracks: Track[];
}