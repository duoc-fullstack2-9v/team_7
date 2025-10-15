import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createGame,
  getAllGames,
  deleteGame,
  patchGame,
} from "../services/gamesApi";
import {
  FiSave,
  FiX,
  FiImage,
  FiDollarSign,
  FiPercent,
  FiTrash2,
  FiRefreshCw,
  FiEdit2,
} from "react-icons/fi";
import "./AdminPanel.css";

const AdminPanel = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    discount: "",
    category: "",
    platform: "PC",
    rating: "",
    image: "",
    releaseDate: "",
    developer: "",
    publisher: "",
    requirements: {
      os: "",
      processor: "",
      memory: "",
      graphics: "",
      storage: "",
    },
    features: [],
  });

  const [featureInput, setFeatureInput] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Estados para gestión de juegos
  const [games, setGames] = useState([]);
  const [isLoadingGames, setIsLoadingGames] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, game: null });
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  // Estados para edición de juegos
  const [editModal, setEditModal] = useState({ show: false, game: null });
  const [editFormData, setEditFormData] = useState(null);
  const [editErrors, setEditErrors] = useState({});
  const [isEditSubmitting, setIsEditSubmitting] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);

  // Categorías disponibles
  const categories = [
    "Acción",
    "Aventura",
    "RPG",
    "Estrategia",
    "Deportes",
    "Simulación",
    "Terror",
    "Carreras",
  ];

  // Plataformas disponibles
  const platforms = [
    "PC",
    "PlayStation",
    "Xbox",
    "Nintendo Switch",
    "Multi-plataforma",
  ];

  // Cargar juegos al montar el componente
  useEffect(() => {
    // Scroll al inicio
    window.scrollTo({ top: 0, behavior: "smooth" });
    loadGames();
  }, []);

  // Función para cargar todos los juegos
  const loadGames = async () => {
    setIsLoadingGames(true);
    try {
      const data = await getAllGames();
      setGames(data);
    } catch (error) {
      console.error("Error al cargar juegos:", error);
    } finally {
      setIsLoadingGames(false);
    }
  };

  // Función para abrir modal de confirmación
  const handleDeleteClick = (game) => {
    setDeleteModal({ show: true, game });
  };

  // Función para cerrar modal
  const handleCancelDelete = () => {
    setDeleteModal({ show: false, game: null });
  };

  // Función para confirmar eliminación
  const handleConfirmDelete = async () => {
    if (!deleteModal.game) return;

    try {
      await deleteGame(deleteModal.game.id);
      setDeleteSuccess(true);
      setDeleteModal({ show: false, game: null });

      // Recargar lista de juegos
      await loadGames();

      // Ocultar mensaje de éxito después de 3 segundos
      setTimeout(() => {
        setDeleteSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error al eliminar juego:", error);
      alert("Error al eliminar el juego. Por favor, intenta de nuevo.");
      setDeleteModal({ show: false, game: null });
    }
  };

  // Funciones para edición de juegos
  const handleEditClick = (game) => {
    setEditFormData({
      title: game.title || "",
      description: game.description || "",
      price: game.originalPrice || game.price || "",
      discount: game.discount || 0,
      category: game.category || "",
      platform: Array.isArray(game.platform)
        ? game.platform[0]
        : game.platform || "PC",
      rating: game.rating || "",
      image: game.image || "",
      releaseDate: game.releaseDate || "",
      publisher: game.publisher || "",
      requirements: {
        os: game.requirements?.os || "",
        processor: game.requirements?.processor || "",
        memory: game.requirements?.memory || "",
        graphics: game.requirements?.graphics || "",
        storage: game.requirements?.storage || "",
      },
      features: game.features || [],
    });
    setEditModal({ show: true, game });
    setEditErrors({});
  };

  const handleCancelEdit = () => {
    setEditModal({ show: false, game: null });
    setEditFormData(null);
    setEditErrors({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (editErrors[name]) {
      setEditErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleEditRequirementChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      requirements: {
        ...prev.requirements,
        [name]: value,
      },
    }));
  };

  const handleConfirmEdit = async () => {
    if (!editModal.game || !editFormData) return;

    // Validar campos requeridos
    const validationErrors = {};
    if (!editFormData.title?.trim())
      validationErrors.title = "El título es requerido";
    if (!editFormData.description?.trim())
      validationErrors.description = "La descripción es requerida";
    if (!editFormData.price || parseFloat(editFormData.price) <= 0)
      validationErrors.price = "El precio debe ser mayor a 0";
    if (!editFormData.category)
      validationErrors.category = "La categoría es requerida";
    if (!editFormData.image?.trim())
      validationErrors.image = "La imagen es requerida";
    if (!editFormData.publisher?.trim())
      validationErrors.publisher = "El publicador es requerido";

    if (Object.keys(validationErrors).length > 0) {
      setEditErrors(validationErrors);
      return;
    }

    setIsEditSubmitting(true);

    try {
      // Construir objeto solo con campos editados
      const updatedData = {};

      // Campos básicos
      if (editFormData.title?.trim()) {
        updatedData.title = editFormData.title.trim();
      }
      if (editFormData.description?.trim()) {
        updatedData.description = editFormData.description.trim();
      }
      if (editFormData.image?.trim()) {
        updatedData.image = editFormData.image.trim();
      }
      if (editFormData.publisher?.trim()) {
        updatedData.publisher = editFormData.publisher.trim();
      }
      if (editFormData.category) {
        updatedData.category = editFormData.category;
      }
      if (editFormData.platform) {
        updatedData.platform = [editFormData.platform];
      }

      // Precios y descuento
      if (editFormData.price) {
        const price = parseFloat(editFormData.price);
        const discount = editFormData.discount
          ? parseFloat(editFormData.discount)
          : 0;
        updatedData.price = parseFloat(
          (price * (1 - discount / 100)).toFixed(2)
        );
        updatedData.original_price = price;
        updatedData.discount = discount;
      }

      // Rating
      if (editFormData.rating) {
        updatedData.rating = parseFloat(editFormData.rating);
      }

      // Release date
      if (editFormData.releaseDate) {
        updatedData.release_date = editFormData.releaseDate;
      }

      // Requirements (solo si hay cambios)
      if (editFormData.requirements) {
        const reqs = {};
        if (editFormData.requirements.os?.trim())
          reqs.os = editFormData.requirements.os.trim();
        if (editFormData.requirements.processor?.trim())
          reqs.processor = editFormData.requirements.processor.trim();
        if (editFormData.requirements.memory?.trim())
          reqs.memory = editFormData.requirements.memory.trim();
        if (editFormData.requirements.graphics?.trim())
          reqs.graphics = editFormData.requirements.graphics.trim();
        if (editFormData.requirements.storage?.trim())
          reqs.storage = editFormData.requirements.storage.trim();

        if (Object.keys(reqs).length > 0) {
          updatedData.requirements = reqs;
        }
      }

      // Features (solo si hay cambios)
      if (Array.isArray(editFormData.features)) {
        const cleanFeatures = editFormData.features.filter(
          (f) => f && f.trim()
        );
        if (cleanFeatures.length > 0) {
          updatedData.features = cleanFeatures;
        }
      }

      console.log("Editando juego ID:", editModal.game.id);
      console.log("Datos a enviar:", JSON.stringify(updatedData, null, 2));

      await patchGame(editModal.game.id, updatedData);

      setEditSuccess(true);
      setEditModal({ show: false, game: null });
      setEditFormData(null);

      // Recargar lista de juegos
      await loadGames();

      // Ocultar mensaje de éxito después de 3 segundos
      setTimeout(() => {
        setEditSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error al editar juego:", error);
      console.error("Detalles del error:", error.message);
      setEditErrors({ submit: `Error al editar: ${error.message}` });
      alert(`Error al editar el juego: ${error.message}`);
    } finally {
      setIsEditSubmitting(false);
    }
  };

  // Validaciones
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "title":
        if (!value.trim()) {
          error = "El título es requerido";
        } else if (value.trim().length < 2) {
          error = "El título debe tener al menos 2 caracteres";
        }
        break;
      case "description":
        if (!value.trim()) {
          error = "La descripción es requerida";
        } else if (value.trim().length < 10) {
          error = "La descripción debe tener al menos 10 caracteres";
        }
        break;
      case "price":
        if (!value) {
          error = "El precio es requerido";
        } else if (isNaN(value) || parseFloat(value) <= 0) {
          error = "El precio debe ser un número mayor a 0";
        }
        break;
      case "discount":
        if (
          value &&
          (isNaN(value) || parseFloat(value) < 0 || parseFloat(value) > 100)
        ) {
          error = "El descuento debe ser entre 0 y 100";
        }
        break;
      case "category":
        if (!value) {
          error = "La categoría es requerida";
        }
        break;
      case "rating":
        if (
          value &&
          (isNaN(value) || parseFloat(value) < 0 || parseFloat(value) > 5)
        ) {
          error = "La calificación debe ser entre 0 y 5";
        }
        break;
      case "image":
        if (!value.trim()) {
          error = "La URL de la imagen es requerida";
        } else if (!value.match(/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i)) {
          error =
            "Debe ser una URL válida de imagen (jpg, jpeg, png, webp, gif)";
        }
        break;
      case "developer":
        if (!value.trim()) {
          error = "El desarrollador es requerido";
        }
        break;
      case "publisher":
        if (!value.trim()) {
          error = "El publicador es requerido";
        }
        break;
      default:
        break;
    }

    return error;
  };

  const validateForm = () => {
    const newErrors = {};

    // Validar campos principales
    const mainFields = [
      "title",
      "description",
      "price",
      "category",
      "image",
      "developer",
      "publisher",
    ];
    mainFields.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    // Validar campos opcionales si tienen valor
    if (formData.discount) {
      const error = validateField("discount", formData.discount);
      if (error) newErrors.discount = error;
    }

    if (formData.rating) {
      const error = validateField("rating", formData.rating);
      if (error) newErrors.rating = error;
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleRequirementChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      requirements: {
        ...prev.requirements,
        [name]: value,
      },
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);

    if (error) {
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const addFeature = () => {
    if (
      featureInput.trim() &&
      !formData.features.includes(featureInput.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, featureInput.trim()],
      }));
      setFeatureInput("");
    }
  };

  const removeFeature = (featureToRemove) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((f) => f !== featureToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      // Preparar datos para enviar según el formato de la API
      const price = parseFloat(formData.price);
      const discount = formData.discount ? parseFloat(formData.discount) : 0;
      const finalPrice = price * (1 - discount / 100);

      const gameData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        price: finalPrice, // Precio final con descuento aplicado
        originalPrice: price, // Precio original
        discount: discount,
        category: formData.category,
        platform: [formData.platform], // Array de plataformas
        rating: formData.rating ? parseFloat(formData.rating) : 0,
        image: formData.image.trim(),
        releaseDate:
          formData.releaseDate || new Date().toISOString().split("T")[0],
        publisher: formData.publisher.trim(),
        requirements: formData.requirements,
        features: formData.features,
        featured: false, // Nuevo campo
      };

      console.log("Enviando datos:", gameData); // Para debug
      await createGame(gameData);

      setSubmitSuccess(true);

      // Recargar lista de juegos
      await loadGames();

      // Limpiar formulario
      setFormData({
        title: "",
        description: "",
        price: "",
        discount: "",
        category: "",
        platform: "PC",
        rating: "",
        image: "",
        releaseDate: "",
        developer: "",
        publisher: "",
        requirements: {
          os: "",
          processor: "",
          memory: "",
          graphics: "",
          storage: "",
        },
        features: [],
      });

      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Ocultar mensaje de éxito después de 5 segundos
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error("Error al crear juego:", error);
      let errorMessage =
        "Error al crear el juego. Por favor, intenta nuevamente.";

      if (error.message) {
        errorMessage = `Error: ${error.message}`;
      }

      setErrors({
        submit: errorMessage,
      });

      // Scroll to error
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateFinalPrice = () => {
    const price = parseFloat(formData.price) || 0;
    const discount = parseFloat(formData.discount) || 0;
    return (price * (1 - discount / 100)).toFixed(2);
  };

  // Función helper para formatear precios
  const formatPrice = (price) => {
    const numPrice = typeof price === "number" ? price : parseFloat(price);
    return isNaN(numPrice) ? "0.00" : numPrice.toFixed(2);
  };

  return (
    <div className="admin-panel">
      <div className="container">
        <div className="admin-header">
          <div>
            <h1>Panel de Administrador</h1>
            <p>Agrega nuevos juegos al catálogo</p>
          </div>
          <button
            onClick={() => navigate("/catalog")}
            className="btn-secondary"
          >
            Ver Catálogo
          </button>
        </div>

        {submitSuccess && (
          <div className="success-message">
            ✓ ¡Juego agregado exitosamente al catálogo!
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-form" noValidate>
          {/* Información Básica */}
          <section className="form-section">
            <h2>Información Básica</h2>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="title">
                  Título del Juego <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.title ? "input-error" : ""}
                  placeholder="Ej: The Witcher 3: Wild Hunt"
                />
                {errors.title && (
                  <span className="error-message">{errors.title}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="category">
                  Categoría <span className="required">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.category ? "input-error" : ""}
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <span className="error-message">{errors.category}</span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">
                Descripción <span className="required">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.description ? "input-error" : ""}
                placeholder="Describe el juego..."
                rows="5"
              />
              {errors.description && (
                <span className="error-message">{errors.description}</span>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="developer">
                  Desarrollador <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="developer"
                  name="developer"
                  value={formData.developer}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.developer ? "input-error" : ""}
                  placeholder="Ej: CD Projekt Red"
                />
                {errors.developer && (
                  <span className="error-message">{errors.developer}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="publisher">
                  Publicador <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="publisher"
                  name="publisher"
                  value={formData.publisher}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.publisher ? "input-error" : ""}
                  placeholder="Ej: CD Projekt"
                />
                {errors.publisher && (
                  <span className="error-message">{errors.publisher}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="platform">
                  Plataforma <span className="required">*</span>
                </label>
                <select
                  id="platform"
                  name="platform"
                  value={formData.platform}
                  onChange={handleChange}
                >
                  {platforms.map((platform) => (
                    <option key={platform} value={platform}>
                      {platform}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="releaseDate">Fecha de Lanzamiento</label>
                <input
                  type="date"
                  id="releaseDate"
                  name="releaseDate"
                  value={formData.releaseDate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="rating">Calificación (0-5)</label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.rating ? "input-error" : ""}
                  placeholder="4.5"
                  step="0.1"
                  min="0"
                  max="5"
                />
                {errors.rating && (
                  <span className="error-message">{errors.rating}</span>
                )}
              </div>
            </div>
          </section>

          {/* Precio y Descuento */}
          <section className="form-section">
            <h2>Precio</h2>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">
                  <FiDollarSign className="inline-icon" />
                  Precio Original <span className="required">*</span>
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.price ? "input-error" : ""}
                  placeholder="59.99"
                  step="0.01"
                  min="0"
                />
                {errors.price && (
                  <span className="error-message">{errors.price}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="discount">
                  <FiPercent className="inline-icon" />
                  Descuento (%)
                </label>
                <input
                  type="number"
                  id="discount"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.discount ? "input-error" : ""}
                  placeholder="20"
                  min="0"
                  max="100"
                />
                {errors.discount && (
                  <span className="error-message">{errors.discount}</span>
                )}
              </div>

              {formData.price && (
                <div className="price-preview">
                  <label>Precio Final</label>
                  <div className="final-price">${calculateFinalPrice()}</div>
                </div>
              )}
            </div>
          </section>

          {/* Imagen */}
          <section className="form-section">
            <h2>
              <FiImage className="inline-icon" />
              Imagen
            </h2>

            <div className="form-group">
              <label htmlFor="image">
                URL de la Imagen <span className="required">*</span>
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.image ? "input-error" : ""}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
              {errors.image && (
                <span className="error-message">{errors.image}</span>
              )}
              {formData.image && !errors.image && (
                <div className="image-preview">
                  <img
                    src={formData.image}
                    alt="Preview"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                </div>
              )}
            </div>
          </section>

          {/* Requisitos del Sistema */}
          <section className="form-section">
            <h2>Requisitos del Sistema</h2>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="os">Sistema Operativo</label>
                <input
                  type="text"
                  id="os"
                  name="os"
                  value={formData.requirements.os}
                  onChange={handleRequirementChange}
                  placeholder="Ej: Windows 10 64-bit"
                />
              </div>

              <div className="form-group">
                <label htmlFor="processor">Procesador</label>
                <input
                  type="text"
                  id="processor"
                  name="processor"
                  value={formData.requirements.processor}
                  onChange={handleRequirementChange}
                  placeholder="Ej: Intel Core i5-2500K"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="memory">Memoria RAM</label>
                <input
                  type="text"
                  id="memory"
                  name="memory"
                  value={formData.requirements.memory}
                  onChange={handleRequirementChange}
                  placeholder="Ej: 8 GB"
                />
              </div>

              <div className="form-group">
                <label htmlFor="graphics">Tarjeta Gráfica</label>
                <input
                  type="text"
                  id="graphics"
                  name="graphics"
                  value={formData.requirements.graphics}
                  onChange={handleRequirementChange}
                  placeholder="Ej: NVIDIA GeForce GTX 770"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="storage">Almacenamiento</label>
              <input
                type="text"
                id="storage"
                name="storage"
                value={formData.requirements.storage}
                onChange={handleRequirementChange}
                placeholder="Ej: 50 GB"
              />
            </div>
          </section>

          {/* Características */}
          <section className="form-section">
            <h2>Características</h2>

            <div className="features-input-group">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addFeature())
                }
                placeholder="Ej: Multijugador en línea"
              />
              <button type="button" onClick={addFeature} className="btn-add">
                Agregar
              </button>
            </div>

            {formData.features.length > 0 && (
              <div className="features-list">
                {formData.features.map((feature, index) => (
                  <div key={index} className="feature-tag">
                    {feature}
                    <button
                      type="button"
                      onClick={() => removeFeature(feature)}
                      className="remove-feature"
                    >
                      <FiX />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {errors.submit && (
            <div className="error-message submit-error">{errors.submit}</div>
          )}

          {/* Botones de Acción */}
          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate("/catalog")}
              className="btn-cancel"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-submit"
              disabled={isSubmitting}
            >
              <FiSave />
              {isSubmitting ? "Guardando..." : "Guardar Juego"}
            </button>
          </div>
        </form>

        {/* Sección de Gestión de Juegos */}
        <section className="games-management">
          <div className="section-header">
            <h2>Juegos en el Catálogo</h2>
            <button
              onClick={loadGames}
              className="btn-refresh"
              disabled={isLoadingGames}
            >
              <FiRefreshCw className={isLoadingGames ? "spinning" : ""} />
              Actualizar
            </button>
          </div>

          {deleteSuccess && (
            <div className="success-message">
              ✓ ¡Juego eliminado exitosamente!
            </div>
          )}

          {editSuccess && (
            <div className="success-message">
              ✓ ¡Juego actualizado exitosamente!
            </div>
          )}

          {isLoadingGames ? (
            <div className="loading-games">
              <div className="spinner"></div>
              <p>Cargando juegos...</p>
            </div>
          ) : games.length === 0 ? (
            <div className="no-games">
              <p>No hay juegos en el catálogo</p>
            </div>
          ) : (
            <div className="games-grid">
              {games.map((game) => (
                <div key={game.id} className="game-item">
                  <div className="game-image">
                    <img src={game.image} alt={game.title} />
                  </div>
                  <div className="game-info">
                    <h3>{game.title}</h3>
                    <div className="game-meta">
                      <span className="game-category">{game.category}</span>
                      <span className="game-platform">
                        {Array.isArray(game.platform)
                          ? game.platform.join(", ")
                          : game.platform}
                      </span>
                    </div>
                    <div className="game-price">
                      {game.discount > 0 ? (
                        <>
                          <span className="original-price">
                            ${formatPrice(game.originalPrice)}
                          </span>
                          <span className="current-price">
                            ${formatPrice(game.price)}
                          </span>
                          <span className="discount-badge">
                            -{game.discount}%
                          </span>
                        </>
                      ) : (
                        <span className="current-price">
                          ${formatPrice(game.price)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="game-actions">
                    <button
                      onClick={() => handleEditClick(game)}
                      className="btn-edit"
                      title="Editar juego"
                    >
                      <FiEdit2 />
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteClick(game)}
                      className="btn-delete"
                      title="Eliminar juego"
                    >
                      <FiTrash2 />
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Modal de Confirmación de Eliminación */}
        {deleteModal.show && deleteModal.game && (
          <div className="modal-overlay" onClick={handleCancelDelete}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Confirmar Eliminación</h3>
                <button onClick={handleCancelDelete} className="modal-close">
                  <FiX />
                </button>
              </div>
              <div className="modal-body">
                <p>¿Estás seguro de que deseas eliminar el juego?</p>
                <div className="game-to-delete">
                  <img
                    src={deleteModal.game.image}
                    alt={deleteModal.game.title}
                  />
                  <div>
                    <h4>{deleteModal.game.title}</h4>
                    <p>
                      {deleteModal.game.category} -{" "}
                      {Array.isArray(deleteModal.game.platform)
                        ? deleteModal.game.platform.join(", ")
                        : deleteModal.game.platform}
                    </p>
                  </div>
                </div>
                <p className="warning-text">
                  Esta acción no se puede deshacer.
                </p>
              </div>
              <div className="modal-footer">
                <button onClick={handleCancelDelete} className="btn-cancel">
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="btn-delete-confirm"
                >
                  <FiTrash2 />
                  Eliminar Juego
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Edición */}
        {editModal.show && editModal.game && editFormData && (
          <div className="modal-overlay" onClick={handleCancelEdit}>
            <div
              className="modal-content modal-edit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>Editar Juego</h3>
                <button onClick={handleCancelEdit} className="modal-close">
                  <FiX />
                </button>
              </div>
              <div className="modal-body modal-edit-body">
                <div className="edit-form">
                  {/* Información Básica */}
                  <div className="form-group">
                    <label htmlFor="edit-title">Título *</label>
                    <input
                      type="text"
                      id="edit-title"
                      name="title"
                      value={editFormData.title}
                      onChange={handleEditChange}
                      className={editErrors.title ? "input-error" : ""}
                    />
                    {editErrors.title && (
                      <span className="error-message">{editErrors.title}</span>
                    )}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="edit-category">Categoría *</label>
                      <select
                        id="edit-category"
                        name="category"
                        value={editFormData.category}
                        onChange={handleEditChange}
                        className={editErrors.category ? "input-error" : ""}
                      >
                        <option value="">Selecciona una categoría</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                      {editErrors.category && (
                        <span className="error-message">
                          {editErrors.category}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="edit-platform">Plataforma</label>
                      <select
                        id="edit-platform"
                        name="platform"
                        value={editFormData.platform}
                        onChange={handleEditChange}
                      >
                        {platforms.map((plat) => (
                          <option key={plat} value={plat}>
                            {plat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="edit-description">Descripción *</label>
                    <textarea
                      id="edit-description"
                      name="description"
                      value={editFormData.description}
                      onChange={handleEditChange}
                      className={editErrors.description ? "input-error" : ""}
                      rows="4"
                    />
                    {editErrors.description && (
                      <span className="error-message">
                        {editErrors.description}
                      </span>
                    )}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="edit-price">Precio Original *</label>
                      <input
                        type="number"
                        id="edit-price"
                        name="price"
                        value={editFormData.price}
                        onChange={handleEditChange}
                        className={editErrors.price ? "input-error" : ""}
                        step="0.01"
                        min="0"
                      />
                      {editErrors.price && (
                        <span className="error-message">
                          {editErrors.price}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="edit-discount">Descuento (%)</label>
                      <input
                        type="number"
                        id="edit-discount"
                        name="discount"
                        value={editFormData.discount}
                        onChange={handleEditChange}
                        step="1"
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="edit-publisher">Publicador *</label>
                      <input
                        type="text"
                        id="edit-publisher"
                        name="publisher"
                        value={editFormData.publisher}
                        onChange={handleEditChange}
                        className={editErrors.publisher ? "input-error" : ""}
                      />
                      {editErrors.publisher && (
                        <span className="error-message">
                          {editErrors.publisher}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="edit-rating">Calificación (0-5)</label>
                      <input
                        type="number"
                        id="edit-rating"
                        name="rating"
                        value={editFormData.rating}
                        onChange={handleEditChange}
                        step="0.1"
                        min="0"
                        max="5"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="edit-image">URL de Imagen *</label>
                    <input
                      type="url"
                      id="edit-image"
                      name="image"
                      value={editFormData.image}
                      onChange={handleEditChange}
                      className={editErrors.image ? "input-error" : ""}
                    />
                    {editErrors.image && (
                      <span className="error-message">{editErrors.image}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="edit-releaseDate">
                      Fecha de Lanzamiento
                    </label>
                    <input
                      type="date"
                      id="edit-releaseDate"
                      name="releaseDate"
                      value={editFormData.releaseDate}
                      onChange={handleEditChange}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button onClick={handleCancelEdit} className="btn-cancel">
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmEdit}
                  className="btn-edit-confirm"
                  disabled={isEditSubmitting}
                >
                  <FiSave />
                  {isEditSubmitting ? "Guardando..." : "Guardar Cambios"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
