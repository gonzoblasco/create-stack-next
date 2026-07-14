/**
 * Parser de argumentos minimalista. No usamos commander/yargs porque solo
 * necesitamos 3 flags. process.argv a mano es más simple y menos deps.
 */

export type Args = {
	/** Positional args: primer elemento es el nombre del proyecto */
	_: string[];
	/** Inicializar git (default: true). false si se pasa --no-git */
	git?: boolean;
	/** Correr npm install (default: true). false si se pasa --no-install */
	install?: boolean;
	/** Package manager: npm | pnpm | yarn | bun (default: npm) */
	pm?: string;
	/** Inicializar OpenSpec (default: true). false si se pasa --no-openspec */
	openspec?: boolean;
	/** Template to use: app | api (default: app) */
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

export function parseArgs(argv: string[]): Args {
	const args: Args = { _: [] };

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
				args.template = next;
				i++;
				break;
			}
			case "--help":
			case "-h":
				// El caller ya maneja esto antes
				break;
			default:
				if (arg.startsWith("--")) {
					throw new Error(`Flag desconocida: ${arg}`);
				}
				args._.push(arg);
		}
	}

	return args;
}
