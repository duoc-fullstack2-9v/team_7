import { Link } from "react-router-dom";
import {
  FiShoppingCart,
  FiMenu,
  FiX,
  FiUser,
  FiLogOut,
  FiSettings,
} from "react-icons/fi";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "./Header.css";
import logo from "../assets/logohy.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { getCartItemsCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const itemsCount = getCartItemsCount();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <img src={logo} alt="HAKEY Logo" />
            <span className="logo-text">HAKEY</span>
          </Link>

          <nav className={`nav ${menuOpen ? "nav-open" : ""}`}>
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Inicio
            </Link>
            <Link to="/catalog" onClick={() => setMenuOpen(false)}>
              Catálogo
            </Link>
            {user?.isAdmin && (
              <Link
                to="/admin"
                onClick={() => setMenuOpen(false)}
                className="admin-nav-link"
              >
                Panel Admin
              </Link>
            )}
            <Link to="/about" onClick={() => setMenuOpen(false)}>
              Acerca de
            </Link>
          </nav>

          <div className="header-actions">
            {isAuthenticated ? (
              <>
                <div className="user-menu">
                  <FiUser size={20} />
                  <span className="user-name">{user?.name || user?.email}</span>
                  {user?.isAdmin && (
                    <Link
                      to="/admin"
                      className="admin-icon-link"
                      title="Panel de Administrador"
                      onClick={() => setMenuOpen(false)}
                    >
                      <FiSettings size={20} />
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="logout-button"
                    title="Cerrar sesión"
                  >
                    <FiLogOut size={20} />
                  </button>
                </div>
              </>
            ) : (
              <div className="auth-buttons">
                <Link
                  to="/login"
                  className="login-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/register"
                  className="register-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Registrarse
                </Link>
              </div>
            )}

            <Link to="/cart" className="cart-button">
              <FiShoppingCart size={24} />
              {itemsCount > 0 && (
                <span className="cart-badge">{itemsCount}</span>
              )}
            </Link>

            <button
              className="menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
