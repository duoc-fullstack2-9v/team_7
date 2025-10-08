import { useState, useEffect } from "react";
import { getAllGames, getGameById } from "../services/gamesApi";

// Hook para obtener todos los juegos
export const useGames = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllGames();
        setGames(data);
      } catch (err) {
        setError(err.message);
        console.error("Error al cargar juegos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllGames();
      setGames(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { games, loading, error, refetch };
};

// Hook para obtener un juego por ID
export const useGame = (id) => {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchGame = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getGameById(id);
        setGame(data);
      } catch (err) {
        setError(err.message);
        console.error(`Error al cargar juego ${id}:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  const refetch = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      const data = await getGameById(id);
      setGame(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { game, loading, error, refetch };
};
