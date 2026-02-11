---
name: pavas-item-lines
description: Handles item lines in quotations, sales, purchase orders, and purchases using item_type and item_id (no separate product_id/service_id). Use when working with quotation_items, sale_items, purchase_order_items, purchase_items, or item-type logic.
---

# Líneas de ítem en pavas-back

## Cuándo usar esta skill

- Se tocan entidades o DTOs de ítems: `QuotationItem`, `SaleItem`, `PurchaseOrderItem`, `PurchaseItem`.
- Se añade o modifica lógica que distingue producto vs servicio en una línea.
- Se implementa creación/mapeo de ítems desde cotización a venta, o desde orden de compra a compra.

## Modelo unificado de ítem

Todas las líneas de ítem usan dos campos:

- **item_type**: `ItemType` (`product` | `service`) en `src/common/enums/item-type.enum.ts`.
- **item_id**: UUID del producto o del servicio según `item_type`.

No existen columnas `product_id` ni `service_id` en las entidades de ítem. No hacer join directo a `Product` o `Service` desde la entidad; la relación es por negocio usando `item_type` + `item_id`.

## Dónde se usa

| Entidad / tabla       | item_type | item_id | Notas |
|-----------------------|-----------|---------|--------|
| `quotation_items`     | nullable  | nullable | Línea manual sin referencia si ambos null |
| `sale_items`          | nullable  | nullable | Igual que cotización |
| `purchase_order_items`| obligatorio | obligatorio | Siempre referencia producto o servicio a adquirir |
| `purchase_items`      | obligatorio | obligatorio | Copiado del ítem de la OC en la recepción |

## API (request/response)

- **Crear cotización / venta**: en cada ítem del body enviar `itemType` e `itemId` (opcionales para líneas manuales).
- **Crear orden de compra**: en cada ítem enviar `itemType` (`product` | `service`) e `itemId` (UUID).
- **Crear compra (recepción)**: el cliente envía `purchaseOrderItemId` por línea; `itemType` e `itemId` se obtienen del ítem de la OC en el use-case.

## Inventario y tipo de ítem

- **Venta (confirmar)**: solo se descuenta stock para ítems con `item_type === 'product'`; se usa `item_id` como `productId` en el movimiento de inventario OUT.
- **Compra (recepción)**: solo se registra entrada de stock para ítems de la OC con `item_type === 'product'`; se usa `item_id` como `productId` en el movimiento IN.
- Los ítems con `item_type === 'service'` no generan movimientos de inventario.

## Resolver producto o servicio en código

Para mostrar nombre o datos del catálogo:

- Si `itemType === ItemType.PRODUCT`: usar `ProductsRepository.findById(itemId)` o equivalente.
- Si `itemType === ItemType.SERVICE`: usar `ServicesRepository.findById(itemId)` o equivalente.
- No asumir que `item_id` es siempre producto; comprobar siempre `item_type`.
