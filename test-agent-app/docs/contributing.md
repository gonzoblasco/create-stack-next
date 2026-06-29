# Contribuir

> Guía para humanos y agentes que trabajan en este proyecto.

## Antes de empezar

1. Leé `AGENTS.md` (instrucciones para agentes).
2. Leé `docs/architecture.md` (contexto del sistema).
3. Leé `docs/decisions.md` (decisiones ya tomadas).

## Cómo pedirle cosas a un agente

Usá los prompts de `.openclaw/prompts/` o `.agents/prompts/` según el agente que uses.

Ejemplos:
- Agregar feature → `prompts/feature.md`
- Refactor → `prompts/refactor.md`
- Bug fix → `prompts/bugfix.md`
- Tests → `prompts/tests.md`

## Comandos útiles

```bash
npm run dev          # servidor de desarrollo
npm run lint:fix     # corregir lint + formato
npm run typecheck    # verificación de tipos
npm run test:run     # tests unitarios
npm run test:e2e     # tests e2e
npm run agent        # abrir sesión con OpenClaw
```

## Reglas

- No modificar config de Biome, Vitest, Playwright o TypeScript sin discusión previa.
- Todo cambio que afecte a tests debe mantener la suite verde.
- Usar Zod para validar cualquier input externo.