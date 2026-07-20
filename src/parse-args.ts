import { isValidStack } from "./stacks/index.js";

export type Args = {
	/** Stack a usar (primer argumento posicional) */
	stack?: string;
	/** Nombre del proyecto (segundo argumento posicional, opcional) */
	projectName?: string;
	/** Inicializar git (default: true). false si se pasa --no-git */
	git?: boolean;
	/** Correr npm install (default: true). false si se pasa --no-install */
	install?: boolean;
	/** Package manager: npm | pnpm | yarn | bun (default: npm) */
	pm?: string;
	/** Inicializar OpenSpec (default: true). false si se pasa --no-openspec */
	openspec?: boolean;
	/** Template legacy (deprecado, usar stack posicional) */
	template?: string;
};

const VALID_PMS = ["npm", "pnpm", "yarn", "bun"] as const;
type ValidPM = (typeof VALID_PMS)[number];

function isValidPM(value: string): value is ValidPM {
	return (VALID_PMS as readonly string[]).includes(value);
}

const VALID_TEMPLATES = ["app", "api"] as const;
type ValidTemplate = (typeof VALID_TEMPLATES)[number];

function isValidTemplate(value: string): value is ValidTemplate {
	return (VALID_TEMPLATES as readonly string[]).includes(value);
}

/** Mapeo de templates legacy a stacks */
const TEMPLATE_TO_STACK: Record<string, string> = {
	app: "next",
	api: "api",
};

export function parseArgs(argv: string[]): Args {
	const args: Args = {};
	const positional: string[] = [];

	for (let i = 0; i < argv.length; i++) {
		const arg = argv[i];
		if (arg === undefined) continue;

		switch (arg) {
			case "--no-git":
				args.git = false;
				break;
			case "--no-install":
				args.install = false;
				break;
			case "--no-openspec":
				args.openspec = false;
				break;
			case "--pm": {
				const next = argv[i + 1];
				if (!next) {
					throw new Error("--pm requiere un valor (npm, pnpm, yarn, bun)");
				}
				if (!isValidPM(next)) {
					throw new Error(
						`--pm inválido: "${next}". Valores válidos: ${VALID_PMS.join(", ")}`,
					);
				}
				args.pm = next;
				i++;
				break;
			}
			case "--template": {
				const next = argv[i + 1];
				if (!next) {
					throw new Error("--template requiere un valor (app, api)");
				}
				if (!isValidTemplate(next)) {
					throw new Error(
						`--template inválido: "${next}". Valores válidos: ${VALID_TEMPLATES.join(", ")}`,
					);
				}
				// Mapear template legacy a stack
				args.template = next;
				args.stack = TEMPLATE_TO_STACK[next];
				i++;
				break;
			}
			case "--help":
			case "-h":
				// El caller maneja esto
				break;
			default:
				if (arg.startsWith("--")) {
					throw new Error(`Flag desconocida: ${arg}`);
				}
				positional.push(arg);
		}
	}

	// El primer argumento posicional es el stack
	// Solo si no fue ya seteado por --template legacy
	if (positional.length > 0 && args.stack === undefined) {
		const first = positional[0];
		if (first && isValidStack(first)) {
			args.stack = first;
			// El segundo argumento posicional es el nombre del proyecto
			args.projectName = positional[1];
		} else {
			// Compatibilidad hacia atrás: si el primer arg no es un stack válido,
			// asumimos que es el nombre del proyecto con stack "next" (legacy)
			args.stack = "next";
			args.projectName = first;
		}
	}

	return args;
}
