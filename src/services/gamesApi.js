const API_BASE_URL = "https://hakey-api-catalogo.vercel.app/api/games";

// Función auxiliar para manejar errores de la API
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Error en la solicitud" }));
    throw new Error(error.message || `Error: ${response.status}`);
  }
  return response.json();
};

// GET - Obtener todos los juegos
export const getAllGames = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    return await handleResponse(response);
  } catch (error) {
    console.error("Error al obtener juegos:", error);
    throw error;
  }
};

// GET por ID - Obtener un juego específico
export const getGameById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    return await handleResponse(response);
  } catch (error) {
    console.error(`Error al obtener juego ${id}:`, error);
    throw error;
  }
};

// POST - Crear un nuevo juego
export const createGame = async (gameData) => {
  try {
    const response = await fetch(
      "https://hakey-api-catalogo.vercel.app/games",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gameData),
      }
    );
    return await handleResponse(response);
  } catch (error) {
    console.error("Error al crear juego:", error);
    throw error;
  }
};

// PUT - Actualizar un juego completo
export const updateGame = async (id, gameData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gameData),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`Error al actualizar juego ${id}:`, error);
    throw error;
  }
};

// PATCH - Actualizar campos específicos de un juego
export const patchGame = async (id, partialData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(partialData),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`Error al actualizar parcialmente juego ${id}:`, error);
    throw error;
  }
};

// DELETE - Eliminar un juego
export const deleteGame = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`Error al eliminar juego ${id}:`, error);
    throw error;
  }
};

// Funciones auxiliares para filtrado y búsqueda (client-side)
export const filterGamesByCategory = (games, category) => {
  if (category === "Todos") return games;
  return games.filter((game) => game.category === category);
};

export const searchGames = (games, searchTerm) => {
  if (!searchTerm) return games;
  const term = searchTerm.toLowerCase();
  return games.filter(
    (game) =>
      game.title.toLowerCase().includes(term) ||
      game.description.toLowerCase().includes(term)
  );
};

export const sortGames = (games, sortBy) => {
  const gamesCopy = [...games];

  switch (sortBy) {
    case "price-low":
      return gamesCopy.sort((a, b) => a.price - b.price);
    case "price-high":
      return gamesCopy.sort((a, b) => b.price - a.price);
    case "rating":
      return gamesCopy.sort((a, b) => b.rating - a.rating);
    case "discount":
      return gamesCopy.sort((a, b) => b.discount - a.discount);
    case "featured":
    default:
      return gamesCopy.sort((a, b) => {
        if (a.featured === b.featured) return 0;
        return a.featured ? -1 : 1;
      });
  }
};
