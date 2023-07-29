import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { TrackInstance } from './track.model';
import { getTracks } from 'src/database/db';

@Injectable()
export class TrackService {
    private Tracks: TrackInstance[] = getTracks();

    insertTrack(name: string, artistId: string | null, albumId: string | null, duration: number,): TrackInstance {
      const TrackId = uuidv4();
      const newTrack = new TrackInstance(TrackId, name, artistId, albumId, duration);
      this.Tracks.push(newTrack);
      return newTrack;
    }
  
    getTracks() {
      return [...this.Tracks];
    }
  
    getSingleTrack(TrackId: string): TrackInstance {
      const Track = this.findTrack(TrackId)[0];
      return { ...Track };
    }
  
    updateTrack(TrackId: string, name: string, artistId: string | null, albumId: string | null, duration: number,): TrackInstance {
      const [Track, index] = this.findTrack(TrackId);
      const updatedTrack = { ...Track, name, artistId, albumId, duration};
      this.Tracks[index] = updatedTrack;
      return updatedTrack;
    }
  
    deleteTrack(TrackId: string) {
        const index = this.findTrack(TrackId)[1];
        this.Tracks.splice(index, 1);
    }
  
    private findTrack(id: string): [TrackInstance, number] {
      const TrackIndex = this.Tracks.findIndex(Track => Track.id === id);
      const Track = this.Tracks[TrackIndex];
      if (!Track) {
        throw new NotFoundException('Could not find Track.');
      }
      return [Track, TrackIndex];
    }
}