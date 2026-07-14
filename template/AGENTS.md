# AGENTS.md

> Instrucciones para AI agents que trabajen en este proyecto.
>
> Este archivo es leído por OpenClaw, Claude Code, Cursor y otros agentes modernos. Es agnóstico: no importa qué agente uses, las instrucciones son las mismas.

## Sobre este proyecto

App Next.js 15 con TypeScript estricto. Usa App Router, Biome para lint/format, Vitest para unit tests, Playwright para e2e.

## Convenciones de código

- **TypeScript estricto**. Nada de `any` salvo que sea estrictamente necesario (y con comentario explicando por qué).
- **No usar `var`**. Siempre `const` o `let`.
- **Imports**: ordenados alfabéticamente, agrupados (externos, internos, types).
- **Naming**:
  - Componentes: PascalCase (`UserCard.tsx`)
  - Hooks: camelCase con prefijo `use` (`useAuth.ts`)
  - Utils: camelCase (`formatDate.ts`)
  - Types/Interfaces: PascalCase, sin prefijo `I`
- **Validación runtime con Zod**. Para cualquier input externo (API, env, forms).
- **Errores**: usar tipos de error específicos, no `throw new Error()` genérico.
- **Tests**: unit tests al lado del código (`*.test.ts`), e2e en `tests/e2e/`.
- **Estilo de Código y Biome**: El código debe alinearse estrictamente a las reglas de formateo y linting de Biome. Siempre asegura la ejecución de `npm run lint:fix` tras realizar modificaciones para evitar fallos de CI.
- **Exclusión de dependencias (Git)**: Las carpetas de dependencias (`node_modules/`) y builds (`.next/`, `dist/`, `build/`) nunca deben ser añadidas al índice de Git. Valida siempre el estado del `.gitignore` ante cualquier adición.
- **Aserciones robustas en tests**: Evita fallos frágiles en las pruebas por formateo automático. Asegura que aserciones sobre cadenas largas truncadas, comillas o espaciados coincidan exactamente con la salida procesada por el formateador.

## Comandos clave

```bash
npm run dev          # dev server
npm run lint         # biome check
npm run lint:fix     # biome check --write
npm run typecheck    # tsc --noEmit
npm run test         # vitest (watch mode)
npm run test:run     # vitest (single run)
npm run test:e2e     # playwright
npm run agent        # abrir sesión con OpenClaw (usa .openclaw/ + AGENTS.md)
```

## Estructura de documentación para agentes

- `AGENTS.md` — este archivo (instrucciones agnósticas)
- `docs/` — arquitectura, decisiones y guías de contribución
- `.openclaw/` — config y prompts específicos de OpenClaw
- `.agents/` — config y prompts genéricos (compartidos entre agentes)
- `openspec/` — specs y cambios (Spec-Driven Development con OpenSpec)

## Desarrollo por Especificaciones (Spec-Driven Development)

Este proyecto incluye [OpenSpec](https://github.com/Fission-AI/OpenSpec) para desarrollo guiado por especificaciones. La idea central: **acordar qué construir antes de escribir código**.

### Estructura

- `openspec/specs/` — fuente de verdad: cómo funciona el sistema HOY
- `openspec/changes/` — cambios propuestos (uno por carpeta)
- `openspec/changes/archive/` — cambios completados
- `openspec/config.yaml` — configuración de OpenSpec

### Flujo de trabajo con IA

En vez de pedirle cosas sueltas a la IA, usá los slash commands de OpenSpec:

1. **`/opsx:explore`** — pensá con la IA antes de comprometerte (opcional)
2. **`/opsx:propose "nombre-del-cambio"`** — la IA crea la propuesta: proposal.md, specs, design.md, tasks.md
3. **Revisás y ajustás** el plan generado
4. **`/opsx:apply`** — la IA implementa los tasks
5. **`/opsx:archive`** — los delta specs se mergean a `specs/`, el cambio se archiva

### Cuándo usar OpenSpec

- ✅ Features nuevas, refactorings grandes, cambios de comportamiento
- ❌ Fix de una línea, typos, cambios triviales (no justifican la ceremonia)

### Specs como fuente de verdad

Las specs en `openspec/specs/` describen cómo funciona el sistema **hoy**. Cuando armás un cambio, no reescribís toda la spec: escribís un **delta** (ADDED/MODIFIED/REMOVED). Al archivar, el delta se mergea a las specs principales.

## Estructura importante

- `src/app/` — rutas y API routes (App Router)
- `src/components/` — componentes React
- `src/lib/` — utilidades, lógica de negocio, servicios
- `src/test/` — setup de testing
- `tests/e2e/` — tests e2e con Playwright

## Cómo arrancar tu proyecto con IA (Project Kickoff)

Si acabas de crear este proyecto con `create-stack-next`, abre tu agente de IA (Cursor, OpenClaw, etc.) y envíale este prompt exacto para iniciar la arquitectura:

> "Hola, este es un proyecto recién generado. Quiero crear [TU IDEA AQUÍ]. Por favor, asume el rol de Arquitecto de Software. Entrevista conmigo sobre los requisitos, la estética y el alcance. Luego, utiliza esa información para actualizar el `ROADMAP.md` en la raíz, redactar un `implementation_plan.md` si hace falta, y llenar el `AGENT_TASKS.md` inicial para que podamos empezar la Fase 1 del desarrollo, siguiendo rigurosamente las reglas en `AGENTS.md`."

## Flujo de Trabajo Obligatorio (AI Agent Workflow)

Como agente de IA que trabaja en este proyecto, DEBES seguir este ciclo de manera autónoma para cada tarea de desarrollo:

1. **Recuperación de Contexto (Fuente de Verdad):** Antes de tomar CUALQUIER acción, DEBES leer `ROADMAP.md`, `AGENT_TASKS.md`, `docs/decisions.md`, y `CHANGELOG.md`. Esta es la fuente de verdad del proyecto.
2. **Specs primero:** Si el proyecto tiene OpenSpec configurado, usá los slash commands (`/opsx:propose`, `/opsx:apply`, `/opsx:archive`) para cambios de comportamiento. Las specs en `openspec/specs/` son la fuente de verdad del sistema.
3. **Alineación de Requisitos:** Antes de programar, valida los detalles clave del módulo con el humano.
4. **Plan de Implementación:** Si la tarea es compleja, crea un plan de implementación (`implementation_plan.md`) y espera la aprobación explícita del desarrollador.
5. **Lista de Tareas (`AGENT_TASKS.md`):** Lleva el control del progreso de las tareas usando marcas `[ ]`, `[/]` y `[x]`. Al finalizar la fase, mueve este archivo a `docs/phases/phaseX_tasks.md` y crea uno nuevo.
6. **Auto-Documentación y Persistencia (ADR):** Si tomas decisiones técnicas o de producto, documéntalas en `docs/decisions.md` (formato ADR). Si alcanzas el límite de contexto o cortas la sesión, deja un resumen en `HANDOFF.md`.
7. **Mantenimiento del Árbol de Carpetas:** Actualiza `docs/architecture.md` si cambias la estructura.
8. **Mantenimiento del Changelog:** Registra SIEMPRE todos los cambios realizados en el archivo `CHANGELOG.md` en la sección `[Unreleased]`.
9. **Auto-Commit:** Al finalizar con éxito una tarea o fase, realiza el git commit correspondiente de forma atómica.
10. **Walkthrough:** Genera o actualiza el archivo `walkthrough.md` detallando qué archivos cambiaron y cómo probarlos.

## Lo que el agente puede hacer

- ✅ Crear nuevos componentes siguiendo las convenciones
- ✅ Agregar tests para código nuevo
- ✅ Refactorizar manteniendo los tests pasando
- ✅ Buscar y arreglar bugs
- ✅ Explicar código existente

## Lo que el agente NO debe hacer sin preguntar

- ❌ Cambiar dependencias (`package.json`)
- ❌ Modificar configuración de Biome, Vitest, Playwright, TypeScript
- ❌ Tocar archivos de CI/CD (`.github/workflows/`)
- ❌ Borrar tests existentes
- ❌ Hacer commit o push (eso lo hace el humano)

## Cómo pedirle cosas al agente

Bien:

> "Agregá un componente Button en `src/components/ui/Button.tsx` con las variantes primary, secondary y ghost. Incluye tests unitarios."

Mal:

> "Mejorá el botón" (demasiado vago)

Bien:

> "Refactorizá `src/lib/api.ts` para usar Zod en vez de chequeos manuales. Mantené los tests pasando."

Mal:

> "Hacé el código más lindo"

## Recursos

- [Next.js docs](https://nextjs.org/docs)
- [Biome docs](https://biomejs.dev/)
- [Vitest docs](https://vitest.dev/)
- [Playwright docs](https://playwright.dev/)
