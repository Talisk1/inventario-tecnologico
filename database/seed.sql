CREATE DATABASE IF NOT EXISTS inventario_tecnologico CHARACTER SET utf8mb4;
USE inventario_tecnologico;
-- Ejecutar DESPUES de iniciar el backend una vez (TypeORM crea la tabla equipos).
INSERT INTO equipos (codigoInventario, nombre, tipo, marca, modelo, ubicacion, estado, fechaAdquisicion, observaciones) VALUES
('NB-001', 'Notebook Docente 1', 'Notebook', 'Lenovo', 'ThinkPad E14', 'Sala de profesores', 'En uso', '2024-03-15', 'Asignado a docente de informática'),
('PC-001', 'PC Laboratorio 1', 'PC', 'HP', 'ProDesk 400', 'Laboratorio 1', 'Disponible', '2023-08-02', NULL),
('MN-001', 'Monitor Laboratorio 1', 'Monitor', 'Samsung', 'S24F350', 'Laboratorio 1', 'Disponible', '2023-08-02', NULL),
('PY-001', 'Proyector Sala 12', 'Proyector', 'Epson', 'X49', 'Sala 12', 'Mantención', '2022-05-20', 'Lámpara por reemplazar'),
('NB-002', 'Notebook Respaldo', 'Notebook', 'Dell', 'Latitude 3420', 'Bodega TI', 'Baja', '2019-11-10', 'Pantalla dañada');