'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

type ToastContextValue = {
  toast: (message: string) => void
}

const ToastCtx = createContext<ToastContextValue | null>(null)

const TOAST_DURATION_MS = 3500

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null)

  const toast = useCallback((msg: string) => {
    setMessage(msg)
  }, [])

  useEffect(() => {
    if (!message) return
    const id = setTimeout(() => setMessage(null), TOAST_DURATION_MS)
    return () => clearTimeout(id)
  }, [message])

  return (
    <ToastCtx.Provider value={{ toast }}>
      {children}
      {message && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-white shadow-lg transition-all duration-300"
        >
          <span className="flex items-center gap-2">
            <i className="pi pi-check" aria-hidden />
            {message}
          </span>
        </div>
      )}
    </ToastCtx.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastCtx)
  return ctx ?? { toast: () => {} }
}
