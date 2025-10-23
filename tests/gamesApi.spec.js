import { describe, it, expect, vi, beforeEach } from "vitest";
const prueba = it;
import * as gamesApi from "../src/services/gamesApi";

// Mock de fetch global
global.fetch = vi.fn();

describe("Games API Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch.mockClear();
  });

  prueba("debe obtener todos los juegos correctamente", async () => {
    const mockGames = [
      { id: 1, title: "Juego 1", price: 29.99 },
      { id: 2, title: "Juego 2", price: 39.99 },
    ];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      text: async () => JSON.stringify(mockGames),
      json: async () => mockGames,
    });

    const result = await gamesApi.getAllGames();
    expect(result).toEqual(mockGames);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://hakey-api-catalogo.vercel.app/api/games"
    );
  });

  prueba("debe manejar error cuando no se pueden obtener juegos", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ message: "Error interno" }),
    });

    await expect(gamesApi.getAllGames()).rejects.toThrow();
  });

  prueba("debe obtener un juego específico por ID", async () => {
    const mockGame = { id: 1, title: "Juego Especial", price: 49.99 };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      text: async () => JSON.stringify(mockGame),
      json: async () => mockGame,
    });

    const result = await gamesApi.getGameById(1);
    expect(result).toEqual(mockGame);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://hakey-api-catalogo.vercel.app/api/games/1"
    );
  });

  prueba("debe manejar error cuando el juego no existe (404)", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ message: "Juego no encontrado" }),
    });

    await expect(gamesApi.getGameById(999)).rejects.toThrow();
  });

  prueba("debe crear un nuevo juego", async () => {
    const newGame = { title: "Nuevo Juego", price: 59.99 };
    const createdGame = { id: 3, ...newGame };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      text: async () => JSON.stringify(createdGame),
      json: async () => createdGame,
    });

    const result = await gamesApi.createGame(newGame);
    expect(result).toEqual(createdGame);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://hakey-api-catalogo.vercel.app/games",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGame),
      })
    );
  });

  prueba("debe actualizar un juego completo (PUT)", async () => {
    const updatedGame = { title: "Juego Actualizado", price: 69.99 };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      text: async () => JSON.stringify(updatedGame),
      json: async () => updatedGame,
    });

    const result = await gamesApi.updateGame(1, updatedGame);
    expect(result).toEqual(updatedGame);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://hakey-api-catalogo.vercel.app/api/games/1",
      expect.objectContaining({
        method: "PUT",
        body: JSON.stringify(updatedGame),
      })
    );
  });

  prueba("debe actualizar parcialmente un juego (PATCH)", async () => {
    const partialData = { price: 49.99 };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      text: async () => JSON.stringify(partialData),
      json: async () => partialData,
    });

    const result = await gamesApi.patchGame(1, partialData);
    expect(result).toEqual(partialData);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://hakey-api-catalogo.vercel.app/api/games/1",
      expect.objectContaining({
        method: "PATCH",
        body: JSON.stringify(partialData),
      })
    );
  });

  prueba("debe eliminar un juego", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      text: async () => "",
    });

    const result = await gamesApi.deleteGame(1);
    expect(result).toEqual({});
    expect(global.fetch).toHaveBeenCalledWith(
      "https://hakey-api-catalogo.vercel.app/api/games/1",
      { method: "DELETE" }
    );
  });

  prueba("debe filtrar juegos por categoría", () => {
    const games = [
      { id: 1, title: "Action Game", category: "Action", price: 29.99 },
      { id: 2, title: "RPG Game", category: "RPG", price: 39.99 },
    ];

    const filtered = gamesApi.filterGamesByCategory(games, "Action");
    expect(filtered).toHaveLength(1);
    expect(filtered[0].category).toBe("Action");
  });

  prueba("debe retornar todos si categoría es Todos", () => {
    const games = [
      { id: 1, title: "Action Game", category: "Action" },
      { id: 2, title: "RPG Game", category: "RPG" },
    ];

    const filtered = gamesApi.filterGamesByCategory(games, "Todos");
    expect(filtered).toHaveLength(2);
  });

  prueba("debe buscar juegos por término", () => {
    const games = [
      { id: 1, title: "Aventura Épica", description: "Juego de aventura", price: 29.99 },
      { id: 2, title: "RPG Fantasy", description: "Juego de rol", price: 39.99 },
    ];

    const results = gamesApi.searchGames(games, "aventura");
    expect(results).toHaveLength(1);
    expect(results[0].title).toContain("Aventura");
  });

  prueba("debe ordenar juegos por precio ascendente", () => {
    const games = [
      { id: 1, title: "Caro", price: 59.99, rating: 4.5 },
      { id: 2, title: "Barato", price: 19.99, rating: 4.0 },
    ];

    const sorted = gamesApi.sortGames(games, "price-low");
    expect(sorted[0].price).toBe(19.99);
    expect(sorted[1].price).toBe(59.99);
  });

  prueba("debe ordenar juegos por precio descendente", () => {
    const games = [
      { id: 1, title: "Barato", price: 19.99 },
      { id: 2, title: "Caro", price: 59.99 },
    ];

    const sorted = gamesApi.sortGames(games, "price-high");
    expect(sorted[0].price).toBe(59.99);
    expect(sorted[1].price).toBe(19.99);
  });

  prueba("debe ordenar juegos por calificación", () => {
    const games = [
      { id: 1, title: "Bajo rating", rating: 3.0 },
      { id: 2, title: "Alto rating", rating: 4.8 },
    ];

    const sorted = gamesApi.sortGames(games, "rating");
    expect(sorted[0].rating).toBe(4.8);
    expect(sorted[1].rating).toBe(3.0);
  });

  prueba("debe ordenar juegos por descuento", () => {
    const games = [
      { id: 1, title: "Sin descuento", discount: 0 },
      { id: 2, title: "Con descuento", discount: 30 },
    ];

    const sorted = gamesApi.sortGames(games, "discount");
    expect(sorted[0].discount).toBe(30);
    expect(sorted[1].discount).toBe(0);
  });

  prueba("debe ordenar juegos destacados primero", () => {
    const games = [
      { id: 1, title: "No destacado", featured: false },
      { id: 2, title: "Destacado", featured: true },
    ];

    const sorted = gamesApi.sortGames(games, "featured");
    expect(sorted[0].featured).toBe(true);
    expect(sorted[1].featured).toBe(false);
  });
});
