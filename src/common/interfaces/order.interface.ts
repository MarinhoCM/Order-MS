export interface IOrderItemEvent {
    produto: string;
    quantidade: number;
    preco: number;
}

export interface IOrderEvent {
    codigoPedido: number;
    codigoCliente: number;
    itens: IOrderItemEvent[];
}

export interface IOrder {
    codigoPedido: number;
    codigoCliente: number;
    total: number;
    itens: IOrderItemEvent[];
}
