'use client'

import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import type { Product } from '@/lib/products'

export type CartItem = {
  product: Product
  qty: number
}

type State = { items: Record<string, CartItem> }

type Action =
  | { type: 'ADD'; product: Product; qty?: number }
  | { type: 'REMOVE'; productId: string }
  | { type: 'SET_QTY'; productId: string; qty: number }
  | { type: 'CLEAR' }
  | { type: 'HYDRATE'; state: State }

const CartCtx = createContext<{
  items: CartItem[]
  count: number
  subtotalCents: number
  add: (p: Product, qty?: number) => void
  remove: (id: string) => void
  setQty: (id: string, qty: number) => void
  clear: () => void
} | null>(null)

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD': {
      const qty = action.qty ?? 1
      const existing = state.items[action.product.id]
      const nextQty = (existing?.qty ?? 0) + qty
      return {
        items: {
          ...state.items,
          [action.product.id]: { product: action.product, qty: nextQty },
        },
      }
    }
    case 'REMOVE': {
      const next = { ...state.items }
      delete next[action.productId]
      return { items: next }
    }
    case 'SET_QTY': {
      const qty = Math.max(1, Math.min(99, action.qty))
      const item = state.items[action.productId]
      if (!item) return state
      return { items: { ...state.items, [action.productId]: { ...item, qty } } }
    }
    case 'CLEAR':
      return { items: {} }
    case 'HYDRATE':
      return action.state
    default:
      return state
  }
}

const STORAGE_KEY = 'eddy_cart_v1'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: {} })

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const parsed = JSON.parse(raw) as State
      if (parsed?.items) dispatch({ type: 'HYDRATE', state: parsed })
    } catch {
      // ignore
    }
  }, [])

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // ignore
    }
  }, [state])

  const items = useMemo(() => Object.values(state.items), [state.items])
  const count = useMemo(() => items.reduce((a, i) => a + i.qty, 0), [items])
  const subtotalCents = useMemo(
    () => items.reduce((a, i) => a + i.qty * i.product.priceCents, 0),
    [items]
  )

  const value = useMemo(
    () => ({
      items,
      count,
      subtotalCents,
      add: (p: Product, qty?: number) => dispatch({ type: 'ADD', product: p, qty }),
      remove: (id: string) => dispatch({ type: 'REMOVE', productId: id }),
      setQty: (id: string, qty: number) => dispatch({ type: 'SET_QTY', productId: id, qty }),
      clear: () => dispatch({ type: 'CLEAR' }),
    }),
    [items, count, subtotalCents]
  )

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>
}

export function useCart() {
  const ctx = useContext(CartCtx)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
