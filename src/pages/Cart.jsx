import { Link } from "react-router-dom";
import { useEffect } from "react";
import {
  FiTrash2,
  FiPlus,
  FiMinus,
  FiShoppingBag,
  FiArrowLeft,
} from "react-icons/fi";
import { useCart } from "../context/CartContext";
import "./Cart.css";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } =
    useCart();

  // Scroll al inicio cuando se monta el componente
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (cart.length === 0) {
    return (
      <div className="cart empty-cart">
        <div className="container">
          <div className="empty-cart-content">
            <FiShoppingBag className="empty-cart-icon" />
            <h2>Tu carrito está vacío</h2>
            <p>Agrega algunos juegos increíbles a tu carrito</p>
            <Link to="/catalog" className="btn-primary">
              Explorar Catálogo
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="container">
        <div className="cart-header">
          <Link to="/catalog" className="back-link">
            <FiArrowLeft /> Seguir Comprando
          </Link>
          <h1 className="page-title">Carrito de Compras</h1>
        </div>

        <div className="cart-layout">
          {/* Items del Carrito */}
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <Link to={`/game/${item.id}`} className="item-image">
                  <img src={item.image} alt={item.title} />
                </Link>

                <div className="item-details">
                  <Link to={`/game/${item.id}`} className="item-title">
                    {item.title}
                  </Link>
                  <div className="item-meta">
                    <span className="item-category">{item.category}</span>
                    <span className="item-platform">
                      {item.platform.slice(0, 2).join(", ")}
                    </span>
                  </div>
                </div>

                <div className="item-quantity">
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <FiMinus />
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <FiPlus />
                  </button>
                </div>

                <div className="item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                  title="Eliminar del carrito"
                >
                  <FiTrash2 />
                </button>
              </div>
            ))}

            <button className="clear-cart-btn" onClick={clearCart}>
              <FiTrash2 /> Vaciar Carrito
            </button>
          </div>

          {/* Resumen del Carrito */}
          <div className="cart-summary">
            <h2 className="summary-title">Resumen del Pedido</h2>

            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Impuestos</span>
                <span>$0.00</span>
              </div>
              <div className="summary-row total-row">
                <span>Total</span>
                <span className="total-amount">
                  ${getCartTotal().toFixed(2)}
                </span>
              </div>
            </div>

            <button className="checkout-btn">
              <FiShoppingBag /> Proceder al Pago
            </button>

            <div className="payment-methods">
              <p>Métodos de pago aceptados:</p>
              <div className="payment-icons">
                <span>💳</span>
                <span>🏦</span>
                <span>💰</span>
              </div>
            </div>

            <div className="security-badges">
              <div className="badge">🔒 Pago Seguro</div>
              <div className="badge">✓ Entrega Instantánea</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
