import { GET } from "@/app/api/health/route";
import { createMocks } from "node-mocks-http";
import { describe, expect, it } from "vitest";

describe("Healthcheck API", () => {
	it("should return 200 and ok status", async () => {
		const { req } = createMocks({
			method: "GET",
		});

		// En Next.js App Router, las request no siempre se comportan como IncomingMessage estándar.
		// node-mocks-http nos ayuda a simular un request/response básico para testing directo de handlers.
		const response = await GET();
		const data = await response.json();

		expect(response.status).toBe(200);
		expect(data.success).toBe(true);
		expect(data.data.status).toBe("ok");
		expect(data.data.uptime).toBeDefined();
	});
});
