import { FiCheckCircle } from "react-icons/fi";
import "./CartNotification.css";

const CartNotification = ({ message }) => {
  if (!message) return null;

  return (
    <div className="cart-notification">
      <FiCheckCircle className="notification-icon" />
      <span>{message}</span>
    </div>
  );
};

export default CartNotification;
