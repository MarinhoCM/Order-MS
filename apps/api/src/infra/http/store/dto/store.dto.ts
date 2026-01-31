import { IsOptional, IsString } from "class-validator";

export class CreateStoreDto {
    @IsString()
    description: string;
    @IsString()
    corporeCode: string;
    @IsString()
    location: string;
}

export class UpdateStoreDto {
    @IsString()
    @IsOptional()
    description?: string;
    @IsString()
    @IsOptional()
    location?: string;
}
