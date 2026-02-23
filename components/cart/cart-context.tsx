'use client'

import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import type { Product, ProductVariant } from '@/lib/products'
import { getCartItemKey } from '@/lib/products'

export type CartItem = {
  product: Product
  qty: number
  variant?: ProductVariant | null
}

type State = { items: Record<string, CartItem> }

type Action =
  | { type: 'ADD'; product: Product; qty?: number; variant?: ProductVariant | null }
  | { type: 'REMOVE'; itemKey: string }
  | { type: 'SET_QTY'; itemKey: string; qty: number }
  | { type: 'CLEAR' }
  | { type: 'HYDRATE'; state: State }

const CartCtx = createContext<{
  items: CartItem[]
  count: number
  subtotalCents: number
  add: (p: Product, qty?: number, variant?: ProductVariant | null) => void
  remove: (itemKey: string) => void
  setQty: (itemKey: string, qty: number) => void
  clear: () => void
  getItemKey: (item: CartItem) => string
} | null>(null)

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD': {
      const qty = action.qty ?? 1
      const key = getCartItemKey(action.product.id, action.variant?.id)
      const existing = state.items[key]
      const nextQty = (existing?.qty ?? 0) + qty
      return {
        items: {
          ...state.items,
          [key]: {
            product: action.product,
            qty: nextQty,
            variant: action.variant ?? undefined,
          },
        },
      }
    }
    case 'REMOVE': {
      const next = { ...state.items }
      delete next[action.itemKey]
      return { items: next }
    }
    case 'SET_QTY': {
      const qty = Math.max(1, Math.min(99, action.qty))
      const item = state.items[action.itemKey]
      if (!item) return state
      return { items: { ...state.items, [action.itemKey]: { ...item, qty } } }
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
    () =>
      items.reduce((a, i) => {
        const price = i.variant?.priceCents ?? i.product.priceCents
        return a + i.qty * price
      }, 0),
    [items]
  )

  const value = useMemo(
    () => ({
      items,
      count,
      subtotalCents,
      add: (p: Product, qty?: number, variant?: ProductVariant | null) =>
        dispatch({ type: 'ADD', product: p, qty, variant }),
      remove: (itemKey: string) => dispatch({ type: 'REMOVE', itemKey }),
      setQty: (itemKey: string, qty: number) => dispatch({ type: 'SET_QTY', itemKey, qty }),
      clear: () => dispatch({ type: 'CLEAR' }),
      getItemKey: (item: CartItem) => getCartItemKey(item.product.id, item.variant?.id),
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
