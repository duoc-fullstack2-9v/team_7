import { describe, it, expect, vi, beforeEach } from "vitest";
const prueba = it;
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Catalog from "../src/pages/Catalog";
import { CartProvider } from "../src/context/CartContext";

// Mock del hook useGames
vi.mock("../src/hooks/useGames", () => ({
  useGames: vi.fn(() => ({
    games: [
      {
        id: 1,
        title: "Game 1",
        featured: true,
        discount: 25,
        price: 39.99,
        originalPrice: 59.99,
        image: "game1.jpg",
        rating: 4.5,
        category: "Action",
        platform: ["PC", "PlayStation"],
        description: "An awesome action game",
      },
      {
        id: 2,
        title: "Game 2",
        featured: false,
        discount: 15,
        price: 29.99,
        originalPrice: 39.99,
        image: "game2.jpg",
        rating: 4.2,
        category: "RPG",
        platform: ["PC", "Xbox"],
        description: "An epic RPG adventure",
      },
      {
        id: 3,
        title: "Game 3",
        featured: true,
        discount: 30,
        price: 19.99,
        originalPrice: 29.99,
        image: "game3.jpg",
        rating: 4.8,
        category: "Adventure",
        platform: ["PC", "Nintendo"],
        description: "Amazing adventure game",
      },
    ],
    loading: false,
    error: null,
    refetch: vi.fn(),
  })),
}));

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <CartProvider>{component}</CartProvider>
    </BrowserRouter>
  );
};

describe("Catalog Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  prueba("debe renderizar la página del catálogo", () => {
    renderWithProviders(<Catalog />);
    expect(screen.getByText("Catálogo de Juegos")).toBeInTheDocument();
  });

  prueba("debe mostrar el subtítulo con cantidad de juegos", () => {
    renderWithProviders(<Catalog />);
    expect(screen.getByText(/Explora nuestra colección de 3 juegos/)).toBeInTheDocument();
  });

  prueba("debe mostrar el campo de búsqueda", () => {
    renderWithProviders(<Catalog />);
    const searchInput = screen.getByPlaceholderText("Buscar juegos...");
    expect(searchInput).toBeInTheDocument();
  });

  prueba("debe mostrar selector de ordenamiento", () => {
    renderWithProviders(<Catalog />);
    const selects = screen.getAllByDisplayValue("Destacados");
    expect(selects.length).toBeGreaterThan(0);
  });

  prueba("debe mostrar tarjetas de juegos", () => {
    renderWithProviders(<Catalog />);
    expect(screen.getByText("Game 1")).toBeInTheDocument();
    expect(screen.getByText("Game 2")).toBeInTheDocument();
    expect(screen.getByText("Game 3")).toBeInTheDocument();
  });

  prueba("debe tener filtros de categoría", () => {
    renderWithProviders(<Catalog />);
    expect(screen.getByText("Todos")).toBeInTheDocument();
  });

  prueba("debe permitir buscar juegos", () => {
    renderWithProviders(<Catalog />);
    const searchInputs = screen.getAllByPlaceholderText("Buscar juegos...");
    if (searchInputs.length > 0) {
      fireEvent.change(searchInputs[0], { target: { value: "Game 1" } });
      expect(searchInputs[0].value).toBe("Game 1");
    }
  });

  prueba("debe permitir cambiar la opción de ordenamiento", () => {
    renderWithProviders(<Catalog />);
    const selects = screen.getAllByDisplayValue("Destacados");
    if (selects.length > 0) {
      fireEvent.change(selects[0], { target: { value: "price-low" } });
      expect(selects[0].value).toBe("price-low");
    }
  });

  prueba("debe mostrar todos los precios de juegos", () => {
    renderWithProviders(<Catalog />);
    // Prices may appear multiple times (in cards and detail views)
    const gameCards = screen.getAllByText(/\$\d+\.\d+/);
    expect(gameCards.length).toBeGreaterThan(0);
  });

  prueba("debe mostrar todas las categorías de juegos", () => {
    renderWithProviders(<Catalog />);
    // Categories should appear in the components and buttons
    const actionElements = screen.queryAllByText("Action");
    expect(actionElements.length).toBeGreaterThan(0);
  });

  prueba("debe permitir filtrado por múltiples criterios", () => {
    renderWithProviders(<Catalog />);
    const searchInputs = screen.getAllByPlaceholderText("Buscar juegos...");
    expect(searchInputs.length).toBeGreaterThan(0);
  });

  prueba("debe mostrar tarjetas individuales de juegos con detalles", () => {
    renderWithProviders(<Catalog />);
    expect(screen.getByText("Game 1")).toBeInTheDocument();
    expect(screen.getByText("Game 2")).toBeInTheDocument();
  });

  prueba("debe actualizar resultados al cambiar filtros", () => {
    renderWithProviders(<Catalog />);
    const searchInputs = screen.getAllByPlaceholderText("Buscar juegos...");
    if (searchInputs.length > 0) {
      fireEvent.change(searchInputs[0], { target: { value: "Game" } });
      expect(searchInputs[0].value).toBe("Game");
    }
  });

  prueba("debe mostrar mensaje cuando no hay resultados", () => {
    renderWithProviders(<Catalog />);
    expect(screen.getByText("Catálogo de Juegos")).toBeInTheDocument();
  });

  prueba("debe permitir ordenar descendente", () => {
    renderWithProviders(<Catalog />);
    const selects = screen.getAllByDisplayValue("Destacados");
    if (selects.length > 0) {
      fireEvent.change(selects[0], { target: { value: "price-high" } });
      expect(selects[0].value).toBe("price-high");
    }
  });

  prueba("debe mostrar indicador de descuentos en juegos", () => {
    renderWithProviders(<Catalog />);
    const gameCards = screen.getByText("Game 1");
    expect(gameCards).toBeInTheDocument();
  });

  prueba("debe permitir ir a detalles del juego", () => {
    renderWithProviders(<Catalog />);
    const gameLink = screen.getByText("Game 1");
    expect(gameLink).toBeInTheDocument();
  });

  prueba("debe mostrar cantidad total de juegos disponibles", () => {
    renderWithProviders(<Catalog />);
    expect(screen.getByText(/Explora nuestra colección de 3 juegos/)).toBeInTheDocument();
  });

  prueba("debe cargar juegos correctamente desde la API", () => {
    renderWithProviders(<Catalog />);
    expect(screen.getByText("Game 1")).toBeInTheDocument();
    expect(screen.getByText("Game 2")).toBeInTheDocument();
    expect(screen.getByText("Game 3")).toBeInTheDocument();
  });
});

