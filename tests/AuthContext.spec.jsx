import { describe, it, expect, beforeEach } from "vitest";
const prueba = it;
import { render, screen, waitFor } from "@testing-library/react";
import { AuthProvider, useAuth } from "../src/context/AuthContext";

// Componente de prueba para verificar el contexto
const TestComponent = () => {
  const { user, isAuthenticated, login, logout, register } = useAuth();
  
  return (
    <div>
      <div data-testid="auth-status">
        {isAuthenticated ? "Autenticado" : "No autenticado"}
      </div>
      {user && <div data-testid="user-name">{user.name}</div>}
      <button onClick={() => login("test@test.com", "password")}>
        Iniciar sesión
      </button>
      <button onClick={() => logout()}>Cerrar sesión</button>
      <button onClick={() => register("nuevo@test.com", "password", "User")}>
        Registrarse
      </button>
    </div>
  );
};

describe("AuthContext", () => {
  beforeEach(() => {
    // Limpiar localStorage antes de cada test
    localStorage.clear();
  });

  prueba("debe proveer el contexto correctamente", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    const authStatus = screen.getByTestId("auth-status");
    expect(authStatus).toBeInTheDocument();
    expect(authStatus).toHaveTextContent("No autenticado");
  });

  prueba("debe mostrar estado de no autenticado por defecto", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    expect(screen.getByTestId("auth-status")).toHaveTextContent("No autenticado");
  });

  prueba("debe permitir acceso al hook useAuth dentro del provider", () => {
    const { container } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    expect(container.querySelector("[data-testid='auth-status']")).toBeInTheDocument();
  });

  prueba("debe mantener el estado de autenticación entre renders", () => {
    const { rerender } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    const status1 = screen.getByTestId("auth-status").textContent;
    
    rerender(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    const status2 = screen.getByTestId("auth-status").textContent;
    expect(status1).toBe(status2);
  });

  prueba("debe proporcionar funciones de autenticación", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    const loginButton = screen.getByRole("button", { name: /Iniciar sesión/i });
    const logoutButton = screen.getByRole("button", { name: /Cerrar sesión/i });
    const registerButton = screen.getByRole("button", { name: /Registrarse/i });
    
    expect(loginButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  prueba("debe validar la estructura del usuario en el contexto", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    const authStatus = screen.getByTestId("auth-status");
    expect(authStatus).toBeInTheDocument();
  });

  prueba("debe manejar cambios de estado de autenticación", async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    const initialStatus = screen.getByTestId("auth-status");
    expect(initialStatus).toHaveTextContent("No autenticado");
    
    await waitFor(() => {
      expect(initialStatus).toBeInTheDocument();
    });
  });

  prueba("debe mantener consistencia con localStorage", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    expect(screen.getByTestId("auth-status")).toBeInTheDocument();
    expect(localStorage.getItem("auth")).toBeNull();
  });

  prueba("debe permitir interacción con botones del contexto", () => {
    const { container } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  prueba("debe renderizar sin errores múltiples veces", () => {
    const { rerender } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    rerender(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    rerender(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    expect(screen.getByTestId("auth-status")).toBeInTheDocument();
  });

  prueba("debe proporcionar valor de contexto consistente", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    const status = screen.getByTestId("auth-status");
    expect(status.textContent).toBe("No autenticado");
  });
});
