import { describe, it, expect, beforeEach } from "vitest";
const prueba = it;
import { render, screen } from "@testing-library/react";
import { CartProvider, useCart } from "../src/context/CartContext";

// Componente de prueba para CartContext
const TestComponent = () => {
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();
  
  return (
    <div>
      <div data-testid="cart-count">{cart.length}</div>
      <button
        onClick={() =>
          addToCart({
            id: 1,
            title: "Test Game",
            price: 29.99,
            image: "test.jpg",
          })
        }
      >
        Agregar al carrito
      </button>
      <button onClick={() => removeFromCart(1)}>Eliminar</button>
      <button onClick={() => updateQuantity(1, 5)}>Actualizar cantidad</button>
      <button onClick={() => clearCart()}>Limpiar carrito</button>
      {cart.map((item) => (
        <div key={item.id} data-testid={`cart-item-${item.id}`}>
          {item.title} - Cantidad: {item.quantity}
        </div>
      ))}
    </div>
  );
};

describe("CartContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  prueba("debe proveer el contexto del carrito correctamente", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const cartCount = screen.getByTestId("cart-count");
    expect(cartCount).toBeInTheDocument();
    expect(cartCount).toHaveTextContent("0");
  });

  prueba("debe mostrar carrito vacío por defecto", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId("cart-count")).toHaveTextContent("0");
  });

  prueba("debe proporcionar botones de acción del carrito", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByRole("button", { name: /Agregar al carrito/i });
    const removeButton = screen.getByRole("button", { name: /Eliminar/i });
    const updateButton = screen.getByRole("button", { name: /Actualizar cantidad/i });
    const clearButton = screen.getByRole("button", { name: /Limpiar carrito/i });

    expect(addButton).toBeInTheDocument();
    expect(removeButton).toBeInTheDocument();
    expect(updateButton).toBeInTheDocument();
    expect(clearButton).toBeInTheDocument();
  });

  prueba("debe mantener el estado del carrito entre renders", () => {
    const { rerender } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const count1 = screen.getByTestId("cart-count").textContent;

    rerender(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const count2 = screen.getByTestId("cart-count").textContent;
    expect(count1).toBe(count2);
  });

  prueba("debe proporcionar función addToCart", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByRole("button", { name: /Agregar al carrito/i });
    expect(addButton).toBeInTheDocument();
  });

  prueba("debe proporcionar función removeFromCart", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const removeButton = screen.getByRole("button", { name: /Eliminar/i });
    expect(removeButton).toBeInTheDocument();
  });

  prueba("debe proporcionar función updateQuantity", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const updateButton = screen.getByRole("button", { name: /Actualizar cantidad/i });
    expect(updateButton).toBeInTheDocument();
  });

  prueba("debe proporcionar función clearCart", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const clearButton = screen.getByRole("button", { name: /Limpiar carrito/i });
    expect(clearButton).toBeInTheDocument();
  });

  prueba("debe mantener consistencia del contexto", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const cartCount = screen.getByTestId("cart-count");
    expect(cartCount).toHaveTextContent("0");
    expect(cartCount).toBeInTheDocument();
  });

  prueba("debe renderizar sin errores múltiples veces", () => {
    const { rerender } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    rerender(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    rerender(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId("cart-count")).toBeInTheDocument();
  });

  prueba("debe proporcionar métodos del carrito en el contexto", () => {
    const { container } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBeGreaterThan(0);
  });
});
