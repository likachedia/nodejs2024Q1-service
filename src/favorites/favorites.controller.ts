
import { Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { FavoritesService } from "./favorites.service";

@Controller('favs')
export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService) {}

    @Post('/track/:id')
    addTrack(@Param('id', ParseUUIDPipe) id: string) {
      return this.favoritesService.addTrackToFavorites(id);
    }
  
    @Post('/album/:id')
    addAlbum(@Param('id', ParseUUIDPipe) id: string) {
      return this.favoritesService.addAlbumToFavorites(id);
    }

    @Post('/artist/:id')
    addArtist(@Param('id', ParseUUIDPipe) id: string) {
      return this.favoritesService.addArtistToFavorites(id);
    }

    @Get()
    getAllFavorites() {
      return this.favoritesService.getAllFavorites();
    }

    @Delete('/track/:id')
    @HttpCode(204)
    removeTrack(@Param('id', ParseUUIDPipe) id: string) {
      return this.favoritesService.deleteTrackFromFavorites(id);
    }

    @Delete('/album/:id')
    @HttpCode(204)
    removeAlbum(@Param('id', ParseUUIDPipe) id: string) {
      return this.favoritesService.deleteAlbumFromFavorites(id);
    }

    @Delete('/artist/:id')
    @HttpCode(204)
    removeArtist(@Param('id', ParseUUIDPipe) id: string) {
      return this.favoritesService.deleteArtistFromFavorites(id);
    }
}