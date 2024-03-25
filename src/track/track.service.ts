import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { TrackInstance } from './track.model';
import { getTracks } from 'src/database/db';
import { PrismaService } from 'src/prisma/prisma.service';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class TrackService {
    private Tracks: TrackInstance[] = getTracks();

    constructor(private prisma: PrismaService, private utils: UtilsService){}
    
    async insertTrack(name: string, artistId: string | null, albumId: string | null, duration: number,): Promise<TrackInstance> {
      if (!(name && duration)) {
        throw new BadRequestException('missing required fields');
      }
      const track = await this.prisma.track.create({
        data: {
          id: uuidv4(),
          name: name,
          artistId: artistId,
          albumId: albumId,
          duration: duration,
        }
      })
      return track;
    }
  
   async getTracks() {
      const tracks = await this.prisma.track.findMany();
      return [...tracks];
    }
  
    async getSingleTrack(TrackId: string): Promise<TrackInstance> {
      const track = await this.findTrack(TrackId);
      return { ...track };
    }
  
    async updateTrack(TrackId: string, name: string, artistId: string | null, albumId: string | null, duration: number,): Promise<TrackInstance> {
      if (!(name && duration)) {
        throw new BadRequestException('missing required fields');
      }
      await this.findTrack(TrackId);
      //check if artist and album exists
      const updatedTrack = await this.prisma.track.update({
        where: {
          id: TrackId
        },
        data: {
          name: name,
          artistId: artistId,
          albumId: albumId,
          duration: duration
        }
      });
      return updatedTrack;
    }
  
    async deleteTrack(TrackId: string) {
        await this.findTrack(TrackId);
        await this.prisma.track.delete({
          where: {
            id: TrackId
          }
        })
    }
  
    private async findTrack(id: string) {
      const track = await this.prisma.track.findUnique({
        where: {
          id: id
        }
      })
      if (!track) {
        throw new NotFoundException('Could not find Track.');
      }
      return track;
    }
}