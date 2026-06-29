/**
 * Utilidades compartidas.
 *
 * Acá van helpers genéricos que se usan en varios lados:
 * - formatters (fechas, números, moneda)
 * - type guards
 * - constantes
 *
 * NO va acá:
 * - Lógica de negocio (eso va en src/lib/<dominio>/)
 * - Componentes (eso va en src/components/)
 * - API calls (eso va en src/lib/api/ o similar)
 */

/**
 * Combina classNames. Reemplaza al clásico `clsx` para casos simples.
 * Para lógica más compleja (conditional classes, dedupe), usar `clsx` directamente.
 */
export function cn(
	...classes: Array<string | false | null | undefined>
): string {
	return classes.filter(Boolean).join(" ");
}
