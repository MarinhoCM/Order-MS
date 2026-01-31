import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class CreateProductSkuDto {
    @IsString()
    ean: string;
    @IsString()
    color: string;
    @IsNumber()
    weight: number;
    @IsNumber()
    length: number;
    @IsNumber()
    height: number;
    @IsNumber()
    width: number;
}

export class CreateProductDto {
    @IsString()
    code: string;
    @IsString()
    description: string;
    @IsNumber()
    netValue: number;
    @IsNumber()
    grossValue: string;
    @Type(() => CreateProductSkuDto)
    @ValidateNested()
    sku: CreateProductSkuDto
}

export class QuerySearchProductBySkuInfos {
    @IsOptional()
    @IsString()
    ean?: string;
    @IsOptional()
    @IsString()
    color?: string;
    @IsOptional()
    @IsNumber()
    weight?: number;
    @IsOptional()
    @IsNumber()
    length?: number;
    @IsOptional()
    @IsNumber()
    height?: number;
    @IsOptional()
    @IsNumber()
    width?: number;
}

export class QuerySearchProductDto {
    @IsOptional()
    @IsString()
    code?: string;
    @IsOptional()
    @IsString()
    description?: string;
    @IsOptional()
    @IsString()
    price?: number;
    @IsOptional()
    @Type(() => QuerySearchProductBySkuInfos)
    @ValidateNested()
    skuInfos?: QuerySearchProductBySkuInfos;
    @IsOptional()
    @IsNumber()
    page: number = 1;
    @IsOptional()
    @IsNumber()
    limit: number = 10;
}


export class UpdateProductDto {
    @IsOptional()
    @IsString()
    description?: string;
    @IsOptional()
    @IsNumber()
    netValue?: number;
    @IsOptional()
    @IsNumber()
    grossValue?: number;
}