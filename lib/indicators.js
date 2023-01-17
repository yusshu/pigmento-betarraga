const formats = {
  normal: n => n.toFixed(2),
  pen: n => `S/ ${n.toFixed(2)}`,
  percentage: n => `${(n * 100).toFixed(2)} %`
};

export const factors = [
  {
    name: 'Materia Prima',
    factor: 55,
    unit: 'kg/h'
  },
  {
    name: 'Agua Tratada',
    factor: 164.85,
    unit: 'kg/h'
  },
  {
    name: 'Solución Acuosa de Beterraga',
    factor: 142.86,
    unit: 'kg/h'
  },
  {
    name: 'Pasta Humedad del Filtrado',
    factor: 76.94,
    unit: 'kg/h'
  },
  {
    name: 'Vapor Vegetal de Deshidratación',
    factor: 141.86,
    unit: 'kg/h'
  },
  {
    name: 'Pasta seca (Puré)',
    factor: 45.43,
    unit: 'kg/h'
  },
  {
    name: 'Vapor Vegetal del Secado de Puré',
    factor: 31.51,
    unit: 'kg/h'
  },
  {
    name: 'Puré molido',
    factor: 45.43,
    unit: 'kg/h'
  },
  {
    name: 'Energía para el secado de puré',
    factor: 241.124,
    unit: 'MJ/h'
  },
  {
    name: 'Agua caliente para secador SVR',
    factor: 778.17,
    unit: 'kg/h'
  },
  {
    name: 'Flujo de aire para SVR',
    factor: 17,
    unit: 'm³/h'
  },
  {
    name: 'Requerimiento para Vapor de Deshidratación',
    factor: 86.1,
    unit: 'kg/h'
  },
  {
    name: 'Vapor Total Requerido',
    factor: 109.54,
    unit: 'kg/h'
  }
];

export const indicators = [
  {
    name: 'Indicadores de decisión económico',
    data: {
      bce: {
        name: 'B/C',
        format: formats.normal
      },
      vane: {
        name: 'VANE',
        format: formats.pen
      },
      tire: {
        name: 'TIRE',
        format: formats.percentage
      },
      pe: {
        name: 'Punto de Equilibrio',
        format: formats.normal
      }
    }
  }
];