import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export interface StackConfig {
	/** Identificador del stack (ej: "next", "api") */
	id: string;
	/** Nombre legible para mostrar en help */
	label: string;
	/** Descripción breve */
	description: string;
	/** Directorio del template (relativo a este archivo) */
	templateDir: string;
	/** Package manager por defecto */
	defaultPM: string;
	/** Versión de Node mínima */
	minNodeVersion: string;
}

export const nextStack: StackConfig = {
	id: "next",
	label: "Next.js Full",
	description:
		"Next.js 15 + React 19 + TypeScript estricto + Biome + Vitest + Playwright + Zod + OpenSpec + AI agent config",
	templateDir: resolve(__dirname, "template"),
	defaultPM: "npm",
	minNodeVersion: ">=20.0.0",
};
