/**
 * API Client with automatic token injection for BACKEND_URL
 * This utility automatically adds the authorization token to all requests to BACKEND_URL
 */

import { getAccessToken } from './authUtils'

/**
 * Configuration for fetch requests
 */
export interface FetchOptions extends RequestInit {
  skipTokenInjection?: boolean
}

/**
 * Enhanced fetch function that automatically injects token for BACKEND_URL
 * @param url - The URL to fetch
 * @param options - Fetch options
 * @returns Promise<Response>
 */
export const apiFetch = async (url: string, options: FetchOptions = {}): Promise<Response> => {
  const { skipTokenInjection = false, headers = {}, ...otherOptions } = options

  // Convert headers to mutable object if it's a Headers instance
  const headersObj = new Headers(headers as any)

  // Check if this is a BACKEND_URL request and token injection is not skipped
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL
  const isBackendRequest = backendUrl && url.includes(backendUrl)

  // Inject token if it's a backend request and skipTokenInjection is false
  if (isBackendRequest && !skipTokenInjection) {
    const token = getAccessToken()

    if (token) {
      headersObj.set('Authorization', `Bearer ${token}`)
    }
  }

  // Return the fetch request with updated headers
  return fetch(url, {
    ...otherOptions,
    headers: headersObj
  })
}

/**
 * Wrapper for making authenticated requests to BACKEND_URL
 * Automatically adds the Authorization header with the access token
 */
export const backendFetch = async (
  endpoint: string,
  options: FetchOptions = {}
): Promise<Response> => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL

  if (!backendUrl) {
    throw new Error('BACKEND_URL is not configured in environment variables')
  }

  // Ensure endpoint starts with /
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  const fullUrl = `${backendUrl}${path}`

  return apiFetch(fullUrl, options)
}

/**
 * Helper function to parse JSON response
 */
export const parseJsonResponse = async (response: Response): Promise<any> => {
  try {
    return await response.json()
  } catch (error) {
    console.error('Error parsing JSON response:', error)
    throw error
  }
}

/**
 * Fetch helper for common API patterns
 */
export const apiFetchJson = async (url: string, options: FetchOptions = {}): Promise<any> => {
  const response = await apiFetch(url, options)

  if (!response.ok) {
    const errorData = await parseJsonResponse(response)

    const error = new Error(
      errorData.message || errorData.error || `API Error: ${response.status}`
    ) as any

    error.status = response.status
    error.data = errorData
    throw error
  }

  return parseJsonResponse(response)
}

/**
 * Backend fetch helper for common API patterns
 */
export const backendFetchJson = async (endpoint: string, options: FetchOptions = {}): Promise<any> => {
  const responseBe = await backendFetch(endpoint, options)

  if (!responseBe.ok) {
    const errorData = await parseJsonResponse(responseBe)

    const error = new Error(errorData.message || errorData.error || `API Error: ${responseBe.status}`) as any

    error.status = responseBe.status
    error.data = errorData
    throw error
  }

  return parseJsonResponse(responseBe)
}

