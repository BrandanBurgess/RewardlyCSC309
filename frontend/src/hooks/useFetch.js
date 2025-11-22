import { useState, useEffect, useCallback } from 'react'

/**
 * Custom hook for fetching data with loading and error states
 * @param {Function} fetchFn - Async function that fetches data
 * @param {Array} dependencies - Dependencies array for refetching
 * @returns {Object} Data, loading, error, and refetch function
 */
export function useFetch(fetchFn, dependencies = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await fetchFn()
      setData(result)
    } catch (err) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [fetchFn])

  useEffect(() => {
    fetchData()
  }, dependencies)

  return { data, loading, error, refetch: fetchData }
}

