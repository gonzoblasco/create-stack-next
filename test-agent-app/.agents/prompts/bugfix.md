# Bug fix: Diagnosticar y arreglar un bug

> Prompt template para pedirle al agente que diagnostique un bug, lo arregle, y agregue un test que lo cubra para que no vuelva.
> El orden importa: **reproducir primero, arreglar después**.

---

## Cuándo usar este prompt

- Algo está roto o se comporta mal.
- Querés que el agente diagnostique antes de tocar código.
- Querés un test de regresión junto con el fix.

## Prompt sugerido

```
Tengo un bug que necesito que diagnostiques y arregles.

**Síntoma observable:**
{{qué pasa — pegá el error, el screenshot, el log, o describí el comportamiento}}

**Pasos para reproducir:**
1. {{paso}}
2. {{paso}}
3. {{paso}}

**Comportamiento esperado:**
{{qué debería pasar}}

**Entorno:**
- Node: {{versión}}
- Navegador (si aplica): {{nombre + versión}}
- Branch: {{rama}}
- Commit (si lo sabés): {{hash}}

**Lo que ya probé:**
- {{cosa 1 que intentaste}}
- {{cosa 2}}

**Alcance del fix:**
- Mínimo: hacer que el caso del bug funcione.
- Ideal: que no rompa otros casos.
- Test de regresión: que este bug no pueda volver.
```

## Lo que el agente debería hacer

1. **Reproducir primero.** Si es un test, escribir un test que falle antes del fix. Si es runtime, describir cómo llegar al bug.
2. **Diagnosticar la causa raíz.** No quedarse en el síntoma.
3. **Arreglar lo mínimo necesario.** No "mejorar de paso".
4. **Agregar test de regresión** que cubra exactamente el caso del bug.
5. **Correr la suite completa** para confirmar que nada se rompió.
6. **Reportar causa raíz + fix + test**, no solo "ya está".

## Lo que el agente NO debería hacer sin preguntar

- Cambiar el comportamiento "para que coincida con el bug" (eso es romper el contrato).
- Refactorizar código adyacente "ya que estamos".
- Cambiar el mensaje de error sin que vos lo pidas.
- Tocar tests que ya pasaban.

## Forma esperada del reporte

```
## Causa raíz
{{1-3 oraciones explicando qué estaba mal y por qué}}

## Fix
{{qué se cambió, archivo por archivo}}

## Test de regresión
{{qué test se agregó y por qué previene que vuelva}}

## Verificación
- npm run lint: ✅
- npm run typecheck: ✅
- npm run test:run: ✅ (X tests, Y passing, Z nuevo)
- {{verificación manual si aplica}}

## Riesgos residuales
{{qué podría seguir roto o qué no se validó}}
```

## Ejemplo concreto

```
Tengo un bug que necesito que diagnostiques y arregles.

**Síntoma observable:**
Al hacer POST a /api/contact con email vacío, el servidor responde
500 en vez de 400. En logs veo "Cannot read property 'email' of undefined".

**Pasos para reproducir:**
1. POST a /api/contact con body { name: "Juan", message: "Hola" }
2. Esperaba: 400 con mensaje "email is required"
3. Obtengo: 500 con stack trace

**Comportamiento esperado:**
Validar con Zod, responder 400 con detalle de qué campo falta.

**Entorno:**
- Node: 22.20.0
- Branch: main
- Commit: a1b2c3d

**Lo que ya probé:**
- Verificar que el schema de Zod tiene email como required (sí lo tiene)

**Alcance del fix:**
- Mínimo: que el caso del email vacío retorne 400.
- Test de regresión: que ningún POST sin un campo requerido retorne 500.
```