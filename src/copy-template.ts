import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";

export type CopyOptions = {
	/** Nombre del proyecto (para reemplazos en package.json, README, etc.) */
	projectName: string;
	/** Package manager (para el comando de install en README) */
	pm: string;
};

/**
 * Copia el template completo al directorio destino.
 *
 - Si el path destino no existe, lo crea.
 - Si existe y tiene contenido, aborta con error.
 - Procesa archivos de texto (reemplaza placeholders si los hubiera).
 - Copia archivos binarios sin tocar.
 */
export async function copyTemplate(
	templateDir: string,
	targetDir: string,
	options: CopyOptions,
): Promise<void> {
	// 1. Validar que el directorio destino no existe o está vacío
	await mkdir(targetDir, { recursive: true });

	// 2. Copiar recursivamente. cp con recursive: true hace el trabajo pesado.
	await cp(templateDir, targetDir, {
		recursive: true,
		dotfiles: true,
		// Filtro: por ahora copiamos todo. Más adelante podemos excluir cosas.
		filter: (_src: string) => true,
	} as never);

	// 3. Personalizar archivos que tienen placeholders o valores por defecto.
	// Hoy solo es package.json (su nombre), pero dejamos la puerta abierta.
	await customizePackageJson(targetDir, options.projectName);
	await customizeReadme(targetDir, options.projectName, options.pm);
	await renameDotfiles(targetDir);
}

/**
 * Lee el package.json generado, le pone el nombre del proyecto.
 * El template tiene un nombre placeholder que sobreescribimos.
 */
async function customizePackageJson(
	targetDir: string,
	projectName: string,
): Promise<void> {
	const packageJsonPath = join(targetDir, "package.json");

	let raw: string;
	try {
		raw = await readFile(packageJsonPath, "utf-8");
	} catch {
		// Si no hay package.json en el template, no hacemos nada.
		// (raro, pero por las dudas)
		return;
	}

	const pkg = JSON.parse(raw) as { name?: string; [key: string]: unknown };
	pkg.name = projectName;

	await writeFile(
		packageJsonPath,
		`${JSON.stringify(pkg, null, 2)}\n`,
		"utf-8",
	);
}

/**
 * Personaliza el README con el nombre del proyecto y el PM correcto.
 * Reemplaza placeholders {{PROJECT_NAME}} y {{PM}} si los encuentra.
 */
async function customizeReadme(
	targetDir: string,
	projectName: string,
	pm: string,
): Promise<void> {
	const readmePath = join(targetDir, "README.md");

	let raw: string;
	try {
		raw = await readFile(readmePath, "utf-8");
	} catch {
		return;
	}

	const customized = raw
		.replace(/\{\{PROJECT_NAME\}\}/g, projectName)
		.replace(/\{\{PM\}\}/g, pm);

	if (customized !== raw) {
		await writeFile(readmePath, customized, "utf-8");
	}
}

/**
 * Helper que devuelve los paths relativos de todos los archivos en un directorio.
 * Útil para debugging o logging ("qué archivos copié").
 */
export async function listFiles(dir: string): Promise<string[]> {
	const entries = await readdir(dir, { withFileTypes: true });
	const files: string[] = [];

	for (const entry of entries) {
		const fullPath = join(dir, entry.name);
		if (entry.isDirectory()) {
			const subFiles = await listFiles(fullPath);
			files.push(...subFiles.map((f) => join(entry.name, f)));
		} else if (entry.isFile()) {
			files.push(entry.name);
		}
		// symlinks los ignoramos por ahora
	}

	return files.sort();
}

// Helper exportado por si lo queremos usar en cli.ts para logging
export function getRelativePath(from: string, to: string): string {
	return relative(dirname(from), to);
}

/**
 * Renombra archivos que npm excluye (como .gitignore) de su versión sin punto
 * a la versión con punto en el destino.
 *
 * npm no publica archivos llamados .gitignore, así que en el template los
 * guardamos como 'gitignore' (sin punto) y los renombramos al copiar.
 */
async function renameDotfiles(targetDir: string): Promise<void> {
	const renames: Record<string, string> = {
		gitignore: ".gitignore",
	};

	for (const [from, to] of Object.entries(renames)) {
		const fromPath = join(targetDir, from);
		const toPath = join(targetDir, to);
		try {
			await cp(fromPath, toPath);
			await rm(fromPath);
		} catch {
			// Si el archivo no existe, no hay nada que renombrar
		}
	}
}
