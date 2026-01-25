import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CustomerCreateDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsString()
    email?: string;
}

export class CustomerUpdateDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsString()
    email?: string;

    @IsOptional()
    @IsBoolean()
    active?: boolean;
}

export class GetCustomerParamsQueryDto {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    email?: string;

    @IsOptional()
    @IsNumber()
    page: number = 1;

    @IsOptional()
    @IsNumber()
    limit: number = 10;
}
