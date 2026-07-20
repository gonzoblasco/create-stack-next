# Roadmap

## Estado actual (v0.8.1 — Reidentificación completa)

- ✅ CLI con stack posicional (`npx @gonzoblasco/create-stack next my-app`)
- ✅ Arquitectura modular de stacks (`src/stacks/<id>/`)
- ✅ Stacks: `next` (Next.js full) y `api` (Next.js API-only)
- ✅ Compatibilidad hacia atrás con `create-stack-next` y `--template`
- ✅ Template Next.js 15 + React 19 + TS estricto + Biome + Vitest + Playwright + Zod
- ✅ Template API con Drizzle ORM + SQLite + middleware + tests
- ✅ AI-Native: AGENTS.md, .openclaw/, .agents/, prompts y workflow inyectados
- ✅ Soporte de workspaces (Turborepo, pnpm workspaces) con detección automática
- ✅ CI/CD con GitHub Actions (lint, typecheck, tests, build en 4 package managers)
- ✅ Spec-Driven Development integrado con OpenSpec
- ✅ 67 tests automáticos
- ✅ Publicado en npm como `@gonzoblasco/create-stack`
- ✅ Repo renombrado a `create-stack`
- ✅ Release v0.8.1 en GitHub

## Próximos pasos

- [ ] Sitio de documentación (VitePress o Nextra)
- [ ] Video demo de onboarding (2-4 min)
- [ ] Tests de integración multi-package manager en CI
- [ ] Congelamiento de API para v1.0.0

## Ideas futuras

Ver [`FUTURE.md`](FUTURE.md).
