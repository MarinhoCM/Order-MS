import { IsNumber, IsOptional } from "class-validator";

export class CreateStockDto {
    @IsNumber()
    ammount: number;
    @IsNumber()
    product: number;
    @IsNumber()
    store: number;
}

export class UpdateStockDto {
    @IsNumber()
    ammount: number;
}

export class QueryGetStockDto {
    @IsOptional()
    @IsNumber()
    ammount: number;
    @IsOptional()
    @IsNumber()
    product: number;
    @IsOptional()
    @IsNumber()
    store: number;
    @IsOptional()
    @IsNumber()
    page: number = 1;
    @IsOptional()
    @IsNumber()
    limit: number = 10;
}