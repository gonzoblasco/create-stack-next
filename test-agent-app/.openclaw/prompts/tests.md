# Tests: Agregar o mejorar cobertura de tests

> Prompt template para pedirle al agente que agregue tests sin tocar la lógica.
> Sirve tanto para código nuevo sin tests como para código existente con cobertura floja.

---

## Cuándo usar este prompt

- Escribiste código nuevo y querés tests antes de hacer commit.
- Tenés código sin tests y querés empezar a cubrirlo.
- Un test existente es flaky o está mal escrito y querés mejorarlo.

## Prompt sugerido

```
Necesito que agregues/mejores tests.

**Objetivo:** [tests para código nuevo | mejorar cobertura de módulo existente | arreglar test flaky]

**Archivo a testear:** {{ruta/al/archivo}}

**Casos que necesito cubiertos:**
1. {{caso 1}}
2. {{caso 2}}
3. {{caso 3}}

**Tipo de tests:** [unit (Vitest) | e2e (Playwright) | ambos]

**Restricciones:**
- No modificar la lógica del archivo bajo test.
- No agregar dependencias nuevas.
- Seguir convenciones del AGENTS.md (tests al lado del código: *.test.ts).

**Cobertura actual (si la sabés):** {{% aproximado o "no sé"}}
**Cobertura objetivo:** {{% o "no me importa el número, quiero los casos cubiertos"}}
```

## Lo que el agente debería hacer

1. **Leer el código a testear** sin modificarlo.
2. **Identificar las funciones / branches / casos borde** que vale la pena cubrir.
3. **Escribir tests siguiendo las convenciones del AGENTS.md** (al lado del código, con `*.test.ts` o `*.test.tsx`).
4. **Usar `@testing-library/react`** si es un componente, `@testing-library/user-event` para interacciones.
5. **Correr los tests** y confirmar que pasan.
6. **Correr la suite completa** para confirmar que nada se rompió.

## Lo que el agente NO debería hacer sin preguntar

- Modificar el archivo bajo test (aunque sea "un cambio chiquito para hacerlo testeable").
- Agregar mocks innecesarios.
- Testear detalles de implementación (qué método interno se llama) en vez de comportamiento.
- Combinar tests con refactor o fixes.

## Convenciones del proyecto (de AGENTS.md)

- **Unit tests**: `*.test.ts` o `*.test.tsx` al lado del código que testean.
- **Setup**: `src/test/setup.ts` ya está configurado (happy-dom, globals).
- **E2E**: `tests/e2e/*.spec.ts`.
- **No usar mocks de DB** salvo que sea estrictamente necesario (preferir fixtures).

## Forma esperada del reporte

```
## Tests agregados
- src/lib/{{archivo}}.test.ts: {{N}} tests
  - {{caso 1}}: pasa
  - {{caso 2}}: pasa
  - {{caso 3}}: pasa

## Verificación
- npm run test:run: ✅ (X tests, Y nuevos)
- npm run lint: ✅
- npm run typecheck: ✅

## Casos NO cubiertos (y por qué)
- {{caso}}: requiere {{infra/mock/...}}, preferiría no agregarlo ahora
```

## Ejemplo concreto

```
Necesito que agregues/mejores tests.

**Objetivo:** tests para código nuevo
**Archivo a testear:** src/lib/formatCurrency.ts

**Casos que necesito cubiertos:**
1. Formatear número positivo con 2 decimales: 1234.5 → "$1,234.50"
2. Formatear cero: 0 → "$0.00"
3. Formatear número negativo: -50 → "-$50.00"
4. Manejar null/undefined sin tirar

**Tipo de tests:** unit (Vitest)
**Restricciones:** no agregar dependencias nuevas, no tocar formatCurrency.ts.
```