import { Link } from "react-router-dom";
import { FiGithub, FiTwitter, FiFacebook, FiInstagram } from "react-icons/fi";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">
              <a href="/">HAKEY</a>
            </h3>
            <p className="footer-description">
              Tu tienda de confianza para adquirir las mejores game keys a los
              precios más competitivos del mercado.
            </p>
            <div className="social-links">
              <a
                href="https://github.com/Javier120331/HAKEY-NODEJS-REACT"
                aria-label="GitHub"
              >
                <FiGithub />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Navegación</h4>
            <ul>
              <li>
                <Link to="/">Inicio</Link>
              </li>
              <li>
                <Link to="/catalog">Catálogo</Link>
              </li>
              <li>
                <Link to="/about">Acerca de</Link>
              </li>
              <li>
                <Link to="/cart">Carrito</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Categorías</h4>
            <ul>
              <li>
                <Link to="/catalog">RPG</Link>
              </li>
              <li>
                <Link to="/catalog">Acción</Link>
              </li>
              <li>
                <Link to="/catalog">Shooter</Link>
              </li>
              <li>
                <Link to="/catalog">Terror</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Soporte</h4>
            <ul>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="https://github.com/Javier120331/HAKEY-NODEJS-REACT">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#">Política de Privacidad</a>
              </li>
              <li>
                <a href="#">Términos de Servicio</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 HAKEY. Todos los derechos reservados.</p>
          <p className="footer-note">
            Entrega instantánea • Pago seguro • Soporte 24/7
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
