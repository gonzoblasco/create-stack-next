import type { NextRequest } from 'next/server'
import { z } from 'zod'
import { errorResponse, successResponse } from '@/lib/api-response'
import { db } from '@/lib/db'
import { BadRequestError } from '@/lib/errors'
import { users } from '@/lib/schema'

const createUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z.string().email('Invalid email format'),
})

export async function GET() {
  try {
    const allUsers = await db.select().from(users)
    return successResponse(allUsers)
  } catch (error) {
    return errorResponse(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validation = createUserSchema.safeParse(body)

    if (!validation.success) {
      throw new BadRequestError('Validation failed', validation.error.flatten().fieldErrors)
    }

    const { name, email } = validation.data

    // Insert user and return inserted record
    const [newUser] = await db.insert(users).values({ name, email }).returning()

    return successResponse(newUser, 201)
  } catch (error: unknown) {
    // Drizzle SQLite error for unique constraint
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as Record<string, unknown>).code === 'SQLITE_CONSTRAINT_UNIQUE'
    ) {
      return errorResponse(new BadRequestError('Email is already registered'))
    }
    return errorResponse(error)
  }
}
