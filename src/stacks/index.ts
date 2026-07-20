import { apiStack } from "./api/index.js";
import { nextStack } from "./next/index.js";
import type { StackConfig } from "./types.js";

/**
 * Registry de todos los stacks disponibles.
 * Para agregar un stack nuevo, importalo acá y agregalo al array.
 */
const STACKS: StackConfig[] = [nextStack, apiStack];

/** Mapa id → stack para lookup rápido */
const stackMap = new Map<string, StackConfig>(STACKS.map((s) => [s.id, s]));

/**
 * Obtiene la config de un stack por su id.
 * Retorna undefined si no existe.
 */
export function getStack(id: string): StackConfig | undefined {
	return stackMap.get(id);
}

/**
 * Lista todos los stacks disponibles.
 */
export function listStacks(): StackConfig[] {
	return STACKS;
}

/**
 * Valida que un stack id exista.
 */
export function isValidStack(id: string): boolean {
	return stackMap.has(id);
}
