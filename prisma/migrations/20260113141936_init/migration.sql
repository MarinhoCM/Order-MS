-- CreateTable
CREATE TABLE "item_pedido" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "produto" TEXT NOT NULL,
    "quantidade" REAL NOT NULL,
    "preco" DECIMAL NOT NULL,
    "orderId" INTEGER,
    CONSTRAINT "item_pedido_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigoPedido" INTEGER NOT NULL,
    "codigoCliente" INTEGER NOT NULL,
    "total" DECIMAL NOT NULL
);

-- CreateIndex
CREATE INDEX "Order_codigoPedido_codigoCliente_idx" ON "Order"("codigoPedido", "codigoCliente");
