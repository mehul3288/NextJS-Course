import React from 'react'
import Navbar from "@/components/Navbar";
import { CartProvider } from '@/context/CartContext';

function CartLayout({ cart, orderSummary }) {
  return (
    <>
      <CartProvider>
        <main className="flex flex-col md:flex-row items-start gap-10 px-6 md:px-16 lg:px-32 pt-14 mb-20">
          <section id="cart-wrapper" className="w-full flex-1 min-w-0">
            {cart}
          </section>
          <section id="order-summary-wrapper" className="w-full md:w-96 shrink-0">
            {orderSummary}
          </section>
        </main>
      </CartProvider>
    </>
  )
}

export default CartLayout
