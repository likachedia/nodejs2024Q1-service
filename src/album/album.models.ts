interface Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

export class AlbumInstance implements Album{
    constructor(
       public id: string,
       public name: string,
       public year: number,
       public artistId: string | null,
    ){}
}