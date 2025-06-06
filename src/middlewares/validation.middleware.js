exports.validarDatosMantenimiento = (req, res, next) => {
  const { ciclo_inicio, ciclo_fin, tipo_recurrencia, cada } = req.body;
  
  if (typeof ciclo_inicio !== 'number' || ciclo_inicio < 1) {
    return res.status(400).json({ error: 'ciclo_inicio debe ser un entero positivo' });
  }
  
  if (typeof ciclo_fin !== 'number' || ciclo_fin < ciclo_inicio) {
    return res.status(400).json({ error: 'ciclo_fin debe ser mayor o igual a ciclo_inicio' });
  }
  
  if (!['ciclos', 'mantenimiento'].includes(tipo_recurrencia)) {
    return res.status(400).json({ error: 'tipo_recurrencia debe ser "ciclos" o "mantenimiento"' });
  }
  
  if (typeof cada !== 'number' || cada < 1) {
    return res.status(400).json({ error: 'cada debe ser un entero positivo' });
  }
  
  next();
};