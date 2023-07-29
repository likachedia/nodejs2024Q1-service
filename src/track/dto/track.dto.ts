import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTrackDto  {
    @IsNotEmpty()
    @IsString()
    name: string;

    artistId: string | null; // refers to Artist
    albumId: string | null; // refers to Album

    @IsNotEmpty()
    @IsNumber()
    duration: number; // integer number
}

export class UpdateTrackDto  {
    @IsNotEmpty()
    @IsString()
    name: string;

    artistId: string | null;
    albumId: string | null;
    
    @IsNotEmpty()
    @IsNumber()
    duration: number;
}