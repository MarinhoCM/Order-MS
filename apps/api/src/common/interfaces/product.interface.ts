
export interface IPrismaProductCreateSku {
    ean: string;
    color: string;
    weight: number;
    length: number;
    height: number;
    width: number;
}

export interface IPrismaProductCreate {
    code: string;
    description: string;
    netValue: number;
    grossValue: string;
    sku: IPrismaProductCreateSku;
}