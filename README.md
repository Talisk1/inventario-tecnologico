# Sistema de Inventario de Equipamiento Tecnológico

Aplicación web cliente-servidor para registrar y administrar equipamiento tecnológico (Evaluación N.º 2, Lenguaje de Programación Web II, IPVG Sede Chillán).

**Estudiante:** _[completar nombre]_

## Tecnologías
Vue 3 + Vite · NestJS 11 · TypeORM · MySQL 8 · class-validator

## Requisitos
Node.js 20+, npm, MySQL 8 en ejecución.

## Base de datos
1. Crear la BD: `CREATE DATABASE inventario_tecnologico;`
2. Copiar `backend/.env.example` a `backend/.env` y completar usuario/clave.
3. La tabla `equipos` la crea TypeORM (`synchronize: true`) al iniciar el backend.
4. Cargar datos de prueba (5 equipos): `mysql -u root -p < database/seed.sql`

## Ejecución
```bash
# Backend (puerto 3000)
cd backend && npm install && npm run start:dev
# Frontend (puerto 5173)
cd frontend && npm install && npm run dev
```

## Variables (`backend/.env.example`)
`DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, PORT, FRONTEND_URL`. Frontend opcional: `VITE_API_URL`.

## Endpoints
| Método | Ruta | Función |
|---|---|---|
| GET | /equipos | Listar |
| GET | /equipos/:id | Obtener (404 si no existe) |
| POST | /equipos | Registrar |
| PATCH | /equipos/:id | Actualizar |
| DELETE | /equipos/:id | Eliminar |

## Estructura
```
backend/src/equipos/  entity, dto/, service, controller, module
backend/src/main.ts   ValidationPipe (whitelist) y CORS
frontend/src/api.js   capa fetch hacia la API
frontend/src/App.vue  listado, filtros, detalle, carga y errores
frontend/src/components/EquipoForm.vue  crear/editar
database/seed.sql     datos de prueba
```

## Declaración de uso de IA
- **Herramienta:** Claude (Anthropic), mediante Claude Code.
- **Tareas:** estructura inicial del backend y frontend, DTOs, servicio/controlador, componentes Vue, README.
- **Tipo de apoyo:** generación de código y documentación.
- **Revisión del estudiante:** _[completar: qué revisé, probé y adapté]_

## Pruebas realizadas
Compilación de backend (`tsc`) y frontend (`vite build`). Pruebas manuales: _[completar tras ejecutar: CRUD, 404 con ID inexistente, validaciones con datos inválidos, confirmación al eliminar, persistencia tras reiniciar]_.