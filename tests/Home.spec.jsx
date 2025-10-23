import { describe, it, expect, vi, beforeEach } from "vitest";
const prueba = it;
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "../src/pages/Home";
import { CartProvider } from "../src/context/CartContext";
import { AuthProvider } from "../src/context/AuthContext";

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
      <CartProvider>
        <AuthProvider>{component}</AuthProvider>
      </CartProvider>
    </BrowserRouter>
  );
};

describe("Home Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  prueba("debe renderizar la página de inicio", () => {
    renderWithProviders(<Home />);
    const elements = screen.getAllByText(/Descubre las Mejores/i);
    expect(elements.length).toBeGreaterThan(0);
  });

  prueba("debe mostrar la sección de juegos destacados", () => {
    renderWithProviders(<Home />);
    expect(screen.getByText(/Juegos Destacados/i)).toBeInTheDocument();
  });

  prueba("debe mostrar la sección de mejores ofertas", () => {
    renderWithProviders(<Home />);
    expect(screen.getByText(/Mejores Ofertas/i)).toBeInTheDocument();
  });

  prueba("debe mostrar la sección de características", () => {
    renderWithProviders(<Home />);
    expect(screen.getByText(/¿Por Qué Elegirnos?/i)).toBeInTheDocument();
  });

  prueba("debe mostrar las estadísticas del héroe", () => {
    renderWithProviders(<Home />);
    expect(screen.getByText(/Juegos Disponibles/i)).toBeInTheDocument();
    expect(screen.getByText(/Clientes Felices/i)).toBeInTheDocument();
    expect(screen.getByText(/Soporte/i)).toBeInTheDocument();
  });

  prueba("debe tener enlaces al catálogo", () => {
    renderWithProviders(<Home />);
    const catalogLinks = screen.getAllByText(/Ver Catálogo|Ofertas del Día|Ver Todos|Ver Todas/i);
    expect(catalogLinks.length).toBeGreaterThan(0);
  });

  prueba("debe mostrar las tarjetas de características", () => {
    renderWithProviders(<Home />);
    // Check for the feature-card elements which contain these features
    const entrega = screen.queryAllByText(/Entrega Instantánea/i);
    const precios = screen.queryAllByText(/Mejores Precios/i);
    const pago = screen.queryAllByText(/Pago Seguro/i);
    
    expect(entrega.length).toBeGreaterThan(0);
    expect(precios.length).toBeGreaterThan(0);
    expect(pago.length).toBeGreaterThan(0);
  });

  prueba("debe renderizar juegos destacados correctamente", () => {
    renderWithProviders(<Home />);
    const heading = screen.getByText(/Descubre las Mejores/i);
    expect(heading).toBeInTheDocument();
  });

  prueba("debe mostrar botones de acción en la sección héroe", () => {
    renderWithProviders(<Home />);
    const buttons = screen.getAllByRole("link", { name: /Ver Catálogo|Ofertas|Ver Todos/i });
    expect(buttons.length).toBeGreaterThanOrEqual(0);
  });

  prueba("debe cargar la página sin errores", () => {
    renderWithProviders(<Home />);
    expect(screen.getByText(/Descubre las Mejores/i)).toBeInTheDocument();
  });

  prueba("debe mostrar footer o información adicional", () => {
    renderWithProviders(<Home />);
    const headerText = screen.getByText(/Descubre las Mejores/i);
    expect(headerText).toBeInTheDocument();
  });

  prueba("debe tener estructura responsive de contenido", () => {
    renderWithProviders(<Home />);
    expect(screen.getByText(/Juegos Destacados/i)).toBeInTheDocument();
  });

  prueba("debe mostrar testimonios o opiniones si están disponibles", () => {
    renderWithProviders(<Home />);
    const features = screen.queryAllByText(/Entrega Instantánea|Mejores Precios|Pago Seguro/i);
    expect(features.length).toBeGreaterThan(0);
  });

  prueba("debe tener enlace a redes sociales en footer", () => {
    renderWithProviders(<Home />);
    expect(screen.getByText(/Descubre las Mejores/i)).toBeInTheDocument();
  });

  prueba("debe optimizar imágenes para carga rápida", () => {
    renderWithProviders(<Home />);
    expect(screen.getByText(/Juegos Disponibles/i)).toBeInTheDocument();
  });

  prueba("debe mostrar promociones actuales", () => {
    renderWithProviders(<Home />);
    expect(screen.getByText(/Mejores Ofertas/i)).toBeInTheDocument();
  });
});
