import { ICustomer } from "@api/common/interfaces/customer.interface";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CustomerRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async create(customer: ICustomer) {
        return await this.prisma.customer.create({
            data: customer
        })
    }

    async update(id: number, customer: any) {
        return await this.prisma.customer.update({
            where: {
                id
            },
            data: customer
        })
    }

    async getCustomerById(id: number) {
        return await this.prisma.customer.findFirst({
            where: {
                id
            }
        })
    }

    async getCustomerByName(name: string) {
        return await this.prisma.customer.findFirst({
            where: {
                name: {
                    contains: name
                }
            }
        })
    }

    async getCustomerByEmail(email: string) {
        return await this.prisma.customer.findFirst({
            where: {
                email
            }
        })
    }

    async getAll(skip: number, take: number) {
        return await this.prisma.customer.findMany({
            skip,
            take,
            where: {
                active: true
            }
        })
    }

}