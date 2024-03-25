import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { AlbumInstance } from './album.models';
import { getAlbums } from 'src/database/db';
import { removeAlbumId } from 'src/utils/utils';
import { PrismaService } from 'src/prisma/prisma.service';
import { UtilsService } from 'src/utils/utils.service';
import { ArtistInstance } from 'src/artist/artist.models';
import { UpdateAlbumDto } from './dto/album.dto';

@Injectable()
export class AlbumService {
    private Albums: AlbumInstance[] = getAlbums();

    constructor(private prisma: PrismaService, private utils: UtilsService){}

    async insertAlbum(name: string, year: number, artistId: string | null): Promise<AlbumInstance> {
      if (!(name && year)) {
        throw new BadRequestException('missing required fields');
      }
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
  
    async updateAlbum(albumId: string, updateAlbum: UpdateAlbumDto): Promise<AlbumInstance> {
      if ((!updateAlbum?.name && !updateAlbum?.year && !updateAlbum?.artistId) ||
      (updateAlbum?.name && typeof updateAlbum?.name !== 'string') ||
      (updateAlbum?.year && typeof updateAlbum?.year !== 'number') ||
      (updateAlbum?.artistId && typeof updateAlbum?.artistId !== 'string')) {
        throw new BadRequestException('missing required fields');
      }

      await this.findAlbum(albumId);
      const updatedAlbum = await this.prisma.album.update({
        where: {
          id: albumId
        },
        data: {
          name: updateAlbum.name,
          year: updateAlbum.year,
          artistId: updateAlbum.artistId
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