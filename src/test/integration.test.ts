import { spawn } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { copyTemplate } from "../copy-template.js";

const PACKAGE_MANAGERS = ["npm", "pnpm", "yarn", "bun"] as const;
type PM = (typeof PACKAGE_MANAGERS)[number];

function runCommand(cmd: string, cwd: string): Promise<void> {
	return new Promise((resolve, reject) => {
		const child = spawn(cmd, {
			cwd,
			shell: true,
			stdio: "inherit",
		});

		child.on("close", (code) => {
			if (code === 0) resolve();
			else reject(new Error(`Command failed with code ${code}`));
		});
	});
}

/**
 * Verifica si un package manager está disponible en el sistema.
 */
async function isPMAvailable(pm: PM): Promise<boolean> {
	if (pm === "npm") return true; // npm siempre está con Node
	try {
		await runCommand(`${pm} --version`, "/tmp");
		return true;
	} catch {
		return false;
	}
}

/**
 * Obtiene el comando de install para cada package manager.
 * npm, pnpm, yarn usan "install". bun usa "bun install".
 */
function getInstallCmd(pm: PM): string {
	return pm === "bun" ? "bun install" : `${pm} install`;
}

describe.each(PACKAGE_MANAGERS)("Integration: stack next with %s", (pm) => {
	let tempDir: string;
	let targetDir: string;

	beforeEach(async () => {
		tempDir = await mkdtemp(join(tmpdir(), `create-stack-int-${pm}-`));
		targetDir = join(tempDir, "my-test-app");
	});

	afterEach(async () => {
		await rm(tempDir, { recursive: true, force: true });
	});

	it(
		`generates a project with ${pm} that passes lint, typecheck, test and build`,
		async () => {
			const available = await isPMAvailable(pm);
			if (!available) {
				console.log(`  ⏭  ${pm} no disponible, saltando test`);
				return;
			}

			const templateDir = join(
				process.cwd(),
				"src",
				"stacks",
				"next",
				"template",
			);

			await copyTemplate(templateDir, targetDir, {
				projectName: "my-test-app",
				pm,
			});

			await runCommand(getInstallCmd(pm), targetDir);
			await runCommand(`${pm} run lint:fix`, targetDir);
			await runCommand(`${pm} run lint`, targetDir);
			await runCommand(`${pm} run typecheck`, targetDir);
			await runCommand(`${pm} run test:run`, targetDir);
			await runCommand(`${pm} run build`, targetDir);

			expect(true).toBe(true);
		},
		180_000,
	);
});

describe.each(PACKAGE_MANAGERS)("Integration: stack api with %s", (pm) => {
	let tempDir: string;
	let targetDir: string;

	beforeEach(async () => {
		tempDir = await mkdtemp(join(tmpdir(), `create-stack-api-${pm}-`));
		targetDir = join(tempDir, "my-test-api");
	});

	afterEach(async () => {
		await rm(tempDir, { recursive: true, force: true });
	});

	it(
		`generates an API project with ${pm} that passes lint, typecheck, test and build`,
		async () => {
			const available = await isPMAvailable(pm);
			if (!available) {
				console.log(`  ⏭  ${pm} no disponible, saltando test`);
				return;
			}

			const templateDir = join(
				process.cwd(),
				"src",
				"stacks",
				"api",
				"template",
			);

			await copyTemplate(templateDir, targetDir, {
				projectName: "my-test-api",
				pm,
			});

			await runCommand(getInstallCmd(pm), targetDir);
			await runCommand(`${pm} run lint:fix`, targetDir);
			await runCommand(`${pm} run lint`, targetDir);
			await runCommand(`${pm} run typecheck`, targetDir);
			await runCommand(`${pm} run test:run`, targetDir);
			await runCommand(`${pm} run build`, targetDir);

			expect(true).toBe(true);
		},
		180_000,
	);
});
