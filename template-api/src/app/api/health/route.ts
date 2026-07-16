import { successResponse } from '@/lib/api-response'

export async function GET() {
  return successResponse({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  })
}
