# `.openclaw/` — Config específica de OpenClaw

> Este directorio es bonus. El proyecto se gobierna con el `AGENTS.md` agnóstico en la raíz — eso lo lee OpenClaw, Claude Code, Cursor y otros. Lo que hay acá adentro es **específico de OpenClaw** y se ignora silenciosamente si no usás OpenClaw.

## Qué hay acá

```
.openclaw/
├── README.md           ← este archivo
├── config.json         ← metadata para OpenClaw (qué archivos son contexto, qué ignorar)
└── prompts/            ← templates de prompts por tipo de tarea
    ├── feature.md      ← agregar funcionalidad nueva
    ├── refactor.md     ← mejorar estructura sin cambiar comportamiento
    ├── bugfix.md       ← diagnosticar y arreglar un bug
    └── tests.md        ← agregar/mejorar tests
```

## Cómo se usa

### Iniciar una sesión con el agente

Desde la raíz del proyecto:

```bash
npm run agent
```

Eso ejecuta `openclaw chat`, que abre la TUI local con el `AGENTS.md` ya cargado como contexto. A partir de ahí hablás con el agente en lenguaje natural.

### Usar un template de prompt

1. Abrí el archivo correspondiente en `prompts/` (por ejemplo `prompts/feature.md`).
2. Leé la sección "Prompt sugerido".
3. Copiá el bloque, reemplazá los placeholders con tu caso concreto.
4. Pegá el prompt resultante en la sesión del agente.

### Personalizar

- **Cambiar el contexto del agente**: editá `config.json` y modificá `agent.contextFiles`. Por defecto solo carga `AGENTS.md`.
- **Ignorar más paths**: agregalos a `agent.ignorePatterns`.
- **Sumar un template de prompt**: creá un nuevo `.md` en `prompts/` siguiendo el formato de los cuatro existentes.

## Por qué existe este directorio

Decisión documentada en `D009` y `D018` del proyecto `create-stack-next`:

- Tener `.openclaw/` en la raíz de un proyecto es una **buena práctica** para quien usa OpenClaw (al igual que tener tu propio `.openclaw/` en la raíz de tu máquina).
- `AGENTS.md` es agnóstico: el proyecto funciona igual de bien con cualquier agente moderno.
- No es vendor lock-in. Si no usás OpenClaw, simplemente ignorás (o borrás) este directorio. El costo es cero.

## Más info

- [OpenClaw docs](https://docs.openclaw.dev)
- [D009 — AI agent config](../context/decisions.md#d009--ai-agent-config-agentsmd--openclaw--bonus)
- [D018 — M2 scope](../context/decisions.md#d018--alcance-de-m2-ai-native)