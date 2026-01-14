import { IsNumber, ValidateNested } from 'class-validator';

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
    @ValidateNested({ each: true })
    items: OrderItemCreateDto
}
