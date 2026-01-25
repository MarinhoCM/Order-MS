import { ResponseMapper } from "@api/src/common/mappers";
import { HttpStatus, Injectable } from "@nestjs/common";
import { CustomerRepository } from "../../database/repository/customer.repository";
import { CustomerCreateDto, CustomerUpdateDto, GetCustomerParamsQueryDto } from "./dto/customer.dto";

@Injectable()
export class CustomerService {
    constructor(
        private readonly repository: CustomerRepository
    ) { }


    async createCustomer(customer: CustomerCreateDto) {
        return await this.repository.create(customer)
    }

    async updateCustomer(id: number, customer: CustomerUpdateDto) {
        return await this.repository.update(id, customer)
    }

    async searchCustomer(params: GetCustomerParamsQueryDto) {
        let data: any;
        const page = Math.max(1, Number(params.page) || 1)
        const limit = Math.max(1, Number(params.limit) || 10)
        const [skip, take] = [((page - 1) * limit), limit]

        if (params?.id) {
            data = await this.repository.getCustomerById(params.id)
        } else if (params?.email) {
            data = await this.repository.getCustomerByEmail(params.email)
        } else {
            data = await this.repository.getAll(skip, take)
        }

        return ResponseMapper.toResult(data, HttpStatus.OK, '')
    }

    async manageCustomer(id: number, active: boolean) {
        return await this.repository.update(id, { active })
    }
}