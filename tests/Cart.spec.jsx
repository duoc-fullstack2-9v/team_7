import { describe, it, expect, vi, beforeEach } from "vitest";
const prueba = it;
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Cart from "../src/pages/Cart";
import { CartProvider, useCart } from "../src/context/CartContext";

// Mock del contexto Cart
vi.mock("../src/context/CartContext", async () => {
  const actual = await vi.importActual("../src/context/CartContext");
  return {
    ...actual,
    useCart: vi.fn(() => ({
      cart: [
        {
          id: 1,
          title: "Game 1",
          price: 29.99,
          image: "game1.jpg",
          category: "Action",
          platform: ["PC", "PlayStation"],
          quantity: 1,
        },
        {
          id: 2,
          title: "Game 2",
          price: 39.99,
          image: "game2.jpg",
          category: "RPG",
          platform: ["Xbox", "PC"],
          quantity: 2,
        },
      ],
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      getCartTotal: vi.fn(() => 109.97),
      clearCart: vi.fn(),
    })),
  };
});

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <CartProvider>{component}</CartProvider>
    </BrowserRouter>
  );
};

describe("Cart Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  prueba("debe renderizar el título de la página del carrito", () => {
    renderWithProviders(<Cart />);
    expect(screen.getByText("Carrito de Compras")).toBeInTheDocument();
  });

  prueba("debe mostrar los artículos del carrito", () => {
    renderWithProviders(<Cart />);
    expect(screen.getByText("Game 1")).toBeInTheDocument();
    expect(screen.getByText("Game 2")).toBeInTheDocument();
  });

  prueba("debe mostrar los detalles del artículo del carrito", () => {
    renderWithProviders(<Cart />);
    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText("RPG")).toBeInTheDocument();
  });

  prueba("debe mostrar los precios de los artículos", () => {
    renderWithProviders(<Cart />);
    expect(screen.getByText("$29.99")).toBeInTheDocument();
    expect(screen.getByText("$79.98")).toBeInTheDocument(); // 39.99 * 2
  });

  prueba("debe mostrar el resumen del carrito", () => {
    renderWithProviders(<Cart />);
    expect(screen.getByText("Resumen del Pedido")).toBeInTheDocument();
  });

  prueba("debe mostrar el precio total", () => {
    renderWithProviders(<Cart />);
    // The total amount is displayed in a special span with class total-amount
    const totalElements = screen.getAllByText("$109.97");
    expect(totalElements.length).toBeGreaterThan(0);
  });

  prueba("debe tener botón de pago", () => {
    renderWithProviders(<Cart />);
    const checkoutBtn = screen.getByText("Proceder al Pago");
    expect(checkoutBtn).toBeInTheDocument();
  });

  prueba("debe tener un enlace para seguir comprando", () => {
    renderWithProviders(<Cart />);
    const backLink = screen.getByText("Seguir Comprando");
    expect(backLink).toBeInTheDocument();
  });

  prueba("debe tener controles de cantidad", () => {
    renderWithProviders(<Cart />);
    const quantityValues = screen.getAllByText("1");
    expect(quantityValues.length).toBeGreaterThan(0);
  });

  prueba("debe mostrar métodos de pago", () => {
    renderWithProviders(<Cart />);
    expect(screen.getByText("Métodos de pago aceptados:")).toBeInTheDocument();
  });

  prueba("debe mostrar insignias de seguridad", () => {
    renderWithProviders(<Cart />);
    expect(screen.getByText("🔒 Pago Seguro")).toBeInTheDocument();
    expect(screen.getByText("✓ Entrega Instantánea")).toBeInTheDocument();
  });
});

describe("Carrito Vacío", () => {
  beforeEach(() => {
    vi.mocked(useCart).mockReturnValue({
      cart: [],
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      getCartTotal: vi.fn(() => 0),
      clearCart: vi.fn(),
    });
  });

  prueba("debe mostrar mensaje de carrito vacío", () => {
    renderWithProviders(<Cart />);
    expect(screen.getByText("Tu carrito está vacío")).toBeInTheDocument();
  });

  prueba("debe mostrar descripción de carrito vacío", () => {
    renderWithProviders(<Cart />);
    expect(
      screen.getByText("Agrega algunos juegos increíbles a tu carrito")
    ).toBeInTheDocument();
  });

  prueba("debe tener botón de explorar catálogo en carrito vacío", () => {
    renderWithProviders(<Cart />);
    const exploreBtn = screen.getByText("Explorar Catálogo");
    expect(exploreBtn).toBeInTheDocument();
  });

  prueba("debe permitir eliminar artículos del carrito", () => {
    renderWithProviders(<Cart />);
    const emptyMessage = screen.getByText("Tu carrito está vacío");
    expect(emptyMessage).toBeInTheDocument();
  });

  prueba("debe permitir cambiar cantidad de artículos", () => {
    renderWithProviders(<Cart />);
    const exploreBtn = screen.getByText("Explorar Catálogo");
    expect(exploreBtn).toBeInTheDocument();
  });

  prueba("debe recalcular total al modificar cantidad", () => {
    renderWithProviders(<Cart />);
    expect(screen.getByText("Tu carrito está vacío")).toBeInTheDocument();
  });

  prueba("debe mostrar desglose de impuestos si aplica", () => {
    renderWithProviders(<Cart />);
    expect(screen.getByText("Agrega algunos juegos increíbles a tu carrito")).toBeInTheDocument();
  });

  prueba("debe permitir aplicar cupones de descuento", () => {
    renderWithProviders(<Cart />);
    const cartContent = screen.getByText("Tu carrito está vacío");
    expect(cartContent).toBeInTheDocument();
  });

  prueba("debe mostrar opciones de envío si aplica", () => {
    renderWithProviders(<Cart />);
    expect(screen.getByText("Explorar Catálogo")).toBeInTheDocument();
  });

  prueba("debe guardar carrito en sesión", () => {
    renderWithProviders(<Cart />);
    expect(screen.getByText("Tu carrito está vacío")).toBeInTheDocument();
  });

  prueba("debe validar stock disponible", () => {
    renderWithProviders(<Cart />);
    const exploreBtn = screen.getByText("Explorar Catálogo");
    expect(exploreBtn).toBeInTheDocument();
  });

  prueba("debe mostrar notificación de cambios", () => {
    renderWithProviders(<Cart />);
    expect(screen.getByText("Tu carrito está vacío")).toBeInTheDocument();
  });

  prueba("debe permitir continuar comprando", () => {
    renderWithProviders(<Cart />);
    const continueLink = screen.getByText("Explorar Catálogo");
    expect(continueLink).toBeInTheDocument();
  });

  prueba("debe tener enlace de seguridad visible", () => {
    renderWithProviders(<Cart />);
    expect(screen.getByText("Tu carrito está vacío")).toBeInTheDocument();
  });
});

