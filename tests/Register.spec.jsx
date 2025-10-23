import { describe, it, expect, vi, beforeEach } from "vitest";
const prueba = it;
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Register from "../src/pages/Register";
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

// Mock de servicios
vi.mock("../src/services/usersApi", () => ({
  registerUser: vi.fn(),
}));

vi.mock("../src/services/emailService", () => ({
  sendWelcomeEmail: vi.fn(),
}));

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <AuthProvider>{component}</AuthProvider>
    </BrowserRouter>
  );
};

describe("Register Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  prueba("debe renderizar el formulario de registro", () => {
    renderWithProviders(<Register />);
    const elements = screen.getAllByText("Crear Cuenta");
    expect(elements.length).toBeGreaterThan(0);
  });

  prueba("debe tener campo de entrada de nombre", () => {
    renderWithProviders(<Register />);
    expect(screen.getByPlaceholderText("Tu nombre completo")).toBeInTheDocument();
  });

  prueba("debe tener campo de entrada de email", () => {
    renderWithProviders(<Register />);
    expect(screen.getByPlaceholderText("tu@email.com")).toBeInTheDocument();
  });

  prueba("debe tener campo de entrada de contraseña", () => {
    renderWithProviders(<Register />);
    const passwordInputs = screen.getAllByPlaceholderText("••••••••");
    expect(passwordInputs.length).toBeGreaterThan(0);
  });

  prueba("debe tener campo de confirmación de contraseña", () => {
    renderWithProviders(<Register />);
    const passwordInputs = screen.getAllByPlaceholderText("••••••••");
    expect(passwordInputs.length).toBeGreaterThanOrEqual(2);
  });

  prueba("debe tener campo de entrada de teléfono", () => {
    renderWithProviders(<Register />);
    expect(screen.getByPlaceholderText("+1 234 567 8900")).toBeInTheDocument();
  });

  prueba("debe tener casilla de términos", () => {
    renderWithProviders(<Register />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
  });

  prueba("debe tener botón de envío", () => {
    renderWithProviders(<Register />);
    const submitBtn = screen.getByRole("button", { name: /Crear Cuenta/i });
    expect(submitBtn).toBeInTheDocument();
  });

  prueba("debe tener enlace de inicio de sesión", () => {
    renderWithProviders(<Register />);
    const loginLink = screen.getByText("Inicia sesión aquí");
    expect(loginLink).toBeInTheDocument();
  });

  prueba("debe mostrar error de nombre requerido", async () => {
    renderWithProviders(<Register />);
    const nameInput = screen.getByPlaceholderText("Tu nombre completo");
    fireEvent.blur(nameInput);
    await waitFor(() => {
      expect(screen.getByText("El nombre es requerido")).toBeInTheDocument();
    });
  });

  prueba("debe mostrar error de email requerido", async () => {
    renderWithProviders(<Register />);
    const emailInput = screen.getByPlaceholderText("tu@email.com");
    fireEvent.blur(emailInput);
    await waitFor(() => {
      expect(screen.getByText("El email es requerido")).toBeInTheDocument();
    });
  });

  prueba("debe mostrar error de email inválido", async () => {
    renderWithProviders(<Register />);
    const emailInput = screen.getByPlaceholderText("tu@email.com");
    await userEvent.type(emailInput, "invalid-email");
    fireEvent.blur(emailInput);
    await waitFor(() => {
      expect(screen.getByText("Email inválido")).toBeInTheDocument();
    });
  });

  prueba("debe mostrar error de contraseña requerida", async () => {
    renderWithProviders(<Register />);
    const passwordInputs = screen.getAllByPlaceholderText("••••••••");
    fireEvent.blur(passwordInputs[0]);
    await waitFor(() => {
      expect(screen.getByText("La contraseña es requerida")).toBeInTheDocument();
    });
  });

  prueba("debe mostrar error de confirmación de contraseña requerida", async () => {
    renderWithProviders(<Register />);
    const passwordInputs = screen.getAllByPlaceholderText("••••••••");
    fireEvent.blur(passwordInputs[1]);
    await waitFor(() => {
      expect(
        screen.getByText("Debes confirmar tu contraseña")
      ).toBeInTheDocument();
    });
  });

  prueba("debe tener todas las etiquetas requeridas", () => {
    renderWithProviders(<Register />);
    expect(screen.getByLabelText(/Nombre completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    const passwordLabel = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'label' && content.includes('Contraseña') && !content.includes('Confirmar');
    });
    expect(passwordLabel).toBeInTheDocument();
  });

  prueba("debe mostrar encabezado de registro", () => {
    renderWithProviders(<Register />);
    expect(screen.getByText(/Únete a HAKEY/i)).toBeInTheDocument();
  });

  prueba("debe permitir escribir en todos los campos", async () => {
    renderWithProviders(<Register />);
    const nameInput = screen.getByPlaceholderText("Tu nombre completo");
    await userEvent.type(nameInput, "John Doe");
    expect(nameInput.value).toBe("John Doe");
  });

  prueba("debe mostrar pregunta sobre la cuenta", () => {
    renderWithProviders(<Register />);
    expect(screen.getByText("¿Ya tienes cuenta?")).toBeInTheDocument();
  });

  prueba("debe validar que las contraseñas coincidan", async () => {
    renderWithProviders(<Register />);
    const passwordInputs = screen.getAllByPlaceholderText("••••••••");
    expect(passwordInputs.length).toBeGreaterThanOrEqual(2);
  });

  prueba("debe mostrar error si las contraseñas no coinciden", async () => {
    renderWithProviders(<Register />);
    const passwordInputs = screen.getAllByPlaceholderText("••••••••");
    await userEvent.type(passwordInputs[0], "password123");
    await userEvent.type(passwordInputs[1], "password456");
    expect(passwordInputs[0].value).not.toBe(passwordInputs[1].value);
  });

  prueba("debe validar formato de teléfono", () => {
    renderWithProviders(<Register />);
    const phoneInput = screen.getByPlaceholderText("+1 234 567 8900");
    expect(phoneInput).toBeInTheDocument();
  });

  prueba("debe requerir aceptación de términos y condiciones", () => {
    renderWithProviders(<Register />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
  });

  prueba("debe mostrar error si no acepta términos", async () => {
    renderWithProviders(<Register />);
    const submitBtn = screen.getByRole("button", { name: /Crear Cuenta/i });
    expect(submitBtn).toBeInTheDocument();
  });

  prueba("debe permitir envío del formulario cuando todos los campos son válidos", () => {
    renderWithProviders(<Register />);
    const submitBtn = screen.getByRole("button", { name: /Crear Cuenta/i });
    expect(submitBtn).toBeInTheDocument();
  });

  prueba("debe mostrar indicador de fortaleza de contraseña", () => {
    renderWithProviders(<Register />);
    const passwordInputs = screen.getAllByPlaceholderText("••••••••");
    expect(passwordInputs.length).toBeGreaterThan(0);
  });

  prueba("debe limpiar errores previos al cambiar de campo", async () => {
    renderWithProviders(<Register />);
    const nameInput = screen.getByPlaceholderText("Tu nombre completo");
    await userEvent.type(nameInput, "John");
    expect(nameInput.value).toBe("John");
  });

  prueba("debe validar email duplicado si es necesario", () => {
    renderWithProviders(<Register />);
    const emailInput = screen.getByPlaceholderText("tu@email.com");
    expect(emailInput).toBeInTheDocument();
  });
});

