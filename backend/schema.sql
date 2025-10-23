-- Database schema for HAKEY Users API
-- Create database and users table

-- Create database
CREATE DATABASE IF NOT EXISTS hakey_db;

-- Use database
USE hakey_db;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(255) NOT NULL UNIQUE,
  numero VARCHAR(20) DEFAULT NULL,
  -- Nuevo campo para indicar si el usuario es administrador (0/1)
  is_admin TINYINT(1) DEFAULT 0,
  contrasena VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_correo (correo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert admin user (password: adminhakey)
-- Password hash generated with bcrypt (salt rounds: 10)
INSERT INTO users (nombre, correo, numero, is_admin, contrasena) VALUES 
('Administrador', 'admin@hakey.com', NULL, 1, '$2a$10$YourHashedPasswordHere')
ON DUPLICATE KEY UPDATE nombre = nombre;

-- Si ya existe la tabla y quieres añadir la columna is_admin a una instalación existente:
-- ALTER TABLE users ADD COLUMN is_admin TINYINT(1) DEFAULT 0;

-- Verify table structure
DESCRIBE users;

-- Show all users (without passwords)
SELECT id, nombre, correo, numero, created_at, updated_at FROM users;
