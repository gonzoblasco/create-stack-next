# test-agent-app

> App Next.js 15 generada con [create-stack-next](https://github.com/<owner>/create-stack-next).

## Stack

- **Next.js 15** con App Router
- **React 19**
- **TypeScript** estricto (`noUncheckedIndexedAccess`, `noImplicitOverride`)
- **Biome** para lint y format (reemplaza ESLint + Prettier)
- **Vitest** para tests unitarios
- **Playwright** para tests e2e
- **Zod** para validación runtime
- **GitHub Actions** para CI

## Comandos

```bash
npm run dev          # arrancar dev server en :3000
npm run build        # build de producción
npm run start        # servir el build de producción
npm run lint         # correr Biome (check)
npm run lint:fix     # Biome con --write
npm run typecheck    # tsc --noEmit
npm run test         # Vitest en modo watch
npm run test:run     # Vitest single-run (para CI)
npm run test:e2e     # Playwright
npm run test:e2e:ui  # Playwright con UI
npm run agent        # abrir sesión con OpenClaw
```

## Estructura

```
src/
├── app/                # App Router de Next.js
│   ├── api/            # API routes
│   │   └── health/     # Health check endpoint
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home
│   └── globals.css     # Estilos globales
├── components/         # Componentes React
│   └── ui/             # Componentes UI reutilizables
├── lib/                # Utilidades compartidas
│   ├── env.ts          # Validación de env vars con Zod
│   └── utils.ts        # Helpers varios
└── test/               # Setup y helpers de testing
    └── setup.ts

tests/
└── e2e/                # Tests e2e con Playwright
```

## Cómo trabajar

1. **Reemplazá `src/app/page.tsx`** con tu UI real.
2. **Sumá componentes en `src/components/`**.
3. **Lógica de negocio en `src/lib/`**.
4. **API routes en `src/app/api/<nombre>/route.ts`**.
5. **Tests unitarios al lado del código**: `src/lib/utils.ts` → `src/lib/utils.test.ts`.
6. **Tests e2e en `tests/e2e/`**.

## AI agents

Este proyecto incluye `AGENTS.md` con instrucciones para AI agents (OpenClaw, Claude Code, Cursor, etc.). El agente entiende la estructura y puede ayudarte a trabajar en el código.

### Documentación adicional para agentes

- `docs/` — arquitectura, decisiones y guías de contribución
- `.openclaw/` — config y prompts específicos de OpenClaw
- `.agents/` — config y prompts genéricos (compartidos)

## CI/CD

Cada PR dispara dos workflows:
- **CI**: lint + typecheck + tests + build
- **Playwright E2E**: tests e2e

Para deployar, conectá el repo a Vercel, Railway, o tu plataforma preferida.

## Licencia

MIT