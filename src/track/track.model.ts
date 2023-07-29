export interface Track {
    id: string; // uuid v4
    name: string;
    artistId: string | null; // refers to Artist
    albumId: string | null; // refers to Album
    duration: number; // integer number
}

export class TrackInstance implements Track{
    constructor(
        public id: string,
        public name: string,
        public artistId: string | null,
        public albumId: string | null,
        public duration: number, 
    ) {}
}