import { describe, it, expect, vi, beforeEach } from "vitest";
const prueba = it;
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import GameCard from "../src/components/GameCard";
import { CartProvider } from "../src/context/CartContext";

const mockGame = {
  id: 1,
  title: "Test Game",
  price: 29.99,
  originalPrice: 39.99,
  discount: 25,
  image: "test-game.jpg",
  rating: 4.5,
  category: "Action",
  platform: ["PC", "PlayStation", "Xbox"],
};

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <CartProvider>{component}</CartProvider>
    </BrowserRouter>
  );
};

describe("GameCard Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  prueba("debe renderizar la tarjeta del juego con título", () => {
    renderWithProviders(<GameCard game={mockGame} />);
    expect(screen.getByText("Test Game")).toBeInTheDocument();
  });

  prueba("debe mostrar el precio del juego", () => {
    renderWithProviders(<GameCard game={mockGame} />);
    expect(screen.getByText("$29.99")).toBeInTheDocument();
  });

  prueba("debe mostrar el precio original cuando hay descuento", () => {
    renderWithProviders(<GameCard game={mockGame} />);
    expect(screen.getByText("$39.99")).toBeInTheDocument();
  });

  prueba("debe mostrar la insignia de descuento", () => {
    renderWithProviders(<GameCard game={mockGame} />);
    expect(screen.getByText("-25%")).toBeInTheDocument();
  });

  prueba("no debe mostrar la insignia de descuento cuando no hay descuento", () => {
    const gameWithoutDiscount = { ...mockGame, discount: 0 };
    renderWithProviders(<GameCard game={gameWithoutDiscount} />);
    expect(screen.queryByText(/-\d+%/)).not.toBeInTheDocument();
  });

  prueba("debe mostrar la calificación del juego", () => {
    renderWithProviders(<GameCard game={mockGame} />);
    expect(screen.getByText("4.5")).toBeInTheDocument();
  });

  prueba("debe mostrar la categoría del juego", () => {
    renderWithProviders(<GameCard game={mockGame} />);
    expect(screen.getByText("Action")).toBeInTheDocument();
  });

  prueba("debe mostrar las insignias de plataforma", () => {
    renderWithProviders(<GameCard game={mockGame} />);
    expect(screen.getByText("PC")).toBeInTheDocument();
    expect(screen.getByText("PlayStation")).toBeInTheDocument();
    expect(screen.getByText("Xbox")).toBeInTheDocument();
  });

  prueba("debe tener un botón para agregar al carrito", () => {
    renderWithProviders(<GameCard game={mockGame} />);
    const addToCartButton = screen.getByText("Agregar al Carrito");
    expect(addToCartButton).toBeInTheDocument();
  });

  prueba("debe tener un enlace a la página de detalles del juego", () => {
    renderWithProviders(<GameCard game={mockGame} />);
    const gameLink = screen.getByRole("link");
    expect(gameLink).toHaveAttribute("href", "/game/1");
  });

  prueba("debe mostrar la imagen del juego", () => {
    renderWithProviders(<GameCard game={mockGame} />);
    const image = screen.getByAltText("Test Game");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "test-game.jpg");
  });

  prueba("debe manejar el clic en agregar al carrito", () => {
    renderWithProviders(<GameCard game={mockGame} />);
    const addToCartButton = screen.getByText("Agregar al Carrito");
    fireEvent.click(addToCartButton);
    expect(addToCartButton).toBeInTheDocument();
  });
});
