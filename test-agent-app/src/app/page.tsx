"use client";

import { useState } from "react";

/**
 * Home con un contador. Es el smoke test clásico:
 * - Verifica que el cliente React funciona
 * - Verifica que el event handler responde
 * - Da algo clickeable para los tests e2e
 *
 * Reemplazá esto con tu app real.
 */
export default function Home() {
	const [count, setCount] = useState(0);

	return (
		<main>
			<h1>Bienvenido a tu nueva app</h1>
			<p>
				Generada con create-stack-next. Editá <code>src/app/page.tsx</code> para
				empezar.
			</p>
			<button type="button" onClick={() => setCount((c) => c + 1)}>
				count: {count}
			</button>
		</main>
	);
}
