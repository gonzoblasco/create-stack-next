# create-stack-next

> Scaffolder opinado para Next.js 15. Un solo comando y tenés un proyecto moderno, testeado, lintado y listo para que un AI agent lo habite.

[![npm version](https://img.shields.io/npm/v/create-stack-next.svg)](https://www.npmjs.com/package/create-stack-next)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## Instalación

```bash
npx create-stack-next my-app
```

Eso es todo. El comando genera un proyecto Next.js 15 listo para empezar a desarrollar.

---

## Qué incluye

El proyecto generado viene con todo preconfigurado:

- **Next.js 15** + React 19 + TypeScript estricto
- **Biome** (lint + format en un solo comando)
- **Vitest** (tests unitarios) + **Playwright** (tests e2e)
- **Zod** para validación runtime
- **GitHub Actions** (CI + e2e)
- **AGENTS.md** + `.openclaw/` + `.agents/` (integración con AI agents)
- `docs/` con arquitectura, decisiones y guía de contribución

---

## ¿Por qué este y no create-next-app?

| Aspecto | create-next-app | create-stack-next |
|---------|-----------------|-------------------|
| Testing | Ninguno | Vitest + Playwright configurados |
| Linter | ESLint + Prettier | Biome (un solo binario) |
| TypeScript | Básico | Estricto + `noUncheckedIndexedAccess` |
| AI agents | Ninguno | `AGENTS.md` + prompts listos para usar |
| CI | Ninguno | GitHub Actions incluido |
| Filosofía | Mínimo | Opinado con defaults 2026 |

**Ideal si:** arrancás proyectos con frecuencia y no querés repetir las mismas 40 decisiones cada vez.

---

## Casos de uso recomendados

- Proyectos personales o de equipo donde querés arrancar rápido con buena base
- Cuando usás (o querés usar) AI agents para desarrollar
- Cuando valorás tener tests, lint y CI desde el día 1

---

## AI agents integrados

El proyecto incluye:

- `AGENTS.md` — instrucciones agnósticas (funciona con OpenClaw, Claude Code, Cursor, etc.)
- `.openclaw/` — config y prompts específicos de OpenClaw
- `.agents/` — config genérica + prompts compartidos
- `npm run agent` — abre sesión con el agente ya contextualizado

---

## Roadmap

### M0 — Definición ✅
### M1 — MVP ✅
### M2 — AI-native ✅
### M3 — Familia de scaffolders ⏸️ Pausado

Ver [`FUTURE.md`](FUTURE.md) para el registro de ideas futuras (`create-stack-remix`, `create-stack-astro`, etc.).

### M4 — Adopción (Lite) ⏳ En progreso

- [ ] README pulido
- [ ] Video demo (2-4 min)
- [ ] Release note
- [ ] Presencia básica

---

## Comandos del proyecto generado

```bash
npm run dev          # servidor de desarrollo
npm run build        # build de producción
npm run lint         # Biome (check)
npm run lint:fix     # Biome con --write
npm run typecheck    # verificación de tipos
npm run test:run     # tests unitarios
npm run test:e2e     # tests e2e
npm run agent        # sesión con OpenClaw
```

---

## Contribuir

Si querés contribuir, mirá [`docs/contributing.md`](docs/contributing.md) en el template generado.

---

## Licencia

MIT

---

**Creado con ❤️ por Gonzo y Gonza (OpenClaw)**

> Primera utilidad publicada. M4 Lite en progreso.