import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { AlbumInstance } from './album.models';
import { getAlbums } from 'src/database/db';
import { removeAlbumId } from 'src/utils/utils';
import { PrismaService } from 'src/prisma/prisma.service';
import { UtilsService } from 'src/utils/utils.service';
import { ArtistInstance } from 'src/artist/artist.models';

@Injectable()
export class AlbumService {
    private Albums: AlbumInstance[] = getAlbums();

    constructor(private prisma: PrismaService, private utils: UtilsService){}

    async insertAlbum(name: string, year: number, artistId: string | null): Promise<AlbumInstance> {
     let artist: ArtistInstance;
    if(artistId){
      artist = await this.prisma.artist.findUnique({
        where: {
          id: artistId
        }
      })
     }
    
     const album = await this.prisma.album.create({
        data: {
          id:  uuidv4(),
          name: name,
          year: year,
          artistId: artist?.id ?? null
        }
      })

      return album;
    }
  
    async getAlbums(): Promise<AlbumInstance[]> {
      const albums = await this.prisma.album.findMany();
      return albums;
    }
  
    async getSingleAlbum(AlbumId: string): Promise<AlbumInstance> {
      const album = await this.findAlbum(AlbumId);
      return { ...album };
    }
  
    async updateAlbum(albumId: string, name: string, year: number, artistId: string | null): Promise<AlbumInstance> {
      const album = await this.findAlbum(albumId);
      const updatedAlbum = await this.prisma.album.update({
        where: {
          id: albumId
        },
        data: {
          name: name,
          year: year,
          artistId: artistId
        }
      })
      return updatedAlbum;
    }
  
    async deleteAlbum(albumId: string) {
        const album = await this.findAlbum(albumId);
        //remove album id from tracks
        album ?? await this.utils.removeAlbumIdFromTrack(albumId);

       await this.prisma.album.delete({
          where: {
            id: albumId
          }
        })
    }
  
    private async findAlbum(id: string): Promise<AlbumInstance> {
     const album = await this.prisma.album.findUnique({
        where:{
          id:id
        }
      })
      if (!album) {
        throw new NotFoundException('Could not find Album.');
      }
      return album;
    }
}