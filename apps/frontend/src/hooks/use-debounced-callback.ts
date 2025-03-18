/**
 * @see https://github.com/mantinedev/mantine/blob/master/packages/@mantine/hooks/src/use-debounced-callback/use-debounced-callback.ts
 */

import * as React from "react"

import { useCallbackRef } from "@/hooks/use-callback-ref"

/**
 * Custom hook that returns a debounced version of the provided callback function.
 * The debounced function will delay the execution of the callback until after
 * the specified delay has elapsed since the last time it was invoked.
 *
 * @template T - The type of the callback function.
 * @param {T} callback - The callback function to debounce.
 * @param {number} delay - The delay in milliseconds to wait before invoking the callback.
 * @returns {(...args:1Parameters<T>) => void} - The debounced function.
 */
export function useDebouncedCallback<T extends (...args: never[]) => unknown>(
  callback: T,
  delay: number
) {
  const handleCallback = useCallbackRef(callback)
  const debounceTimerRef = React.useRef(0)
  React.useEffect(() => () => window.clearTimeout(debounceTimerRef.current), [])

  const setValue = React.useCallback(
    (...args: Parameters<T>) => {
      window.clearTimeout(debounceTimerRef.current)
      debounceTimerRef.current = window.setTimeout(
        () => handleCallback(...args),
        delay
      )
    },
    [handleCallback, delay]
  )

  return setValue
}
