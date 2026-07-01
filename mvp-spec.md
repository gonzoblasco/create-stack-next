# MVP Spec — `create-stack-next`

> Documento de brief para sub-agentes y colaboradores. Define el alcance mínimo viable del scaffolder. Si algo no está acá, no es parte del MVP.

**Estado:** ✅ v0.6.1 publicada. Fase 1 (M0-M2 + Robustez) y Fase 2 (Flexibilidad/DX) cerradas. Fase 3 (Adopción) en progreso.
**Fecha:** 2026-06-28 (M0/M1), actualizado 2026-06-29 (estado de versión), reconciliado 2026-07-01 (v0.6.1).
**Versión publicada:** `0.6.1` — https://www.npmjs.com/package/create-stack-next
**M0 cerrado:** ✅ producto, scope, distribución, framework, linter, testing, nombre.
**M1 cerrado:** ✅ scaffolder funcional + template completo + repo público + npm publish.
**M2 cerrado (2026-06-28):** ✅ AI-native (`npm run agent`, templates de prompts, `.openclaw/`).
**M4 Lite cerrado:** ✅ README pulido, CHANGELOG, release notes, post LinkedIn.
**Fase 1 cerrada (v0.5.x):** ✅ Robustez absoluta: tests exhaustivos del scaffolder, refactor de `cli.ts` para testabilidad, mejoras en Git init y UX de validación.
**Fase 2 cerrada (v0.6.1):** ✅ Template API (`--template api`), AI-Native workflow injection, soporte de workspaces, pulido visual del CLI con `@clack/prompts`, CI/CD central, fix ERESOLVE de npm.

---

## 0. TL;DR

`create-stack-next` es un scaffolder npm que genera un proyecto Next.js 15+ con App Router, TypeScript estricto, Biome, Vitest, Playwright, Zod, GitHub Actions y configuración para AI agents preinstalada. Un solo comando (`npx create-stack-next my-app`) y obtenés un proyecto listo para `npm run dev` con todo preconfigurado.

---

## 1. Comando principal y UX

### Comando
```bash
npx create-stack-next my-app
```

### Flags aceptados (todos opcionales)
| Flag | Default | Descripción |
|---|---|---|
| `--git` | `true` | Inicializa repo git y hace commit inicial. |
| `--install` | `true` | Corre `npm install` después de generar. |
| `--package-manager` | `npm` | Alternativas: `pnpm`, `yarn`, `bun`. |

### UX esperada
```bash
$ npx create-stack-next my-app

✔ Creando proyecto en ./my-app...
✔ Copiando template...
✔ Inicializando Biome...
✔ Configurando Vitest...
✔ Configurando Playwright...
✔ Creando GitHub Actions workflow...
✔ Instalando dependencias (npm)...
✔ Inicializando git + commit inicial...

✅ Listo en 12 segundos.

Próximos pasos:
  cd my-app
  npm run dev          # arrancar dev server
  npm run test         # correr tests unitarios
  npm run test:e2e     # correr tests e2e
  npm run lint         # correr Biome
  npm run agent        # abrir sesión con AI agent (si D009 confirmado)

Documentación: https://github.com/<owner>/create-stack-next
```

**Reglas:**
- Sin preguntas interactivas (D011 — opinionated 100%).
- Si el directorio destino ya existe y no está vacío, abortar con mensaje claro.
- Si el usuario corre `npx create-stack-next` sin argumento, mostrar usage y salir.

---

## 2. Estructura del scaffolder (el repo en sí)

```
create-stack-next/                    ← este repo, en GitHub
├── package.json                      ← publicado a npm
├── README.md                         ← doc pública
├── LICENSE                           ← MIT
├── src/
│   ├── index.ts                      ← entrypoint del CLI (bin)
│   ├── cli.ts                        ← parsing de args + UX
│   ├── copy-template.ts              ← copia archivos del template al destino
│   ├── post-install.ts               ← biome init, git init, etc.
│   └── validate.ts                   ← valida nombre del proyecto, directorio, etc.
├── template/                         ← los archivos que se copian (ver §3)
└── docs/
    └── (opcional, no MVP)
```

**Stack del scaffolder:**
- TypeScript estricto
- Sin frameworks pesados — el scaffolder es chico, no necesita Next ni nada
- `npx` ya provee runtime, no dependemos de Node global del usuario más allá de v20+

---

## 3. Estructura del template (lo que se copia a `my-app/`)

```
my-app/
├── .github/
│   └── workflows/
│       ├── ci.yml                    ← lint + typecheck + test en cada PR
│       └── playwright.yml            ← e2e en cada PR
├── .vscode/
│   ├── settings.json                 ← format on save con Biome
│   └── extensions.json               ← recomienda Biome, Vitest, Playwright
├── src/
│   ├── app/
│   │   ├── layout.tsx                ← root layout
│   │   ├── page.tsx                  ← home con contador (smoke test)
│   │   └── api/
│   │       └── health/
│   │           └── route.ts          ← endpoint /api/health para verificar
│   ├── components/
│   │   └── ui/                       ← (vacío, listo para componentes)
│   ├── lib/
│   │   ├── env.ts                    ← validación con Zod (D010)
│   │   └── utils.ts                  ← helpers varios
│   └── test/
│       ├── setup.ts                  ← config global de Vitest
│       └── example.test.ts           ← 1 test de ejemplo
├── tests/
│   └── e2e/
│       └── home.spec.ts              ← 1 test e2e de ejemplo (carga la home)
├── public/
│   └── favicon.ico                   ← favicon básico
├── .gitignore
├── biome.json                        ← config Biome (D007)
├── vitest.config.ts                  ← config Vitest (D008)
├── playwright.config.ts              ← config Playwright (D008)
├── tsconfig.json                     ← TS strict + paths
├── next.config.ts
├── package.json
├── AGENTS.md                         ← config AI agent (D009)
├── README.md                         ← doc del proyecto generado
└── LICENSE                           ← MIT (igual que el scaffolder)
```

---

## 4. Dependencias del template

### Production deps
```json
{
  "next": "^15.0.0",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "zod": "^3.23.0"
}
```

### Dev deps
```json
{
  "@biomejs/biome": "^1.9.0",
  "@playwright/test": "^1.48.0",
  "@types/node": "^22.0.0",
  "@types/react": "^19.0.0",
  "@types/react-dom": "^19.0.0",
  "@vitejs/plugin-react": "^4.3.0",
  "happy-dom": "^15.0.0",
  "typescript": "^5.6.0",
  "vitest": "^2.1.0"
}
```

**Sin Tailwind en MVP.** Es la dependencia que más debate genera. Mejor dejar al usuario agregarlo si lo quiere. Decisión documentada en §8 (out of scope).

---

## 5. Configuraciones incluidas

### `biome.json`
- Formato + lint integrados.
- Reglas base + recomendación de imports ordenados.
- Indent: 2 spaces, single quotes, semicolons as needed.

### `vitest.config.ts`
- Environment: `happy-dom` (más rápido que jsdom).
- Globals: `true` (no require import explícito de `describe`/`it`).
- Setup file: `src/test/setup.ts`.

### `playwright.config.ts`
- BaseURL: `http://localhost:3000`.
- WebServer: arranca `npm run dev` automáticamente.
- Solo Chromium en MVP (Firefox/WebKit son out of scope).

### `tsconfig.json`
- `strict: true`.
- `noUncheckedIndexedAccess: true` (más estricto que el default).
- `paths` configurado para `@/*` apuntando a `./src/*`.

### `.github/workflows/ci.yml`
- Trigger: pull_request + push a main.
- Steps: checkout, setup-node v22, npm ci, npm run lint, npm run typecheck, npm run test.

### `.github/workflows/playwright.yml`
- Trigger: pull_request + push a main.
- Steps: setup-node v22, npm ci, npx playwright install --with-deps chromium, npm run test:e2e.

### `src/lib/env.ts`
```ts
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  // Acá se suman más variables a medida que el proyecto las necesite.
});

export const env = envSchema.parse(process.env);
```

---

## 6. Comandos npm del proyecto generado

| Comando | Qué hace |
|---|---|
| `npm run dev` | Arranca Next.js dev server en :3000 |
| `npm run build` | Build de producción |
| `npm run start` | Sirve el build de producción |
| `npm run lint` | Corre Biome (check + format check) |
| `npm run lint:fix` | Biome con --write |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test` | Vitest en modo watch |
| `npm run test:run` | Vitest en modo single-run (CI) |
| `npm run test:e2e` | Playwright |
| `npm run agent` | (D009) Abre sesión con el AI agent configurado |

---

## 7. AI agent integration (D009 + D018)

**M1 — D009 ✅:** el template incluye `AGENTS.md` agnóstico (leído por OpenClaw, Claude Code, Cursor, etc.).

**M2 — D018 ✅:** además del `AGENTS.md`, el template incluye:
- Comando `npm run agent`.
- `docs/` (architecture, decisions, contributing).
- `.openclaw/` (config + prompts).
- `.agents/` (config genérica + prompts compartidos).

**Por qué:** Tener `.openclaw/` y `.agents/` en la raíz del proyecto es una **buena práctica** para agentes. `AGENTS.md` sigue siendo agnóstico. No es vendor lock-in; es metadata útil que el dueño del repo puede aprovechar o ignorar.

---

## 8. Out of scope del MVP

Lo que **NO** se incluye en la primera versión:

- ❌ Tailwind / CSS framework (decisión controversial, dejamos al usuario elegir)
- ❌ Auth (NextAuth, Clerk, etc.)
- ❌ Database (Postgres, SQLite, etc.)
- ❌ Storybook
- ❌ Prompts interactivos (D011: opinionated 100%)
- ❌ Firefox/WebKit en Playwright (solo Chromium)
- ❌ Docker
- ❌ Storybook
- ❌ i18n setup
- ❌ Monorepo config (Turborepo, pnpm workspaces)
- ❌ Publicación a npm registry propia (solo publicamos el scaffolder, no el template)

Si alguien necesita alguna de estas cosas, lo agregamos en M2+.

---

## 9. Criterios de éxito del MVP

El MVP está listo cuando **todas** estas son verdaderas:

1. ✅ `npx create-stack-next my-app` (corrido en una máquina limpia con Node 22) genera un proyecto funcional en menos de 30 segundos.
2. ✅ `npm run dev` arranca el servidor en :300 sin warnings ni errores.
3. ✅ `npm run lint`, `npm run typecheck`, `npm run test`, `npm run test:e2e` corren todos en verde en el proyecto generado.
4. ✅ El proyecto generado tiene CI configurado: hacer push a GitHub activa los workflows y pasan.
5. ✅ El README del proyecto generado explica claramente cómo arrancar.
6. ✅ Publicar el scaffolder a npm y verificar que `npx create-stack-next@latest` funcione desde cualquier máquina.
7. ✅ Repo público en GitHub con README decente que explique qué es, por qué, y cómo contribuir.

**M1 cerrado el 2026-06-28 con los 7 criterios cumplidos.**

---

## 10. Riesgos abiertos

| Riesgo | Estado |
|---|---|
| Next.js 15 / React 19 pueden tener bugs al momento de release | 🟡 Vigente — fijado con `~` en vez de `^` para updates controlados |
| Biome puede no cubrir alguna regla crítica que un usuario espera | 🟢 Mitigado — `biome-ignore` documentado como escape hatch |
| `npx` puede tener rate limiting o problemas de red | 🟢 Mitigado — documentado fallback con `npm i -g` en README |
| El squat `create-stack` (sin sufijo) en npm puede confundir | 🟢 Vigente — sigue siendo squat (0.0.4, sin uso), no bloquea pero confunde |
| Versión de Node del usuario: si tiene < 20, falla | 🟡 Vigente — `engines.node: ">=20"` en package.json, mensaje al inicio del scaffolder |
| Conflictos con `--git` si el usuario ya tiene git config rara | 🟢 Mitigado — `git init` usa valores genéricos cuando no hay user.name/user.email |
| Tests del scaffolder mismo (no solo del template) | 🟢 Cerrado — 55 tests pasando con Vitest + `node-mocks-http` en v0.6.1 |
| Soporte multi-package manager (`pnpm`, `yarn`, `bun`) | 🟡 Vigente — parcial, pendiente de tests de integración |
| Workspace detection en monorepos | 🟢 Mitigado — detección automática en v0.6.1 desactiva `git init` para evitar anidamiento |

---

## 11. Roadmap post-MVP (referencia, no es parte del MVP)

- **M2 — AI-native:** ✅ Cerrado. Comando `npm run agent`, templates de prompts por tipo de tarea, integración profunda con agentes genéricos.
- **M4 Lite — README pulido:** ✅ Cerrado.
- **M3 — Templates adicionales:** parcialmente iniciado.
  - `--template api` ✅ cerrado en v0.6.1 (backend puro Next.js App Router + Drizzle + tests).
  - `--template cli` y `--template tanstack` pendientes (ver `FUTURE.md`).
- **Fase 3 — Adopción y Documentación:** ⏳ En progreso. Docs site, demo video, beta testers, pulido de release candidate.

**Próximo paso:**
1. Avanzar épicas de Fase 3 según `AGENT_TASKS.md` y `ROADMAP.md`.

---

## 12. Definición de "listo para producción"

El proyecto generado está listo para producción cuando, además de los criterios del MVP:

- Tiene logging estructurado.
- Tiene healthcheck (ya está en §3: `/api/health`).
- Tiene al menos un test e2e de flujo crítico (más allá del smoke test de home).
- Tiene un CHANGELOG.
- Está desplegado en al menos una plataforma (Vercel, Railway, Fly.io).

Esto NO es parte del MVP. Es el siguiente paso del usuario, no nuestro.

---

**Próximo paso:**
1. Avanzar épicas de Fase 3 según `AGENT_TASKS.md` y `ROADMAP.md`.
