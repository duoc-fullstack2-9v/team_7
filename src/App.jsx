import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider, useCart } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Footer from "./footer";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import GameDetail from "./pages/GameDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";
import CartNotification from "./components/CartNotification";
import "./App.css";

function AppContent() {
  const { notification } = useCart();

  return (
    <Router>
      <div className="app">
        <Header />
        {notification && <CartNotification message={notification.message} />}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/game/:id" element={<GameDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
            <Route
              path="/about"
              element={
                <div
                  className="container"
                  style={{ padding: "4rem 2rem", textAlign: "center" }}
                >
                  <h1>Acerca de HAKEY</h1>
                  <p>Tu tienda de confianza para game keys</p>
                </div>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
