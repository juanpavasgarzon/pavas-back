---
name: pavas-add-module
description: Creates or extends a NestJS module following pavas-back structure (controllers, use-cases, repositories, entities, DTOs). Use when adding a new module, feature, or domain to the backend.
---

# Añadir o extender un módulo en pavas-back

## Cuándo usar esta skill

- El usuario pide crear un módulo nuevo, una feature o un dominio.
- Se va a implementar un CRUD o flujo que no existe aún.
- Se menciona el roadmap de módulos o una entidad nueva (ej. facturas, reportes, etc.).

## Estructura de un módulo

Cada módulo en `src/modules/<nombre>/` debe tener:

| Carpeta / archivo | Contenido |
|------------------|-----------|
| `entities/` | Entidades TypeORM (singular: `Sale`, `SaleItem`) |
| `interfaces/` | `IEntity`, `CreateData`, `UpdateData` |
| `repositories/` | Un repositorio por agregado principal; solo persistencia y consultas |
| `use-cases/` | Un archivo por acción: `create-x.use-case.ts`, `find-x-by-id.use-case.ts`, `find-all-x.use-case.ts`, etc. |
| `dto/request/` | DTOs de entrada: `create-x.request.ts`, `x-query.request.ts` (hereda `PaginationRequest` si hay listado) |
| `dto/response/` | DTOs de salida: `x.response.ts`, `x-item.response.ts` si hay ítems |
| `controllers/` | Controlador que delega a use-cases; usa `Permission`, `RequirePermissions`, `PaginationResponse` |
| `enums/` | Si aplica: status, type, etc. |
| `services/` | Servicio del módulo: fachada que expone métodos para otros módulos; usa use-cases internamente |
| `<nombre>.module.ts` | `imports`, `controllers`, `providers`; **exports** solo el/los **servicio(s)** (nunca repositorios ni use-cases) |
| `index.ts` | Exportar solo: **módulo**, **servicios** y **contratos** (interfaces y enums); no repositorios ni use-cases |

## Reglas rápidas

1. **Lógica de negocio** solo en use-cases; controladores y repositorios no contienen reglas de dominio.
2. **Integración entre módulos**: los módulos **solo exportan servicios**. Los servicios exponen los métodos que otros módulos necesitan y usan use-cases internamente. Los use-cases usan repositorios. Nunca exportar repositorios ni use-cases.
3. **index.ts**: exportar únicamente el módulo, los servicios y los contratos (interfaces, enums); no repositorios ni use-cases.
4. **Nomenclatura**: use-cases `CreateXUseCase`, `FindXByIdUseCase`; DTOs kebab-case con `.request.ts` / `.response.ts`.
5. **Rutas**: plural y kebab-case (ej. `/purchase-orders`, `/sales`).
6. **Permisos**: añadir constantes en `src/modules/auth/enums/permission.enum.ts` y usarlas en el controlador; actualizar `role-permissions.constant.ts` si aplica.
7. **Registro**: importar el nuevo módulo en `src/app.module.ts`.

## Líneas de ítem (si el módulo tiene ítems)

Usar **item_type** + **item_id** (enum `ItemType` en `src/common/enums/item-type.enum.ts`). No crear columnas `product_id` / `service_id` separadas. Ver skill `pavas-item-lines` para detalles.

## Paginación y listados

- Query DTO que extienda `PaginationRequest` de `src/common`.
- Use-case que use `paginate()` de `src/common` con `searchFields` y filtros necesarios.
- Respuesta `PaginationResponse<XResponse>` en el controlador.

## Ejemplo de flujo al crear un módulo

1. Definir entidad(es) e interfaces.
2. Crear repositorio (create, findById, findAll con query builder si hay filtros).
3. Crear use-cases (create, find-by-id, find-all; opcional update, delete).
4. Crear DTOs request/response y validación (class-validator).
5. Crear controlador con permisos.
6. Crear `<nombre>.module.ts` y registrar en `AppModule`.
7. Añadir permisos en `permission.enum.ts` y en `role-permissions.constant.ts`.
