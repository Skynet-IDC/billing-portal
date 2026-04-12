/**
 * API Route Handler Helper for automatic token injection
 * Use this in your API routes to automatically add authentication token to BACKEND_URL requests
 */

import type { NextRequest } from 'next/server'

import { getToken } from 'next-auth/jwt'

/**
 * Get the access token from NextAuth session
 */
export const getAuthToken = async (request: NextRequest): Promise<string | null> => {
  try {
    const token = await getToken({ req: request })

    console.log('Access token found in session token: ', token);

    if (token && 'accessToken' in token) {
      return token.accessToken as string
    }


    return null
  } catch (error) {
    console.error('Error getting auth token:', error)

    return null
  }
}

/**
 * Create headers with automatic token injection for BACKEND_URL
 */
export const createBackendHeaders = (
  request: NextRequest,
  token: string | null,
  customHeaders: Record<string, string> = {}
): HeadersInit => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...customHeaders
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  return headers
}

/**
 * Make a request to BACKEND_URL with automatic token injection
 * @param endpoint - API endpoint path
 * @param request - NextRequest object
 * @param options - Request options including skipToken flag
 * @returns Response from the backend
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const backendRequest = async (
  endpoint: string,
  request: NextRequest,
  options: RequestInit & { skipToken?: boolean } = {}
): Promise<Response> => {
  const { skipToken = false, ...fetchOptions } = options
  const backendUrl = process.env.BACKEND_URL

  if (!backendUrl) {
    throw new Error('BACKEND_URL is not configured')
  }

  let token: string | null = null

  if (!skipToken) {
    token = await getAuthToken(request)
  }

  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  const fullUrl = `${backendUrl}${path}`

  const headers = createBackendHeaders(request, token, fetchOptions.headers as Record<string, string>)

  try {
    return await fetch(fullUrl, {
      ...fetchOptions,
      headers
    })
  } catch (error) {
    console.error(`Error making request to ${fullUrl}:`, error)
    throw error
  }
}

/**
 * Parse and return JSON response from backend
 * @param response - Response object to parse
 * @returns Parsed response with status and data
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handleBackendResponse = async (response: Response) => {
  const contentType = response.headers.get('content-type')

  if (contentType?.includes('application/json')) {
    const data = await response.json()

    return {
      status: response.status,
      statusText: response.statusText,
      data
    }
  }

  const text = await response.text()

  return {
    status: response.status,
    statusText: response.statusText,
    data: text
  }
}

/**
 * Middleware function to wrap API handlers with automatic token injection
 * @param handler - API route handler function
 * @returns Wrapped handler with error handling
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const withBackendAuth = (
  handler: (req: NextRequest, context: any) => Promise<Response>
) => {
  return async (req: NextRequest, context: any) => {
    try {
      return await handler(req, context)
    } catch (error) {
      console.error('API Error:', error)

      return new Response(
        JSON.stringify({
          error: 'Internal Server Error',
          message: error instanceof Error ? error.message : 'Unknown error'
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }
  }
}
