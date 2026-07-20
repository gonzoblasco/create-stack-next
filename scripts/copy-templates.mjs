#!/usr/bin/env node
// Copy templates from src/stacks/*/template/ to dist/stacks/*/template/
// after TypeScript build. Templates are not compiled but need to be in dist/
// for runtime resolution (__dirname points to dist/).

import { cp, readdir } from "node:fs/promises";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");
const srcStacksDir = join(rootDir, "src", "stacks");
const distStacksDir = join(rootDir, "dist", "stacks");

async function copyTemplates() {
	const stackDirs = await readdir(srcStacksDir, { withFileTypes: true });

	for (const entry of stackDirs) {
		if (!entry.isDirectory()) continue;

		const srcTemplateDir = join(srcStacksDir, entry.name, "template");
		const distTemplateDir = join(distStacksDir, entry.name, "template");

		try {
			await cp(srcTemplateDir, distTemplateDir, {
				recursive: true,
				dotfiles: true,
			});
			console.log(`  ✓ Copiado template: ${entry.name}`);
		} catch (err) {
			const nodeErr = /** @type {import('node:fs').ErrnoException} */ (err);
			if (nodeErr.code !== "ENOENT") {
				console.error(`  ✗ Error copiando template ${entry.name}:`, err);
			}
		}
	}
}

copyTemplates().catch((err) => {
	console.error("Error copiando templates:", err);
	process.exit(1);
});
