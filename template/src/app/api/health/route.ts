import { NextResponse } from 'next/server'

/**
 * Health check endpoint.
 *
 * Útil para:
 * - Verificar que el server está vivo (load balancer, monitoring)
 * - Smoke test después del deploy
 * - Verificación rápida en CI
 *
 * Retorna 200 con info básica del entorno.
 */
export function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
}
