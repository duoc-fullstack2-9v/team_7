import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { sendPurchaseConfirmation } from "../services/emailService";
import { FiArrowLeft } from "react-icons/fi";
import "./Login.css";
import "./FormularioCompra.css";

const FormularioCompra = () => {
    const navigate = useNavigate();
    const { cart, getCartTotal } = useCart();
    
    // Constante de IVA (19% en Chile)
    const IVA_RATE = 0.19;

    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        numero: "",
        numeroTarjeta: "",
        fechaExpiracion: "",
        cvv: "",
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Redirigir si el carrito está vacío
    useEffect(() => {
        if (cart.length === 0) {
            navigate("/cart");
        }
    }, [cart, navigate]);

    // Calcular subtotal, IVA y total
    const subtotal = getCartTotal();
    const iva = subtotal * IVA_RATE;
    const total = subtotal + iva;

    // Validación de email
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Validación de campos individuales
    const validateField = (name, value) => {
        let error = "";

        switch (name) {
            case "nombre":
                if (!value.trim()) {
                    error = "El nombre es requerido";
                }else if (value.trim().length < 3) {
                    error = "El nombre debe tener al menos 3 caracteres";
                }else if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
                    error = "El nombre solo debe contener letras y espacios";
                }
                break;
            case "email":
                if (!value.trim()) {
                    error = "El email es requerido";
                } else if (!validateEmail(value)) {
                    error = "Email inválido";
                }
                break;
            case "numero":
                if (!value.trim()) {
                    error = "El número es requerido";
                } else if (!/^\d{9}$/.test(value.trim())) {
                    error = "El número debe tener 9 dígitos";
                }
                break;
            case "numeroTarjeta":
                if (!value.trim()) {
                    error = "El número de tarjeta es requerido";
                } else if (!/^\d{16}$/.test(value.trim())) {
                    error = "El número de tarjeta debe tener 16 dígitos";
                }
                break;
            case "fechaExpiracion":
                if (!value.trim()) {
                    error = "La fecha de expiración es requerida";
                } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value.trim())) {
                    error = "La fecha de expiración debe tener el formato MM/AA";
                }
                break;
            case "cvv":
                if (!value.trim()) {
                    error = "El CVV es requerido";
                } else if (!/^\d{3}$/.test(value.trim())) {
                    error = "El CVV debe tener 3 dígitos";
                }
                break;
            default:
                break;
        }
        
        return error;
    };
    
    // Validar todo el formulario
    const validateForm = () => {
        const newErrors = {};

        Object.keys(formData).forEach((key) => {
            const error = validateField(key, formData[key]);
            if (error) {
                newErrors[key] = error;
            }
        });

        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Validar el campo en tiempo real
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: validateField(name, value),
        }));
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: validateField(name, value),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const newErrors = validateForm();
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            // ========================================
            // CREDENCIALES DE PRUEBA - Usuario 1
            // ========================================
            // Nombre: Javier Arancibia
            // Email: jr.tecnon@gmail.com
            // Teléfono: 972317686
            // Tarjeta: 1234567812345678
            // Expiración: 12/25
            // CVV: 123
            const usuario1 = {
                numeroTarjeta: formData.numeroTarjeta === "1234567812345678",
                cvv: formData.cvv === "123",
                fechaExpiracion: formData.fechaExpiracion === "12/25",
                numero: formData.numero === "972317686",
                email: formData.email === "jr.tecnon@gmail.com",
                nombre: formData.nombre.toLowerCase() === "javier arancibia"
            };

            // ========================================
            // CREDENCIALES DE PRUEBA - Usuario 2
            // ========================================
            // Nombre: María García
            // Email: maria.garcia@ejemplo.com
            // Teléfono: 987654321
            // Tarjeta: 8765432187654321
            // Expiración: 06/26
            // CVV: 456
            const usuario2 = {
                numeroTarjeta: formData.numeroTarjeta === "8765432187654321",
                cvv: formData.cvv === "456",
                fechaExpiracion: formData.fechaExpiracion === "06/26",
                numero: formData.numero === "987654321",
                email: formData.email === "ce.toros@duocuc.cl",
                nombre: formData.nombre.toLowerCase() === "cesaruto" || formData.nombre.toLowerCase() === "maria garcia"
            };

            // Verificar si es usuario 1 o usuario 2
            const esUsuario1 = Object.values(usuario1).every(value => value === true);
            const esUsuario2 = Object.values(usuario2).every(value => value === true);

            if (esUsuario1 || esUsuario2) {
                try {
                    // 📧 Enviar email de confirmación de compra
                    const emailResult = await sendPurchaseConfirmation({
                        userName: formData.nombre,
                        userEmail: formData.email,
                        items: cart,
                        subtotal: subtotal,
                        iva: iva,
                        total: total,
                    });

                    if (emailResult.success) {
                        console.log('✅ Email de confirmación enviado exitosamente');
                    } else {
                        console.warn('⚠️ No se pudo enviar el email de confirmación:', emailResult.error);
                    }

                    // Redirigir a página de compra exitosa
                    setTimeout(() => {
                        navigate("/compraExitosa");
                    }, 1500);
                } catch (error) {
                    console.error('Error en el proceso de compra:', error);
                    setErrors({ submit: "Error al procesar la compra" });
                    setIsSubmitting(false);
                }
            } else {
                setErrors({ submit: "Los credenciales son incorrectos, por favor verifica los datos ingresados" });
                setIsSubmitting(false);
            }
        } else {
            setIsSubmitting(false);
        }
    }; 

    return (
        <div className="formulario-compra-container">
            <div className="container">
                <Link to="/cart" className="back-link">
                    <FiArrowLeft /> Volver al Carrito
                </Link>

                <h1 className="page-title">Finalizar Compra</h1>

                <div className="compra-layout">
                    {/* Formulario de Datos */}
                    <div className="formulario-section">
                        <div className="login-card">
                            <div className="login-header">
                                <h2>Datos de Facturación</h2>
                                <p>Completa tus datos para finalizar la compra</p>
                            </div>

                            <form onSubmit={handleSubmit} className="login-form" noValidate>
                                <div className="form-group">
                                    <label htmlFor="nombre">
                                        Nombre Completo <span className="required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="nombre"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.nombre ? "input-error" : ""}
                                        placeholder="Tu nombre completo"
                                        autoComplete="name"
                                    />
                                    {errors.nombre && (
                                        <span className="error-message">{errors.nombre}</span>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">
                                        Email <span className="required">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.email ? "input-error" : ""}
                                        placeholder="tu@email.com"
                                        autoComplete="email"
                                    />
                                    {errors.email && (
                                        <span className="error-message">{errors.email}</span>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="numero">
                                        Número de Teléfono <span className="required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="numero"
                                        name="numero"
                                        value={formData.numero}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.numero ? "input-error" : ""}
                                        placeholder="972317686"
                                        autoComplete="tel"
                                    />
                                    {errors.numero && (
                                        <span className="error-message">{errors.numero}</span>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="numeroTarjeta">
                                        Número de Tarjeta <span className="required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="numeroTarjeta"
                                        name="numeroTarjeta"
                                        value={formData.numeroTarjeta}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.numeroTarjeta ? "input-error" : ""}
                                        placeholder="1234567812345678"
                                        autoComplete="cc-number"
                                        maxLength="16"
                                    />
                                    {errors.numeroTarjeta && (
                                        <span className="error-message">{errors.numeroTarjeta}</span>
                                    )}
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="fechaExpiracion">
                                            Fecha de Expiración <span className="required">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="fechaExpiracion"
                                            name="fechaExpiracion"
                                            value={formData.fechaExpiracion}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={errors.fechaExpiracion ? "input-error" : ""}
                                            placeholder="12/25"
                                            autoComplete="cc-exp"
                                            maxLength="5"
                                        />
                                        {errors.fechaExpiracion && (
                                            <span className="error-message">{errors.fechaExpiracion}</span>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="cvv">
                                            CVV <span className="required">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="cvv"
                                            name="cvv"
                                            value={formData.cvv}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={errors.cvv ? "input-error" : ""}
                                            placeholder="123"
                                            autoComplete="cc-csc"
                                            maxLength="3"
                                        />
                                        {errors.cvv && (
                                            <span className="error-message">{errors.cvv}</span>
                                        )}
                                    </div>
                                </div>

                                {errors.submit && (
                                    <div className="error-message submit-error">{errors.submit}</div>
                                )}

                                <button type="submit" className="btn-submit" disabled={isSubmitting}>
                                    {isSubmitting ? "Procesando compra..." : `Pagar $${total.toFixed(2)}`}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Resumen del Pedido */}
                    <div className="resumen-section">
                        <div className="cart-summary">
                            <h2 className="summary-title">Resumen del Pedido</h2>

                            {/* Lista de productos */}
                            <div className="order-items">
                                {cart.map((item) => (
                                    <div key={item.id} className="order-item">
                                        <img src={item.image} alt={item.title} className="order-item-image" />
                                        <div className="order-item-details">
                                            <h4 className="order-item-title">{item.title}</h4>
                                            <p className="order-item-quantity">Cantidad: {item.quantity}</p>
                                        </div>
                                        <div className="order-item-price">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Cálculos */}
                            <div className="summary-details">
                                <div className="summary-row">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="summary-row">
                                    <span>IVA (19%)</span>
                                    <span>${iva.toFixed(2)}</span>
                                </div>
                                <div className="summary-row total-row">
                                    <span>Total</span>
                                    <span className="total-amount">${total.toFixed(2)}</span>
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
        </div>
    );
};

export default FormularioCompra;
