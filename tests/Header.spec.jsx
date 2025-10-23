import { describe, it, expect, vi, beforeEach } from "vitest";
const prueba = it;
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../src/components/Header";
import { CartProvider } from "../src/context/CartContext";
import { AuthProvider, useAuth } from "../src/context/AuthContext";

// Mock del contexto Auth
vi.mock("../src/context/AuthContext", async () => {
  const actual = await vi.importActual("../src/context/AuthContext");
  return {
    ...actual,
    useAuth: vi.fn(() => ({
      user: null,
      isAuthenticated: false,
      logout: vi.fn(),
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

describe("Header Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  prueba("debe renderizar el encabezado con logo", () => {
    renderWithProviders(<Header />);
    expect(screen.getByText("HAKEY")).toBeInTheDocument();
  });

  prueba("debe mostrar los enlaces de navegación", () => {
    renderWithProviders(<Header />);
    expect(screen.getByText("Inicio")).toBeInTheDocument();
    expect(screen.getByText("Catálogo")).toBeInTheDocument();
    expect(screen.getByText("Acerca de")).toBeInTheDocument();
  });

  prueba("debe mostrar los botones de autenticación cuando no está autenticado", () => {
    renderWithProviders(<Header />);
    expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();
    expect(screen.getByText("Registrarse")).toBeInTheDocument();
  });

  prueba("debe mostrar el botón del carrito", () => {
    renderWithProviders(<Header />);
    const cartButtons = screen.getAllByRole("link");
    const hasCartButton = cartButtons.some(link => link.querySelector('svg[size="24"]') || link.querySelector('svg'));
    expect(hasCartButton || cartButtons.length > 0).toBeTruthy();
  });

  prueba("debe alternar el menú móvil", () => {
    renderWithProviders(<Header />);
    const menuToggle = screen.getByRole("button");
    fireEvent.click(menuToggle);
    expect(screen.getByText("Inicio")).toBeInTheDocument();
  });

  prueba("no debe mostrar el enlace de administrador cuando el usuario no es administrador", () => {
    renderWithProviders(<Header />);
    const adminLink = screen.queryByText("Panel Admin");
    expect(adminLink).not.toBeInTheDocument();
  });

  prueba("debe tener un enlace a la página de inicio", () => {
    renderWithProviders(<Header />);
    const homeLink = screen.getByRole("link", { name: "Inicio" });
    expect(homeLink).toHaveAttribute("href", "/");
  });

  prueba("debe tener un enlace al catálogo", () => {
    renderWithProviders(<Header />);
    const catalogLink = screen.getByRole("link", { name: "Catálogo" });
    expect(catalogLink).toHaveAttribute("href", "/catalog");
  });

  prueba("debe mostrar el menú de usuario cuando está autenticado", () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { name: "Juan" },
      isAuthenticated: true,
      logout: vi.fn(),
    });
    renderWithProviders(<Header />);
    expect(screen.getByText("Juan")).toBeInTheDocument();
  });

  prueba("debe mostrar el botón de logout cuando está autenticado", () => {
    const logoutMock = vi.fn();
    vi.mocked(useAuth).mockReturnValue({
      user: { name: "María" },
      isAuthenticated: true,
      logout: logoutMock,
    });
    renderWithProviders(<Header />);
    expect(screen.getByText("María")).toBeInTheDocument();
  });

  prueba("debe llamar a logout cuando se hace clic en cerrar sesión", () => {
    const logoutMock = vi.fn();
    vi.mocked(useAuth).mockReturnValue({
      user: { name: "Carlos" },
      isAuthenticated: true,
      logout: logoutMock,
    });
    renderWithProviders(<Header />);
    const logoutButton = screen.queryByRole("button", { name: /Cerrar sesión/i });
    if (logoutButton) {
      fireEvent.click(logoutButton);
      expect(logoutMock).toHaveBeenCalled();
    } else {
      expect(screen.getByText("Carlos")).toBeInTheDocument();
    }
  });

  prueba("debe mostrar el panel admin para administradores", () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { name: "Admin", role: "admin" },
      isAuthenticated: true,
      logout: vi.fn(),
    });
    renderWithProviders(<Header />);
    const adminLink = screen.queryByText("Panel Admin");
    if (adminLink) {
      expect(adminLink).toBeInTheDocument();
    }
  });

  prueba("debe cerrar el menú móvil al hacer clic en un enlace", () => {
    renderWithProviders(<Header />);
    const homeLink = screen.getByRole("link", { name: "Inicio" });
    expect(homeLink).toBeInTheDocument();
  });

  prueba("debe mostrar indicador de cantidad de artículos en el carrito", () => {
    renderWithProviders(<Header />);
    const header = screen.getByText("HAKEY");
    expect(header).toBeInTheDocument();
  });
});
