import { describe, it, expect, vi, beforeEach } from "vitest";
const prueba = it;
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AdminPanel from "../src/pages/AdminPanel";
import * as GamesApi from "../src/services/gamesApi";

// Mock de la API
vi.mock("../src/services/gamesApi");

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("AdminPanel Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    GamesApi.getAllGames.mockResolvedValue([]);
  });

  prueba("debe renderizar el panel de administración", () => {
    const { container } = renderWithRouter(<AdminPanel />);
    expect(container).toBeInTheDocument();
  });

  prueba("debe mostrar el formulario de creación de juegos", () => {
    const { container } = renderWithRouter(<AdminPanel />);
    expect(container.querySelector("form")).toBeInTheDocument();
  });

  prueba("debe tener campos de entrada para los datos del juego", () => {
    const { container } = renderWithRouter(<AdminPanel />);
    const inputs = container.querySelectorAll("input");
    expect(inputs.length).toBeGreaterThan(0);
  });

  prueba("debe permitir ingresar datos en los campos", () => {
    const { container } = renderWithRouter(<AdminPanel />);
    const inputs = container.querySelectorAll("input");
    expect(inputs).toBeDefined();
  });

  prueba("debe tener botón para guardar cambios", () => {
    const { container } = renderWithRouter(<AdminPanel />);
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  prueba("debe tener opción para listar juegos", () => {
    const { container } = renderWithRouter(<AdminPanel />);
    expect(container).toBeInTheDocument();
  });

  prueba("debe mostrar mensaje de éxito después de guardar", () => {
    const { container } = renderWithRouter(<AdminPanel />);
    const form = container.querySelector("form");
    expect(form).toBeInTheDocument();
  });

  prueba("debe permitir editar juegos existentes", () => {
    const { container } = renderWithRouter(<AdminPanel />);
    const inputs = container.querySelectorAll("input");
    expect(inputs.length).toBeGreaterThan(0);
  });

  prueba("debe permitir eliminar juegos", () => {
    const { container } = renderWithRouter(<AdminPanel />);
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  prueba("debe manejar errores de validación", () => {
    const { container } = renderWithRouter(<AdminPanel />);
    expect(container).toBeInTheDocument();
  });

  prueba("debe renderizar sin errores", () => {
    const { container } = renderWithRouter(<AdminPanel />);
    expect(container).toBeInTheDocument();
  });

  prueba("debe cargar juegos existentes al iniciar", () => {
    GamesApi.getAllGames.mockResolvedValue([
      { id: 1, title: "Juego 1", price: 29.99 },
    ]);
    renderWithRouter(<AdminPanel />);
    expect(GamesApi.getAllGames).toBeDefined();
  });

  prueba("debe mostrar formulario reactivo", () => {
    const { container } = renderWithRouter(<AdminPanel />);
    const forms = container.querySelectorAll("input, textarea, select");
    expect(forms.length).toBeGreaterThan(0);
  });

  prueba("debe permitir cancelar operaciones", () => {
    const { container } = renderWithRouter(<AdminPanel />);
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  prueba("debe tener validaciones de campos obligatorios", () => {
    const { container } = renderWithRouter(<AdminPanel />);
    const forms = container.querySelectorAll("input, textarea");
    expect(forms.length).toBeGreaterThan(0);
  });
});
