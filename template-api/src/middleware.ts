import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	// Ejemplo de autenticación super simple con API Key
	// En producción, podrías validar un JWT aquí en su lugar
	const authHeader = request.headers.get("authorization");

	// Si quieres proteger todas las rutas excepto /health, puedes hacerlo así:
	if (
		request.nextUrl.pathname.startsWith("/api") &&
		!request.nextUrl.pathname.startsWith("/api/health")
	) {
		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return NextResponse.json(
				{
					success: false,
					error: "Unauthorized - Missing or invalid Bearer token",
				},
				{ status: 401 },
			);
		}

		const token = authHeader.split(" ")[1];
		// Aquí deberías validar el token contra tu base de datos o secreto
		if (token !== "demo-token-123") {
			return NextResponse.json(
				{ success: false, error: "Forbidden - Invalid token" },
				{ status: 403 },
			);
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: "/api/:path*",
};
