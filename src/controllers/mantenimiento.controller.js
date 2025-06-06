const mantenimientoService = require('../services/mantenimiento.service');

exports.calcularMantenimiento = (req, res, next) => {
  try {
    const { ciclo_inicio, ciclo_fin, tipo_recurrencia, cada } = req.body;
    
    // Validación básica
    if (!ciclo_inicio || !ciclo_fin || !tipo_recurrencia || !cada) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const resultado = mantenimientoService.calcularCiclosMantenimiento({
      ciclo_inicio,
      ciclo_fin,
      tipo_recurrencia,
      cada
    });

    res.json(resultado);
  } catch (error) {
    next(error);
  }
};