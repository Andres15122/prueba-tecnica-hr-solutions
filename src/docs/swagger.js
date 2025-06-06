module.exports = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Planificación de Mantenimiento',
      version: '1.0.0',
      description: 'API para calcular ciclos de mantenimiento de máquinas industriales',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};