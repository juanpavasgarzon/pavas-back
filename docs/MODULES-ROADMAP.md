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

Objetivo: poder cotizar y vender a **clientes** usando **productos y servicios**, y registrar **ventas** con el mismo patrón que cotizaciones, tanto para **venta libre** como para **proyectos/obras**.

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

- **Tablas:**  
  - `sales` (id, number, type: retail|project, quotation_id opcional, client_id opcional, client_name fallback, status, total, sale_date, created_at, created_by_id)  
  - `sale_items` (sale_id, product_id opcional, service_id opcional, description, quantity, unit_price, total).
- **Flujos principales:**  
  - **Venta libre:** se crea una venta directamente desde catálogo (productos/servicios) sin cotización previa.  
  - **Venta por proyecto:** se crea una venta vinculada a una cotización aceptada (más adelante se puede automatizar “convertir cotización en venta”).
- **Endpoints:** `POST /sales` (crear con ítems), `GET /sales` (listar paginado), `GET /sales/:id` (detalle con ítems). Opcional después: PATCH para estados.
- **Lógica mínima:** número automático (ej. VTA-AAAA-0001), totales por ítem y subtotal.
- **Relación con cotizaciones y clientes:** al aceptar una cotización, se asegura que exista un cliente y se crea una venta de tipo `project` vinculada a esa cotización (puede empezar como paso manual y luego automatizarse).

Orden sugerido de implementación en Fase 2: **Clientes → Servicios → Ventas** (así cotizaciones y ventas usan clientes y productos/servicios desde el inicio).

---

## Fase 3 – Inventario, compras y materiales de la cotización

### 3.1 **Movimientos de inventario**

- Movimientos: entrada, salida, ajuste. Relación con producto; opcionalmente con venta/compra.
- Historial de movimientos y stock actualizado desde catalog.

### 3.2 **Órdenes de compra** (módulo `purchase-orders`)

- **Tablas:** `purchase_orders` (id, number, supplier_id opcional, status, expected_date, total, created_at, created_by_id), `purchase_order_items` (purchase_order_id, product_id, description, quantity, unit_price, total).
- **Flujo con cotizaciones/proyectos:** desde una cotización aceptada (proyecto) o una venta de tipo `project`, se pueden generar órdenes de compra para los **materiales de la cotización**.
- **Estados:** draft, sent, partially_received, completed, cancelled.

### 3.3 **Compras / Recepciones** (módulo `purchases`)

- **Comprobantes de compra / recepciones:** `purchases` vinculadas a una o varias órdenes de compra, con fecha de recepción, ítems y totales.
- Al recibir, actualizar stock vía movimientos de inventario (entrada).
- **Proveedores:** entidad similar a clientes cuando haga falta (módulo `suppliers` opcional en esta fase).

### 3.4 **Ajuste en ventas**

- Al confirmar venta, descontar stock y registrar movimiento de salida.

---

## Fase 4 – Facturación, reportes y automatización de flujo

- **Facturas** (módulo `invoices`): emitir facturas a partir de ventas (retail o proyectos), con relación 1 a N ventas si es necesario. Campos: number, client_id, sale_id(s), totals, tax, status, issue_date, due_date.
- **Reportes / Dashboard:** ventas por período, productos más vendidos, stock bajo, etc.
- **Convertir cotización en venta:** endpoint o flujo que cree una venta desde una cotización aceptada (para proyectos de construcción).
- **Permisos:** refinar por módulo (clients.read/create, sales.read/create, purchases.read/create, etc.) como ya en quotations.

---

## Resumen por fases

| Fase | Módulos / Cambios | Objetivo |
|------|-------------------|----------|
| **1** | Cotizaciones | Flujo cotizar → listar → ver (hecho) |
| **2** | Clientes, Servicios, Ventas | Cotizar y vender a clientes con productos y servicios (venta libre y proyectos) |
| **3** | Inventario, Órdenes de compra, Compras, ajuste en Ventas | Stock real y compras ligadas a proyectos y ventas |
| **4** | Facturas, Reportes, convertir cotización→venta | Pulir, automatizar flujo y escalar |
