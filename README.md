# create-stack-next

> Scaffolder opinado para proyectos de app web full-stack. Un solo comando y tenés un proyecto moderno, testeado, lintado y listo para que un AI agent lo habite.

---

## Estado actual

**Versión actual:** `0.2.0` (M2 + tests del scaffolder)

**Repo:** https://github.com/gonzoblasco/create-stack-next
**npm:** https://www.npmjs.com/package/create-stack-next
**Changelog:** [CHANGELOG.md](CHANGELOG.md)

**Última actualización:** 2026-06-28

**M1 + M2 completados:**
- [x] Scaffolder funcional + template completo
- [x] Repo público + npm publish (`0.1.0`)
- [x] `npm run agent` + `.openclaw/` + `.agents/` + `docs/`
- [x] 18 decisiones cerradas (D001–D018)

**Próximo:** M4 Lite (README + video + release note)

---

## Tesis del producto

`npx create-<algo>` existe desde siempre. Todos hacen lo mismo: te dan un template vacío y se olvidan de vos.

Nuestro diferenciador: scaffolder que **asume cómo trabaja un dev moderno en 2026** y lo deja preconfigurado en un solo comando:

- Testing (Vitest + Playwright)
- Lint + format (Biome, no ESLint+Prettier por separado)
- Type safety (TS strict + Zod en bordes)
- **AI agents integrados** — `AGENTS.md` (agnóstico) + `.openclaw/` (buena práctica para usuarios de OpenClaw)
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

### M2 — AI-native ✅ CERRADO (2026-06-28)
- [x] `npm run agent`
- [x] Templates de prompts (feature, refactor, bugfix, tests)
- [x] `.openclaw/` + `.agents/` + `docs/`
- [x] Ver D018 en `context/decisions.md`

### M3 — Familia de scaffolders (pausado)
- Ver `FUTURE.md` para el registro de ideas futuras.

### M4 — Adopción (Lite)
- [ ] README pulido
- [ ] Video demo (2-4 min)
- [ ] Release note / Blog post
- [ ] Presencia básica en listas relevantes

> M3 queda pausado hasta que `create-stack-next` esté más maduro. M4 se hace en versión lite (sin docs site completo).

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

- Tests más profundos del scaffolder
- M3 — Familia de scaffolders (`create-stack-remix`, etc.)

---

## Referencias

- Conversación de origen: 2026-06-27 22:36–23:20 GMT-3
- `context/decisions.md` — log de todas las decisiones tomadas con justificación
- `context/conversations/` — bitácora de las conversaciones que definieron el proyecto

---

## Estado actual (2026-06-28)

**M2 cerrado + tests del scaffolder.** ✅

### Lo que está hecho

- M0, M1 y M2 completos
- `npm run agent`, `.openclaw/`, `.agents/`, `docs/`
- 16 tests del scaffolder pasando
- Publicado en npm (`0.2.0`)

### Pendiente

- [ ] Tests más profundos del scaffolder
- [ ] M3 — Familia de scaffolders
