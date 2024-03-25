
import { Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, UnprocessableEntityException } from "@nestjs/common";
import { FavoritesService } from "./favorites.service";
import { ApiResponse } from "@nestjs/swagger";
import { FavoritesResponseDto } from "./dto/favorites.dto";

@Controller('favs')
export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService) {}

    @Post('/track/:id')
    @ApiResponse({
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      description: 'Track with provided id was not found',
    })
    addTrack(@Param('id', ParseUUIDPipe) id: string) {
      const result = this.favoritesService.addTrackToFavorites(id);
      if (!result) {
        throw new UnprocessableEntityException(
          'track with provided id not found',
        );
      }
  
      return result;
    }
  
    @Post('/album/:id')
    @ApiResponse({
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      description: 'Track with provided id was not found',
    })
    addAlbum(@Param('id', ParseUUIDPipe) id: string) {
      const result = this.favoritesService.addAlbumToFavorites(id);
      if (!result) {
        throw new UnprocessableEntityException(
          'Album with provided id not found',
        );
      }
  
      return result;
    }

    @Post('/artist/:id')
    @ApiResponse({
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      description: 'Artist with provided id was not found',
    })
    addArtist(@Param('id', ParseUUIDPipe) id: string) {
      const result = this.favoritesService.addArtistToFavorites(id);
      console.log(result);
      if (!result) {
        throw new UnprocessableEntityException(
          'artist with provided id not found',
        );
      }
  
      return result;
    }

    @Get()
    @ApiResponse({
      status: HttpStatus.OK,
      description: 'Favorites have been successfully retrieved',
      type: FavoritesResponseDto,
    })
    async getAllFavorites() {
      return await this.favoritesService.getAllFavorites();
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