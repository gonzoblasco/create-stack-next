import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { StackConfig } from "../types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const apiStack: StackConfig = {
	id: "api",
	label: "Next.js API",
	description:
		"Next.js 15 App Router (API-only) + Drizzle ORM + SQLite + middleware Bearer + tests con node-mocks-http",
	templateDir: resolve(__dirname, "template"),
	defaultPM: "npm",
	minNodeVersion: ">=20.0.0",
};
