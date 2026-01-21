import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "@prisma/client";

const getData = (table: string) => {
    const data = {
        'store': [
            { description: 'STORE 1', corporeCode: '05574441000110', location: "Rua Oito, 152" },
            { description: 'STORE 2', corporeCode: '11808267000126', location: "Alameda José Figueredo Primo, 402" },
            { description: 'STORE 3', corporeCode: '78871289000101', location: "Rua Pajura, 464" },
            { description: 'STORE 4', corporeCode: '07202390000121', location: "Rua Domingos Boin, 761" },
        ],
        'sku': [
            { ean: '1000000', color: 'PRETO', size: 'PP', description: 'CAMISA POLO PRETA', weight: 0.1, length: 120, height: 60, width: 40 },
            { ean: '1000001', color: 'AZUL', size: 'PP', description: 'CAMISA POLO AZUL', weight: 0.1, length: 120, height: 60, width: 40 },
            { ean: '1000002', color: 'VERMELHA', size: 'PP', description: 'CAMISA POLO VERMELHA', weight: 0.1, length: 120, height: 60, width: 40 },
            { ean: '1000003', color: 'VERDE', size: 'PP', description: 'CAMISA POLO VERDE', weight: 0.1, length: 120, height: 60, width: 40 },
            { ean: '1000004', color: 'PRETO', size: 'P', description: 'CAMISA POLO PRETA', weight: 0.1, length: 120, height: 60, width: 40 },
            { ean: '1000005', color: 'AZUL', size: 'P', description: 'CAMISA POLO AZUL', weight: 0.1, length: 120, height: 60, width: 40 },
            { ean: '1000006', color: 'VERMELHA', size: 'P', description: 'CAMISA POLO VERMELHA', weight: 0.1, length: 120, height: 60, width: 40 },
            { ean: '1000007', color: 'VERDE', size: 'P', description: 'CAMISA POLO VERDE', weight: 0.1, length: 120, height: 60, width: 40 },
            { ean: '1000008', color: 'PRETO', size: 'M', description: 'CAMISA POLO PRETA', weight: 0.1, length: 120, height: 60, width: 40 },
            { ean: '1000009', color: 'AZUL', size: 'M', description: 'CAMISA POLO AZUL', weight: 0.1, length: 120, height: 60, width: 40 },
            { ean: '1000010', color: 'VERMELHA', size: 'M', description: 'CAMISA POLO VERMELHA', weight: 0.1, length: 120, height: 60, width: 40 },
            { ean: '1000011', color: 'VERDE', size: 'M', description: 'CAMISA POLO VERDE', weight: 0.1, length: 120, height: 60, width: 40 }
        ],
        'status': [
            { description: 'PENDENTE DE PAGAMENTO' },
            { description: 'PAGO' },
            { description: 'CANCELADO' },
        ],
        'product': [
            { code: '1811712531', description: 'Camisa Polo', netValue: 0.0, grossValue: 0.0, sku: '1000007' },
            { code: '8264627776', description: 'Camisa Gola V', netValue: 0.0, grossValue: 0.0, sku: '1000011' },
            { code: '9879080459', description: 'Camiseta Dry Fit', netValue: 0.0, grossValue: 0.0, sku: '1000004' },
            { code: '7484653896', description: 'Camisa Coto', netValue: 0.0, grossValue: 0.0, sku: '1000002' }
        ],
        'stock': [
            { ammount: 10, product: '1811712531', store: '05574441000110' },
            { ammount: 113, product: '1811712531', store: '11808267000126' },
            { ammount: 111, product: '1811712531', store: '78871289000101' },
            { ammount: 8, product: '1811712531', store: '07202390000121' },
            { ammount: 90, product: '8264627776', store: '05574441000110' },
            { ammount: 120, product: '8264627776', store: '11808267000126' },
            { ammount: 10, product: '8264627776', store: '78871289000101' },
            { ammount: 140, product: '8264627776', store: '07202390000121' },
            { ammount: 10, product: '9879080459', store: '05574441000110' },
            { ammount: 113, product: '9879080459', store: '11808267000126' },
            { ammount: 111, product: '9879080459', store: '78871289000101' },
            { ammount: 8, product: '9879080459', store: '07202390000121' },
            { ammount: 90, product: '7484653896', store: '05574441000110' },
            { ammount: 120, product: '7484653896', store: '11808267000126' },
            { ammount: 10, product: '7484653896', store: '78871289000101' },
            { ammount: 140, product: '7484653896', store: '07202390000121' },
        ],
        'customer': [
            { name: 'Cauã Marinho de Sousa', password: '$2a$12$RR6spyVrRCDFagSxuuZwXO5R1g0dVena6aFtMtIEl8eZricLaIlYm', email: 'projetoOrderMS@gmail.com' },
            { name: 'Eduardo Roberto Ryan Melo', password: '$2a$12$IVwBxEieWZYMlCjUqgpPne6bSSmkH9ADgzGgRNf1E//Orl/k63bya', email: 'eduardo_roberto_melo@belbrindes.com' },
            { name: 'Benedita Sueli Flávia Cavalcanti', password: '$2a$12$JECgn1jUe1LnPDseLPmvDuHarTFQ1l27QnNOJcnYDvlgb2BMLmGj.', email: 'benedita_cavalcanti@capua.com.br' },
            { name: 'Beatriz Natália Larissa da Cunha', password: '$2a$12$lsYcok.bZUoSEtAGHA1F1uvoVYyTPsK8kxaIVKJ0dpo04klYeZbgm', email: 'beatriz_dacunha@bodyfast.com.br' }
        ]
    }
    return data[table]
}


const adapter = new PrismaLibSql({ url: String(process.env.DATABASE_URL) })
const prisma = new PrismaClient({ adapter })

async function main() {
    /** STORES */
    await prisma.store.createMany({
        data: getData('store')
    })

    /** SKUS */
    await prisma.sku.createMany({
        data: getData('sku')
    })

    await prisma.orderStatus.createMany({
        data: getData('status')
    })

    const skus = await prisma.sku.findMany()

    const productData = getData('product').map((p: any) => {
        const sku = skus.find(s => s.ean === p.sku)
        if (!sku) throw new Error(`SKU não encontrado: ${p.sku}`)

        return {
            code: p.code,
            description: p.description,
            netValue: p.netValue,
            grossValue: p.grossValue,
            skuId: sku.id,
        }
    })

    /** PRODUCTS */
    await prisma.product.createMany({
        data: productData,
    })

    const products = await prisma.product.findMany()
    const stores = await prisma.store.findMany()

    const stockData = getData('stock').map((s: any) => {
        const product = products.find(p => p.code === s.product)
        const store = stores.find(st => st.corporeCode === s.store)

        if (!product) throw new Error(`Produto não encontrado: ${s.product}`)
        if (!store) throw new Error(`Store não encontrada: ${s.store}`)

        return {
            ammount: s.ammount,
            productId: product.id,
            storeId: store.id,
        }
    })

    /** STOCK */
    await prisma.stock.createMany({
        data: stockData
    })

    /** CUSTOMER */
    await prisma.customer.createMany({
        data: getData('customer')
    })

    console.log("🔥 Seed realizada com sucesso 👌")
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })




