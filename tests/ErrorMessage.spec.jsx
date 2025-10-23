import { describe, it, expect, vi } from "vitest";
const prueba = it;
import { render, screen, fireEvent } from "@testing-library/react";
import ErrorMessage from "../src/components/ErrorMessage";

describe("ErrorMessage Component", () => {
  prueba("debe renderizar título de error", () => {
    render(<ErrorMessage message="Test error" />);
    expect(screen.getByText("Oops! Algo salió mal")).toBeInTheDocument();
  });

  prueba("debe mostrar el mensaje de error", () => {
    const errorMsg = "No se pudieron cargar los juegos";
    render(<ErrorMessage message={errorMsg} />);
    expect(screen.getByText(errorMsg)).toBeInTheDocument();
  });

  prueba("debe mostrar mensaje de error por defecto cuando no se proporciona", () => {
    render(<ErrorMessage />);
    expect(screen.getByText("Error al cargar los datos")).toBeInTheDocument();
  });

  prueba("debe mostrar ícono de error", () => {
    const { container } = render(<ErrorMessage message="Test error" />);
    const errorIcon = container.querySelector(".error-icon");
    expect(errorIcon).toBeInTheDocument();
    expect(errorIcon.textContent).toBe("⚠️");
  });

  prueba("debe mostrar botón de reintentar cuando onRetry se proporciona", () => {
    const mockRetry = vi.fn();
    render(<ErrorMessage message="Test error" onRetry={mockRetry} />);
    const retryButton = screen.getByText("Intentar de nuevo");
    expect(retryButton).toBeInTheDocument();
  });

  prueba("no debe mostrar botón de reintentar cuando onRetry no se proporciona", () => {
    render(<ErrorMessage message="Test error" />);
    const retryButton = screen.queryByText("Intentar de nuevo");
    expect(retryButton).not.toBeInTheDocument();
  });

  prueba("debe llamar onRetry cuando se hace clic en botón de reintentar", () => {
    const mockRetry = vi.fn();
    render(<ErrorMessage message="Test error" onRetry={mockRetry} />);
    const retryButton = screen.getByText("Intentar de nuevo");
    fireEvent.click(retryButton);
    expect(mockRetry).toHaveBeenCalledOnce();
  });

  prueba("debe tener clases CSS correctas", () => {
    const { container } = render(
      <ErrorMessage message="Test error" onRetry={() => {}} />
    );
    expect(container.querySelector(".error-container")).toBeInTheDocument();
    expect(container.querySelector(".error-title")).toBeInTheDocument();
    expect(container.querySelector(".error-message")).toBeInTheDocument();
    expect(container.querySelector(".retry-btn")).toBeInTheDocument();
  });
});
