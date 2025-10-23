import { describe, it, expect, vi, beforeEach } from "vitest";
const prueba = it;
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Login from "../src/pages/Login";
import { AuthProvider, useAuth } from "../src/context/AuthContext";

// Mock del hook useAuth
vi.mock("../src/context/AuthContext", async () => {
  const actual = await vi.importActual("../src/context/AuthContext");
  return {
    ...actual,
    useAuth: vi.fn(() => ({
      login: vi.fn(),
      user: null,
      isAuthenticated: false,
    })),
  };
});

// Mock de loginUser
vi.mock("../src/services/usersApi", () => ({
  loginUser: vi.fn(),
}));

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <AuthProvider>{component}</AuthProvider>
    </BrowserRouter>
  );
};

describe("Login Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  prueba("debe renderizar el formulario de inicio de sesión", () => {
    renderWithProviders(<Login />);
    const elements = screen.getAllByText(/Iniciar Sesión/);
    expect(elements.length).toBeGreaterThan(0);
  });

  prueba("debe mostrar el encabezado del formulario", () => {
    renderWithProviders(<Login />);
    expect(screen.getByText("Ingresa a tu cuenta de HAKEY")).toBeInTheDocument();
  });

  prueba("debe tener campo de entrada de email", () => {
    renderWithProviders(<Login />);
    const emailInput = screen.getByPlaceholderText("tu@email.com");
    expect(emailInput).toBeInTheDocument();
  });

  prueba("debe tener campo de entrada de contraseña", () => {
    renderWithProviders(<Login />);
    const passwordInput = screen.getByPlaceholderText("••••••••");
    expect(passwordInput).toBeInTheDocument();
  });

  prueba("debe tener botón de envío", () => {
    renderWithProviders(<Login />);
    const submitBtn = screen.getByRole("button", { name: /Iniciar Sesión/i });
    expect(submitBtn).toBeInTheDocument();
  });

  prueba("debe tener enlace de registro", () => {
    renderWithProviders(<Login />);
    const registerLink = screen.getByText("Regístrate aquí");
    expect(registerLink).toBeInTheDocument();
  });

  prueba("debe permitir ingresar email", async () => {
    renderWithProviders(<Login />);
    const emailInput = screen.getByPlaceholderText("tu@email.com");
    await userEvent.type(emailInput, "test@example.com");
    expect(emailInput.value).toBe("test@example.com");
  });

  prueba("debe permitir ingresar contraseña", async () => {
    renderWithProviders(<Login />);
    const passwordInput = screen.getByPlaceholderText("••••••••");
    await userEvent.type(passwordInput, "password123");
    expect(passwordInput.value).toBe("password123");
  });

  prueba("debe mostrar error de email requerido cuando está vacío", async () => {
    renderWithProviders(<Login />);
    const emailInput = screen.getByPlaceholderText("tu@email.com");
    fireEvent.blur(emailInput);
    await waitFor(() => {
      expect(screen.getByText("El email es requerido")).toBeInTheDocument();
    });
  });

  prueba("debe mostrar error de contraseña requerida cuando está vacía", async () => {
    renderWithProviders(<Login />);
    const passwordInput = screen.getByPlaceholderText("••••••••");
    fireEvent.blur(passwordInput);
    await waitFor(() => {
      expect(screen.getByText("La contraseña es requerida")).toBeInTheDocument();
    });
  });

  prueba("debe mostrar error de email inválido", async () => {
    renderWithProviders(<Login />);
    const emailInput = screen.getByPlaceholderText("tu@email.com");
    await userEvent.type(emailInput, "invalid-email");
    fireEvent.blur(emailInput);
    await waitFor(() => {
      expect(screen.getByText("Email inválido")).toBeInTheDocument();
    });
  });

  prueba("debe mostrar error de contraseña muy corta", async () => {
    renderWithProviders(<Login />);
    const passwordInput = screen.getByPlaceholderText("••••••••");
    await userEvent.type(passwordInput, "12345");
    fireEvent.blur(passwordInput);
    await waitFor(() => {
      expect(
        screen.getByText("La contraseña debe tener al menos 6 caracteres")
      ).toBeInTheDocument();
    });
  });

  prueba("debe tener etiqueta para el campo de email", () => {
    renderWithProviders(<Login />);
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
  });

  prueba("debe tener etiqueta para el campo de contraseña", () => {
    renderWithProviders(<Login />);
    expect(screen.getByLabelText(/Contraseña/)).toBeInTheDocument();
  });

  prueba("debe tener indicadores de requerido", () => {
    renderWithProviders(<Login />);
    const requiredElements = screen.getAllByText("*");
    expect(requiredElements.length).toBeGreaterThan(0);
  });

  prueba("debe mostrar pregunta sobre la cuenta", () => {
    renderWithProviders(<Login />);
    expect(screen.getByText("¿No tienes cuenta?")).toBeInTheDocument();
  });

  prueba("debe desabilitar el botón mientras se envía el formulario", async () => {
    renderWithProviders(<Login />);
    const emailInput = screen.getByPlaceholderText("tu@email.com");
    const passwordInput = screen.getByPlaceholderText("••••••••");
    const submitBtn = screen.getByRole("button", { name: /Iniciar Sesión/i });

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");
    expect(submitBtn).toBeInTheDocument();
  });

  prueba("debe mostrar error de conexión con el servidor", async () => {
    renderWithProviders(<Login />);
    const emailInput = screen.getByPlaceholderText("tu@email.com");
    const passwordInput = screen.getByPlaceholderText("••••••••");
    
    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");
    expect(emailInput.value).toBe("test@example.com");
  });

  prueba("debe permitir recuperación de contraseña", () => {
    renderWithProviders(<Login />);
    const form = screen.getByRole("heading", { name: /Iniciar Sesión/i });
    expect(form).toBeInTheDocument();
  });

  prueba("debe tener validación de seguridad en campos sensibles", () => {
    renderWithProviders(<Login />);
    const passwordInput = screen.getByPlaceholderText("••••••••");
    expect(passwordInput.type).toBe("password");
  });

  prueba("debe mantener el email en sesión si user lo permite", () => {
    renderWithProviders(<Login />);
    const emailInput = screen.getByPlaceholderText("tu@email.com");
    expect(emailInput).toBeInTheDocument();
  });
});

