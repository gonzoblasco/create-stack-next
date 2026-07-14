/**
 * Ejecuta `openspec init` en el proyecto recién generado.
 *
 * OpenSpec agrega Spec-Driven Development al proyecto:
 * - Genera skills y slash commands para las herramientas IA seleccionadas
 * - Crea la estructura openspec/ (ya pre-armada en el template como fallback)
 *
 * Si la inicialización de OpenSpec falla (sin internet, npm caído, etc.),
 * la estructura base ya está copiada del template, así que el proyecto
 * sigue siendo funcional. El usuario puede correr `openspec init` manualmente
 * después.
 */

import { spawn } from "node:child_process";

/**
 * Corre `openspec init` con las herramientas seleccionadas.
 *
 * @param projectDir - Directorio del proyecto recién creado
 * @param tools - Lista de IDs de herramientas (ej: ["claude", "cursor"])
 * @throws si el comando falla
 */
export async function runOpenSpecInit(
	projectDir: string,
	tools: string[],
): Promise<void> {
	const toolFlag = tools.join(",");

	return new Promise((resolve, reject) => {
		// Usamos npx para no requerir instalación global de openspec
		const proc = spawn(
			"npx",
			["@fission-ai/openspec", "init", "--tools", toolFlag, "--force"],
			{
				cwd: projectDir,
				stdio: ["ignore", "pipe", "pipe"],
				env: { ...process.env, OPENSPEC_TELEMETRY: "0" },
			},
		);

		let stderr = "";

		proc.stdout?.on("data", () => {
			// stdout se ignora — no queremos contaminar la salida del CLI
		});

		proc.stderr?.on("data", (data: Buffer) => {
			stderr += data.toString();
		});

		proc.on("error", (err) => {
			reject(
				new Error(
					`No se pudo ejecutar openspec init: ${err.message}. Verificá que npx esté disponible y haya conexión a internet.`,
				),
			);
		});

		proc.on("exit", (code) => {
			if (code === 0) {
				resolve();
			} else {
				reject(
					new Error(
						`openspec init falló con código ${code}.${stderr ? `\n${stderr.trim()}` : ""}`,
					),
				);
			}
		});
	});
}
