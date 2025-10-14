require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const mysql = require("mysql2/promise");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "hakey_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test database connection
pool
  .getConnection()
  .then((conn) => {
    console.log("✅ Conexión a la base de datos exitosa");
    conn.release();
  })
  .catch((err) => {
    console.error("❌ Error al conectar a la base de datos:", err.message);
  });

// Helper: validate user payload
function validateUserPayload(body, requireAll = true) {
  const errors = [];
  const { nombre, correo, numero, contrasena } = body || {};

  if (requireAll) {
    if (!nombre || typeof nombre !== "string") errors.push("nombre (string)");
    if (!correo || typeof correo !== "string") errors.push("correo (string)");
    if (!contrasena || typeof contrasena !== "string")
      errors.push("contrasena (string)");
  } else {
    if (nombre !== undefined && typeof nombre !== "string")
      errors.push("nombre debe ser string");
    if (correo !== undefined && typeof correo !== "string")
      errors.push("correo debe ser string");
    if (contrasena !== undefined && typeof contrasena !== "string")
      errors.push("contrasena debe ser string");
  }

  if (numero !== undefined && typeof numero !== "string")
    errors.push("numero debe ser string");

  return errors;
}

// ============================================
// AUTH ENDPOINTS
// ============================================

// Login endpoint - verify user credentials
app.post("/api/auth/login", async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    // Validate input
    if (!correo || !contrasena) {
      return res.status(400).json({
        error: "Correo y contraseña son requeridos",
      });
    }

    // Find user by email
    const [rows] = await pool.execute(
      "SELECT id, nombre, correo, numero, contrasena, created_at, updated_at FROM users WHERE correo = ?",
      [correo]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        error: "Credenciales inválidas",
      });
    }

    const user = rows[0];

    // Verify password
    const isPasswordValid = await bcrypt.compare(contrasena, user.contrasena);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Credenciales inválidas",
      });
    }

    // Check if user is admin (based on email)
    const isAdmin = correo.toLowerCase() === "admin@hakey.com";

    // Return user data (without password)
    const userData = {
      id: user.id,
      nombre: user.nombre,
      correo: user.correo,
      numero: user.numero,
      isAdmin: isAdmin,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return res.json({
      success: true,
      user: userData,
    });
  } catch (e) {
    console.error("Error en login:", e);
    return res.status(500).json({ error: e.message });
  }
});

// ============================================
// USER CRUD ENDPOINTS
// ============================================

// Create user (POST /api/users)
app.post("/api/users", async (req, res) => {
  try {
    const errs = validateUserPayload(req.body, true);
    if (errs.length > 0)
      return res.status(400).json({ error: "Payload inválido", details: errs });

    const { nombre, correo, numero, contrasena } = req.body;

    // Hash password
    const hash = await bcrypt.hash(contrasena, 10);

    // Insert (correo debe ser único en la DB)
    const insertSQL = `INSERT INTO users (nombre, correo, numero, contrasena) VALUES (?,?,?,?)`;
    const vals = [nombre, correo, numero || null, hash];
    const [result] = await pool.execute(insertSQL, vals);

    const [rows] = await pool.execute(
      "SELECT id, nombre, correo, numero, created_at, updated_at FROM users WHERE id = ?",
      [result.insertId]
    );

    return res.status(201).json(rows[0]);
  } catch (e) {
    // MySQL duplicate email error handling (ER_DUP_ENTRY)
    if (e && e.code === "ER_DUP_ENTRY")
      return res.status(409).json({ error: "Correo ya registrado" });
    return res.status(500).json({ error: e.message });
  }
});

// Read all users (GET /api/users)
app.get("/api/users", async (req, res) => {
  try {
    const [rows] = await pool.execute(
      "SELECT id, nombre, correo, numero, created_at, updated_at FROM users ORDER BY id DESC"
    );
    return res.json(rows);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// Read one user (GET /api/users/:id)
app.get("/api/users/:id", async (req, res) => {
  try {
    const [rows] = await pool.execute(
      "SELECT id, nombre, correo, numero, created_at, updated_at FROM users WHERE id = ?",
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: "Not found" });
    return res.json(rows[0]);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// Update user replace (PUT /api/users/:id)
app.put("/api/users/:id", async (req, res) => {
  try {
    const errs = validateUserPayload(req.body, true);
    if (errs.length > 0)
      return res.status(400).json({ error: "Payload inválido", details: errs });

    const { nombre, correo, numero, contrasena } = req.body;

    // If password present, hash it
    const hash = await bcrypt.hash(contrasena, 10);

    const updateSQL = `UPDATE users SET nombre=?, correo=?, numero=?, contrasena=?, updated_at=CURRENT_TIMESTAMP WHERE id=?`;
    const vals = [nombre, correo, numero || null, hash, req.params.id];
    const [result] = await pool.execute(updateSQL, vals);

    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Not found" });

    const [rows] = await pool.execute(
      "SELECT id, nombre, correo, numero, created_at, updated_at FROM users WHERE id = ?",
      [req.params.id]
    );
    return res.json(rows[0]);
  } catch (e) {
    if (e && e.code === "ER_DUP_ENTRY")
      return res.status(409).json({ error: "Correo ya registrado" });
    return res.status(500).json({ error: e.message });
  }
});

// Update partial (PATCH /api/users/:id)
app.patch("/api/users/:id", async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0)
      return res.status(400).json({ error: "No fields to update" });

    const errs = validateUserPayload(req.body, false);
    if (errs.length > 0)
      return res.status(400).json({ error: "Payload inválido", details: errs });

    const allowed = ["nombre", "correo", "numero", "contrasena"];
    const set = [];
    const values = [];

    for (const key of allowed) {
      if (req.body[key] !== undefined) {
        let val = req.body[key];
        if (key === "contrasena") {
          val = await bcrypt.hash(val, 10);
          set.push(`contrasena=?`);
        } else {
          set.push(`${key}=?`);
        }
        values.push(val);
      }
    }

    if (values.length === 0)
      return res
        .status(400)
        .json({ error: "No hay campos válidos para actualizar" });

    set.push(`updated_at=CURRENT_TIMESTAMP`);
    const sql = `UPDATE users SET ${set.join(", ")} WHERE id=?`;
    values.push(req.params.id);

    const [result] = await pool.execute(sql, values);
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Not found" });

    const [rows] = await pool.execute(
      "SELECT id, nombre, correo, numero, created_at, updated_at FROM users WHERE id = ?",
      [req.params.id]
    );
    return res.json(rows[0]);
  } catch (e) {
    if (e && e.code === "ER_DUP_ENTRY")
      return res.status(409).json({ error: "Correo ya registrado" });
    return res.status(500).json({ error: e.message });
  }
});

// Delete user (DELETE /api/users/:id)
app.delete("/api/users/:id", async (req, res) => {
  try {
    const [result] = await pool.execute("DELETE FROM users WHERE id=?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Not found" });
    return res.status(204).send();
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "API is running" });
});

// Export the express app for local server or cloud deployment
// If run directly (node index.js), start an HTTP server for local testing
if (require.main === module) {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () =>
    console.log(`🚀 API listening on http://localhost:${PORT}`)
  );
}

module.exports = app;
