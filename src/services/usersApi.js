/**
 * Users API Service
 * Handles all API calls related to user authentication and management
 * Usa la misma API base que gamesApi.js: https://hakey-api-catalogo.vercel.app
 */

// Allow overriding via Vite env var
const VITE_API = import.meta.env.VITE_API_URL || "https://hakey-api-catalogo.vercel.app/api";
const API_BASE_URL = `${VITE_API.replace(/\/$/, '')}/usuarios`;
const API_FALLBACK_BASE = API_BASE_URL.replace(/\/api\//, "/").replace(/\/\/$/, "/").replace(/\/$/, "");

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @param {string} userData.nombre - User's full name
 * @param {string} userData.correo - User's email
 * @param {string} userData.contrasena - User's password
 * @returns {Promise<Object>} User data from the database
 */
export const registerUser = async (userData) => {
  try {
    console.log("📝 Registrando usuario...");
    console.log("📡 URL:", `${API_BASE_URL}/usuarios`);
    console.log("📤 Enviando:", { ...userData, contrasena: "***" });

    const response = await fetch(`${API_BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    console.log("📥 Status:", response.status);
    console.log("📥 Content-Type:", response.headers.get("content-type"));

    // Verificar si la respuesta es JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error("❌ La respuesta no es JSON:", text.substring(0, 200));
      throw new Error(
        "El servidor no devolvió JSON. Verifica que el endpoint /api/users exista en tu API."
      );
    }

    const data = await response.json();
    console.log("📥 Respuesta:", data);

    if (!response.ok) {
      // Handle specific error cases
      if (response.status === 409) {
        throw new Error("Este correo ya está registrado");
      }
      throw new Error(data.error || "Error al registrar usuario");
    }

    return {
      success: true,
      user: data,
    };
  } catch (error) {
    console.error("❌ Error en registerUser:", error);
    return {
      success: false,
      error: error.message || "Error de conexión con el servidor",
    };
  }
};

/**
 * Login user - verify credentials
 * @param {Object} credentials - User login credentials
 * @param {string} credentials.correo - User's email
 * @param {string} credentials.contrasena - User's password
 * @returns {Promise<Object>} User data if login successful
 */
export const loginUser = async (credentials) => {
  try {
    console.log("🔐 Intentando login...");
    console.log("📡 URL:", `${API_BASE_URL}/login`);
    console.log("📤 Enviando:", {
      // No logueamos la contraseña real
      email: credentials.email,
      password: "***",
    });

    // Enviar ambos formatos para compatibilidad con APIs que esperan
    // { email, password } o { correo, contrasena }
    const payload = {
      email: credentials.email || credentials.correo,
      password: credentials.password || credentials.contrasena,
      correo: credentials.email || credentials.correo,
      contrasena: credentials.password || credentials.contrasena,
    };

    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("📥 Status:", response.status);
    console.log("📥 Content-Type:", response.headers.get("content-type"));

    // Verificar si la respuesta es JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error("❌ La respuesta no es JSON:", text.substring(0, 200));
      throw new Error(
        "El servidor no devolvió JSON. Verifica que el endpoint /api/login exista en tu API."
      );
    }

    const data = await response.json();
    console.log("📥 Respuesta:", data);

    if (!response.ok) {
      throw new Error(data.error || "Credenciales inválidas");
    }

    // Algunas APIs devuelven el usuario en 'user', otras en 'usuario' (español).
    // Normalizamos para devolver siempre el objeto de usuario.
    const userObj = data.user || data.usuario || data;

    return {
      success: true,
      user: userObj,
    };
  } catch (error) {
    console.error("❌ Error en loginUser:", error);
    return {
      success: false,
      error: error.message || "Error de conexión con el servidor",
    };
  }
};

/**
 * Get user by ID
 * @param {number} userId - User ID
 * @returns {Promise<Object>} User data
 */
export const getUserById = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Usuario no encontrado");
    }

    return {
      success: true,
      user: data,
    };
  } catch (error) {
    console.error("Error en getUserById:", error);
    return {
      success: false,
      error: error.message || "Error de conexión con el servidor",
    };
  }
};

/**
 * Update user data
 * @param {number} userId - User ID
 * @param {Object} userData - User data to update
 * @returns {Promise<Object>} Updated user data
 */
export const updateUser = async (userId, userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 409) {
        throw new Error("Este correo ya está registrado");
      }
      throw new Error(data.error || "Error al actualizar usuario");
    }

    return {
      success: true,
      user: data,
    };
  } catch (error) {
    console.error("Error en updateUser:", error);
    return {
      success: false,
      error: error.message || "Error de conexión con el servidor",
    };
  }
};

/**
 * Delete user
 * @param {number} userId - User ID
 * @returns {Promise<Object>} Success status
 */
export const deleteUser = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Error al eliminar usuario");
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error en deleteUser:", error);
    return {
      success: false,
      error: error.message || "Error de conexión con el servidor",
    };
  }
};

/**
 * Get all users (admin only)
 * @returns {Promise<Object>} List of all users
 */
export const getAllUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Error al obtener usuarios");
    }

    return {
      success: true,
      users: data,
    };
  } catch (error) {
    console.error("Error en getAllUsers:", error);
    return {
      success: false,
      error: error.message || "Error de conexión con el servidor",
    };
  }
};
