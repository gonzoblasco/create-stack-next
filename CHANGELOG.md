# Changelog

Todas las versiones notables de este proyecto se documentan en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- `CHANGELOG.md` base dentro de la carpeta `template/` para que los nuevos proyectos lo incluyan por defecto.
- Instrucción en `template/AGENTS.md` obligando a los agentes de IA a mantener actualizado el `CHANGELOG.md` de los proyectos generados.

## [0.3.0] - 2026-06-28

### Changed
- README completamente reescrito y pulido (M4 Lite)
- Mejor estructura, badges, tabla de diferencias con create-next-app
- Sección de casos de uso y AI agents más visibles
- Roadmap actualizado (M3 pausado + M4 Lite)

### Added
- `FUTURE.md` con proyectos futuros

## [0.2.0] - 2026-06-28

### Added
- Soporte completo para AI agents (M2):
  - Comando `npm run agent`
  - Carpeta `.openclaw/` con config y prompts (feature, refactor, bugfix, tests)
  - Carpeta `.agents/` con config genérica y prompts compartidos
  - Carpeta `docs/` con `architecture.md`, `decisions.md` y `contributing.md`
- Tests del scaffolder:
  - `cli.test.ts` (parseo de flags y validación de nombres)
  - `copy-template.test.ts` (reemplazo de placeholders)
  - `integration.test.ts` (generación completa + checks de calidad)
- `AGENTS.md` actualizado con instrucciones para agentes
- Formateo completo del template con Biome

### Changed
- `README.md` actualizado para reflejar M2 cerrado
- Justificación de `.openclaw/` y `.agents/` actualizada como "buena práctica"

### Fixed
- Varios archivos del template ahora pasan `biome check` correctamente

---

## [0.1.0] - 2026-06-28

### Added
- Primera versión pública del scaffolder
- Template de Next.js 15 con:
  - TypeScript estricto
  - Biome
  - Vitest + Playwright
  - Zod
  - GitHub Actions (CI + e2e)
  - `AGENTS.md`
- Publicación en npm
- Repo público en GitHub

[0.3.0]: https://github.com/gonzoblasco/create-stack-next/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/gonzoblasco/create-stack-next/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/gonzoblasco/create-stack-next/releases/tag/v0.1.0