import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { AlbumInstance } from './album.models';
import { getAlbums } from 'src/database/db';
import { removeAlbumId } from 'src/utils/utils';

@Injectable()
export class AlbumService {
    private Albums: AlbumInstance[] = getAlbums();
    constructor(){}
    insertAlbum(name: string, year: number, artistId: string | null): AlbumInstance {
      const AlbumId = uuidv4();
      const newAlbum = new AlbumInstance(AlbumId, name, year, artistId);
      this.Albums.push(newAlbum);
      return newAlbum;
    }
  
    getAlbums() {
      return [...this.Albums];
    }
  
    getSingleAlbum(AlbumId: string): AlbumInstance {
      const Album = this.findAlbum(AlbumId)[0];
      return { ...Album };
    }
  
    updateAlbum(AlbumId: string, name: string, year: number, artistId: string | null): AlbumInstance {
      const [Album, index] = this.findAlbum(AlbumId);
      const updatedAlbum = { ...Album, name, year, artistId};
      this.Albums[index] = updatedAlbum;
      return updatedAlbum;
    }
  
    deleteAlbum(albumId: string) {
        const index = this.findAlbum(albumId)[1];
        removeAlbumId(albumId);
        this.Albums.splice(index, 1);
    }
  
    private findAlbum(id: string): [AlbumInstance, number] {
      const AlbumIndex = this.Albums.findIndex(album => album.id === id);
      const Album = this.Albums[AlbumIndex];
      if (!Album) {
        throw new NotFoundException('Could not find Album.');
      }
      return [Album, AlbumIndex];
    }
}