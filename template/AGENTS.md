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

## Estructura importante

- `src/app/` — rutas y API routes (App Router)
- `src/components/` — componentes React
- `src/lib/` — utilidades, lógica de negocio, servicios
- `src/test/` — setup de testing
- `tests/e2e/` — tests e2e con Playwright

## Flujo de Trabajo Obligatorio (AI Agent Workflow)

Como agente de IA que trabaja en este proyecto, DEBES seguir este ciclo de manera autónoma para cada tarea de desarrollo:

1. **Alineación de Requisitos:** Antes de programar, valida los detalles clave del módulo (ej: persistencia, diseño visual, alcance) con el usuario.
2. **Plan de Implementación:** Si la tarea es compleja, crea un plan de implementación (`implementation_plan.md`) y espera la aprobación explícita del desarrollador.
3. **Lista de Tareas (`task.md`):** Lleva el control del progreso de las tareas usando marcas `[ ]`, `[/]` y `[x]`.
4. **Auto-Documentación de Decisiones (ADR):** Si tomas decisiones técnicas o de arquitectura, documéntalas en `docs/decisions.md` (formato ADR).
5. **Mantenimiento del Árbol de Carpetas:** Si creas nuevos componentes, utilidades o rutas, mantén actualizado el mapa en `docs/architecture.md`.
6. **Mantenimiento del Changelog:** Registra SIEMPRE todos los cambios realizados en el archivo `CHANGELOG.md`. Añádelos en la sección `[Unreleased]` bajo la categoría correspondiente (Added, Changed, Deprecated, Removed, Fixed, Security).
7. **Auto-Commit al Cierre de Paso:** Al finalizar con éxito todas las tareas de una fase, realiza el git commit correspondiente de forma atómica y descriptiva.
8. **Walkthrough:** Genera o actualiza el archivo `walkthrough.md` detallando qué archivos cambiaron y cómo probarlos.

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