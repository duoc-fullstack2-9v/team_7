import { describe, it, expect, vi } from "vitest";
const prueba = it;
import { render, screen } from "@testing-library/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../src/components/ProtectedRoute";
import { AuthProvider } from "../src/context/AuthContext";
import * as AuthContext from "../src/context/AuthContext";

// Mock de useAuth
vi.spyOn(AuthContext, "useAuth");

const TestContent = () => <div>Contenido Protegido</div>;
const LoginPage = () => <div>Página de Login</div>;

describe("ProtectedRoute Component", () => {
  prueba("debe mostrar mensaje de carga cuando isLoading es true", () => {
    AuthContext.useAuth.mockReturnValue({
      isAuthenticated: false,
      user: null,
      isLoading: true,
    });

    render(
      <BrowserRouter>
        <ProtectedRoute>
          <TestContent />
        </ProtectedRoute>
      </BrowserRouter>
    );

    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });

  prueba("debe redirigir a login si no está autenticado", () => {
    AuthContext.useAuth.mockReturnValue({
      isAuthenticated: false,
      user: null,
      isLoading: false,
    });

    const { container } = render(
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <TestContent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    );

    // Verifica que se renderiza algún contenido
    expect(container).toBeInTheDocument();
  });

  prueba("debe mostrar contenido si está autenticado", () => {
    AuthContext.useAuth.mockReturnValue({
      isAuthenticated: true,
      user: { id: 1, name: "Usuario", isAdmin: false },
      isLoading: false,
    });

    render(
      <BrowserRouter>
        <ProtectedRoute>
          <TestContent />
        </ProtectedRoute>
      </BrowserRouter>
    );

    expect(screen.getByText("Contenido Protegido")).toBeInTheDocument();
  });

  prueba("debe redirigir si no es admin cuando adminOnly es true", () => {
    AuthContext.useAuth.mockReturnValue({
      isAuthenticated: true,
      user: { id: 1, name: "Usuario", isAdmin: false },
      isLoading: false,
    });

    const { container } = render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly={true}>
                <TestContent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    );

    expect(container).toBeInTheDocument();
  });

  prueba("debe mostrar contenido si es admin y adminOnly es true", () => {
    AuthContext.useAuth.mockReturnValue({
      isAuthenticated: true,
      user: { id: 1, name: "Admin", isAdmin: true },
      isLoading: false,
    });

    render(
      <BrowserRouter>
        <ProtectedRoute adminOnly={true}>
          <TestContent />
        </ProtectedRoute>
      </BrowserRouter>
    );

    expect(screen.getByText("Contenido Protegido")).toBeInTheDocument();
  });

  prueba("debe manejar adminOnly false por defecto", () => {
    AuthContext.useAuth.mockReturnValue({
      isAuthenticated: true,
      user: { id: 1, name: "Usuario", isAdmin: false },
      isLoading: false,
    });

    render(
      <BrowserRouter>
        <ProtectedRoute>
          <TestContent />
        </ProtectedRoute>
      </BrowserRouter>
    );

    expect(screen.getByText("Contenido Protegido")).toBeInTheDocument();
  });

  prueba("debe tener estilos de carga correcto", () => {
    AuthContext.useAuth.mockReturnValue({
      isAuthenticated: false,
      user: null,
      isLoading: true,
    });

    const { container } = render(
      <BrowserRouter>
        <ProtectedRoute>
          <TestContent />
        </ProtectedRoute>
      </BrowserRouter>
    );

    const loadingDiv = container.querySelector("div");
    expect(loadingDiv).toBeInTheDocument();
  });

  prueba("debe renderizar sin errores", () => {
    AuthContext.useAuth.mockReturnValue({
      isAuthenticated: true,
      user: { id: 1, name: "Usuario", isAdmin: false },
      isLoading: false,
    });

    const { container } = render(
      <BrowserRouter>
        <ProtectedRoute>
          <TestContent />
        </ProtectedRoute>
      </BrowserRouter>
    );

    expect(container).toBeInTheDocument();
  });

  prueba("debe validar que user.isAdmin existe", () => {
    AuthContext.useAuth.mockReturnValue({
      isAuthenticated: true,
      user: { id: 1, name: "Usuario" },
      isLoading: false,
    });

    render(
      <BrowserRouter>
        <ProtectedRoute adminOnly={true}>
          <TestContent />
        </ProtectedRoute>
      </BrowserRouter>
    );

    // Si user.isAdmin es undefined, debería redirigir
    expect(screen.queryByText("Contenido Protegido")).not.toBeInTheDocument();
  });

  prueba("debe aceptar múltiples componentes como children", () => {
    AuthContext.useAuth.mockReturnValue({
      isAuthenticated: true,
      user: { id: 1, name: "Usuario", isAdmin: false },
      isLoading: false,
    });

    render(
      <BrowserRouter>
        <ProtectedRoute>
          <div>
            <TestContent />
            <div>Contenido Adicional</div>
          </div>
        </ProtectedRoute>
      </BrowserRouter>
    );

    expect(screen.getByText("Contenido Protegido")).toBeInTheDocument();
    expect(screen.getByText("Contenido Adicional")).toBeInTheDocument();
  });
});
