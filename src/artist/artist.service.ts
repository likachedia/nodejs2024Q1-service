import { Injectable, NotFoundException } from '@nestjs/common';
import { ArtistInstance } from './artist.models';
import { v4 as uuidv4 } from 'uuid';
import { getArtists } from 'src/database/db';
import { PrismaService } from 'src/prisma/prisma.service';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class ArtistService {
    // private Artists: ArtistInstance[] = getArtists();

    constructor(private prisma: PrismaService, private utils: UtilsService){}
    
    async insertArtist(name: string, grammy: boolean): Promise<ArtistInstance> {
      const newArtist = await this.prisma.artist.create({
        data: {
          id: uuidv4(),
          name: name,
          grammy: grammy
        }
      })      
      return newArtist;
    }
  
    async getArtists(): Promise<ArtistInstance[]> {
      const artist = await this.prisma.artist.findMany();
      return artist;
    }
  
    async getSingleArtist(ArtistId: string): Promise<ArtistInstance> {
      const artist = await this.findArtist(ArtistId);
      return { ...artist };
    }
  
    async updateArtist(artistId: string, name: string, grammy: boolean): Promise<ArtistInstance> {
      await this.findArtist(artistId);
      const updatedArtist = await this.prisma.artist.update({
        where: {
          id: artistId
        },
        data: {
          name: name,
          grammy: grammy
        }
      })
      return updatedArtist;
    }
  
    async deleteArtist(artistId: string) {
        await this.findArtist(artistId);
        await this.utils.removeArtistIdFromAlbum(artistId);
        await this.utils.removeArtistIdFromTrack(artistId);
        await this.prisma.artist.delete({
          where: {
            id: artistId
          }
        })
        // removeArtistId(artistId);
    }
  
    private async findArtist(id: string): Promise<ArtistInstance> {
      const artist = await this.prisma.artist.findUnique({
        where: {
          id:id
        }
      });
      if (!artist) {
        throw new NotFoundException('Could not find Artist.');
      }
      return artist;
    }
}