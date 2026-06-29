# Feature: Agregar funcionalidad nueva

> Prompt template para pedirle al agente que implemente una feature de punta a punta.
> Usalo cuando tengas algo nuevo que construir y querés que el agente siga las convenciones del proyecto.

---

## Cuándo usar este prompt

- Vas a agregar un componente nuevo, una API route nueva, o una página nueva.
- Querés que el agente siga las convenciones del `AGENTS.md`.
- Querés que el agente entregue tests junto con el código.

## Prompt sugerido

Copiá y pegá esto, reemplazando los placeholders:

```
Quiero agregar la siguiente feature:

**Nombre:** {{nombre-de-la-feature}}
**Tipo:** [componente | API route | página | utilidad | hook | schema]
**Ubicación esperada:** {{ruta/donde/debe/vivir}}

**Descripción funcional:**
{{2-4 oraciones explicando qué tiene que hacer}}

**Comportamiento esperado:**
- {{caso 1}}
- {{caso 2}}
- {{caso 3}}

**Criterios de aceptación:**
- [ ] {{criterio verificable 1}}
- [ ] {{criterio verificable 2}}
- [ ] Tests unitarios cubriendo los casos arriba
- [ ] Sin warnings de lint ni typecheck
```

## Lo que el agente debería hacer

1. Leer el `AGENTS.md` para confirmar convenciones.
2. Implementar siguiendo naming y estructura del proyecto.
3. Validar inputs externos con Zod si aplica.
4. Agregar tests unitarios (`*.test.ts` o `*.test.tsx`) al lado del código.
5. Correr `npm run lint`, `npm run typecheck`, `npm run test:run` antes de reportar listo.

## Lo que el agente NO debería hacer sin preguntar

- Agregar nuevas dependencias (`package.json`).
- Modificar config de Biome, Vitest, Playwright, tsconfig.
- Tocar `.github/workflows/`.
- Hacer commit.

## Ejemplo concreto

```
Quiero agregar la siguiente feature:

**Nombre:** ContactForm
**Tipo:** componente
**Ubicación esperada:** src/components/ContactForm.tsx

**Descripción funcional:**
Formulario de contacto con campos nombre, email y mensaje. Al enviar,
valida con Zod y postea a /api/contact.

**Comportamiento esperado:**
- Validación en blur por campo
- Botón "Enviar" disabled mientras hay errores
- Toast de éxito al recibir 200, de error al recibir 4xx/5xx

**Criterios de aceptación:**
- [ ] Form renderiza con los 3 campos
- [ ] Errores se muestran en rojo debajo de cada campo
- [ ] Submit funciona end-to-end (mockear la API route)
- [ ] Tests unitarios cubren happy path + validación fallida
```