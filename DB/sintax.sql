CREATE DATABASE IF NOT EXISTS sistema_usuarios;
USE sistema_usuarios;
 
-- Crear la tabla Usuarios
CREATE TABLE Usuarios (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    NombreCompleto VARCHAR(100) NOT NULL,
    Contrasena VARCHAR(255) NOT NULL,
    Token VARCHAR(255),
    Rol ENUM('Encargado de Farmacia', 'Médico Veterinario', 'Administrador') NOT NULL,
    Privilegiado BOOLEAN DEFAULT FALSE
);
-- Insertamos 3 usuarios
INSERT INTO Usuarios (NombreCompleto, Contrasena, Token, Rol, Privilegiado) VALUES
('Juan Pérez', 'farmacia123', 'tok_farmacia', 'Encargado de Farmacia', FALSE),
('María Gómez', 'vet456', 'tok_vet', 'Médico Veterinario', FALSE),
('Carlos Ruiz', 'admin789', 'tok_admin', 'Administrador', TRUE);
 
SELECT*FROM Usuarios;