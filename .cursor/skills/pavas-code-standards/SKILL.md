---
name: pavas-code-standards
description: Applies project coding standards: zero comments, inverted ifs with early return, full if blocks with braces. Use when editing or reviewing TypeScript code in the backend.
---

# Estándares de código pavas-back

## Cuándo usar esta skill

- Se edita o se revisa código en `src/`.
- El usuario pide aplicar las reglas del proyecto, buenas prácticas o consistencia.
- Se detectan comentarios, `else` innecesarios o `if` de una sola línea sin llaves.

## Comentarios

- **Cero comentarios**: no usar `//` ni `/** ... */` en código.
- El código debe ser autodescriptivo (nombres claros, funciones pequeñas).
- Si hace falta explicar, mejorar nombres o extraer lógica en lugar de comentar.

## Condicionales

1. **Invertir para evitar `else`**: preferir early return o asignación por defecto + override.
2. **Siempre bloques con llaves** en `if`; no poner la sentencia en la misma línea.

Correcto:

```typescript
if (condition) {
  return;
}

if (!entity) {
  throw new NotFoundException('Not found');
}
```

Incorrecto:

```typescript
if (condition) return;
if (!entity) throw new NotFoundException('Not found');
```

## Ejemplo de inversión

Antes (con else):

```typescript
if (data.type === MovementType.IN) {
  newStock = current + qty;
} else {
  newStock = Math.max(0, current - qty);
}
```

Después (sin else):

```typescript
let newStock = Math.max(0, current - qty);
if (data.type === MovementType.IN) {
  newStock = current + qty;
}
```

## Otros

- Async/await; excepciones HTTP de NestJS (`NotFoundException`, `BadRequestException`, etc.).
- Dependencias por constructor; no `new` de servicios/repos en use-cases o controladores.
- Un return por ruta lógica; evitar anidación profunda (extraer a función o use-case).
- Imports: externos primero, luego `src/` (config, common, modules).

Las reglas completas están en `.cursor/rules/coding-standards.mdc` y `.cursor/rules/project-structure.mdc`.
