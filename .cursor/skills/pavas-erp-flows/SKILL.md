---
name: pavas-erp-flows
description: Describes ERP flows in pavas-back: quotation approve to client and sale, purchase orders to purchases and inventory IN, sale confirm to inventory OUT. Use when explaining or implementing cross-module flows, integrations, or business logic.
---

# Flujos ERP en pavas-back

## Cuándo usar esta skill

- Se pregunta por el flujo entre cotización, venta, compras o inventario.
- Se implementa o modifica integración entre módulos (quotations, sales, purchases, inventory).
- Se necesita saber qué dispara movimientos de inventario o creación de ventas/órdenes.

## Flujo cotización → venta (proyecto)

1. **Aprobar cotización** (`PATCH /quotations/:id/approve`):
   - Buscar o crear cliente por nombre (cotización tiene `clientName`).
   - Crear venta tipo `project` con `quotationId`, ítems copiados (item_type, item_id, description, quantity, unitPrice).
   - Pasar cotización a estado `accepted`.
2. La venta se crea en estado `draft`; el usuario puede confirmarla después.

## Flujo confirmar venta → inventario

1. **Confirmar venta** (`PATCH /sales/:id/confirm`):
   - Solo si la venta está en `draft`.
   - Por cada ítem con `item_type === 'product'` y `item_id` válido: si el producto existe y `managesInventory`, se crea movimiento de inventario **OUT** y se actualiza `currentStock`.
   - La venta pasa a estado `confirmed`.
   - Los ítems de tipo servicio no generan movimiento.

## Flujo órdenes de compra → compras → inventario

1. **Orden de compra** (`POST /purchase-orders`): ítems con `item_type` e `item_id` (producto o servicio a adquirir).
2. **Recepción / compra** (`POST /purchases`):
   - Body: `purchaseOrderId`, `receiptDate`, ítems con `purchaseOrderItemId`, `quantityReceived`, `unitPrice`, `description`.
   - Por cada ítem recibido se toma `itemType` e `itemId` del ítem de la OC.
   - Si `item_type === 'product'`: se crea movimiento de inventario **IN** y se actualiza `quantityReceived` en el ítem de la OC.
   - Si `item_type === 'service'`: no hay movimiento de inventario.
3. El stock de productos se actualiza solo en recepciones con ítem tipo producto.

## Resumen de movimientos de inventario

- **IN**: recepciones de compra (ítem tipo product).
- **OUT**: venta confirmada (ítem tipo product).
- Ajustes manuales: registrar como IN u OUT con `referenceType: ADJUSTMENT` y detalle en observaciones.
- Tipo de movimiento: solo `in` y `out` (enum `MovementType`); no existe `adjustment` como tipo.

## Módulos implicados

- **Quotations**: approve use-case usa ClientsRepository, SalesRepository, QuotationsRepository.
- **Sales**: confirm use-case usa SalesRepository, CreateMovementUseCase (inventory), ProductsRepository.
- **Purchases**: create use-case usa PurchasesRepository, PurchaseOrdersRepository, CreateMovementUseCase; obtiene itemType/itemId del ítem de la OC.
- **Inventory**: CreateMovementUseCase actualiza producto y crea movimiento; referencias SALE, PURCHASE o ADJUSTMENT en `referenceType`.

El roadmap detallado está en `docs/MODULES-ROADMAP.md`.
