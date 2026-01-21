import { ArrayMinSize, IsArray, IsDateString, IsNumber, IsOptional, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer'

export class OrderItemCreateDto {
    @IsNumber()
    product: number;

    @IsNumber()
    @Min(1)
    ammount: number;
    
    @IsNumber()
    value: number;
}

export class OrderCreateDto {
    @IsNumber()
    customer: number;
    
    @IsNumber()
    @Min(1)
    value: number;

    @IsNumber()
    status: number;

    @IsNumber()
    store: number;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => OrderItemCreateDto)
    items: OrderItemCreateDto[]
}

export class GetOrderParamsQueryDto {
    @IsOptional()
    @IsNumber()
    id: number;

    @IsOptional()
    @IsDateString()
    initialDate: string;

    @IsOptional()
    @IsDateString()
    finalDate: string;

    @IsOptional()
    @IsNumber()
    customerCode: number;

    @IsOptional()
    @IsNumber()
    page: number = 1;

    @IsOptional()
    @IsNumber()
    limit: number = 10;
}

export class PatchOrderParamsDto {
    @IsOptional()
    @IsNumber()
    value?: number | undefined;

    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => OrderItemCreateDto)
    items?: OrderItemCreateDto[]
}