# Handover — create-stack-next

**Fecha:** 2026-07-01
**Última versión:** `0.6.1`

---

## Estado actual del proyecto

### Versiones cerradas
- **Fase 1 (Robustez Absoluta):** ✅ Completada en v0.5.x
- **Fase 2 (Flexibilidad Interna y DX):** ✅ Completada en v0.6.1
- **Fase 3 (Adopción y Documentación):** ⏳ En progreso

### Entregables de Fase 2 completados
- ✅ Template `--template api` (backend puro Next.js App Router, Drizzle ORM + SQLite, Zod, middleware Bearer/API Key, tests con `node-mocks-http`).
- ✅ AI-Native workflow: `AGENTS.md`, `ROADMAP.md`, `AGENT_TASKS.md`, `HANDOFF.md` y ADRs semilla inyectados en ambos templates.
- ✅ Soporte de workspaces con detección automática y desactivación inteligente de `git init`.
- ✅ Pulido visual del CLI con `@clack/prompts` (spinners, colores semánticos, cancelaciones limpias, bloque "Próximos pasos").
- ✅ CI/CD de GitHub Actions en el repositorio central (lint, typecheck, Playwright).
- ✅ Fix del error `ERESOLVE` de npm fijando React de forma armónica para Next.js 15.

### Tests del scaffolder
- 55 tests pasando con `npm run test:run`.
- `vitest.config.ts` aísla estrictamente `src/` para evitar colisiones con tests anidados en `template/`.

### Cambios principales en esta sesión
- Actualización de `ROADMAP.md` a v0.6.1.
- Actualización de `HANDOFF.md` (este archivo).
- Actualización de `FUTURE.md` quitando ideas ya implementadas.
- Ajuste de `AGENT_TASKS.md` para reflejar Fase 3 activa.

---

## Dónde retomar

Cuando se retome el proyecto, se recomienda revisar:

1. `ROADMAP.md` — estado actual de fases y épicas pendientes.
2. `AGENT_TASKS.md` — sprint plan para la Fase 3.
3. `CHANGELOG.md` — historial de versiones.
4. `FUTURE.md` — ideas post-v1.0.0.

---

## Notas

- Fase 2 se cerró oficialmente en v0.6.1; la siguiente release (v0.7.x) debe comenzar a trabajar épicas de Fase 3.
- El soporte multi-package manager (`pnpm` / `yarn` / `bun`) quedó como deuda técnica de Fase 1; evaluar si se incluye en Fase 3 o se pospone.
- Los prompts de agentes están en español (`.openclaw/prompts/` y `.agents/prompts/`).

---

**Última actualización:** 2026-07-01
