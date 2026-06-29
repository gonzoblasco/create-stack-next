import { z } from "zod";

/**
 * Validación runtime de variables de entorno.
 *
 * Por qué existe: en producción, una env var faltante o mal tipada puede tirar
 * el server a las 3am. Mejor fallar al arrancar con un mensaje claro.
 *
 * Cómo usar:
 *   import { env } from '@/lib/env';
 *   console.log(env.NODE_ENV);
 *
 * Para agregar una nueva variable:
 *   1. Sumarla al schema
 *   2. Listarla en .env.example
 *   3. Usar `env.MI_VARIABLE` en el código
 */

const envSchema = z.object({
	NODE_ENV: z
		.enum(["development", "test", "production"])
		.default("development"),

	// Acá se suman más variables a medida que el proyecto las necesite.
	// Ejemplo:
	// DATABASE_URL: z.string().url(),
	// API_KEY: z.string().min(1),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
	console.error("❌ Variables de entorno inválidas:");
	console.error(parsed.error.flatten().fieldErrors);
	throw new Error("Invalid environment variables");
}

export const env = parsed.data;
