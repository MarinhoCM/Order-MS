import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { CustomerCreateDto, CustomerUpdateDto, GetCustomerParamsQueryDto } from "./dto/customer.dto";

@Controller('customer/v1')
export class CustomerController {
    constructor(
        private readonly service: CustomerService
    ) { }

    @Post()
    async createCustomer(@Body() customer: CustomerCreateDto) {
        return await this.service.createCustomer(customer)
    }

    @Get()
    async getCustomer(@Query() params: GetCustomerParamsQueryDto) {
        return await this.service.searchCustomer(params)
    }

    @Patch(':id')
    async editCustomer(@Param('id') id: number, @Body() customer: CustomerUpdateDto) {
        return await this.service.updateCustomer(id, customer)
    }

    @Delete('id')
    async removeCustomer(@Param('id') id: number) {
        return await this.service.manageCustomer(id, false)
    }
}
