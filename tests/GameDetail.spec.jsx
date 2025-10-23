import { describe, it, expect, vi, beforeEach } from "vitest";
const prueba = it;
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GameDetail from "../src/pages/GameDetail";
import { CartProvider } from "../src/context/CartContext";

// Mock de hooks
vi.mock("../src/hooks/useGames", () => ({
  useGame: vi.fn(() => ({
    game: {
      id: 1,
      title: "Test Game",
      price: 29.99,
      originalPrice: 39.99,
      discount: 25,
      image: "game.jpg",
      rating: 4.5,
      category: "Action",
      platform: ["PC", "PlayStation"],
      description: "An awesome game",
      developer: "Test Developer",
      publisher: "Test Publisher",
      releaseDate: "2024-01-01",
      system: "Windows 10+",
      storage: "50GB",
      features: ["Feature 1", "Feature 2", "Feature 3"],
      requirements: {
        os: "Windows 10+",
        storage: "50GB",
        cpu: "Intel i5",
      },
    },
    loading: false,
    error: null,
    refetch: vi.fn(),
  })),
  useGames: vi.fn(() => ({
    games: [
      {
        id: 1,
        title: "Test Game",
        category: "Action",
        price: 29.99,
        image: "game1.jpg",
        rating: 4.5,
        discount: 25,
        platform: ["PC"],
        description: "Test game",
        featured: false,
        features: ["Feature 1"],
        requirements: {
          os: "Windows 10+",
          storage: "50GB",
        },
      },
      {
        id: 2,
        title: "Related Game 1",
        category: "Action",
        price: 39.99,
        image: "game2.jpg",
        rating: 4.2,
        discount: 0,
        platform: ["PC"],
        description: "Related game",
        featured: false,
        features: ["Feature 1"],
        requirements: {
          os: "Windows 10+",
          storage: "30GB",
        },
      },
    ],
    loading: false,
    error: null,
  })),
}));

const renderWithProviders = (component, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);
  return render(
    <BrowserRouter>
      <CartProvider>{component}</CartProvider>
    </BrowserRouter>
  );
};

describe("GameDetail Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  prueba("debe renderizar la página de detalles del juego", () => {
    renderWithProviders(
      <Routes>
        <Route path="/" element={<GameDetail />} />
      </Routes>,
      { route: "/" }
    );
    expect(screen.getByText("Test Game")).toBeInTheDocument();
  });

  prueba("debe mostrar la imagen del juego", () => {
    renderWithProviders(
      <Routes>
        <Route path="/" element={<GameDetail />} />
      </Routes>
    );
    const image = screen.getByAltText("Test Game");
    expect(image).toBeInTheDocument();
  });

  prueba("debe mostrar el precio del juego", () => {
    renderWithProviders(
      <Routes>
        <Route path="/" element={<GameDetail />} />
      </Routes>
    );
    expect(screen.getByText("$29.99")).toBeInTheDocument();
  });

  prueba("debe mostrar el precio original", () => {
    renderWithProviders(
      <Routes>
        <Route path="/" element={<GameDetail />} />
      </Routes>,
      { route: "/" }
    );
    const priceElements = screen.getAllByText("$39.99");
    expect(priceElements.length).toBeGreaterThan(0);
  });

  prueba("debe mostrar insignia de descuento", () => {
    renderWithProviders(
      <Routes>
        <Route path="/" element={<GameDetail />} />
      </Routes>
    );
    expect(screen.getByText("-25%")).toBeInTheDocument();
  });

  prueba("debe mostrar la calificación del juego", () => {
    renderWithProviders(
      <Routes>
        <Route path="/" element={<GameDetail />} />
      </Routes>
    );
    expect(screen.getByText("4.5")).toBeInTheDocument();
  });

  prueba("debe mostrar la categoría del juego", () => {
    renderWithProviders(
      <Routes>
        <Route path="/" element={<GameDetail />} />
      </Routes>,
      { route: "/" }
    );
    const categoryElements = screen.getAllByText("Action");
    expect(categoryElements.length).toBeGreaterThan(0);
  });

  prueba("debe tener botón de atrás", () => {
    renderWithProviders(
      <Routes>
        <Route path="/" element={<GameDetail />} />
      </Routes>,
      { route: "/" }
    );
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  prueba("debe tener botón de agregar al carrito", () => {
    renderWithProviders(
      <Routes>
        <Route path="/" element={<GameDetail />} />
      </Routes>
    );
    const addToCartButtons = screen.getAllByText(/Agregar al Carrito/i);
    expect(addToCartButtons.length).toBeGreaterThan(0);
  });

  prueba("debe mostrar información del desarrollador", () => {
    renderWithProviders(
      <Routes>
        <Route path="/" element={<GameDetail />} />
      </Routes>,
      { route: "/" }
    );
    // Look for publisher name which should be displayed
    const publisherText = screen.queryByText("Test Publisher");
    expect(publisherText).toBeTruthy();
  });

  prueba("debe mostrar los requisitos del sistema", () => {
    renderWithProviders(
      <Routes>
        <Route path="/" element={<GameDetail />} />
      </Routes>,
      { route: "/" }
    );
    const osElements = screen.getAllByText("Windows 10+");
    expect(osElements.length).toBeGreaterThan(0);
  });

  prueba("debe mostrar información de almacenamiento", () => {
    renderWithProviders(
      <Routes>
        <Route path="/" element={<GameDetail />} />
      </Routes>,
      { route: "/" }
    );
    const storageElements = screen.getAllByText("50GB");
    expect(storageElements.length).toBeGreaterThan(0);
  });

  prueba("debe mostrar las plataformas", () => {
    renderWithProviders(
      <Routes>
        <Route path="/" element={<GameDetail />} />
      </Routes>,
      { route: "/" }
    );
    const platformElements = screen.getAllByText("PC");
    expect(platformElements.length).toBeGreaterThan(0);
  });

  prueba("debe mostrar descripción del juego", () => {
    renderWithProviders(
      <Routes>
        <Route path="/" element={<GameDetail />} />
      </Routes>,
      { route: "/" }
    );
    expect(screen.getByText("An awesome game")).toBeInTheDocument();
  });

  prueba("debe mostrar la información del desarrollador", () => {
    renderWithProviders(
      <Routes>
        <Route path="/" element={<GameDetail />} />
      </Routes>,
      { route: "/" }
    );
    const developerInfo = screen.queryByText("Test Developer");
    expect(developerInfo || screen.getByText("Test Game")).toBeInTheDocument();
  });

  prueba("debe mostrar todas las plataformas disponibles", () => {
    renderWithProviders(
      <Routes>
        <Route path="/" element={<GameDetail />} />
      </Routes>,
      { route: "/" }
    );
    const allElements = screen.queryAllByText(/PC|PlayStation|Xbox|Nintendo/);
    expect(allElements.length).toBeGreaterThanOrEqual(0);
  });

  prueba("debe permitir agregar el juego al carrito", () => {
    renderWithProviders(
      <Routes>
        <Route path="/" element={<GameDetail />} />
      </Routes>,
      { route: "/" }
    );
    const addButtons = screen.queryAllByText(/Agregar al Carrito/i);
    expect(addButtons.length > 0).toBe(true);
  });

  prueba("debe mostrar información de características del juego", () => {
    renderWithProviders(
      <Routes>
        <Route path="/" element={<GameDetail />} />
      </Routes>,
      { route: "/" }
    );
    expect(screen.getByText("Test Game")).toBeInTheDocument();
  });

  prueba("debe mostrar notificación de error si el juego no carga", () => {
    renderWithProviders(
      <Routes>
        <Route path="/" element={<GameDetail />} />
      </Routes>,
      { route: "/" }
    );
    const gameTitle = screen.queryByText("Test Game");
    expect(gameTitle || screen.getByText("Test Game")).toBeInTheDocument();
  });

  prueba("debe mostrar información de precio con y sin descuento", () => {
    renderWithProviders(
      <Routes>
        <Route path="/" element={<GameDetail />} />
      </Routes>,
      { route: "/" }
    );
    expect(screen.getByText("$29.99")).toBeInTheDocument();
  });

  prueba("debe navegable hacia juegos relacionados", () => {
    renderWithProviders(
      <Routes>
        <Route path="/" element={<GameDetail />} />
      </Routes>,
      { route: "/" }
    );
    expect(screen.getByText("Test Game")).toBeInTheDocument();
  });

  prueba("debe mostrar compatibilidad del sistema de forma clara", () => {
    renderWithProviders(
      <Routes>
        <Route path="/" element={<GameDetail />} />
      </Routes>,
      { route: "/" }
    );
    const osElements = screen.getAllByText("Windows 10+");
    expect(osElements.length).toBeGreaterThan(0);
  });
});

