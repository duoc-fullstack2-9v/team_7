import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validación de email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validación de teléfono (formato flexible)
  const validatePhone = (phone) => {
    const phoneRegex = /^[\d\s\-\+\(\)]{8,}$/;
    return phoneRegex.test(phone);
  };

  // Validación de contraseña fuerte
  const validatePasswordStrength = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasMinLength = password.length >= 8;

    return {
      isValid: hasUpperCase && hasLowerCase && hasNumber && hasMinLength,
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      hasMinLength,
    };
  };

  // Validación de campos individuales
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) {
          error = "El nombre es requerido";
        } else if (value.trim().length < 2) {
          error = "El nombre debe tener al menos 2 caracteres";
        } else if (value.trim().length > 50) {
          error = "El nombre no puede tener más de 50 caracteres";
        }
        break;

      case "email":
        if (!value.trim()) {
          error = "El email es requerido";
        } else if (!validateEmail(value)) {
          error = "Email inválido";
        }
        break;

      case "password":
        if (!value) {
          error = "La contraseña es requerida";
        } else {
          const strength = validatePasswordStrength(value);
          if (!strength.hasMinLength) {
            error = "La contraseña debe tener al menos 8 caracteres";
          } else if (!strength.hasUpperCase) {
            error = "Debe contener al menos una mayúscula";
          } else if (!strength.hasLowerCase) {
            error = "Debe contener al menos una minúscula";
          } else if (!strength.hasNumber) {
            error = "Debe contener al menos un número";
          }
        }
        break;

      case "confirmPassword":
        if (!value) {
          error = "Debes confirmar tu contraseña";
        } else if (value !== formData.password) {
          error = "Las contraseñas no coinciden";
        }
        break;

      case "phone":
        if (value && !validatePhone(value)) {
          error = "Número de teléfono inválido";
        }
        break;

      case "acceptTerms":
        if (!value) {
          error = "Debes aceptar los términos y condiciones";
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

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Limpiar error del campo cuando el usuario escribe
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Validar confirmación de contraseña en tiempo real
    if (name === "password" && formData.confirmPassword) {
      const confirmError = validateField(
        "confirmPassword",
        formData.confirmPassword
      );
      setErrors((prev) => ({
        ...prev,
        confirmPassword: confirmError,
      }));
    }
  };

  // Manejar blur (cuando el usuario sale del campo)
  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    const error = validateField(name, fieldValue);

    if (error) {
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simular llamada a API (reemplazar con tu lógica real)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Aquí iría tu lógica de registro real
      login({
        email: formData.email,
        name: formData.name,
      });

      // Redirigir al home o dashboard
      navigate("/");
    } catch (error) {
      setErrors({
        submit: "Error al crear la cuenta. Por favor, intenta nuevamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Obtener fuerza de la contraseña
  const getPasswordStrength = () => {
    if (!formData.password) return null;
    const strength = validatePasswordStrength(formData.password);

    let level = 0;
    if (strength.hasMinLength) level++;
    if (strength.hasUpperCase) level++;
    if (strength.hasLowerCase) level++;
    if (strength.hasNumber) level++;

    if (level <= 2) return { text: "Débil", class: "weak" };
    if (level === 3) return { text: "Media", class: "medium" };
    return { text: "Fuerte", class: "strong" };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h1>Crear Cuenta</h1>
          <p>Únete a HAKEY y disfruta de las mejores ofertas</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form" noValidate>
          <div className="form-group">
            <label htmlFor="name">
              Nombre Completo <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.name ? "input-error" : ""}
              placeholder="Tu nombre completo"
              autoComplete="name"
            />
            {errors.name && (
              <span className="error-message">{errors.name}</span>
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
            <label htmlFor="phone">
              Teléfono <span className="optional">(opcional)</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.phone ? "input-error" : ""}
              placeholder="+1 234 567 8900"
              autoComplete="tel"
            />
            {errors.phone && (
              <span className="error-message">{errors.phone}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Contraseña <span className="required">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.password ? "input-error" : ""}
              placeholder="••••••••"
              autoComplete="new-password"
            />
            {passwordStrength && (
              <div className={`password-strength ${passwordStrength.class}`}>
                Fortaleza: {passwordStrength.text}
              </div>
            )}
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
            <small className="hint">
              Mínimo 8 caracteres, incluye mayúsculas, minúsculas y números
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">
              Confirmar Contraseña <span className="required">*</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.confirmPassword ? "input-error" : ""}
              placeholder="••••••••"
              autoComplete="new-password"
            />
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.acceptTerms ? "checkbox-error" : ""}
              />
              <span>
                Acepto los{" "}
                <Link to="/terms" className="link" target="_blank">
                  términos y condiciones
                </Link>{" "}
                y la{" "}
                <Link to="/privacy" className="link" target="_blank">
                  política de privacidad
                </Link>
              </span>
            </label>
            {errors.acceptTerms && (
              <span className="error-message">{errors.acceptTerms}</span>
            )}
          </div>

          {errors.submit && (
            <div className="error-message submit-error">{errors.submit}</div>
          )}

          <button type="submit" className="btn-submit" disabled={isSubmitting}>
            {isSubmitting ? "Creando cuenta..." : "Crear Cuenta"}
          </button>

          <div className="form-footer">
            <p>
              ¿Ya tienes cuenta?{" "}
              <Link to="/login" className="link">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
