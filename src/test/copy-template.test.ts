import { mkdtemp, readFile, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { copyTemplate, listFiles } from "../copy-template.js";

describe("copyTemplate — stack next", () => {
	let tempDir: string;
	let targetDir: string;
	const templateDir = join(process.cwd(), "src", "stacks", "next", "template");

	beforeEach(async () => {
		tempDir = await mkdtemp(join(tmpdir(), "create-stack-test-"));
		targetDir = join(tempDir, "my-test-app");
	});

	afterEach(async () => {
		await rm(tempDir, { recursive: true, force: true });
	});

	it("copia el template y reemplaza el nombre del proyecto en package.json", async () => {
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
		await copyTemplate(templateDir, targetDir, {
			projectName: "my-test-app",
			pm: "pnpm",
		});

		const readmePath = join(targetDir, "README.md");
		const readme = await readFile(readmePath, "utf-8");

		expect(readme).toContain("pnpm run dev");
	});

	it("reemplaza el nombre del proyecto en README", async () => {
		await copyTemplate(templateDir, targetDir, {
			projectName: "custom-name",
			pm: "npm",
		});

		const readmePath = join(targetDir, "README.md");
		const readme = await readFile(readmePath, "utf-8");

		expect(readme).toContain("custom-name");
	});

	it("copia todos los archivos del template (verificación exhaustiva)", async () => {
		await copyTemplate(templateDir, targetDir, {
			projectName: "my-test-app",
			pm: "npm",
		});

		const templateFiles = await listFiles(templateDir);
		const targetFiles = await listFiles(targetDir);

		const renames: Record<string, string> = { gitignore: ".gitignore" };
		for (const file of templateFiles) {
			const expectedFile = renames[file] ?? file;
			expect(
				targetFiles,
				`Archivo faltante en destino: ${expectedFile}`,
			).toContain(expectedFile);
		}
	});

	it("copia dotfiles correctamente (.gitignore)", async () => {
		await copyTemplate(templateDir, targetDir, {
			projectName: "my-test-app",
			pm: "npm",
		});

		const gitignorePath = join(targetDir, ".gitignore");
		const gitignore = await readFile(gitignorePath, "utf-8");

		expect(gitignore).toBeTruthy();
		expect(gitignore).toContain("node_modules");
	});

	it("copia directorios dotfiles (.openclaw, .agents, .github, .vscode)", async () => {
		await copyTemplate(templateDir, targetDir, {
			projectName: "my-test-app",
			pm: "npm",
		});

		const dotDirs = [".openclaw", ".agents", ".github", ".vscode"];

		for (const dotDir of dotDirs) {
			const dirPath = join(targetDir, dotDir);
			const dirStat = await stat(dirPath);
			expect(dirStat.isDirectory(), `${dotDir} debería ser un directorio`).toBe(
				true,
			);
		}
	});

	it("copia paths anidados profundos (docs/, src/app/, tests/e2e/)", async () => {
		await copyTemplate(templateDir, targetDir, {
			projectName: "my-test-app",
			pm: "npm",
		});

		const nestedPaths = ["docs", "src", "tests"];

		for (const nestedPath of nestedPaths) {
			const dirPath = join(targetDir, nestedPath);
			const dirStat = await stat(dirPath);
			expect(
				dirStat.isDirectory(),
				`${nestedPath} debería existir como directorio`,
			).toBe(true);
		}
	});

	it("archivos sin placeholders se copian sin modificar", async () => {
		await copyTemplate(templateDir, targetDir, {
			projectName: "my-test-app",
			pm: "npm",
		});

		const biomeOriginal = await readFile(
			join(templateDir, "biome.json"),
			"utf-8",
		);
		const biomeCopied = await readFile(join(targetDir, "biome.json"), "utf-8");

		expect(biomeCopied).toBe(biomeOriginal);
	});

	it("tsconfig.json se copia sin modificar", async () => {
		await copyTemplate(templateDir, targetDir, {
			projectName: "my-test-app",
			pm: "npm",
		});

		const tsconfigOriginal = await readFile(
			join(templateDir, "tsconfig.json"),
			"utf-8",
		);
		const tsconfigCopied = await readFile(
			join(targetDir, "tsconfig.json"),
			"utf-8",
		);

		expect(tsconfigCopied).toBe(tsconfigOriginal);
	});
});

describe("copyTemplate — stack api", () => {
	let tempDir: string;
	let targetDir: string;
	const templateDir = join(process.cwd(), "src", "stacks", "api", "template");

	beforeEach(async () => {
		tempDir = await mkdtemp(join(tmpdir(), "create-stack-api-test-"));
		targetDir = join(tempDir, "my-test-api");
	});

	afterEach(async () => {
		await rm(tempDir, { recursive: true, force: true });
	});

	it("copia el template API correctamente", async () => {
		await copyTemplate(templateDir, targetDir, {
			projectName: "my-test-api",
			pm: "npm",
		});

		const packageJsonPath = join(targetDir, "package.json");
		const raw = await readFile(packageJsonPath, "utf-8");
		const pkg = JSON.parse(raw);

		expect(pkg.name).toBe("my-test-api");
	});

	it("copia drizzle.config.ts en template API", async () => {
		await copyTemplate(templateDir, targetDir, {
			projectName: "my-test-api",
			pm: "npm",
		});

		const drizzleConfig = await stat(join(targetDir, "drizzle.config.ts"));
		expect(drizzleConfig.isFile()).toBe(true);
	});
});

// ─── Tests de listFiles helper ───────────────────────────

describe("listFiles", () => {
	it("devuelve la lista ordenada de archivos del template next", async () => {
		const templateDir = join(
			process.cwd(),
			"src",
			"stacks",
			"next",
			"template",
		);
		const files = await listFiles(templateDir);

		expect(files.length).toBeGreaterThan(0);
		const sorted = [...files].sort();
		expect(files).toEqual(sorted);
	});

	it("incluye dotfiles en la lista", async () => {
		const templateDir = join(
			process.cwd(),
			"src",
			"stacks",
			"next",
			"template",
		);
		const files = await listFiles(templateDir);

		expect(files).toContain("gitignore");
	});
});
