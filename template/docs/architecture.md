# Arquitectura

> Este documento describe la arquitectura de alto nivel del proyecto. Está pensado para que un agente (o un humano) pueda entender el sistema rápidamente.

## Stack

- **Framework:** Next.js 15 (App Router)
- **Lenguaje:** TypeScript estricto
- **Lint/Format:** Biome
- **Testing:** Vitest (unit) + Playwright (e2e)
- **Validación:** Zod
- **CI:** GitHub Actions

## Estructura de carpetas

```
src/
├── app/                 ← rutas y API routes (App Router)
│   ├── layout.tsx
│   ├── page.tsx
│   └── api/
├── components/          ← componentes React reutilizables
├── lib/                 ← utilidades, env, helpers
└── test/                ← setup de Vitest
tests/
└── e2e/                 ← tests de Playwright
```

## Principios

- TypeScript estricto (`strict: true`, `noUncheckedIndexedAccess: true`).
- Validación runtime con Zod en todos los inputs externos.
- Tests unitarios al lado del código (`*.test.ts`).
- Un solo comando de lint/format (`biome check --write`).
- Healthcheck en `/api/health`.

## Convenciones

Ver `AGENTS.md` para convenciones de código y cómo trabajar con agentes.

## AI agents

Este proyecto está preparado para trabajar con agentes:

- `AGENTS.md` — instrucciones agnósticas
- `.openclaw/` y `.agents/` — config y prompts
- `npm run agent` — abre sesión con contexto precargado (AGENTS.md + docs/)