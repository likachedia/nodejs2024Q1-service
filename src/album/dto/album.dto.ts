import { IsBoolean, IsDefined, IsNotEmpty, IsNumber, IsString, ValidateIf } from "class-validator";

export class CreateAlbumDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    year: number;

    artistId: string | null
}

export class UpdateAlbumDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    year: number;

    artistId: string | null
}