export enum StockMovementTypeEnum {
    VENDA = "VENDA"
}

export interface IStockMovement {
    productId: number;
    storeId: number;
    orderId: number;
    type: StockMovementTypeEnum;
    quantity: number;
    previousQty: number;
    newQty: number;
    reason: string;
}

export interface IMovementStockItem {
    ammount: number;
    orderId: number;
    storeId: number;
    productId: number;
}