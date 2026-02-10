# Roadmap de Módulos – Pavas Back

Punto de partida para una empresa que recién inicia. Orden sugerido para ir viendo avances sin saturarse.

## Ya existentes

| Módulo      | Descripción breve                  |
|-------------|------------------------------------|
| **auth**    | Login, registro, JWT, permisos      |
| **users**   | CRUD de usuarios y roles           |
| **catalog** | Productos (con stock y precios)     |
| **quotations** | Cotizaciones con ítems (producto opcional) |

---

## Fase 1 – Punto mínimo (hecho)

- **Cotizaciones:** crear, listar, ver detalle. Ítems con producto opcional, totales, estados (draft/sent/accepted/rejected).

---

## Fase 2 – Punto mínimo más grande (siguiente)

Objetivo: poder cotizar y vender a **clientes** usando **productos y servicios**, y registrar **ventas** con el mismo patrón que cotizaciones.

### 2.1 **Clientes** (módulo `clients`)

- **Tablas:** `clients` (id, code, name, email, phone, address, taxId, isActive, createdAt, updatedAt).
- **Endpoints:** CRUD estándar: `POST/GET/PATCH/DELETE /clients`, listado con paginación y búsqueda.
- **Integración con cotizaciones:** en `quotations` agregar `client_id` (opcional); si viene cliente, mostrar sus datos; si no, seguir permitiendo `clientName` libre (para no romper lo existente).
- **Avance visible:** selector de cliente al crear cotización y en futuras ventas.

### 2.2 **Servicios** (ampliar catálogo)

- **Opción recomendada:** entidad `services` en el mismo módulo catalog (o submódulo): id, code, name, description, basePrice, isActive, createdAt, updatedAt. Sin stock.
- **Endpoints:** CRUD igual que productos: `POST/GET/PATCH/DELETE /catalog/services` (o bajo `/catalog/products` con tipo producto|servicio; aquí se asume entidad separada por simplicidad).
- **Integración con cotizaciones:** en `quotation_items` agregar `service_id` opcional; ítem puede ser producto **o** servicio (product_id XOR service_id, o ambos opcionales para línea manual).
- **Avance visible:** líneas de cotización que son “servicios” y no solo productos.

### 2.3 **Ventas** (módulo `sales`)

- **Tablas:** `sales` (id, number, client_id opcional, client_name fallback, status, total, sale_date, created_at, created_by_id), `sale_items` (sale_id, product_id opcional, service_id opcional, description, quantity, unit_price, total).
- **Endpoints:** `POST /sales` (crear con ítems), `GET /sales` (listar paginado), `GET /sales/:id` (detalle con ítems). Opcional después: PATCH para estados.
- **Lógica mínima:** número automático (ej. VTA-AAAA-0001), totales por ítem y subtotal. **Opcional en esta fase:** bajar stock de productos al confirmar venta (si no, se deja para Fase 3 con inventario).
- **Avance visible:** flujo crear venta → listar → ver detalle; después se puede sumar “convertir cotización en venta”.

Orden sugerido de implementación en Fase 2: **Clientes → Servicios → Ventas** (así cotizaciones y ventas usan clientes y productos/servicios desde el inicio).

---

## Fase 3 – Inventario y compras

### 3.1 **Movimientos de inventario**

- Movimientos: entrada, salida, ajuste. Relación con producto; opcionalmente con venta/compra.
- Historial de movimientos y stock actualizado desde catalog.

### 3.2 **Compras**

- Comprobantes de compra (proveedor, ítems, total). Al recibir, actualizar stock vía movimientos.
- **Proveedores:** entidad similar a clientes cuando haga falta.

### 3.3 **Ajuste en ventas**

- Al confirmar venta, descontar stock y registrar movimiento de salida.

---

## Fase 4 – Más adelante

- **Reportes / Dashboard:** ventas por período, productos más vendidos, stock bajo, etc.
- **Convertir cotización en venta:** endpoint o flujo que cree una venta desde una cotización aceptada.
- **Permisos:** refinar por módulo (clients.read/create, sales.read/create, etc.) como ya en quotations.

---

## Resumen por fases

| Fase | Módulos / Cambios | Objetivo |
|------|-------------------|----------|
| **1** | Cotizaciones | Flujo cotizar → listar → ver (hecho) |
| **2** | Clientes, Servicios, Ventas | Cotizar y vender a clientes con productos y servicios |
| **3** | Inventario, Compras, ajuste en Ventas | Stock real y compras |
| **4** | Reportes, convertir cotización→venta | Pulir y escalar |
