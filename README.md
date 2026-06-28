# create-stack-next

> Scaffolder opinado para proyectos de app web full-stack. Un solo comando y tenés un proyecto moderno, testeado, lintado y listo para que un AI agent lo habite.

---

## Estado actual

**Fase:** ✅ M1 cerrado y probado

**Repo:** https://github.com/gonzoblasco/create-stack-next

**Última actualización:** 2026-06-28

**M1 completado:**
- [x] Scaffolder funcional (`src/`, `dist/`)
- [x] Template completo y validado
- [x] Generación de proyectos lista (`node ./dist/index.js my-app`)
- [x] Todos los checks pasan en el proyecto generado (lint, typecheck, test, build)
- [x] Repo público creado en GitHub
- [x] Publicado en npm como `create-stack-next@0.1.0`

**Pendiente:**
- [ ] M2 — AI-native: `npm run agent` + templates de prompts + `.openclaw/` específico (ver D018)
- [ ] Tests del scaffolder mismo

---

## Tesis del producto

`npx create-<algo>` existe desde siempre. Todos hacen lo mismo: te dan un template vacío y se olvidan de vos.

Nuestro diferenciador: scaffolder que **asume cómo trabaja un dev moderno en 2026** y lo deja preconfigurado en un solo comando:

- Testing (Vitest + Playwright)
- Lint + format (Biome, no ESLint+Prettier por separado)
- Type safety (TS strict + Zod en bordes)
- **AI agents integrados** — el repo incluye configuración para que un agente (OpenClaw, Claude, etc.) lo habite
- CI básico (GitHub Actions)
- Git hooks (Husky + lint-staged)
- Estructura de directorios opinada
- README con sección "cómo trabaja este repo"

**Valor:** alguien lo prueba y dice *"ah, ok, esto es lo que necesitaba, ya no tengo que decidir 40 cosas cada vez"*.

---

## Por qué este proyecto y no otros

Evaluamos 3 opciones de scaffolder/CLI para devs (ver conversación del 2026-06-27):

| Opción | Idea | Veredicto |
|---|---|---|
| A1 | PR reviewer local con tests/lint inline | ❌ Copilot ya cubre el 70%. Diferenciarse cuesta mucho. |
| A2 | Doc linter que entiende código | ❌ Dolor real pero nicho chico. |
| **A3** | **Scaffolder opinado con defaults 2026** | **✅ Un usuario lo prueba una vez por proyecto y vuelve a usarlo 20+ veces al año.** |

Razón principal: **ratio de uso**. Un scaffolder bien hecho se usa cada vez que arrancás un proyecto nuevo. Un PR reviewer compite con Copilot. Un doc linter compite con "lo arreglo a mano".

---

## Público objetivo (hipótesis inicial)

**Primario:** devs que arrancan proyectos nuevos con frecuencia y están cansados de tomar las mismas 40 decisiones cada vez.

**Hipótesis a validar:** ¿prefieren un scaffolder muy opinado (un solo camino) o uno configurable (preguntas al inicio)? Mi corazonada: **opinados por default, con flags para customizar**.

---

## Stack propuesto (pendiente decidir)

- **Runtime:** Node.js >= 20
- **Lenguaje del scaffolder:** TypeScript
- **Plantilla generada:** TS estricto + React 19 + (Next.js | Astro | Remix — decidir)
- **Testing:** Vitest (unit) + Playwright (e2e)
- **Lint/format:** Biome
- **Validación:** Zod
- **CI:** GitHub Actions
- **Hooks:** Husky + lint-staged
- **AI agents:** archivo `.openclaw/agents.md` o equivalente preconfigurado

---

## Roadmap tentativo

### M0 — Definición ✅ CERRADO (2026-06-28)
- [x] Tesis validada
- [x] Stack elegido
- [x] Nombre confirmado (`create-stack-next`, verificado libre en npm)
- [x] MVP spec escrito (`mvp-spec.md`)

### M1 — MVP ✅ CERRADO (2026-06-28)
- [x] Repo `create-stack-next` inicializado
- [x] Scaffolder funcional (`src/cli.ts`)
- [x] Template base (`template/`)
- [x] Probado localmente
- [x] Publicado a npm (`create-stack-next@0.1.0`)
- [x] Repo público en GitHub

### M2 — AI-native ⏳
- [ ] Comando `npm run agent`
- [ ] Templates de prompts por tipo de tarea
- [ ] Integración profunda con OpenClaw
- [ ] Ver criterio de cierre en D018

### M3 — Familia de scaffolders
- [ ] `create-stack-remix`
- [ ] `create-stack-astro`
- [ ] `create-stack-sveltekit`

### M4 — Adopción
- [ ] Docs site
- [ ] Video demo
- [ ] Blog post
- [ ] Presencia en awesome lists

### M5 — Templates adicionales
- [ ] `--template api`
- [ ] `--template cli`
- [ ] (Revierte D006/D011 parcialmente si la demanda lo justifica)

---

## Cómo se está construyendo

**Orquestador:** Gonzo (asistente OpenClaw del usuario)

**Equipo de sub-agentes planteado (a spawnear cuando haya MVP spec):**
- Tech Lead / Orquestador ← Gonzo
- Product Owner
- Frontend Dev
- Backend Dev
- Diseñador (cuando haya wireframes)
- Content / Copy (cuando haya UI)
- QA Engineer
- Beta Tester / User Proxy

**Decisión de proceso:** arrancar con 4 agentes críticos (Frontend, Backend, QA, PO) y sumar el resto cuando haya algo testeable.

---

## Próximos pasos

- Implementar M2 (D018): `npm run agent` + templates de prompts + `.openclaw/` específico
- Tests del scaffolder mismo
- M3 — Familia de scaffolders

---

## Referencias

- Conversación de origen: 2026-06-27 22:36–23:20 GMT-3
- `context/decisions.md` — log de todas las decisiones tomadas con justificación
- `context/conversations/` — bitácora de las conversaciones que definieron el proyecto

---

## Estado del MVP (2026-06-28)

**M1 cerrado y probado de punta a punta.** ✅

### Lo que funciona

- `node ./dist/index.js my-test-app` genera un proyecto completo
- El proyecto generado pasa lint, typecheck, tests, build y dev
- `/api/health` responde correctamente
- Placeholders personalizados funcionan

### Pendiente

- [ ] M2 — AI-native: `npm run agent` + templates de prompts + `.openclaw/` específico (ver D018)
- [ ] Tests del scaffolder mismo
- [ ] M3 — Familia de scaffolders
