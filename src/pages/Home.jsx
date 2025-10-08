import { Link } from "react-router-dom";
import { useEffect } from "react";
import { FiArrowRight, FiTrendingUp } from "react-icons/fi";
import GameCard from "../components/GameCard";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import TextType from "../components/TextType";
import { useGames } from "../hooks/useGames";
import "./Home.css";

const Home = () => {
  const { games, loading, error, refetch } = useGames();

  const featuredGames = games.filter((game) => game.featured);
  const topDeals = games.filter((game) => game.discount > 20).slice(0, 4);

  // Scroll al inicio cuando se monta el componente
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content fade-in">
            <h1 className="hero-title">
              Descubre las Mejores
              <br />
              <TextType
                text={["Game Keys", "Ofertas", "Aventuras"]}
                as="span"
                className="gradient-text"
                typingSpeed={80}
                deletingSpeed={50}
                pauseDuration={2000}
                cursorCharacter="|"
                loop={true}
              />
            </h1>
            <p className="hero-subtitle">
              Miles de juegos a los mejores precios. Activación instantánea. Tu
              aventura comienza aquí.
            </p>
            <div className="hero-buttons">
              <Link to="/catalog" className="btn-primary">
                Ver Catálogo <FiArrowRight />
              </Link>
              <Link to="/catalog" className="btn-secondary">
                Ofertas del Día
              </Link>
            </div>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <h3>{loading ? "..." : games.length + "+"}</h3>
              <p>Juegos Disponibles</p>
            </div>
            <div className="stat-item">
              <h3>50K+</h3>
              <p>Clientes Felices</p>
            </div>
            <div className="stat-item">
              <h3>24/7</h3>
              <p>Soporte</p>
            </div>
          </div>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <section className="featured-section">
          <div className="container">
            <Loading message="Cargando juegos destacados..." />
          </div>
        </section>
      )}

      {/* Error State */}
      {error && !loading && (
        <section className="featured-section">
          <div className="container">
            <ErrorMessage message={error} onRetry={refetch} />
          </div>
        </section>
      )}

      {/* Featured Games */}
      {!loading && !error && featuredGames.length > 0 && (
        <section className="featured-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">
                <FiTrendingUp className="title-icon" />
                Juegos Destacados
              </h2>
              <Link to="/catalog" className="view-all">
                Ver Todos <FiArrowRight />
              </Link>
            </div>
            <div className="games-grid">
              {featuredGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Top Deals */}
      {!loading && !error && topDeals.length > 0 && (
        <section className="deals-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">🔥 Mejores Ofertas</h2>
              <Link to="/catalog" className="view-all">
                Ver Todas <FiArrowRight />
              </Link>
            </div>
            <div className="games-grid">
              {topDeals.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title centered">¿Por Qué Elegirnos?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Entrega Instantánea</h3>
              <p>Recibe tu key al instante después de completar la compra</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Mejores Precios</h3>
              <p>Descuentos increíbles en los mejores juegos del mercado</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Pago Seguro</h3>
              <p>Transacciones 100% seguras y protegidas</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎮</div>
              <h3>Amplio Catálogo</h3>
              <p>Miles de juegos para todas las plataformas</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
