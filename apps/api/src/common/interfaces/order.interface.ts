export interface IOrderItem {
    product: number;
    ammount: number;
    value: number;
}

export interface IOrder {
    customer: number;
    value: number;
    items: IOrderItem[]
}
