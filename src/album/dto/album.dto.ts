import { IsNotEmpty, IsNumber, IsString, IsUUID, ValidateIf } from "class-validator";

export class CreateAlbumDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    year: number;

    @IsUUID()
    @ValidateIf((object, value) => value !== null)
    artistId: string | null;
}

export class UpdateAlbumDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    year: number;

    @IsUUID()
    @ValidateIf((object, value) => value !== null)
    artistId: string | null
}