# Changelog

Todas las versiones notables de este proyecto se documentan en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added

- Actualización de `ROADMAP.md`, `HANDOFF.md`, `AGENT_TASKS.md` y `FUTURE.md` para reflejar el estado actual del proyecto tras el cierre de la Fase 2.

## [0.6.1] - 2026-07-01

### Added

- Publicación en npm con soporte oficial del paquete para el template API (`files`: `dist`, `template`, `template-api`).
- Documentación del flag `--template api` en README.

### Fixed

- Fix del infame error `ERESOLVE` de `npm install` al fijar la dependencia de React de forma armónica para Next.js 15 en los proyectos generados.

## [0.6.0] - 2026-07-01

### Added

- **Template API (`--template api`)**: arquitectura robusta de backend puro usando Next.js App Router.
  - **Base de Datos**: integración de Drizzle ORM + `@libsql/client` (SQLite) con tabla de usuarios y `drizzle.config.ts`.
  - **Manejo de Errores y Respuestas**: utilidades estandarizadas (`src/lib/errors.ts` y `src/lib/api-response.ts`) para respuestas de API consistentes.
  - **Middleware**: interceptor de autenticación base vía Bearer Token en `src/middleware.ts`.
  - **Testing**: integración con `node-mocks-http` y Vitest para pruebas de Route Handlers ultra veloces sin levantar servidores.
- **AI Workflow Injection**: todos los proyectos generados (`template/` y `template-api/`) ahora incluyen de fábrica archivos semilla para orquestar agentes de IA (`ROADMAP.md`, `AGENT_TASKS.md`, `HANDOFF.md`).
- **Prompt Kickoff**: prompt pre-configurado en `AGENTS.md` del template para que el usuario inicie de inmediato la Fase 1 del proyecto usando cualquier LLM (Cursor, OpenClaw, etc.).
- Decisiones técnicas fundacionales (ADR D004 y D005) inyectadas en los templates generados para prevenir amnesia contextual en la IA.
- **Soporte de Workspaces**: detección automática si el CLI se ejecuta dentro de un monorepo (Turborepo, pnpm workspaces, etc.), desactivando `git init` para evitar anidamiento accidental.
- **Pulido Visual del CLI**: `@clack/prompts` con spinners en tiempo real, colores semánticos, manejo limpio de cancelaciones (Ctrl+C) y bloque estilizado de "Próximos pasos".
- **CI/CD Pipeline**: flujo de trabajo de GitHub Actions nativo en el repositorio central para validar Linting, Tipos y tests de Playwright.

### Changed

- Tests de Vitest re-arquitectados para discriminar el directorio `src/` del directorio de plantillas `template/`, evitando colisiones fantasma.

### Fixed

- Se añadió `vitest.config.ts` en la raíz para incluir estrictamente `src/` e impedir que Vitest corra tests anidados dentro de `template/` y carpetas de prueba locales, arreglando conflictos con Playwright.

## [0.5.0] - 2026-06-30

### Added

- `AGENT_TASKS.md` — guía de proceso para agentes de IA (Fase 1 del roadmap).
- `src/test/git.test.ts` — tests dedicados para funciones de Git (`isGitAvailable`, `getGitConfig`, `execCapture`).
- Tests exhaustivos en `cli.test.ts`: 27 tests (antes 13) cubriendo `validateProjectName` directo, edge cases de FS, combinaciones de flags.
- Tests exhaustivos en `copy-template.test.ts`: 11 tests (antes 2) cubriendo estructura completa de archivos, dotfiles, paths anidados, archivos sin placeholders.
- ADRs D002, D003, D004 en `docs/decisions.md`.

### Changed

- `cli.ts` refactorizado: funciones `validateProjectName`, `execInDir`, `execCapture`, `isGitAvailable`, `getGitConfig` ahora son exportadas para testabilidad directa.
- `validateProjectName` ahora acepta directorios existentes vacíos (antes rechazaba cualquier directorio existente).
- `validateProjectName` valida permisos de escritura en el directorio padre.
- `runGitInit` ahora detecta si Git está instalado y muestra warning amigable si no.
- `runGitInit` usa valores genéricos para el commit inicial cuando `user.name`/`user.email` no están configurados.
- Output de "Próximos pasos" ahora muestra el package manager seleccionado (antes siempre mostraba `npm`).

## [0.3.1] - 2026-06-29

### Added

- `CHANGELOG.md` base dentro de la carpeta `template/` para que los nuevos proyectos lo incluyan por defecto.
- Instrucción en `template/AGENTS.md` obligando a los agentes de IA a mantener actualizado el `CHANGELOG.md` de los proyectos generados.

## [0.3.0] - 2026-06-28

### Changed

- README completamente reescrito y pulido (M4 Lite).
- Mejor estructura, badges, tabla de diferencias con create-next-app.
- Sección de casos de uso y AI agents más visibles.
- Roadmap actualizado (M3 pausado + M4 Lite).

### Added

- `FUTURE.md` con proyectos futuros.

## [0.2.0] - 2026-06-28

### Added

- Soporte completo para AI agents (M2):
  - Comando `npm run agent`.
  - Carpeta `.openclaw/` con config y prompts (feature, refactor, bugfix, tests).
  - Carpeta `.agents/` con config genérica y prompts compartidos.
  - Carpeta `docs/` con `architecture.md`, `decisions.md` y `contributing.md`.
- Tests del scaffolder:
  - `cli.test.ts` (parseo de flags y validación de nombres).
  - `copy-template.test.ts` (reemplazo de placeholders).
  - `integration.test.ts` (generación completa + checks de calidad).
- `AGENTS.md` actualizado con instrucciones para agentes.
- Formateo completo del template con Biome.

### Changed

- `README.md` actualizado para reflejar M2 cerrado.
- Justificación de `.openclaw/` y `.agents/` actualizada como "buena práctica".

### Fixed

- Varios archivos del template ahora pasan `biome check` correctamente.

---

## [0.1.0] - 2026-06-28

### Added

- Primera versión pública del scaffolder.
- Template de Next.js 15 con:
  - TypeScript estricto.
  - Biome.
  - Vitest + Playwright.
  - Zod.
  - GitHub Actions (CI + e2e).
  - `AGENTS.md`.
- Publicación en npm.
- Repo público en GitHub.

[Unreleased]: https://github.com/gonzoblasco/create-stack-next/compare/v0.6.1...HEAD
[0.6.1]: https://github.com/gonzoblasco/create-stack-next/compare/v0.6.0...v0.6.1
[0.6.0]: https://github.com/gonzoblasco/create-stack-next/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/gonzoblasco/create-stack-next/compare/v0.3.1...v0.5.0
[0.3.1]: https://github.com/gonzoblasco/create-stack-next/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/gonzoblasco/create-stack-next/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/gonzoblasco/create-stack-next/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/gonzoblasco/create-stack-next/releases/tag/v0.1.0
