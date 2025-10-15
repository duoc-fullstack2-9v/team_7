import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import {
  FiShoppingCart,
  FiStar,
  FiClock,
  FiPackage,
  FiArrowLeft,
} from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useGame } from "../hooks/useGames";
import { useGames } from "../hooks/useGames";
import GameCard from "../components/GameCard";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import "./GameDetail.css";

const GameDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Obtener el juego específico por ID
  const { game, loading, error, refetch } = useGame(id);

  // Obtener todos los juegos para mostrar relacionados
  const { games: allGames } = useGames();

  // Scroll al inicio cuando se carga la página o cambia el ID
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (loading) {
    return (
      <div className="game-detail">
        <div className="container">
          <Loading message="Cargando detalles del juego..." />
        </div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="game-detail">
        <div className="container">
          {error ? (
            <ErrorMessage message={error} onRetry={refetch} />
          ) : (
            <div className="not-found">
              <h2>Juego no encontrado</h2>
              <Link to="/catalog" className="btn-primary">
                Volver al Catálogo
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }

  const relatedGames = allGames
    .filter((g) => g.category === game.category && g.id !== game.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(game);
    // Opcional: mostrar notificación
  };

  const handleBuyNow = () => {
    addToCart(game);
    navigate("/cart");
  };

  return (
    <div className="game-detail">
      <div className="container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FiArrowLeft /> Volver
        </button>

        <div className="detail-content">
          {/* Imagen Principal */}
          <div className="detail-image">
            <img src={game.image} alt={game.title} />
            {game.discount > 0 && (
              <div className="discount-badge">-{game.discount}%</div>
            )}
          </div>

          {/* Información Principal */}
          <div className="detail-info">
            <div className="detail-header">
              <h1 className="detail-title">{game.title}</h1>
              <div className="rating-large">
                <FiStar className="star-filled" />
                <span>{game.rating}</span>
              </div>
            </div>

            <div className="detail-meta">
              <span className="category-badge">{game.category}</span>
              <span className="publisher">
                <FiPackage /> {game.publisher}
              </span>
              <span className="release-date">
                <FiClock />{" "}
                {new Date(game.releaseDate).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <p className="detail-description">{game.description}</p>

            {/* Plataformas */}
            <div className="platforms-section">
              <h3>Plataformas:</h3>
              <div className="platforms-list">
                {game.platform.map((platform, index) => (
                  <span key={index} className="platform-tag">
                    {platform}
                  </span>
                ))}
              </div>
            </div>

            {/* Características */}
            <div className="features-section">
              <h3>Características:</h3>
              <div className="features-list">
                {game.features.map((feature, index) => (
                  <span key={index} className="feature-tag">
                    ✓ {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Precio y Compra */}
            <div className="purchase-section">
              <div className="price-box">
                {game.discount > 0 ? (
                  <>
                    <span className="original-price-large">
                      ${game.originalPrice}
                    </span>
                    <span className="current-price-large">${game.price}</span>
                  </>
                ) : (
                  <span className="current-price-large">${game.price}</span>
                )}
              </div>

              <div className="action-buttons">
                <button className="btn-primary buy-now" onClick={handleBuyNow}>
                  Comprar Ahora
                </button>
                <button className="btn-secondary" onClick={handleAddToCart}>
                  <FiShoppingCart /> Agregar al Carrito
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Requisitos del Sistema */}
        <div className="requirements-section">
          <h2>Requisitos del Sistema</h2>
          <div className="requirements-grid">
            <div className="requirement-item">
              <strong>Sistema Operativo:</strong>
              <span>{game.requirements.os}</span>
            </div>
            <div className="requirement-item">
              <strong>Procesador:</strong>
              <span>{game.requirements.processor}</span>
            </div>
            <div className="requirement-item">
              <strong>Memoria:</strong>
              <span>{game.requirements.memory}</span>
            </div>
            <div className="requirement-item">
              <strong>Gráficos:</strong>
              <span>{game.requirements.graphics}</span>
            </div>
            <div className="requirement-item">
              <strong>Almacenamiento:</strong>
              <span>{game.requirements.storage}</span>
            </div>
          </div>
        </div>

        {/* Juegos Relacionados */}
        {relatedGames.length > 0 && (
          <div className="related-section">
            <h2>Juegos Similares</h2>
            <div className="games-grid">
              {relatedGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameDetail;
