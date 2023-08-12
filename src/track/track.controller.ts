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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/track.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('track')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  addTrack(@Body() Track: CreateTrackDto) {
    const newTrack = this.trackService.insertTrack(
      Track.name,
      Track.artistId,
      Track.albumId,
      Track.duration,
    );
    return newTrack;
  }

  @Get()
  getAllTracks() {
    return this.trackService.getTracks();
  }

  @Get(':id')
  getTrack(@Param('id', ParseUUIDPipe) TrackId: string) {
    return this.trackService.getSingleTrack(TrackId);
  }

  @Put(':id')
  updateTrack(
    @Param('id', ParseUUIDPipe) TrackId: string,
    @Body()
    updateTrack: CreateTrackDto,
  ) {
    return this.trackService.updateTrack(
      TrackId,
      updateTrack.name,
      updateTrack.artistId,
      updateTrack.albumId,
      updateTrack.duration,
    );
  }

  @Delete(':id')
  @HttpCode(204)
  removeTrack(@Param('id', ParseUUIDPipe) TrackId: string) {
    return this.trackService.deleteTrack(TrackId);
  }
}
