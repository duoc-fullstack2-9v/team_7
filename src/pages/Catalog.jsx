import { useState, useMemo, useEffect } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";
import GameCard from "../components/GameCard";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { useGames } from "../hooks/useGames";
import {
  filterGamesByCategory,
  searchGames,
  sortGames,
} from "../services/gamesApi";
import "./Catalog.css";

// Categorías dinámicas basadas en los juegos
const getCategories = (games) => {
  const uniqueCategories = [...new Set(games.map((game) => game.category))];
  return ["Todos", ...uniqueCategories];
};

const Catalog = () => {
  const { games, loading, error, refetch } = useGames();
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  // Scroll al inicio cuando se monta el componente
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Obtener categorías dinámicamente
  const categories = useMemo(() => getCategories(games), [games]);

  // Filtrar y ordenar juegos
  const processedGames = useMemo(() => {
    let result = games;

    // Filtrar por categoría
    result = filterGamesByCategory(result, selectedCategory);

    // Buscar
    result = searchGames(result, searchTerm);

    // Ordenar
    result = sortGames(result, sortBy);

    return result;
  }, [games, selectedCategory, searchTerm, sortBy]);

  return (
    <div className="catalog">
      <div className="container">
        <div className="catalog-header">
          <h1 className="page-title">Catálogo de Juegos</h1>
          <p className="page-subtitle">
            Explora nuestra colección de {loading ? "..." : games.length} juegos
            increíbles
          </p>
        </div>

        {/* Filtros y Búsqueda */}
        <div className="catalog-controls">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar juegos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
              disabled={loading}
            />
          </div>

          <div className="filter-controls">
            <div className="sort-select">
              <FiFilter />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                disabled={loading}
              >
                <option value="featured">Destacados</option>
                <option value="price-low">Precio: Menor a Mayor</option>
                <option value="price-high">Precio: Mayor a Menor</option>
                <option value="rating">Mejor Valorados</option>
                <option value="discount">Mayor Descuento</option>
              </select>
            </div>
          </div>
        </div>

        {/* Categorías */}
        {!loading && categories.length > 0 && (
          <div className="categories">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-btn ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category)}
                disabled={loading}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Loading State */}
        {loading && <Loading message="Cargando catálogo de juegos..." />}

        {/* Error State */}
        {error && !loading && (
          <ErrorMessage message={error} onRetry={refetch} />
        )}

        {/* Resultados */}
        {!loading && !error && (
          <>
            <div className="catalog-results">
              <p className="results-count">
                {processedGames.length}{" "}
                {processedGames.length === 1
                  ? "juego encontrado"
                  : "juegos encontrados"}
              </p>
            </div>

            {/* Grid de Juegos */}
            {processedGames.length > 0 ? (
              <div className="games-grid">
                {processedGames.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            ) : (
              <div className="no-results">
                <h3>No se encontraron juegos</h3>
                <p>Intenta con otros términos de búsqueda o filtros</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Catalog;
