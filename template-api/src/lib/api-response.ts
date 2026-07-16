import { NextResponse } from 'next/server'
import { ApiError } from './errors'

export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status })
}

export function errorResponse(error: unknown) {
  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        details: error.details,
      },
      { status: error.statusCode },
    )
  }

  console.error('Unhandled API Error:', error)
  return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
}
