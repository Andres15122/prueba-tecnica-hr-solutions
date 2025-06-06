class MantenimientoService {
  calcularCiclosMantenimiento({ ciclo_inicio, ciclo_fin, tipo_recurrencia, cada }) {
    // Validación mínima
    if (ciclo_inicio < 1 || ciclo_fin < ciclo_inicio || cada < 1) {
      throw new Error('Parámetros inválidos');
    }

    const ciclos = [];
    
    if (tipo_recurrencia === 'ciclos') {
      // Cada N ciclos desde el inicio
      for (let i = ciclo_inicio; i <= ciclo_fin; i++) {
        if ((i - ciclo_inicio) % cada === 0) ciclos.push(i);
      }
    } 
    else if (tipo_recurrencia === 'mantenimiento') {
      // Cada N ciclos impares (uso), mantenimiento en siguiente ciclo
      let usos = 0;
      for (let i = ciclo_inicio; i <= ciclo_fin; i++) {
        if (i % 2 !== 0 && ++usos % cada === 0 && i+1 <= ciclo_fin) {
          ciclos.push(i+1);
        }
      }
    } 
    else {
      throw new Error('Tipo de recurrencia no válido');
    }

    return { ciclos_mantenimiento: ciclos };
  }
}

module.exports = new MantenimientoService();