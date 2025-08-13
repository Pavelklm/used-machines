import { QueryClient } from '@tanstack/react-query'

const isNetworkError = (error: any) => {
  return (
    error?.message?.includes('fetch') ||
    error?.message?.includes('Network') ||
    error?.code === 'NETWORK_ERROR'
  )
}

const isServerError = (error: any) => {
  return (
    error?.response?.status >= 500 ||
    error?.extensions?.code === 'INTERNAL_SERVER_ERROR'
  )
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1 * 60 * 1000,
      gcTime: 5 * 60 * 1000,

      retry: (failureCount, error) => {
        if (error?.message?.includes('404')) return false

        if (isNetworkError(error) || isServerError(error)) {
          return failureCount < 3
        }

        return failureCount < 1
      },

      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

      refetchOnWindowFocus: false,

      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
})
