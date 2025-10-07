# Simulación de Algoritmos Estocásticos

## 🧮 Algoritmos Implementados

### 1. Depósito a Plazo Fijo
**Campos requeridos:**
- Capital Inicial (K) - $us
- Tasa de Interés (i) - %
- Tiempo de Depósito (T) - años

**Características:**
- Cálculo de interés compuesto: `K * (1 + i)^T`
- Tabla detallada con resumen por años
- Visualización de ganancias acumuladas
- Cálculo de tasa de rendimiento

### 2. Depósito a Plazo Variable
**Campos requeridos:**
- Capital Inicial (K) - $us
- Tiempo de Depósito (T) - años
- Número de simulaciones (configurable: 100-10,000)

**Características:**
- Simulación Monte Carlo con tasas variables
- Distribución normal de tasas de interés (μ=5%, σ=2%)
- Estadísticas completas: promedio, mínimo, máximo, mediana
- Percentiles 25 y 95
- Desviación estándar y coeficiente de variación

