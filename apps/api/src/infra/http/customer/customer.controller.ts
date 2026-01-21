import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { CustomerService } from "./customer.service";

@Controller('customer/v1')
export class CustomerController {
    constructor(
        private readonly service: CustomerService
    ) { }

    @Post()
    async createCustomer() { }

    @Get()
    async getCustomer() { }

    @Patch()
    async editCustomer() { }

    @Delete()
    async removeCustomer() { }
}
