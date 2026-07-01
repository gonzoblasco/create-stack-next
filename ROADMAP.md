# Roadmap: Camino a la v1.0.0 🚀

Este documento detalla el plan de acción estratégico para llevar `create-stack-next` desde su estado actual hacia su primera versión estable (v1.0.0) lista para la adopción masiva.

---

## 📍 Estado Actual (v0.6.1)
- ✅ **Fase 1 (Robustez Absoluta):** CLI testeado, validación de nombres, edge cases de FS y flujo Git robustos.
- ✅ **Fase 2 (Flexibilidad Interna y DX):** Workspaces, pulido visual con `@clack/prompts`, y template `--template api` finalizados.
- ⏳ **Fase 3 (Adopción y Documentación):** En progreso.

### Novedades destacadas de v0.6.1
- 🤖 **AI-Native desde el minuto cero:** todos los proyectos generados incluyen `AGENTS.md`, `ROADMAP.md`, `AGENT_TASKS.md`, `HANDOFF.md` y ADRs semilla en `docs/decisions.md`.
- ⚡ **Template API (`--template api`):** backend puro con Next.js App Router, Drizzle ORM + SQLite, Zod, utilidades `ApiError` / `successResponse`, middleware Bearer/API Key, y tests en memoria con `node-mocks-http` + Vitest.
- 🎨 **DX renovada:** `@clack/prompts` con spinners en tiempo real, colores semánticos, cancelaciones limpias (Ctrl+C) y bloque estilizado de "Próximos pasos".
- 🛠️ **CI/CD nativo:** flujo de GitHub Actions para linting, tipos y tests de Playwright en el repo central.
- ✅ **55 tests automáticos** corriendo con `npm run test:run`.

---

## 🎯 Definición de "Estabilidad v1.0.0"
La versión 1.0.0 significa que el CLI es **robusto, a prueba de balas en cualquier entorno local**, la API de comandos está congelada (sin breaking changes previstos), y el ecosistema documental permite la adopción orgánica sin intervención nuestra.

Para alcanzar esto, dividiremos el trabajo en las siguientes tres fases:

### 🛠️ Fase 1: Robustez Absoluta y Cobertura (v0.5.x)
*El objetivo es que el CLI nunca falle de manera inesperada ("crash") bajo ninguna condición local.*

- [x] **Testing Exhaustivo del Scaffolder:** Cobertura crítica en `cli.test.ts`, `copy-template.test.ts` e `integration.test.ts`.
- [x] **Edge Cases de File System:** Manejo amigable y validación temprana si el directorio destino ya existe, no está vacío, o carece de permisos.
- [x] **Robustez en Inicialización Git:** Fallbacks limpios cuando el usuario no tiene configurado su entorno global de Git (`user.name` / `user.email`).
- [ ] **Garantía Multi-Package Manager:** Soporte oficial de `npm`, `pnpm`, `yarn` y `bun` en generación de proyectos. *(Parsing de flags OK; tests de integración multi-PM pendientes)*

### ✨ Fase 2: Flexibilidad Interna y DX (v0.6.x)
*Refinar la Experiencia del Desarrollador (DX) y soportar estructuras más complejas.*

- [x] **Soporte Oficial para Workspaces:** Detección automática si el CLI se ejecuta dentro de un monorepo (Turborepo, pnpm workspaces, etc.), desactivando `git init` para evitar anidamiento accidental.
- [x] **Pulido Visual del CLI:** `@clack/prompts` con spinners, colores semánticos, cancelaciones limpias y bloque de "Próximos pasos".
- [x] **Template API (`--template api`):** Proyecto Next.js exclusivamente backend sin React, con arquitectura lista para producción.

### 📚 Fase 3: Adopción y Documentación (v0.7.x - v0.9.x)
*Preparar el proyecto para el mundo exterior y escalar su uso.*

- [ ] **Sitio Web de Documentación:** Migrar de un simple README a una web de docs interactiva (VitePress o Nextra).
- [ ] **Material de Onboarding:** Video demo de 2-4 min mostrando la integración entre el scaffolder y AI agents.
- [ ] **Polish de Release Candidate:** Beta testing comunitario y congelamiento de la API de comandos.

---

## 🏁 Lanzamiento v1.0.0
- Publicación oficial de la versión estable en npm.
- Release Notes detalladas.
- Distribución comunitaria (sumisión a "Awesome Next.js", "Awesome AI", posts en redes).

---

## 🔮 Futuro (Post v1.0.0)
*(Ver `FUTURE.md` para más detalles)*
Una vez alcanzada la estabilidad v1.0.0, se desbloquearán iniciativas mayores como la familia de scaffolders (`create-stack-remix`, `create-stack-astro`) y la delegación de tareas automatizadas a sub-agentes de OpenClaw.
