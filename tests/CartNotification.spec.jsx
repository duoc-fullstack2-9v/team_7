import { describe, it, expect } from "vitest";
const prueba = it;
import { render, screen } from "@testing-library/react";
import CartNotification from "../src/components/CartNotification";

describe("CartNotification Component", () => {
  prueba("debe renderizar notificación con mensaje", () => {
    const message = "Producto agregado al carrito";
    render(<CartNotification message={message} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  prueba("no debe renderizar cuando el mensaje no se proporciona", () => {
    const { container } = render(<CartNotification message={null} />);
    expect(container.firstChild).toBeNull();
  });

  prueba("no debe renderizar cuando el mensaje está vacío", () => {
    const { container } = render(<CartNotification message="" />);
    expect(container.firstChild).toBeNull();
  });

  prueba("debe tener contenedor de notificación", () => {
    render(<CartNotification message="Test notification" />);
    const { container } = render(<CartNotification message="Test" />);
    expect(container.querySelector(".cart-notification")).toBeInTheDocument();
  });

  prueba("debe mostrar ícono de notificación", () => {
    const { container } = render(
      <CartNotification message="Producto agregado" />
    );
    const icon = container.querySelector(".notification-icon");
    expect(icon).toBeInTheDocument();
  });

  prueba("debe renderizar span con texto del mensaje", () => {
    render(<CartNotification message="Producto agregado al carrito" />);
    const span = screen.getByText("Producto agregado al carrito");
    expect(span.tagName).toBe("SPAN");
  });
});
