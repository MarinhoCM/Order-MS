export interface IOrderItem {
    productId: number;
    ammount: number;
    value: number;
}

export interface IOrder {
    customer: number;
    value: number;
    status: number;
    items: IOrderItem[]
}

export interface IGetOrder {
    id?: number;
    initialDate?: string;
    finalDate?: string;
    customerCode?: number;
    page?: number;
    limit?: number;
}