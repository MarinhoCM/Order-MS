import { StoreRepository } from "@api/infra/database/repository/store.repository";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateStoreDto, UpdateStoreDto } from "./dto/store.dto";

@Injectable()
export class StoreService {
    constructor(
        private readonly store: StoreRepository
    ) { }

    async create(data: CreateStoreDto) {
        return await this.store.save(data)
    }

    async search() {
        return await this.store.getAll()
    }

    async edit(corporeCode: string, data: UpdateStoreDto) {
        const store = await this.store.getByCorporeCode(corporeCode)

        if (!store) throw new NotFoundException(`The store has not found.`)

        return await this.store.update(store.id, data)
    }

    async deactivate(corporeCode: string) {
        const store = await this.store.getByCorporeCode(corporeCode)
        if (!store) throw new NotFoundException(`The store has not found.`)

        return await this.store.update(store.id, {active: false})
    }

}