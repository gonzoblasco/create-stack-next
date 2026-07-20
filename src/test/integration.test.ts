import { spawn } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { copyTemplate } from "../copy-template.js";

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

describe("Integration: full project generation — stack next", () => {
	let tempDir: string;
	let targetDir: string;

	beforeEach(async () => {
		tempDir = await mkdtemp(join(tmpdir(), "create-stack-int-"));
		targetDir = join(tempDir, "my-test-app");
	});

	afterEach(async () => {
		await rm(tempDir, { recursive: true, force: true });
	});

	it("generates a project that passes lint, typecheck, test and build", async () => {
		const templateDir = join(
			process.cwd(),
			"src",
			"stacks",
			"next",
			"template",
		);

		await copyTemplate(templateDir, targetDir, {
			projectName: "my-test-app",
			pm: "npm",
		});

		await runCommand("npm install", targetDir);
		await runCommand("npm run lint:fix", targetDir);
		await runCommand("npm run lint", targetDir);
		await runCommand("npm run typecheck", targetDir);
		await runCommand("npm run test:run", targetDir);
		await runCommand("npm run build", targetDir);

		expect(true).toBe(true);
	}, 120_000);
});
