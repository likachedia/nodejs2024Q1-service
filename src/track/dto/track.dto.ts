import { IsNotEmpty, IsNumber, IsString, IsUUID, ValidateIf } from "class-validator";

export class CreateTrackDto  {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsUUID()
    @ValidateIf((object, value) => value !== null)
    artistId: string | null; // refers to Artist

    @IsUUID()
    @ValidateIf((object, value) => value !== null)
    albumId: string | null; // refers to Album

    @IsNotEmpty()
    @IsNumber()
    duration: number; // integer number
}

export class UpdateTrackDto  {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsUUID()
    @ValidateIf((object, value) => value !== null)
    artistId: string | null;
    @IsUUID()
    @ValidateIf((object, value) => value !== null)
    albumId: string | null;
    
    @IsNotEmpty()
    @IsNumber()
    duration: number;
}