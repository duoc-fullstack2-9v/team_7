import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const FormularioCompra = () => {
    const navigate = useNavigate();

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
            // Verificar credenciales de prueba
            const numeroTarjetaPrueba = formData.numeroTarjeta === "1234567812345678";
            const cvvPrueba = formData.cvv === "123";
            const fechaExpiracionPrueba = formData.fechaExpiracion === "12/25";
            const numeroPrueba = formData.numero === "972317686";
            const emailPrueba = formData.email === "admin@hakey.com";
            const nombrePrueba = formData.nombre.toLowerCase() === "javier arancibia";

            if (numeroTarjetaPrueba && cvvPrueba && fechaExpiracionPrueba && numeroPrueba && emailPrueba && nombrePrueba) {
                setTimeout(() => {
                    navigate("/compraExitosa");
                }, 1500);
            } else {
                setErrors({ submit: "Los credenciales son incorrectos, por favor verifica los datos ingresados" });
                setIsSubmitting(false);
            }
        } else {
            setIsSubmitting(false);
        }
    }; 

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1>Formulario de Compra</h1>
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

                    {errors.submit && (
                        <div className="error-message submit-error">{errors.submit}</div>
                    )}

                    <button type="submit" className="btn-submit" disabled={isSubmitting}>
                        {isSubmitting ? "Procesando compra..." : "Finalizar Compra"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FormularioCompra;
