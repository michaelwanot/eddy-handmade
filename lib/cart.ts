export type CartItem = {
  productId: string;
  qty: 1; // pezzi unici: max 1
};

export type CartState = {
  items: CartItem[];
};

export const CART_STORAGE_KEY = "eddy_cart_v1";

export function safeParseCart(raw: string | null): CartState {
  if (!raw) return { items: [] };
  try {
    const parsed = JSON.parse(raw) as CartState;
    if (!parsed?.items || !Array.isArray(parsed.items)) return { items: [] };
    // normalizza
    const items: CartItem[] = parsed.items
      .filter((i) => typeof i?.productId === "string")
      .map((i) => ({ productId: i.productId, qty: 1 as const }));
    return { items };
  } catch {
    return { items: [] };
  }
}
