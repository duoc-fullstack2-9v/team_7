import { describe, it, expect, vi, beforeEach } from "vitest";
const prueba = it;
import { render, screen } from "@testing-library/react";
import TextType from "../src/components/TextType";

// Mock de GSAP
vi.mock("gsap", () => ({
  gsap: {
    set: vi.fn(),
    to: vi.fn(() => ({
      kill: vi.fn(),
    })),
  },
}));

describe("TextType Component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  prueba("debe renderizar con componente por defecto (div)", () => {
    const { container } = render(
      <TextType text="Hello" typingSpeed={50} />
    );
    expect(container.querySelector(".text-type")).toBeInTheDocument();
  });

  prueba("debe renderizar como span cuando se especifica", () => {
    const { container } = render(
      <TextType text="Hello" as="span" typingSpeed={50} />
    );
    expect(container.querySelector("span.text-type")).toBeInTheDocument();
  });

  prueba("debe tener estado inicial correcto", () => {
    const { container } = render(
      <TextType text="Hello" typingSpeed={50} />
    );
    const content = container.querySelector(".text-type__content");
    expect(content).toBeInTheDocument();
  });

  prueba("debe aceptar texto como cadena", () => {
    const { container } = render(
      <TextType text="Hello World" typingSpeed={50} />
    );
    expect(container.querySelector(".text-type")).toBeInTheDocument();
  });

  prueba("debe aceptar texto como matriz", () => {
    const { container } = render(
      <TextType text={["Hello", "World"]} typingSpeed={50} />
    );
    expect(container.querySelector(".text-type")).toBeInTheDocument();
  });

  prueba("debe renderizar cursor por defecto", () => {
    const { container } = render(
      <TextType text="Hello" typingSpeed={50} showCursor={true} />
    );
    expect(container.querySelector(".text-type__cursor")).toBeInTheDocument();
  });

  prueba("no debe renderizar cursor cuando showCursor es false", () => {
    const { container } = render(
      <TextType text="Hello" typingSpeed={50} showCursor={false} />
    );
    expect(container.querySelector(".text-type__cursor")).not.toBeInTheDocument();
  });

  prueba("debe mostrar carácter de cursor personalizado", () => {
    const { container } = render(
      <TextType
        text="Hello"
        typingSpeed={50}
        cursorCharacter="█"
        showCursor={true}
      />
    );
    const cursor = container.querySelector(".text-type__cursor");
    expect(cursor.textContent).toBe("█");
  });

  prueba("debe aceptar className personalizado", () => {
    const { container } = render(
      <TextType text="Hello" typingSpeed={50} className="custom-class" />
    );
    expect(container.querySelector(".text-type.custom-class")).toBeInTheDocument();
  });

  prueba("debe aceptar props adicionales", () => {
    const { container } = render(
      <TextType
        text="Hello"
        typingSpeed={50}
        data-testid="typing-text"
        role="presentation"
      />
    );
    const element = container.querySelector('[data-testid="typing-text"]');
    expect(element).toBeInTheDocument();
  });

  prueba("debe renderizar span text-type__content", () => {
    const { container } = render(
      <TextType text="Hello" typingSpeed={50} />
    );
    expect(container.querySelector(".text-type__content")).toBeInTheDocument();
  });

  prueba("debe tener clase de cursor correcta", () => {
    const { container } = render(
      <TextType
        text="Hello"
        typingSpeed={50}
        cursorClassName="custom-cursor"
        showCursor={true}
      />
    );
    const cursor = container.querySelector(".text-type__cursor");
    expect(cursor).toHaveClass("custom-cursor");
  });
});
