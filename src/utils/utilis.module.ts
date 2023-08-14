import { Global, Module } from "@nestjs/common";
import { AlbumModule } from "src/album/album.module";
import { ArtistModule } from "src/artist/artist.module";
import { FavoritesModule } from "src/favorites/favorites.module";
import { TrackModule } from "src/track/track.module";
import { UtilsService } from "./utils.service";

@Global()
@Module({
    imports: [ArtistModule, AlbumModule, TrackModule, FavoritesModule],
    controllers: [],
    providers: [UtilsService],
    exports: [UtilsService]
})
  export class UtilsModule {}