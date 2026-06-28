import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { copyTemplate } from "../copy-template.js";

describe("copyTemplate", () => {
	let tempDir: string;
	let targetDir: string;

	beforeEach(async () => {
		tempDir = await mkdtemp(join(tmpdir(), "create-stack-test-"));
		targetDir = join(tempDir, "my-test-app");
	});

	afterEach(async () => {
		await rm(tempDir, { recursive: true, force: true });
	});

	it("copia el template y reemplaza el nombre del proyecto", async () => {
		const templateDir = join(process.cwd(), "template");

		await copyTemplate(templateDir, targetDir, {
			projectName: "my-test-app",
			pm: "npm",
		});

		const packageJsonPath = join(targetDir, "package.json");
		const raw = await readFile(packageJsonPath, "utf-8");
		const pkg = JSON.parse(raw);

		expect(pkg.name).toBe("my-test-app");
	});

	it("reemplaza el package manager en README", async () => {
		const templateDir = join(process.cwd(), "template");

		await copyTemplate(templateDir, targetDir, {
			projectName: "my-test-app",
			pm: "pnpm",
		});

		const readmePath = join(targetDir, "README.md");
		const readme = await readFile(readmePath, "utf-8");

		expect(readme).toContain("pnpm run dev");
	});
});