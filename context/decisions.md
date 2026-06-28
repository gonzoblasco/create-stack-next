# Decisiones — create-stack-next

Log de todas las decisiones tomadas, con fecha y justificación. Si en 6 meses alguien pregunta *"¿por qué X?"*, la respuesta está acá.

---

## D001 — Tipo de producto: scaffolder (opción A3)
**Fecha:** 2026-06-27
**Estado:** ✅ Confirmada

**Contexto:** Gonzo quería "una herramienta para el repositorio". Asistente ofreció 3 categorías (repo-as-product / repo-as-code / repo-as-graph) y 3 candidatos concretos (PR reviewer / doc linter / scaffolder).

**Decisión:** scaffolder opinado (A3).

**Justificación:**
- Ratio de uso: un scaffolder se usa cada vez que arrancás un proyecto (20+ veces/año por dev activo).
- PR reviewer compite con Copilot, que ya cubre el 70%.
- Doc linter es dolor real pero nicho chico, difícil de hacer crecer.

---

## D002 — Scope del MVP: app web full-stack
**Fecha:** 2026-06-27
**Estado:** ✅ Confirmada

**Decisión:** el scaffolder genera apps web full-stack. No API services, no librerías, no CLIs en MVP.

**Justificación:**
- Es el caso de uso más común para devs que arrancan proyectos.
- Más simple mantener un solo template bien hecho que cuatro mediocres.
- Expansión a otros scopes es roadmap (M3), no MVP.

---

## D003 — Distribución: npm package
**Fecha:** 2026-06-27
**Estado:** ✅ Confirmada

**Decisión:** publicar como `npx create-stack-next` en npm.

**Justificación:**
- `npx X` tiene la fricción más baja posible.
- Es lo que todos esperan de un scaffolder.
- Alternativas (GitHub template, CLI local) pierden discoverability.

---

## D004 — Nombre: `create-stack-next`
**Fecha:** 2026-06-28 (verificado)
**Estado:** ✅ Confirmada

**Verificación npm (2026-06-28):**
- ✅ `create-stack-next` → **no existe** (404), disponible para publicar.
- ⚠️ `create-stack` (sin sufijo) → existe en versión 0.0.4, parece squatting (sin uso real).

**Decisión:** mantener `create-stack-next` como nombre del paquete npm.

**Justificación:**
- Sigue la convención `create-*` de la familia (create-react-app, create-next-app, create-vite, etc.).
- El sufijo `-next` define el scope (Next.js), evitando ambigüedad.
- Verificado disponible en npm.
- El squat de `create-stack` no nos afecta: si en el futuro queremos usar `create-stack` como marca umbrella para varios scaffolders (`create-stack-next`, `create-stack-remix`, etc.), será una conversación aparte.

**Riesgo:** bajo. Si el día de mañana alguien registra `create-stack-next` antes que nosotros, hay que acelerar la publicación. Resolver cuanto antes.

---

## D005 — Estructura del workspace: por proyecto
**Fecha:** 2026-06-27
**Estado:** ✅ Confirmada

**Decisión:**
```
workspace/
  projects/
    <nombre-del-proyecto>/
      README.md
      context/
        decisions.md
        conversations/
```

**Justificación:**
- Un proyecto = una carpeta. Aislar contexto facilita retomarlo después.
- `context/` separa documentación viva (decisiones, bitácoras) del código que vendrá.

---

## D006 — Framework del template
**Fecha:** 2026-06-27 (en discusión)
**Estado:** ⏳ Pendiente — bloqueante para todo lo demás

**Contexto:** Gonzo arrancó diciendo "intenté estudiar Remix, siempre me pareció superior a Next, pero el mercado va a la gente al otro lado". Hay tensión entre juicio técnico (Remix) y juicio de mercado (Next).

**Opciones sobre la mesa:**
| Opción | Pros | Contras |
|---|---|---|
| Next.js | Market share, devs lo conocen, ofertas laborales, ecosistema | Menos "puro" técnicamente |
| Remix (React Router v7) | Modelo mental más limpio, web standards, formularios sin libs | Menos share, comunidad chica |
| Astro | DX moderna, ideal para content-heavy | Menos apto para app full-stack pura |
| SvelteKit | Rápido, simple, syntax linda | Ecosistema más chico, menos JS devs |

**Insight clave:** para un scaffolder, el framework NO es donde jugás la carta de "mi opinión técnica". Es donde jugás la carta de "maximizo adopción". Pero el scaffolder no tiene que casarse con un framework único — puede ofrecer varios templates bajo el mismo nombre (modelo B en la conversación).

**Decisión:** Next.js. Sin discusión.

**Justificación:** Gonzo cerró la discusión al notar que el sufijo `-next` en el nombre `create-stack-next` ya es una declaración de scope: este scaffolder scaffolea Next. Si en el futuro quiere Remix/Astro/SvelteKit, serán paquetes separados (`create-stack-remix`, etc.) siguiendo el patrón de Yarn/Vite/los `create-*` del ecosistema.

**Consecuencias:**
- D006 cerrada.
- D011 cambia: el scaffolder es opinionated al 100%, no hace preguntas sobre framework.
- Modelo B (plantillas múltiples) descartado.
- Próximo scaffolder gemelo: `create-stack-remix` (cuando exista demanda).

---

## Decisiones cerradas

| ID | Tema | Estado | Notas |
|---|---|---|---|
| D001 | Tipo de producto (scaffolder A3) | ✅ | 2026-06-27 |
| D002 | Scope del MVP (app web full-stack) | ✅ | 2026-06-27 |
| D003 | Distribución (npm package) | ✅ | 2026-06-27 |
| D004 | Nombre (`create-stack-next`) | ✅ | 2026-06-28 — verificado libre en npm |
| D005 | Estructura workspace (`projects/<nombre>/`) | ✅ | 2026-06-27 |
| D006 | Framework (Next.js, definido por sufijo `-next`) | ✅ | 2026-06-27 |
| D007 | Linter (Biome) | ✅ | 2026-06-27 |
| D008 | Testing (Vitest + Playwright) | ✅ | 2026-06-27 |
| D009 | AI agent config (AGENTS.md + .openclaw/ bonus) | ✅ | 2026-06-28 |
| D010 | Validación runtime (Zod) | ✅ | 2026-06-28 |
| D011 | Estilo del scaffolder (opinionated 100%) | ✅ | 2026-06-28 (implícita desde D006) |
| D012 | Modo de trabajo (pair programming + docs vivas) | ✅ | 2026-06-28 |
| D013 | Agentes como archivos de roles, no código | ✅ | 2026-06-28 |
| D014 | Repo público (GitHub) | ✅ | 2026-06-28 |
| D015 | Lockfile del scaffolder (commitear) | ✅ | 2026-06-28 |
| D016 | Ignorar artefactos de prueba local | ✅ | 2026-06-28 |
| D017 | npm publish (`create-stack-next@0.1.0`) | ✅ | 2026-06-28 |

**Total: 17 decisiones cerradas, 0 pendientes.**

---

## D007 — Linter: Biome
**Fecha:** 2026-06-27
**Estado:** ✅ Confirmada

**Decisión:** Biome (en lugar de ESLint + Prettier por separado).

**Justificación:**
- Un solo binario reemplaza ESLint + Prettier.
- Sin 12 paquetes de plugins (`eslint-plugin-react`, `eslint-config-prettier`, etc.).
- DX: instalás, corrés `biome init`, listo.
- Formato + lint integrados en un solo comando.

**Riesgo:** bajo. Reversible en 5 minutos si alguna regla queda corta (`biome-ignore`).

---

## D008 — Testing: Vitest + Playwright
**Fecha:** 2026-06-27
**Estado:** ✅ Confirmada

**Decisión:** Vitest (unit) + Playwright (e2e).

**Justificación:**
- Vitest: API similar a Jest, mucho más rápido, soporte nativo de TS y ESM.
- Playwright: estándar de facto para e2e, ya nadie discute Cypress vs Playwright.
- Separación clara: unit para lógica, e2e para flujos críticos del usuario.

**Riesgo:** bajo. Ambos mainstream, ambos con docs excelentes, ambos funcionan con Next sin fricción.

---

## D011 — Estilo del scaffolder: opinionated 100%
**Fecha:** 2026-06-27
**Estado:** ✅ Confirmada (implícita desde D006)

**Decisión:** el scaffolder no hace preguntas sobre el stack. Solo pide el nombre del proyecto y empieza.

**Justificación:** D006 ya cerró el framework (Next.js, definido por el nombre del paquete). No tiene sentido preguntar cosas que ya están decididas. El scaffolder es opinionated: tomá lo que hay o no lo uses.

**UX resultante:**
```bash
$ npx create-stack-next my-app
✔ Creando proyecto en ./my-app...
✔ Instalando dependencias...
✔ Inicializando git...
✔ Listo. Próximos pasos:
    cd my-app
    npm run dev
```

---

## Decisiones que dejé para revisión de Gonzo (no las tomé yo)

### D009 — AI agent config (pausada)
**Por qué la pausé:** es la decisión más "política". Define qué agente va preinstalado en cada repo generado. Cambia la identidad del proyecto.

**Opciones:**
- **A.** OpenClaw config (porque Gonzo lo usa)
- **B.** Claude / Cursor config (mercado más amplio)
- **C.** AGENTS.md estándar (agnóstico, sirve para todos)
- **D.** Combinación: AGENTS.md + config específica OpenClaw como bonus

**Mi voto:** D. Empezar agnóstico (AGENTS.md) y agregar config OpenClaw como bonus opcional. Así el repo no obliga a un agente específico.

### D010 — Validación runtime (pausada)
**Por qué la pausé:** es la decisión más chica de las tres, pero quiero que Gonzo vea mi recomendación antes de cerrar todo.

**Opciones:**
- **Zod** — el más maduro, ecosistema más grande, todos los tutoriales lo usan.
- **Valibot** — más liviano (~1KB), más nuevo.
- **TypeBox** — para gente que quiere máximo rendimiento y tipos-first.

**Mi voto:** Zod. Madurez + ecosistema + cantidad de ejemplos en internet. Valibot es promisorio pero todavía no tiene la masa crítica.

---

## D009 — AI agent config: AGENTS.md + .openclaw/ bonus
**Fecha:** 2026-06-28
**Estado:** ✅ Confirmada

**Contexto:** en 2026 hay varios agentes que leen configs de proyectos (OpenClaw, Claude Code, Cursor, Windsurf, Continue, etc.). `AGENTS.md` se está consolidando como estándar de facto agnóstico. OpenClaw y Cursor ya lo leen; Claude Code lo respeta como fallback.

**Decisión:** el template incluye dos archivos:
- `AGENTS.md` — config agnóstica, leída por todos los agentes modernos. Contiene descripción del proyecto, comandos clave, convenciones de código.
- `.openclaw/` — config específica de OpenClaw como bonus. Se incluye siempre pero está claramente separada y es trivial de ignorar si no usás OpenClaw.

**Justificación:**
- `AGENTS.md` evita vendor lock-in: el repo no queda casado a un solo agente.
- `.openclaw/` como bonus (no como obligación) reconoce que Gonzo es usuario de OpenClaw y le da integración extra sin castigar a quien usa Cursor.
- Costo de ignorar un directorio extra: cero.

**Trade-off aceptado:** dos configs que mantener. Es trabajo chico y vale la pena por la flexibilidad.

---

## D010 — Validación runtime: Zod
**Fecha:** 2026-06-28
**Estado:** ✅ Confirmada

**Contexto:** necesitamos validar inputs en runtime (env vars, request bodies, formularios). Candidatas: Zod (50KB, masivo), Valibot (~1KB tree-shakeable, nuevo), TypeBox (JSON Schema-first, nicho).

**Decisión:** Zod.

**Justificación:**
- **DX y ejemplos:** cualquiera que googlee "validate form Next.js" encuentra Zod.
- **Ecosistema:** `zod-to-openapi`, `drizzle-zod`, integración con `tRPC`, `react-hook-form`, etc.
- **Mantenimiento:** releases frecuentes, comunidad grande, documentación excelente.
- **Performance:** no es el cuello de botella en MVP. Una validación de env vars es invisible al usuario.

**Trade-off aceptado:** ~50KB de bundle. Es marginal comparado con el peso del propio Next.js. No optimizamos donde no duele.

**Por qué no Valibot:** promisorio pero todavía sin la masa crítica. Cuando la tenga, migrar es relativamente fácil porque las APIs son similares.

**Por qué no TypeBox:** JSON Schema-first es una abstracción extra que no necesitamos. Más complejo de usar, menos ejemplos disponibles.

---

## D012 — Modo de trabajo: pair programming + documentación viva
**Fecha:** 2026-06-28
**Estado:** ✅ Confirmada

**Contexto:** durante M0 y M1 desarrollamos un patrón de trabajo que no es estándar. Gonzo lo pidió explícito al inicio ("documentá todo") y al final ("registra todo... el modo que abordamos este proyecto").

**Decisión:** el modo de trabajo es:
1. **Pair programming** entre Gonzo y el asistente (Tech Lead) en M0-M1
2. **Documentación viva** durante todo el proceso (README, mvp-spec, decisions, conversations, agents)
3. **Decisiones con ID** (D001...) cerradas con fecha y justificación
4. **Sub-agentes** (PO, Frontend, Backend, QA, Designer, Content, Beta Tester) documentados como roles para M2+
5. **Nada queda en limbo**: se cierra o se pausa explícitamente

**Justificación:**
- M0-M1 son chicos y secuenciales: pair programming evita delegación ciega.
- Documentación viva permite retomar en cualquier sesión sin pedir contexto.
- Decisiones con justificación permiten revisar 6 meses después sin "¿por qué hicimos esto?".
- Sub-agentes como archivos (no como código que se ejecuta) son durables y reutilizables.

**Formalizado en:** `WORKFLOW.md` (en workspace raíz) — patrón para futuros proyectos.

---

## D013 — Agentes: archivos de roles, no código que se ejecuta
**Fecha:** 2026-06-28
**Estado:** ✅ Confirmada

**Contexto:** Gonzo preguntó "qué construimos y qué no" respecto a los agentes. Aclaramos que no construimos código que se ejecute como agente — solo archivos de roles para futura referencia.

**Decisión:** los "agentes" del proyecto son **archivos Markdown** (`context/agents/AGENT-<rol>.md`), no procesos que se ejecutan. Documentan:
- Rol y responsabilidades
- Herramientas que usarían
- Brief del proyecto actual
- Tareas pendientes para M2+
- Lo que NO hacen

**Justificación:**
- Un archivo es durable: sobrevive resets de sesión, lo lee cualquier LLM en cualquier momento.
- Un proceso (sesión de `sessions_spawn`) es efímero: vive lo que dura la sesión.
- Para M2+ se pueden spawnear agentes reales usando estos archivos como brief.

**Cuándo spawnear agentes reales:**
- Trabajo grande (>2h de un humano)
- Paralelizable (no secuencial)
- Decisiones de diseño ya cerradas

**Roles documentados (8):**
- Tech Lead (orquestador, soy yo)
- Product Owner
- Frontend Dev
- Backend Dev
- QA Engineer
- Designer / UX
- Content / Copy
- Beta Tester / User Proxy

---

## D014 — Repo público: `gonzoblasco/create-stack-next`
**Fecha:** 2026-06-28
**Estado:** ✅ Confirmada

**Contexto:** Gonzo creó el repo en GitHub y nos pasó la URL.

**Decisión:** repo público en `git@github.com:gonzoblasco/create-stack-next.git`. Estructura:
- `main` branch por default
- Repo solo del proyecto (`projects/create-stack-next/`), NO de todo el workspace
- Cada commit documentado en el mensaje

**Justificación:**
- Repo público = descubrible, otros pueden contribuir.
- Separar del workspace evita pushear archivos privados (MEMORY.md, USER.md, etc.).
- Mensajes de commit descriptivos = changelog implícito.

**Primer commit (2026-06-28 02:30 GMT-3):** `feat: initial release of create-stack-next` con 45 archivos.

---

## D015 — Lockfile del scaffolder: commitearlo
**Fecha:** 2026-06-28
**Estado:** ✅ Confirmada

**Decisión:** `package-lock.json` del scaffolder se commitea.

**Justificación:**
- Reproducibilidad: quien clona el repo obtiene las mismas versiones exactas.
- CI/CD estable: tests corren contra las mismas deps que开发和.
- npm estándar: la convención de npm es commitear el lockfile.

**Por qué NO ignorar:** si lo ignoramos, cada `npm install` podría traer versiones distintas y romper el scaffolder.

---

## D016 — Ignorar artefactos de prueba local del scaffolder
**Fecha:** 2026-06-28
**Estado:** ✅ Confirmada

**Decisión:** en `.gitignore` se ignoran `my-test-app/`, `my-app/`, `test-app/` — directorios que se generan al probar el scaffolder localmente.

**Justificación:**
- Son artefactos de prueba, no parte del proyecto.
- Si los commiteáramos, llenarían el repo de basura cada vez que Gonzo pruebe.
- El scaffolder puede generar proyectos con cualquier nombre, así que la convención es ignorar los nombres comunes.

**Por qué no todo `*/`:** porque el template del scaffolder es un directorio válido que SÍ se commitea. Solo ignoramos los nombres específicos que usamos para probar localmente.

---

## D017 — npm publish: `create-stack-next@0.1.0`
**Fecha:** 2026-06-28
**Estado:** ✅ Confirmada

**Contexto:** M1 cerrado y validado localmente. Repo público ya creado en GitHub. Faltaba el paso final: publicar el scaffolder a npm para que cualquiera pueda usarlo con `npx create-stack-next mi-app`.

**Decisión:** publicar versión `0.1.0` como paquete público en npm registry.

**Justificación:**
- El producto ya está usable localmente, no tiene sentido demorarlo.
- 2FA activado en la cuenta: añade seguridad sin fricción real (solo un paso extra).
- Dry-run ejecutado antes de publicar para validar que el tarball incluye los 38 archivos correctos.

**Datos del publish:**
- Versión: `0.1.0`
- Tamaño: 17.8 kB (tarball), 48.3 kB (unpacked)
- Acceso: `public`
- URL: https://www.npmjs.com/package/create-stack-next

**Trade-off aceptado:** publicar con 0.1.0 sin esperar tests del scaffolder mismo. Justificación: el template está validado de punta a punta, los tests del scaffolder son para M2+. Empezar con `0.1.0` en vez de `1.0.0` deja claro que es el primer hito público, no un producto "terminado".

---

## D018 — Alcance de M2 (AI-native)
**Fecha:** 2026-06-28
**Estado:** ✅ Confirmada

**Contexto:** durante la conversación sobre "tener todo hasta M2 cerrado" quedó claro que M2 estaba vagamente definido en `mvp-spec.md` (§11) como "comando `npm run agent`, templates de prompts por tipo de tarea, integración profunda con OpenClaw". Faltaba definir el criterio de cierre.

**Decisión:** M2 está cerrado cuando se cumplen las tres condiciones siguientes:

1. **`npm run agent` funciona** en un proyecto generado: ejecuta `openclaw` (o equivalente) apuntando al directorio del proyecto, con el `AGENTS.md` ya existente como contexto base.
2. **Templates de prompts por tipo de tarea** incluidos en `.openclaw/prompts/` (o ubicación equivalente): mínimo "Agregar feature", "Refactor", "Bug fix", "Tests". Cada uno es un Markdown con instrucciones estructuradas.
3. **Integración con OpenClaw** materializada: el proyecto generado incluye `.openclaw/` con configuración mínima (no hace falta que sea profunda en M2, alcanza con que el agente pueda habitar el proyecto desde el primer momento).

**Lo que NO entra en M2:**
- Sub-agentes de OpenClaw que ejecuten tareas automáticamente (eso es M3+).
- Integración con otros vendors de agentes (Claude Code, Cursor) más allá del `AGENTS.md` agnóstico.
- Tests del scaffolder mismo (paralelo a M2, no bloqueante).
- Templates de prompts personalizados por tipo de proyecto (mantener genéricos en M2).

**Justificación:**
- Las tres condiciones son el mínimo para que el scaffolder cumpla la promesa de "AI-native".
- M2 no es una reescritura: reutiliza todo lo de M1 (template, AGENTS.md, Biome, Vitest, etc.).
- El `AGENTS.md` ya está en M1 como agnóstico; M2 lo complementa con `.openclaw/` específico.

**Criterio de éxito verificable:** clonar un proyecto generado en una máquina con OpenClaw instalado y correr `npm run agent` debe abrir una sesión con el agente ya contextualizado por el `AGENTS.md` del proyecto.
