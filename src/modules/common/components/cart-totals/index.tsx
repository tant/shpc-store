"use client"

import { formatAmount } from "@lib/util/prices"
import { InformationCircleSolid } from "@medusajs/icons"
import { Cart, Order } from "@medusajs/medusa"
import { Tooltip } from "@medusajs/ui"
import React from "react"

/**
 * Defines the shape of the `data` prop for the `CartTotals` component.
 *
 * The `data` prop is an object that represents either a `Cart` or an `Order`, excluding the `refundable_amount` and `refunded_total` properties.
 *
 * @typedef {Object} CartTotalsProps
 * @property {Omit<Cart, "refundable_amount" | "refunded_total"> | Order} data - The cart or order data to be displayed in the `CartTotals` component.
 */
type CartTotalsProps = {
  data: Omit<Cart, "refundable_amount" | "refunded_total"> | Order
}

/**
 * Renders a component that displays the total breakdown of a cart or order, including subtotal, discounts, shipping, taxes, and the final total.
 *
 * @param data - An object containing the cart or order data, excluding the `refundable_amount` and `refunded_total` properties.
 * @returns A React component that renders the cart or order totals.
 */
const CartTotals: React.FC<CartTotalsProps> = ({ data }) => {
  /**
   * Destructures the cart or order data object to extract the following properties:
   * - `subtotal`: The total amount of the items in the cart or order, excluding discounts, shipping, and taxes.
   * - `discount_total`: The total amount of discounts applied to the cart or order.
   * - `gift_card_total`: The total amount of gift cards applied to the cart or order.
   * - `tax_total`: The total amount of taxes applied to the cart or order.
   * - `shipping_total`: The total amount of shipping costs for the cart or order.
   * - `total`: The final total amount of the cart or order, including all charges and discounts.
   */
  const {
    subtotal,
    discount_total,
    gift_card_total,
    tax_total,
    shipping_total,
    total,
  } = data

  /**
   * Formats a monetary amount with the region-specific formatting.
   *
   * @param amount - The monetary amount to format. If `null` or `undefined`, it will be treated as 0.
   * @returns The formatted monetary amount.
   */
  const getAmount = (amount: number | null | undefined) => {
    return formatAmount({
      amount: amount || 0,
      region: data.region,
      includeTaxes: false,
    })
  }

  return (
    <div>
      <div className="flex flex-col gap-y-2 txt-medium text-ui-fg-subtle ">
        <div className="flex items-center justify-between">
          <span className="flex gap-x-1 items-center">
            Subtotal
            <Tooltip content="Cart total excluding shipping and taxes.">
              <InformationCircleSolid color="var(--fg-muted)" />
            </Tooltip>
          </span>
          <span data-testid="cart-subtotal" data-value={subtotal || 0}>
            {getAmount(subtotal)}
          </span>
        </div>
        {!!discount_total && (
          <div className="flex items-center justify-between">
            <span>Discount</span>
            <span
              className="text-ui-fg-interactive"
              data-testid="cart-discount"
              data-value={discount_total || 0}
            >
              - {getAmount(discount_total)}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span>Shipping</span>
          <span data-testid="cart-shipping" data-value={shipping_total || 0}>
            {getAmount(shipping_total)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="flex gap-x-1 items-center ">Taxes</span>
          <span data-testid="cart-taxes" data-value={tax_total || 0}>
            {getAmount(tax_total)}
          </span>
        </div>
        {!!gift_card_total && (
          <div className="flex items-center justify-between">
            <span>Gift card</span>
            <span
              className="text-ui-fg-interactive"
              data-testid="cart-gift-card-amount"
              data-value={gift_card_total || 0}
            >
              - {getAmount(gift_card_total)}
            </span>
          </div>
        )}
      </div>
      <div className="h-px w-full border-b border-gray-200 my-4" />
      <div className="flex items-center justify-between text-ui-fg-base mb-2 txt-medium ">
        <span>Total</span>
        <span
          className="txt-xlarge-plus"
          data-testid="cart-total"
          data-value={total || 0}
        >
          {getAmount(total)}
        </span>
      </div>
      <div className="h-px w-full border-b border-gray-200 mt-4" />
    </div>
  )
}

export default CartTotals
