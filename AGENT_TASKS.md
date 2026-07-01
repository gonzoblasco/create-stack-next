# Tareas de Agentes IA — Fase 3: Adopción y Documentación

Este archivo es el **Sprint Plan** para los agentes de IA (OpenClaw, Cursor, Claude). Define las reglas de trabajo y las tareas específicas para la **Fase 3**, comenzando inmediatamente después del cierre de la **Fase 2** en v0.6.1.

## 🛑 Workflow Obligatorio por Tarea

Antes de escribir una sola línea de código, el agente DEBE:
1. Leer `ROADMAP.md`, `HANDOFF.md` y este archivo para contexto.
2. Si la tarea implica una decisión arquitectónica nueva o cambio de diseño, documentarla como ADR en `docs/decisions.md`.
3. Planificar la implementación paso a paso.
4. Ejecutar cambios atómicos.
5. Correr linting (`npm run lint`), typecheck (`npm run typecheck`) y tests (`npm run test:run`).
6. Actualizar `CHANGELOG.md` en la sección `[Unreleased]` y, si corresponde, `ROADMAP.md`.

---

## 🎯 Épicas Activas (Fase 3)

### Épica 1: Sitio Web de Documentación
Migrar de un simple README a una web de docs interactiva.
- [ ] Elegir herramienta (VitePress, Nextra, etc.) y dejar registro en ADR.
- [ ] Migrar contenido del README.
- [ ] Publicar versión inicial accesible (GitHub Pages o Vercel).

### Épica 2: Material de Onboarding
- [ ] Preparar guion para video demo de 2-4 min mostrando scaffolder + AI agent.
- [ ] (Opcional) Grabar demo mínima como GIF o Loom si video full no es viable.

### Épica 3: Polish de Release Candidate
- [ ] Congelar nuevas features mayores.
- [ ] Llamado a beta testers comunitarios.
- [ ] Resolver bugs críticos reportados antes de v1.0.0.

### Deuda técnica pendiente
- [ ] Tests de integración multi-package manager (`pnpm`, `yarn`, `bun`).
- [ ] Revisar si la detección de workspaces cubre todos los casos comunes.
