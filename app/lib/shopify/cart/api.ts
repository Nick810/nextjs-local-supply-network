import { shopifyClient } from "../client";
import { CART_CREATE, CART_LINES_ADD } from "./queries";
import { CartApiLine, CartCreateResponse, CartLinesAddResponse } from "./types";

export async function createCart(
  lines: CartApiLine[]
): Promise<{ cartId: string; checkoutUrl: string }> {
  const response = await shopifyClient.request<CartCreateResponse>(CART_CREATE, {
  variables: { input: { lines } },
});

  const cartCreate = response.data?.cartCreate;
  if (!cartCreate || cartCreate.userErrors.length) {
    throw new Error(cartCreate?.userErrors.map(e => e.message).join(', ') || 'Unknown error');
  }

  return {
    cartId: cartCreate.cart.id,
    checkoutUrl: cartCreate.cart.checkoutUrl,
  };
}


export async function addCartLines(
  cartId: string,
  lines: CartApiLine[]
): Promise<{ checkoutUrl: string }> {
  const response = await shopifyClient.request<CartLinesAddResponse>(CART_LINES_ADD, {
    variables: { cartId, lines },
  });

  const cartLinesAdd = response.data?.cartLinesAdd;
  if (!cartLinesAdd || cartLinesAdd.userErrors.length) {
    throw new Error(cartLinesAdd?.userErrors.map(e => e.message).join(', '));
  }

  return { checkoutUrl: cartLinesAdd.cart.checkoutUrl };
}
