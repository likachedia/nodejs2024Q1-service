import { Injectable, NotFoundException } from '@nestjs/common';
import { ArtistInstance } from './artist.models';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistService {
    private Artists: ArtistInstance[] = [];

    insertArtist(name: string, grammy: boolean): ArtistInstance {
      const ArtistId = uuidv4();
      const newArtist = new ArtistInstance(ArtistId, name, grammy);
      this.Artists.push(newArtist);
      return newArtist;
    }
  
    getArtists() {
      return [...this.Artists];
    }
  
    getSingleArtist(ArtistId: string): ArtistInstance {
      const Artist = this.findArtist(ArtistId)[0];
      return { ...Artist };
    }
  
    updateArtist(ArtistId: string, name: string, grammy: boolean): ArtistInstance {
      const [Artist, index] = this.findArtist(ArtistId);
      const updatedArtist = { ...Artist, name: name, grammy: grammy};
      this.Artists[index] = updatedArtist;
      return updatedArtist;
    }
  
    deleteArtist(prodId: string) {
        const index = this.findArtist(prodId)[1];
        this.Artists.splice(index, 1);
    }
  
    private findArtist(id: string): [ArtistInstance, number] {
      const ArtistIndex = this.Artists.findIndex(prod => prod.id === id);
      const Artist = this.Artists[ArtistIndex];
      if (!Artist) {
        throw new NotFoundException('Could not find Artist.');
      }
      return [Artist, ArtistIndex];
    }
}