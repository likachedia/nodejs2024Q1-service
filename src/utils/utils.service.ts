import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UtilsService {
    constructor(
        private prisma: PrismaService
    ){}
    
    async findArtistId(artistId: string){

    }

    async findAlbumId(albumId: string){

    }
    async removeArtistIdFromAlbum(artistId: string){
        const artist = await this.prisma.artist.findFirstOrThrow({
            where: {
                id: artistId
            }
        })
        const albums = await this.prisma.album.findMany({
            where: {
                artistId: artistId
            }
        })

        albums.forEach(album => {
            this.prisma.album.update({
                where: {
                    id: album.id
                },
                data: {
                    artist: {
                        disconnect: true
                    }
                }
            })
        })
    }

    async removeArtistIdFromTrack(artistId: string){
        const artist = await this.prisma.artist.findFirstOrThrow({
            where: {
                id: artistId
            }
        })
        const tracks = await this.prisma.track.findMany({
            where: {
                artistId: artistId
            }
        })

        tracks.forEach(track => {
            this.prisma.track.update({
                where: {
                    id: track.id
                },
                data: {
                    artist: {
                        disconnect: true
                    },
                }
            })
        })
    }

    async removeAlbumIdFromTrack(albumId: string){
        const tracks = await this.prisma.track.findMany({
            where: {
                artistId: albumId
            }
        })

        tracks.forEach(track => {
            this.prisma.track.update({
                where: {
                    id: track.id
                },
                data: {
                    album: {
                        disconnect: true
                    }
                }
            })
        })
    }
}