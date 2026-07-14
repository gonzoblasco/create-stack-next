import { mkdtemp, readFile, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { copyTemplate, listFiles } from "../copy-template.js";
import { runOpenSpecInit } from "../openspec-init.js";

describe("OpenSpec — estructura en el template", () => {
	let tempDir: string;
	let targetDir: string;
	const templateDir = join(process.cwd(), "template");

	beforeEach(async () => {
		tempDir = await mkdtemp(join(tmpdir(), "csn-openspec-test-"));
		targetDir = join(tempDir, "my-test-app");
	});

	afterEach(async () => {
		await rm(tempDir, { recursive: true, force: true });
	});

	it("copia la carpeta openspec/ del template al proyecto", async () => {
		await copyTemplate(templateDir, targetDir, {
			projectName: "my-test-app",
			pm: "npm",
		});

		const openspecDir = join(targetDir, "openspec");
		const dirStat = await stat(openspecDir);
		expect(dirStat.isDirectory()).toBe(true);
	});

	it("copia openspec/config.yaml", async () => {
		await copyTemplate(templateDir, targetDir, {
			projectName: "my-test-app",
			pm: "npm",
		});

		const configPath = join(targetDir, "openspec", "config.yaml");
		const config = await readFile(configPath, "utf-8");

		expect(config).toContain("schema: spec-driven");
	});

	it("copia openspec/specs/ y openspec/changes/archive/", async () => {
		await copyTemplate(templateDir, targetDir, {
			projectName: "my-test-app",
			pm: "npm",
		});

		const specsDir = await stat(join(targetDir, "openspec", "specs"));
		expect(specsDir.isDirectory()).toBe(true);

		const archiveDir = await stat(
			join(targetDir, "openspec", "changes", "archive"),
		);
		expect(archiveDir.isDirectory()).toBe(true);
	});

	it("openspec/ aparece en la lista de archivos copiados", async () => {
		await copyTemplate(templateDir, targetDir, {
			projectName: "my-test-app",
			pm: "npm",
		});

		const files = await listFiles(targetDir);
		const openspecFiles = files.filter((f) => f.startsWith("openspec/"));

		expect(openspecFiles.length).toBeGreaterThan(0);
		expect(openspecFiles).toContain("openspec/config.yaml");
	});
});

describe("runOpenSpecInit", () => {
	let tempDir: string;

	beforeEach(async () => {
		tempDir = await mkdtemp(join(tmpdir(), "csn-openspec-init-"));
	});

	afterEach(async () => {
		await rm(tempDir, { recursive: true, force: true });
	});

	it("existe y es una función exportada", () => {
		expect(typeof runOpenSpecInit).toBe("function");
	});

	it("falla graceful si no hay proyecto válido", async () => {
		// Pasamos un directorio inexistente — debería fallar sin crashear
		await expect(
			runOpenSpecInit(join(tempDir, "no-existe"), ["claude"]),
		).rejects.toThrow();
	});

	// Nota: el test de integración real (correr openspec init en un proyecto
	// con internet) está en integration.test.ts como test opcional que
	// requiere conexión.
});

describe("OpenSpec — template-api", () => {
	let tempDir: string;
	let targetDir: string;
	const templateDir = join(process.cwd(), "template-api");

	beforeEach(async () => {
		tempDir = await mkdtemp(join(tmpdir(), "csn-openspec-api-test-"));
		targetDir = join(tempDir, "my-test-api");
	});

	afterEach(async () => {
		await rm(tempDir, { recursive: true, force: true });
	});

	it("copia openspec/ en el template API también", async () => {
		await copyTemplate(templateDir, targetDir, {
			projectName: "my-test-api",
			pm: "npm",
		});

		const configPath = join(targetDir, "openspec", "config.yaml");
		const config = await readFile(configPath, "utf-8");

		expect(config).toContain("schema: spec-driven");
	});

	it("template-api tiene @fission-ai/openspec en devDependencies", async () => {
		const pkg = JSON.parse(
			await readFile(join(templateDir, "package.json"), "utf-8"),
		);

		expect(pkg.devDependencies["@fission-ai/openspec"]).toBeDefined();
	});
});

describe("OpenSpec — template app", () => {
	it("template app tiene @fission-ai/openspec en devDependencies", async () => {
		const templateDir = join(process.cwd(), "template");
		const pkg = JSON.parse(
			await readFile(join(templateDir, "package.json"), "utf-8"),
		);

		expect(pkg.devDependencies["@fission-ai/openspec"]).toBeDefined();
	});
});
