# {{PROJECT_NAME}} - API Stack

Este es un proyecto generado con `create-stack-next --template api`. Es una estructura optimizada para servir exclusivamente como Backend usando **Next.js App Router** (Route Handlers).

## 🚀 Arquitectura

- **Framework**: Next.js 15 (API Routes)
- **Lenguaje**: TypeScript Estricto
- **Base de Datos**: Drizzle ORM + SQLite (`@libsql/client`)
- **Validación**: Zod
- **Linter/Formatter**: Biome
- **Testing**: Vitest + `node-mocks-http`

## 🛠️ Comandos Disponibles

- `npm run dev` - Levanta el servidor de desarrollo en modo Turbopack.
- `npm run build` - Construye el proyecto para producción.
- `npm run start` - Inicia el servidor de producción.
- `npm run lint` - Ejecuta Biome para verificar errores de código y formato.
- `npm run test` - Ejecuta la suite de pruebas unitarias y de integración de la API.
- `npm run db:push` - Sincroniza tu esquema de Drizzle (`src/lib/schema.ts`) con la base de datos local SQLite.
- `npm run db:studio` - Abre el panel web de Drizzle para visualizar e interactuar con tus datos.

## 📁 Estructura de Carpetas

- `src/app/api/`: Aquí viven tus endpoints. Cada carpeta es una ruta (ej: `src/app/api/users/route.ts` = `/api/users`).
- `src/lib/db.ts`: Configuración y cliente de Drizzle ORM.
- `src/lib/schema.ts`: Esquemas de las tablas de tu base de datos.
- `src/lib/api-response.ts`: Funciones de utilidad para retornar JSON estructurado estándar (`{ success: true, data: ... }`).
- `src/lib/errors.ts`: Clases de error (ej: `BadRequestError`, `NotFoundError`) que son capturadas y parseadas a respuestas HTTP válidas.
- `src/middleware.ts`: Interceptor global de peticiones, configurado con un ejemplo base de autenticación por Token.
- `src/test/`: Suite de pruebas ultra rápidas sin necesidad de levantar el puerto web.

## 🤖 Desarrollo con IA

Revisa el archivo `AGENTS.md` para conocer las reglas y flujos de trabajo recomendados para interactuar con IAs (Cursor, OpenClaw) en este repositorio.

### Desarrollo por Especificaciones (Spec-Driven Development)

Este proyecto incluye [OpenSpec](https://github.com/Fission-AI/OpenSpec), un framework de desarrollo guiado por especificaciones. La idea: **acordar qué construir antes de escribir código**.

#### Flujo básico

1. **`/opsx:explore`** — (opcional) pensá la idea con la IA antes de comprometerte
2. **`/opsx:propose "mi-feature"`** — la IA crea propuesta + specs + design + tasks
3. **Revisás el plan** y ajustás lo que haga falta
4. **`/opsx:apply`** — la IA implementa los tasks
5. **`/opsx:archive`** — los cambios se mergean a las specs y se archiva

#### Estructura

```
openspec/
├── specs/           # fuente de verdad (cómo funciona HOY)
├── changes/         # cambios propuestos
│   └── archive/     # cambios completados
└── config.yaml      # configuración
```

Para cambios triviales no hace falta usar OpenSpec. Usalo donde querés alinear expectativas con la IA.
