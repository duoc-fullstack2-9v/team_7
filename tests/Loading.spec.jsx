import { describe, it, expect } from "vitest";
const prueba = it;
import { render, screen } from "@testing-library/react";
import Loading from "../src/components/Loading";

describe("Loading Component", () => {
  prueba("debe renderizar con mensaje por defecto", () => {
    render(<Loading />);
    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });

  prueba("debe renderizar con mensaje personalizado", () => {
    const customMessage = "Cargando juegos destacados...";
    render(<Loading message={customMessage} />);
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  prueba("debe tener contenedor de carga", () => {
    const { container } = render(<Loading />);
    expect(container.querySelector(".loading-container")).toBeInTheDocument();
  });

  prueba("debe tener spinner de carga", () => {
    const { container } = render(<Loading />);
    expect(container.querySelector(".loading-spinner")).toBeInTheDocument();
  });

  prueba("debe tener elemento spinner", () => {
    const { container } = render(<Loading />);
    expect(container.querySelector(".spinner")).toBeInTheDocument();
  });

  prueba("debe renderizar párrafo con mensaje de carga", () => {
    const customMessage = "Por favor espera...";
    render(<Loading message={customMessage} />);
    const paragraph = screen.getByText(customMessage);
    expect(paragraph.tagName).toBe("P");
    expect(paragraph).toHaveClass("loading-message");
  });
});
