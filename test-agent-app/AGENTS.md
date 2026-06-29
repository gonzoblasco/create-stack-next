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