# Decisiones técnicas

> Log liviano de decisiones tomadas en el proyecto. Formato inspirado en Architecture Decision Records (ADRs).

---

## D001 — Framework: Next.js 15

**Fecha:** 2026-06-28  
**Decisión:** Usar Next.js 15 con App Router.

**Justificación:** Mayor adopción de mercado, ecosistema maduro, buen soporte de React 19 y Server Components.

---

## D002 — Linter: Biome

**Fecha:** 2026-06-28  
**Decisión:** Usar Biome en lugar de ESLint + Prettier.

**Justificación:** Un solo binario, más rápido, reemplaza dos herramientas.

---

## D003 — Testing: Vitest + Playwright

**Fecha:** 2026-06-28  
**Decisión:** Unit con Vitest, e2e con Playwright.

**Justificación:** Vitest es más rápido que Jest y soporta ESM nativo. Playwright es el estándar actual para e2e.

---

*(Este archivo se mantiene liviano. Las decisiones más importantes del scaffolder están en `context/decisions.md` del repo del scaffolder.)*