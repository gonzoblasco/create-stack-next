import { spawn } from "node:child_process";
import { accessSync, constants, existsSync, readdirSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import * as p from "@clack/prompts";
import pc from "picocolors";
import { copyTemplate } from "./copy-template.js";
import { runOpenSpecInit } from "./openspec-init.js";
import { type Args, parseArgs } from "./parse-args.js";
import { getStack, listStacks } from "./stacks/index.js";
import { isInsideWorkspace } from "./workspace.js";

/** Herramientas IA soportadas por OpenSpec para el select interactivo. */
const AI_TOOLS = [
	{ value: "claude", label: "Claude Code", hint: ".claude/" },
	{ value: "cursor", label: "Cursor", hint: ".cursor/" },
	{ value: "windsurf", label: "Windsurf", hint: ".windsurf/" },
	{ value: "github-copilot", label: "GitHub Copilot", hint: ".github/" },
	{ value: "cline", label: "Cline", hint: ".cline/" },
	{ value: "codex", label: "Codex", hint: ".codex/" },
	{
		value: "all",
		label: "Todas las herramientas (30+)",
		hint: "Antigravity, OpenClaw, Gemini, etc.",
	},
] as const;

/** Valores pre-seleccionados por defecto. */
const DEFAULT_TOOLS = ["claude", "cursor"];

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CLI_NAME = "@gonzoblasco/create-stack";

function printUsage(): void {
	const stacks = listStacks();
	const stacksList = stacks
		.map((s) => `  ${pc.green(s.id.padEnd(12))} ${s.label} — ${s.description}`)
		.join("\n");

	console.log(`
${pc.cyan(pc.bold(CLI_NAME))} — scaffolder opinado multi-stack

${pc.bold("Uso:")}
  ${pc.cyan(`npx ${CLI_NAME}`)} ${pc.green("<stack>")} [nombre-del-proyecto] [opciones]

${pc.bold("Stacks disponibles:")}
${stacksList}

${pc.bold("Opciones:")}
  ${pc.yellow("--no-git")}          No inicializa git ni hace commit inicial
  ${pc.yellow("--no-install")}      No corre npm install después de generar
  ${pc.yellow("--no-openspec")}    No inicializa OpenSpec (Spec-Driven Development)
  ${pc.yellow("--pm <nombre>")}     Package manager: ${pc.cyan("npm")}, ${pc.cyan("pnpm")}, ${pc.cyan("yarn")}, ${pc.cyan("bun")} (default: ${pc.cyan("npm")})

${pc.bold("Ejemplos:")}
  ${pc.cyan(`npx ${CLI_NAME}`)} ${pc.green("next")} ${pc.green("my-app")}
  ${pc.cyan(`npx ${CLI_NAME}`)} ${pc.green("api")} ${pc.green("my-app")}
  ${pc.cyan(`npx ${CLI_NAME}`)} ${pc.green("next")} ${pc.green("my-app")} ${pc.yellow("--pm pnpm --no-git")}
`);
}

/**
 * Valida el nombre del proyecto.
 *
 * Reglas:
 * - No puede estar vacío
 * - Solo lowercase, números, guiones y underscores
 * - No puede empezar con . ni -
 * - Si el directorio destino ya existe, solo se acepta si está vacío
 *   (se ignoran archivos del sistema como .DS_Store)
 * - El directorio padre debe tener permisos de escritura
 */
export function validateProjectName(
	name: string,
): { ok: true } | { ok: false; reason: string } {
	if (!name) {
		return { ok: false, reason: "Falta el nombre del proyecto" };
	}

	if (!/^[a-z0-9-_]+$/.test(name)) {
		return {
			ok: false,
			reason: `Nombre inválido "${name}". Solo lowercase, números, guiones y underscores.`,
		};
	}

	if (name.startsWith(".") || name.startsWith("-")) {
		return {
			ok: false,
			reason: `Nombre inválido "${name}". No puede empezar con . ni -.`,
		};
	}

	if (existsSync(name)) {
		try {
			const entries = readdirSync(name);
			const meaningfulEntries = entries.filter(
				(entry) => entry !== ".DS_Store" && entry !== "Thumbs.db",
			);
			if (meaningfulEntries.length > 0) {
				return {
					ok: false,
					reason: `El directorio "${name}" ya existe y no está vacío`,
				};
			}
		} catch {
			return { ok: false, reason: `No se puede leer el directorio "${name}"` };
		}
	}

	const parentDir = dirname(resolve(name));
	try {
		accessSync(parentDir, constants.W_OK);
	} catch {
		return { ok: false, reason: `Sin permisos de escritura en "${parentDir}"` };
	}

	return { ok: true };
}

/**
 * Ejecuta un comando en un directorio. Hereda stdout/stderr del proceso padre.
 */
export function execInDir(
	cmd: string,
	args: string[],
	cwd: string,
): Promise<void> {
	return new Promise((resolveP, rejectP) => {
		const proc = spawn(cmd, args, { cwd, stdio: "inherit" });
		proc.on("error", rejectP);
		proc.on("exit", (code) => {
			if (code === 0) resolveP();
			else
				rejectP(new Error(`${cmd} ${args.join(" ")} exited with code ${code}`));
		});
	});
}

/**
 * Ejecuta un comando y captura su stdout.
 */
export function execCapture(
	cmd: string,
	args: string[],
	cwd: string,
): Promise<string> {
	return new Promise((resolveP, rejectP) => {
		const proc = spawn(cmd, args, { cwd, stdio: ["ignore", "pipe", "pipe"] });
		let stdout = "";
		proc.stdout.on("data", (data: Buffer) => {
			stdout += data.toString();
		});
		proc.on("error", rejectP);
		proc.on("exit", (code) => {
			if (code === 0) resolveP(stdout.trim());
			else
				rejectP(new Error(`${cmd} ${args.join(" ")} exited with code ${code}`));
		});
	});
}

/**
 * Verifica si git está disponible en el sistema.
 */
export async function isGitAvailable(): Promise<boolean> {
	try {
		await execCapture("git", ["--version"], process.cwd());
		return true;
	} catch {
		return false;
	}
}

/**
 * Lee un valor de la configuración global de git.
 */
export async function getGitConfig(
	key: string,
	cwd: string,
): Promise<string | null> {
	try {
		const value = await execCapture("git", ["config", "--global", key], cwd);
		return value || null;
	} catch {
		return null;
	}
}

async function runGitInit(projectDir: string): Promise<void> {
	if (!(await isGitAvailable())) {
		p.log.warn("Git no encontrado. Saltando inicialización git.");
		p.log.info(`Instalá Git y corré ${pc.cyan("git init")} manualmente.`);
		return;
	}

	await execInDir("git", ["init", "-b", "main"], projectDir);
	await execInDir("git", ["add", "."], projectDir);

	const userName = await getGitConfig("user.name", projectDir);
	const userEmail = await getGitConfig("user.email", projectDir);

	if (!userName || !userEmail) {
		p.log.warn(
			"Git user.name/user.email no configurados. Usando valores temporales.",
		);
		await execInDir(
			"git",
			[
				"-c",
				"user.name=create-stack",
				"-c",
				"user.email=noreply@create-stack",
				"commit",
				"-m",
				"chore: initial commit from @gonzoblasco/create-stack",
			],
			projectDir,
		);
		p.log.info(
			`Configurá tu Git: ${pc.cyan('git config --global user.name "Tu Nombre"')}`,
		);
	} else {
		await execInDir(
			"git",
			["commit", "-m", "chore: initial commit from @gonzoblasco/create-stack"],
			projectDir,
		);
	}
}

async function runInstall(projectDir: string, pm: string): Promise<void> {
	const installCmd = pm === "npm" ? "npm" : pm;
	await execInDir(installCmd, ["install"], projectDir);
}

export async function run(): Promise<void> {
	if (
		process.argv.length <= 2 ||
		process.argv.includes("--help") ||
		process.argv.includes("-h")
	) {
		printUsage();
		process.exit(0);
	}

	const args: Args = parseArgs(process.argv.slice(2));

	// Validar stack
	const stack = args.stack;
	if (!stack) {
		console.error(pc.red("❌"), "Falta el stack.");
		console.error(
			`   Uso: ${pc.cyan(`npx ${CLI_NAME}`)} ${pc.green("<stack>")} ${pc.green("[nombre]")}`,
		);
		console.error(
			`   Stacks: ${listStacks()
				.map((s) => pc.cyan(s.id))
				.join(", ")}`,
		);
		process.exit(1);
	}

	const stackConfig = getStack(stack);
	if (!stackConfig) {
		console.error(
			pc.red("❌"),
			`Stack "${stack}" no encontrado. Stacks disponibles: ${listStacks()
				.map((s) => pc.cyan(s.id))
				.join(", ")}`,
		);
		process.exit(1);
	}

	// Validar nombre del proyecto
	const projectName = args.projectName;
	if (!projectName) {
		console.error(pc.red("❌"), "Falta el nombre del proyecto.");
		console.error(
			`   Uso: ${pc.cyan(`npx ${CLI_NAME}`)} ${pc.green(stack)} ${pc.green("<nombre>")}`,
		);
		process.exit(1);
	}

	const validation = validateProjectName(projectName);
	if (!validation.ok) {
		console.error(pc.red("❌"), validation.reason);
		process.exit(1);
	}

	const projectDir = resolve(process.cwd(), projectName);
	const pm = args.pm ?? stackConfig.defaultPM;
	const git = args.git !== false;
	const install = args.install !== false;
	const openspec = args.openspec !== false;

	p.intro(pc.bgCyan(pc.black(` ${CLI_NAME} — ${stackConfig.label} `)));

	try {
		const s = p.spinner();

		// 1. Crear directorio destino
		s.start(`Creando directorio en ./${projectName}`);
		await mkdir(projectDir, { recursive: true });
		s.stop(`Directorio creado: ${pc.cyan(projectName)}`);

		// 2. Copiar template del stack
		s.start(`Copiando template: ${stackConfig.label}`);
		await copyTemplate(stackConfig.templateDir, projectDir, {
			projectName,
			pm,
		});
		s.stop("Template copiado exitosamente");

		// 3. Personalizar package.json
		s.start("Configurando proyecto");
		const packageJsonPath = join(projectDir, "package.json");
		const packageJsonRaw = await readFile(packageJsonPath, "utf-8");
		const packageJson = JSON.parse(packageJsonRaw);
		packageJson.name = projectName;
		await writeFile(
			packageJsonPath,
			`${JSON.stringify(packageJson, null, 2)}\n`,
			"utf-8",
		);
		s.stop("Configuración lista");

		// 4. Seleccionar herramientas IA para OpenSpec
		let selectedTools: string[] = DEFAULT_TOOLS;
		if (openspec) {
			if (!process.stdin.isTTY) {
				p.log.info(
					`Modo no interactivo detectado. Usando herramientas por defecto: ${DEFAULT_TOOLS.join(", ")}`,
				);
			} else {
				const toolSelection = await p.multiselect({
					message:
						"Seleccioná tus herramientas de IA para Spec-Driven Development",
					options: AI_TOOLS.map((t) => ({
						value: t.value,
						label: t.label,
						hint: t.hint,
					})),
					initialValues: DEFAULT_TOOLS,
					required: false,
				});

				if (p.isCancel(toolSelection)) {
					p.cancel("Operación cancelada.");
					process.exit(1);
				}

				selectedTools = toolSelection as string[];
			}
		}

		// 5. Instalar deps
		if (install) {
			s.start(`Instalando dependencias via ${pm}`);
			try {
				await runInstall(projectDir, pm);
				s.stop("Dependencias instaladas");
			} catch (err) {
				s.stop(`Falló la instalación con ${pm}`);
				p.note(
					`Ocurrió un error. Podés correr ${pc.cyan(`${pm} install`)} manualmente.\n${err instanceof Error ? err.message : String(err)}`,
					"Advertencia",
				);
			}
		}

		// 6. OpenSpec init
		if (openspec && selectedTools.length > 0) {
			const toolsFlag = selectedTools.includes("all") ? ["all"] : selectedTools;
			s.start("Configurando OpenSpec (Spec-Driven Development)");
			try {
				await runOpenSpecInit(projectDir, toolsFlag);
				s.stop("OpenSpec configurado correctamente");
			} catch (err) {
				s.stop(
					"OpenSpec no pudo inicializarse (estructura base ya copiada del template)",
				);
				p.note(
					`Podés configurarlo manualmente después con ${pc.cyan("npx @fission-ai/openspec init")}.\n${err instanceof Error ? err.message : String(err)}`,
					"OpenSpec",
				);
			}
		}

		// 7. Git init
		if (git) {
			const inWorkspace = await isInsideWorkspace(process.cwd());
			if (inWorkspace) {
				p.log.info("Workspace detectado. Saltando inicialización de Git...");
			} else {
				s.start("Inicializando repositorio Git");
				try {
					await runGitInit(projectDir);
					s.stop("Repositorio Git inicializado");
				} catch (err) {
					s.stop("Falló la inicialización de Git");
					p.note(
						`Podés correr git init manualmente.\n${err instanceof Error ? err.message : String(err)}`,
						"Advertencia",
					);
				}
			}
		}

		// 8. Mensaje final
		const nextSteps = [
			`cd ${projectName}`,
			`${pm} run dev          ${pc.dim("# Arrancar servidor de desarrollo")}`,
			`${pm} run test         ${pc.dim("# Correr tests unitarios")}`,
			`${pm} run test:e2e     ${pc.dim("# Correr tests e2e")}`,
			`${pm} run lint         ${pc.dim("# Ejecutar Biome (linter + format)")}`,
			"",
			`${pc.cyan('/opsx:propose "tu primera feature"')}  ${pc.dim("# Iniciar desarrollo con specs")}`,
		];

		p.note(nextSteps.join("\n"), "Próximos pasos");

		p.outro(pc.green(pc.bold("¡Todo listo! Happy coding! 🚀")));
	} catch (err) {
		p.cancel("Operación cancelada por un error.");
		console.error(pc.red(err instanceof Error ? err.message : String(err)));
		process.exit(1);
	}
}
