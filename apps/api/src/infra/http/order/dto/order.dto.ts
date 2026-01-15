import { IsDateString, IsNumber, IsOptional, ValidateNested } from 'class-validator';

export class OrderItemCreateDto {
    @IsNumber()
    product: number;
    @IsNumber()
    ammount: number;
    @IsNumber()
    value: number;
}

export class OrderCreateDto {
    @IsNumber()
    customer: number;
    @IsNumber()
    value: number;

    @IsNumber()
    status: number;

    @ValidateNested({ each: true })
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
    status?: number | undefined;

    @IsOptional()
    @IsNumber()
    value?: number | undefined;

    @IsOptional()
    @ValidateNested({ each: true })
    items?: OrderItemCreateDto[]
}