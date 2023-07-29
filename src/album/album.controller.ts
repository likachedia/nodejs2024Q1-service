import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { CreateAlbumDto } from "./dto/album.dto";
import { AlbumService } from "./album.service";

@Controller('Album')
export class AlbumController {
    constructor(private readonly albumService: AlbumService) {}

  @Post()
  addAlbum(
    @Body() Album: CreateAlbumDto
  ) {
    const newAlbum = this.albumService.insertAlbum(
        Album.name,
        Album.year,
        Album.artistId
    );
    return newAlbum;
  }

  @Get()
  getAllAlbums() {
    return this.albumService.getAlbums();
  }

  @Get(':id')
  getAlbum(@Param('id', ParseUUIDPipe) AlbumId: string) {
    return this.albumService.getSingleAlbum(AlbumId);
  }

  @Put(':id')
  updateAlbum(
    @Param('id', ParseUUIDPipe) AlbumId: string,
    @Body()
    updateAlbum: CreateAlbumDto
  ) {
    return this.albumService.updateAlbum(AlbumId, updateAlbum.name, updateAlbum.year, updateAlbum.artistId);
  }

  @Delete(':id')
  @HttpCode(204)
  removeAlbum(@Param('id', ParseUUIDPipe) AlbumId: string) {
      return this.albumService.deleteAlbum(AlbumId);
  }
}