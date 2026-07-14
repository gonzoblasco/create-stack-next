# create-stack-next

> Scaffolder opinado para Next.js 15. Un solo comando y tenés un proyecto moderno, testeado, lintado y listo para que un AI agent lo habite.

[![npm version](https://img.shields.io/npm/v/create-stack-next.svg)](https://www.npmjs.com/package/create-stack-next)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## Instalación

```bash
npx create-stack-next my-app

# Si solo necesitás un Backend (API Route Handlers):
npx create-stack-next my-api --template api
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
- **OpenSpec** — Spec-Driven Development integrado (specs + slash commands para IA)
- **AGENTS.md** + workflow de IA inyectado para desarrollo asistido
- `docs/` con arquitectura, decisiones y guía de contribución

### Template API (`--template api`)
Si preferís generar un backend puramente funcional sin React components:
- **Next.js 15 App Router** (Rutas de API).
- **Drizzle ORM** + SQLite pre-configurado para base de datos.
- Utilidades estandarizadas de Error Handling y Respuestas API.
- Middleware base con validación de Bearer Token.
- **node-mocks-http** + Vitest para probar endpoints velozmente.

---

## ¿Por qué este y no create-next-app?

| Aspecto | create-next-app | create-stack-next |
|---------|-----------------|-------------------|
| Testing | Ninguno | Vitest + Playwright configurados |
| Linter | ESLint + Prettier | Biome (un solo binario) |
| TypeScript | Básico | Estricto + `noUncheckedIndexedAccess` |
| AI agents | Ninguno | `AGENTS.md` + prompts listos para usar |
| Spec-Driven Development | Ninguno | OpenSpec integrado (specs + slash commands) |
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
- `openspec/` — Spec-Driven Development con OpenSpec (specs, changes, slash commands)
- `npm run agent` — abre sesión con el agente ya contextualizado

### Spec-Driven Development con OpenSpec

Desde la v0.7.0, todos los proyectos generados incluyen [OpenSpec](https://github.com/Fission-AI/OpenSpec) pre-configurado. Esto significa que tu IA trabaja con especificaciones en vez de prompts vagos:

```bash
/opsx:propose "agregar autenticación"   # la IA crea propuesta + specs + tasks
/opsx:apply                              # la IA implementa
/opsx:archive                            # specs actualizadas, cambio archivado
```

Durante el scaffolding, el CLI te pregunta qué herramientas de IA usás (Claude Code, Cursor, etc.) e instala los skills y slash commands correspondientes.

---

## Roadmap

El proyecto se encuentra en desarrollo activo hacia la versión estable (v1.0.0). Podés ver el detalle completo y estado actual en [`ROADMAP.md`](ROADMAP.md).

- **Fase 1: Robustez Absoluta** ✅ (Completada en v0.5.0)
- **Fase 2: Flexibilidad Interna y DX** ✅ (Completada en v0.6.0)
- **Fase 3: Adopción y Documentación** ⏳ En progreso

Ver [`FUTURE.md`](FUTURE.md) para el registro de ideas futuras.

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

**Creado con ❤️ por Gonzo y Kanam (OpenClaw)**

> Primera utilidad publicada. M4 Lite en progreso.