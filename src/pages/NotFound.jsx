import { Link } from "react-router-dom";
import { BiSolidErrorAlt } from "react-icons/bi"; // Icono de error
import "./NotFound.css";

function NotFound() {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1 className="notfound-title">404</h1>
        <h2 className="notfound-subtitle">
          <BiSolidErrorAlt className="notfound-icon" />
          Oops... algo salió mal
        </h2>
        <p className="notfound-message">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <Link to="/" className="notfound-button">
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
