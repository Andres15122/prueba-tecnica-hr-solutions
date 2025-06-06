const express = require('express');
const router = express.Router();
const mantenimientoController = require('../controllers/mantenimiento.controller');
const { validarDatosMantenimiento } = require('../middlewares/validation.middleware');

/**
 * @swagger
 * tags:
 *   name: Mantenimiento
 *   description: API para planificación de mantenimiento de máquinas industriales
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     MantenimientoRequest:
 *       type: object
 *       required:
 *         - ciclo_inicio
 *         - ciclo_fin
 *         - tipo_recurrencia
 *         - cada
 *       properties:
 *         ciclo_inicio:
 *           type: integer
 *           minimum: 1
 *           description: Número de ciclo inicial (entero positivo)
 *           example: 1
 *         ciclo_fin:
 *           type: integer
 *           description: Número de ciclo final (mayor o igual a ciclo_inicio)
 *           example: 15
 *         tipo_recurrencia:
 *           type: string
 *           enum: [ciclos, mantenimiento]
 *           description: Tipo de recurrencia para el mantenimiento
 *           example: mantenimiento
 *         cada:
 *           type: integer
 *           minimum: 1
 *           description: Frecuencia de mantenimiento (entero positivo)
 *           example: 3
 *     MantenimientoResponse:
 *       type: object
 *       properties:
 *         ciclos_mantenimiento:
 *           type: array
 *           items:
 *             type: integer
 *           description: Lista de ciclos donde se debe realizar mantenimiento
 *           example: [5, 11]
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Mensaje de error descriptivo
 *           example: "Datos de entrada inválidos"
 */

/**
 * @swagger
 * /mantenimiento:
 *   post:
 *     summary: Calcula los ciclos de mantenimiento para máquinas industriales
 *     description: |
 *       Calcula en qué ciclos debe realizarse el mantenimiento según dos tipos de recurrencia:
 *       - Por tiempo (ciclos): cada cierto número de ciclos desde el inicio
 *       - Por uso (mantenimiento): cada cierto número de ciclos impares (uso activo)
 *     tags: [Mantenimiento]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MantenimientoRequest'
 *     responses:
 *       200:
 *         description: Lista de ciclos donde se debe realizar mantenimiento
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MantenimientoResponse'
 *       400:
 *         description: Error en los datos de entrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               ciclo_inicio inválido:
 *                 value:
 *                   error: "ciclo_inicio debe ser un entero positivo"
 *               ciclo_fin inválido:
 *                 value:
 *                   error: "ciclo_fin debe ser mayor o igual a ciclo_inicio"
 *               tipo_recurrencia inválido:
 *                 value:
 *                   error: "tipo_recurrencia debe ser 'ciclos' o 'mantenimiento'"
 *               cada inválido:
 *                 value:
 *                   error: "cada debe ser un entero positivo"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/mantenimiento', validarDatosMantenimiento, mantenimientoController.calcularMantenimiento);

module.exports = router;