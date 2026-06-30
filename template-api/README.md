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
