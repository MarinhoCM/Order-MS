import { Injectable } from "@nestjs/common";
import { ProductRepository } from "../../database/repository/product.repository";

@Injectable()
export class ProductService {
    constructor(
        private readonly repository: ProductRepository
    ){}
}