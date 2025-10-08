import { Link } from "react-router-dom";
import { FiShoppingCart, FiStar } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import "./GameCard.css";

const GameCard = ({ game }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(game);
  };

  return (
    <Link to={`/game/${game.id}`} className="game-card">
      <div className="game-card-image">
        <img src={game.image} alt={game.title} />
        {game.discount > 0 && (
          <div className="discount-badge">-{game.discount}%</div>
        )}
        <div className="card-overlay">
          <button
            className="btn-primary add-to-cart-btn"
            onClick={handleAddToCart}
          >
            <FiShoppingCart /> Agregar al Carrito
          </button>
        </div>
      </div>

      <div className="game-card-content">
        <div className="game-card-header">
          <h3 className="game-title">{game.title}</h3>
          <div className="rating">
            <FiStar className="star-icon" />
            <span>{game.rating}</span>
          </div>
        </div>

        <div className="game-category">{game.category}</div>

        <div className="platforms">
          {game.platform.slice(0, 3).map((platform, index) => (
            <span key={index} className="platform-badge">
              {platform}
            </span>
          ))}
        </div>

        <div className="game-card-footer">
          <div className="price-section">
            {game.discount > 0 ? (
              <>
                <span className="original-price">${game.originalPrice}</span>
                <span className="current-price">${game.price}</span>
              </>
            ) : (
              <span className="current-price">${game.price}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
