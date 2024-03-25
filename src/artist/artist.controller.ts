import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto, UpdateArtistDto } from './dto/artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  addArtist(@Body() artist: CreateArtistDto) {
    const newArtist = this.artistService.insertArtist(
      artist.name,
      artist.grammy,
    );
    return newArtist;
  }

  @Get()
  getAllArtists() {
    return this.artistService.getArtists();
  }

  @Get(':id')
  getArtist(@Param('id', ParseUUIDPipe) artistId: string) {
    return this.artistService.getSingleArtist(artistId);
  }

  @Put(':id')
  updateArtist(
    @Param('id', ParseUUIDPipe) artistId: string,
    @Body()
    updateArtist: UpdateArtistDto,
  ) {
    return this.artistService.updateArtist(
      artistId,
      updateArtist
    );
  }

  @Delete(':id')
  @HttpCode(204)
  removeArtist(@Param('id', ParseUUIDPipe) artistId: string) {
    return this.artistService.deleteArtist(artistId);
  }
}
