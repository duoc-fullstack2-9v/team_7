# 💻 Ejemplos Prácticos de Pruebas - HAKEY

## ¿Cómo Se Escribe Una Prueba?

### Ejemplo 1: Prueba Simple

```javascript
// Importar herramientas
import { render, screen } from "@testing-library/react";
import GameCard from "../src/components/GameCard";

// Describen agrupado de pruebas
describe("GameCard Component", () => {
  // Una prueba
  it("should render game card with title", () => {
    // Datos simulados
    const mockGame = {
      id: 1,
      title: "Test Game",
      price: 29.99,
      image: "game.jpg",
    };

    // Renderizar componente
    render(<GameCard game={mockGame} />);

    // Verificar que aparece el título
    expect(screen.getByText("Test Game")).toBeInTheDocument();
  });
});
```

**¿Qué pasó?**
1. Creamos datos simulados
2. Renderizamos el componente con esos datos
3. Buscamos el texto "Test Game"
4. Verificamos que existe

---

## Estructura Básica De Una Prueba

```
┌─ describe("Nombre del componente")
│  │
│  ├─ beforeEach(() => {
│  │  └─ Setup: Preparar datos antes de cada test
│  │
│  ├─ it("debe hacer X", () => {
│  │  ├─ ARRANGE: Preparar datos
│  │  ├─ ACT: Ejecutar acción
│  │  └─ ASSERT: Verificar resultado
│  │
│  └─ it("debe hacer Y", () => {
│     ├─ ARRANGE...
│     ├─ ACT...
│     └─ ASSERT...
```

---

## Ejemplo 2: Prueba Con Validación

```javascript
// Prueba que verifica que un campo es requerido
it("should show email required error when empty", async () => {
  // ARRANGE: Preparar
  render(<Login />);
  const emailInput = screen.getByPlaceholderText("tu@email.com");

  // ACT: Ejecutar
  fireEvent.blur(emailInput); // Click afuera del input

  // ASSERT: Verificar
  await waitFor(() => {
    expect(screen.getByText("El email es requerido")).toBeInTheDocument();
  });
});
```

**¿Qué pasó?**
1. Renderizamos el formulario
2. Encontramos el campo de email
3. Simulamos que el usuario hace click afuera (blur)
4. Esperamos el mensaje de error
5. Verificamos que el error aparece

---

## Ejemplo 3: Prueba Con Click

```javascript
it("should add to cart when button is clicked", () => {
  // ARRANGE
  const mockGame = {
    id: 1,
    title: "Game",
    price: 29.99,
    image: "game.jpg",
  };
  
  render(<GameCard game={mockGame} />);
  const addButton = screen.getByText("Agregar al Carrito");

  // ACT
  fireEvent.click(addButton);

  // ASSERT
  expect(mockGameFunction).toHaveBeenCalled(); // Verificar que se ejecutó
});
```

**¿Qué pasó?**
1. Preparamos datos
2. Encontramos el botón
3. Hacemos click
4. Verificamos que la función se ejecutó

---

## Ejemplo 4: Prueba Con Escritura

```javascript
it("should allow entering email", async () => {
  // ARRANGE
  render(<Login />);
  const emailInput = screen.getByPlaceholderText("tu@email.com");

  // ACT
  await userEvent.type(emailInput, "test@example.com");

  // ASSERT
  expect(emailInput.value).toBe("test@example.com");
});
```

**¿Qué pasó?**
1. Renderizamos el formulario
2. Encontramos el input
3. Escribimos un email (como si el usuario escribiera)
4. Verificamos que el texto se guardó

---

## Ejemplo 5: Prueba Con Mocks

```javascript
// Simular que una función de API existe
vi.mock("../src/hooks/useGames", () => ({
  useGames: vi.fn(() => ({
    games: [
      { id: 1, title: "Game 1", price: 29.99 },
      { id: 2, title: "Game 2", price: 39.99 },
    ],
    loading: false,
    error: null,
  })),
}));

// Ahora la prueba puede usar datos simulados sin API real
it("should display game list", () => {
  render(<Catalog />);
  
  expect(screen.getByText("Game 1")).toBeInTheDocument();
  expect(screen.getByText("Game 2")).toBeInTheDocument();
});
```

**¿Qué pasó?**
1. Creamos una versión falsa de `useGames`
2. Devuelve datos simulados
3. La prueba usa esos datos sin llamar a la API real
4. Es rápido y no depende de internet

---

## Ejemplo 6: Prueba Con Providers

```javascript
// Algunos componentes necesitan Providers (contexto)
const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <CartProvider>
        {component}
      </CartProvider>
    </BrowserRouter>
  );
};

it("should add to cart", () => {
  // Necesita CartProvider para funcionar
  renderWithProviders(<GameCard game={mockGame} />);
  
  const button = screen.getByText("Agregar al Carrito");
  fireEvent.click(button);
  
  // Ahora funciona porque CartProvider existe
  expect(button).toBeInTheDocument();
});
```

**¿Qué pasó?**
1. Algunos componentes necesitan contexto
2. Creamos función helper `renderWithProviders`
3. Envuelve el componente en providers necesarios
4. Ahora todo funciona

---

## Métodos Más Comunes

### Búsqueda (Query)

```javascript
// Buscar por texto (el más usado)
screen.getByText("Carrito de Compras")
screen.getByText(/Carrito/i)  // Expresión regular (ignora mayúsculas)

// Buscar por placeholder
screen.getByPlaceholderText("tu@email.com")

// Buscar por rol
screen.getByRole("button", { name: /Comprar/i })
screen.getByRole("link", { name: /Inicio/i })

// Buscar por label
screen.getByLabelText("Email")

// Buscar por data-testid
screen.getByTestId("game-card")

// Variantes "All" para múltiples elementos
screen.getAllByText("$29.99")  // Si hay varios precios

// Variantes "Query" que no fallan si no existe
screen.queryByText("No existe")  // Devuelve null, no error
```

### Acciones (Act)

```javascript
// Click
fireEvent.click(button)

// Escribir texto
await userEvent.type(input, "texto")

// Cambiar valor
fireEvent.change(input, { target: { value: "nuevo valor" } })

// Submit
fireEvent.submit(form)

// Blur (click afuera)
fireEvent.blur(input)

// Focus (click dentro)
fireEvent.focus(input)
```

### Verificaciones (Assert)

```javascript
// Existe en documento
expect(element).toBeInTheDocument()

// No existe
expect(element).not.toBeInTheDocument()

// Tiene texto
expect(element).toHaveTextContent("Carrito")

// Tiene clase
expect(element).toHaveClass("active")

// Tiene atributo
expect(element).toHaveAttribute("href", "/cart")

// Valor del input
expect(input).toHaveValue("test@example.com")

// Está visible
expect(element).toBeVisible()

// Está deshabilitado
expect(button).toBeDisabled()

// Función fue llamada
expect(mockFunction).toHaveBeenCalled()

// Función fue llamada con argumentos específicos
expect(mockFunction).toHaveBeenCalledWith(expectedArg)

// Cuántas veces fue llamada
expect(mockFunction).toHaveBeenCalledTimes(1)
```

---

## Ejemplo Real: Prueba Completa

```javascript
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Login from "../src/pages/Login";
import { AuthProvider, useAuth } from "../src/context/AuthContext";

// Mock del hook
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

// Helper para renderizar con providers
const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <AuthProvider>{component}</AuthProvider>
    </BrowserRouter>
  );
};

// Agrupación de pruebas
describe("Login Page", () => {
  // Limpiar antes de cada test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Prueba 1
  it("should render login form", () => {
    renderWithProviders(<Login />);
    const elements = screen.getAllByText(/Iniciar Sesión/);
    expect(elements.length).toBeGreaterThan(0);
  });

  // Prueba 2
  it("should display form header", () => {
    renderWithProviders(<Login />);
    expect(screen.getByText("Ingresa a tu cuenta de HAKEY")).toBeInTheDocument();
  });

  // Prueba 3
  it("should have email input field", () => {
    renderWithProviders(<Login />);
    const emailInput = screen.getByPlaceholderText("tu@email.com");
    expect(emailInput).toBeInTheDocument();
  });

  // Prueba 4
  it("should have password input field", () => {
    renderWithProviders(<Login />);
    const passwordInput = screen.getByPlaceholderText("••••••••");
    expect(passwordInput).toBeInTheDocument();
  });

  // Prueba 5
  it("should have submit button", () => {
    renderWithProviders(<Login />);
    const submitBtn = screen.getByRole("button", { name: /Iniciar Sesión/i });
    expect(submitBtn).toBeInTheDocument();
  });

  // Prueba 6
  it("should allow entering email", async () => {
    renderWithProviders(<Login />);
    const emailInput = screen.getByPlaceholderText("tu@email.com");
    
    await userEvent.type(emailInput, "test@example.com");
    
    expect(emailInput.value).toBe("test@example.com");
  });

  // Prueba 7
  it("should show email required error when empty", async () => {
    renderWithProviders(<Login />);
    const emailInput = screen.getByPlaceholderText("tu@email.com");
    
    fireEvent.blur(emailInput);
    
    await waitFor(() => {
      expect(screen.getByText("El email es requerido")).toBeInTheDocument();
    });
  });

  // Prueba 8
  it("should show invalid email error", async () => {
    renderWithProviders(<Login />);
    const emailInput = screen.getByPlaceholderText("tu@email.com");
    
    await userEvent.type(emailInput, "invalid-email");
    fireEvent.blur(emailInput);
    
    await waitFor(() => {
      expect(screen.getByText("Email inválido")).toBeInTheDocument();
    });
  });
});
```

---

## Flujo De Escritura De Una Prueba

```
1. IMPORTAR
   └─ Herramientas necesarias

2. MOCK (Si necesario)
   └─ Simular APIs, contextos, funciones

3. DESCRIBE
   └─ Agrupar pruebas por componente

4. SETUP (beforeEach si aplica)
   └─ Preparar estado inicial

5. IT (Prueba individual)
   ├─ ARRANGE: Preparar datos y renderizar
   ├─ ACT: Simular acciones del usuario
   └─ ASSERT: Verificar resultados

6. REPETIR
   └─ Escribir más pruebas para más casos
```

---

## Tips Profesionales

### ✅ BUENAS PRÁCTICAS

```javascript
// ✅ Buscar por contenido visible al usuario
screen.getByText("Agregar al Carrito")
screen.getByRole("button")

// ✅ Usar mensajes descriptivos
expect(element).toBeInTheDocument() // Claro qué esperas

// ✅ Probar una cosa por prueba
it("should have add to cart button", () => {
  expect(button).toBeInTheDocument();
});

// ✅ Usar nombres descriptivos
const mockGame = { ... } // Claro qué es

// ✅ Usar beforeEach para evitar repetición
beforeEach(() => {
  vi.clearAllMocks();
});
```

### ❌ MALAS PRÁCTICAS

```javascript
// ❌ Buscar por detalles internos
screen.getByTestId("game-card-123")

// ❌ Verificar demasiadas cosas en una prueba
it("should work", () => {
  // 10 diferentes assertions...
});

// ❌ Esperar tiempos fijos
setTimeout(() => { ... }, 1000)

// ❌ Nombres confusos
const x = { ... }

// ❌ No limpiar entre pruebas
// Causa "efectos secundarios" entre tests
```

---

## Errores Comunes Y Soluciones

### Error: "Unable to find an element with the text: X"

```javascript
// ❌ Elemento no existe
screen.getByText("No existe")

// ✅ Usar queryBy (no falla, devuelve null)
screen.queryByText("No existe")

// ✅ O usar getAllBy si hay múltiples
const elements = screen.getAllByText("Precio");
```

### Error: "Found multiple elements with the text: X"

```javascript
// ❌ Hay múltiples elementos
screen.getByText("$29.99")

// ✅ Usar getAllBy
const prices = screen.getAllByText("$29.99");
expect(prices.length).toBeGreaterThan(0);

// ✅ O ser más específico
screen.getByText("$29.99", { selector: ".current-price" });
```

### Error: "act() warning"

```javascript
// ❌ Actualizar estado sin act()
fireEvent.change(input, { target: { value: "text" } });

// ✅ Usar userEvent (hace act automáticamente)
await userEvent.type(input, "text");

// ✅ O envolver en act()
act(() => {
  fireEvent.change(input, { target: { value: "text" } });
});
```

---

## Checklist Para Escribir Pruebas

- [ ] ¿Importé las herramientas necesarias?
- [ ] ¿Mockée las dependencias externas?
- [ ] ¿Renderizé el componente?
- [ ] ¿Probé el caso feliz (todo funciona)?
- [ ] ¿Probé el caso triste (cosas fallan)?
- [ ] ¿La prueba es independiente de otras?
- [ ] ¿El nombre describe qué se prueba?
- [ ] ¿Solo pruebo una cosa por test?
- [ ] ¿Los datos simulados son realistas?
- [ ] ¿La prueba es legible?

---

## Recursos Útiles

| Recurso | Propósito |
|---------|----------|
| [Vitest Docs](https://vitest.dev) | Documentación oficial |
| [React Testing Library](https://testing-library.com/react) | Métodos de React |
| [Jest DOM Matchers](https://github.com/testing-library/jest-dom) | Verificaciones DOM |
| [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library) | Errores comunes |

---

## ¡Ahora a Practicar!

Escribe tu primera prueba:

```javascript
it("should do something", () => {
  // 1. Renderizar componente
  render(<MiComponente />);

  // 2. Encontrar elemento
  const elemento = screen.getByText("Mi Texto");

  // 3. Verificar
  expect(elemento).toBeInTheDocument();
});
```

🎉 ¡Eso es una prueba unitaria!

---

**Creado con ❤️ para el equipo de HAKEY**
**Última actualización: Octubre 22, 2025**
