import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateArtistDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsBoolean()
    grammy: boolean;
}

export class UpdateArtistDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsBoolean()
    grammy: boolean;
}