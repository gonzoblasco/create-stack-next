# Refactor: Mejorar estructura sin cambiar comportamiento

> Prompt template para pedirle al agente que mejole la estructura interna de código existente.
> El invariante crítico: **los tests deben seguir pasando sin modificarse** (o solo modificarse si el contrato público cambió, y vos lo aprobás).

---

## Cuándo usar este prompt

- Tenés código que funciona pero está feo / difícil de leer / duplicado.
- Querés extraer responsabilidades, renombrar, o reorganizar.
- NO querés cambiar comportamiento observable.

## Prompt sugerido

```
Quiero refactorizar lo siguiente:

**Archivo(s) o módulo:** {{ruta/o/nombre}}
**Razón:** {{por qué querés cambiarlo — dolor concreto, no "está mal"}}

**Qué quiero mejorar:**
- {{objetivo 1: ej. extraer función helper}}
- {{objetivo 2: ej. separar concerns en archivos distintos}}
- {{objetivo 3: ej. mejorar nombres}}

**Invariantes (NO deben cambiar):**
- API pública: {{qué exporta y cómo se usa}}
- Comportamiento observable: {{qué retorna, qué efectos tiene}}
- Tests existentes: {{qué tests deben seguir pasando sin tocarse}}

**Out of scope (NO tocar):**
- {{archivo o módulo que no debe modificarse}}
```

## Lo que el agente debería hacer

1. Correr `npm run test:run` antes de empezar para tener una baseline verde.
2. Hacer el cambio en pasos chicos, validando tests entre pasos.
3. Si un test falla después del cambio, el agente **revierte** y reporta — no modifica el test sin preguntar.
4. Si necesita extraer un módulo nuevo, mover archivos, o renombrar exports, listar los cambios en el reporte final.
5. Correr `npm run lint`, `npm run typecheck`, `npm run test:run` al terminar.

## Lo que el agente NO debería hacer sin preguntar

- Cambiar firmas de funciones exportadas (breaking change).
- Modificar tests que están pasando.
- Combinar el refactor con features nuevas (eso es otro commit / otro turno).
- "Mejorar" cosas que no pediste (scope creep).

## Anti-patterns que el agente debe evitar

- ❌ Renombrar todo porque sí.
- ❌ Agregar abstracciones para un solo caso de uso.
- ❌ "Mejorar" performance sin métrica que lo justifique.
- ❌ Cambiar el formato del código sin que el `biome check` lo pida.

## Ejemplo concreto

```
Quiero refactorizar lo siguiente:

**Archivo(s) o módulo:** src/lib/api.ts
**Razón:** la función fetchUsers tiene 80 líneas, mezcla parsing, fetch
y manejo de errores en un solo lugar.

**Qué quiero mejorar:**
- Separar en: buildUrl(params), parseUser(raw), fetchUsers(params)
- Errores tipados con discriminated unions

**Invariantes (NO deben cambiar):**
- API pública: export const fetchUsers, export type FetchUsersError
- Comportamiento observable: retorna los mismos users en los mismos casos
- Tests existentes: src/lib/api.test.ts debe seguir pasando

**Out of scope (NO tocar):**
- src/lib/auth.ts (no comparte lógica con esto)
```