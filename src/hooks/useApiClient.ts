/**
 * Custom hook for making API requests with automatic token injection
 */

'use client'

import { useCallback } from 'react'

import type { FetchOptions } from '@/utils/apiClient'

import { apiFetchJson, backendFetchJson } from '@/utils/apiClient'

/**
 * Hook for making API requests
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useApiClient = () => {
  /**
   * Make a fetch request with automatic token injection
   */
  const fetchApi = useCallback(
    async (url: string, options?: FetchOptions) => {
      return apiFetchJson(url, options)
    },
    []
  )

  /**
   * Make a request to the backend with automatic token injection
   */
  const fetchBackend = useCallback(
    async (endpoint: string, options?: FetchOptions) => {
      return backendFetchJson(endpoint, options)
    },
    []
  )

  /**
   * Make a GET request to the backend
   */
  const get = useCallback(
    async (endpoint: string) => {
      return fetchBackend(endpoint, { method: 'GET' })
    },
    [fetchBackend]
  )

  /**
   * Make a POST request to the backend
   */
  const post = useCallback(
    async (endpoint: string, data?: any) => {
      return fetchBackend(endpoint, {
        method: 'POST',
        body: JSON.stringify(data)
      })
    },
    [fetchBackend]
  )

  /**
   * Make a PUT request to the backend
   */
  const put = useCallback(
    async (endpoint: string, data?: any) => {
      return fetchBackend(endpoint, {
        method: 'PUT',
        body: JSON.stringify(data)
      })
    },
    [fetchBackend]
  )

  /**
   * Make a PATCH request to the backend
   */
  const patch = useCallback(
    async (endpoint: string, data?: any) => {
      return fetchBackend(endpoint, {
        method: 'PATCH',
        body: JSON.stringify(data)
      })
    },
    [fetchBackend]
  )

  /**
   * Make a DELETE request to the backend
   */
  const deleteRequest = useCallback(
    async (endpoint: string) => {
      return fetchBackend(endpoint, { method: 'DELETE' })
    },
    [fetchBackend]
  )

  return {
    fetchApi,
    fetchBackend,
    get,
    post,
    put,
    patch,
    delete: deleteRequest
  }
}

