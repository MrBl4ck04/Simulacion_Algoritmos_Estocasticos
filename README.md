# Simulación de Algoritmos Estocásticos

Una aplicación web moderna y elegante para la simulación de algoritmos estocásticos financieros, diseñada con un enfoque minimalista y profesional.

## 🎨 Características del Diseño

### Modo Oscuro Exclusivo
- **Paleta de colores profesional** con tonos oscuros elegantes
- **Gradientes sutiles** y efectos de profundidad
- **Tipografía Inter** para máxima legibilidad
- **Animaciones suaves** y transiciones fluidas

### Experiencia de Usuario Premium
- **Interfaz intuitiva** con navegación por pestañas
- **Validación en tiempo real** de formularios
- **Estados de carga** con animaciones
- **Diseño completamente responsive**
- **Efectos hover** y micro-interacciones

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

## 📊 Visualización de Datos

### Tablas Interactivas
- **Depósito Fijo:** Tabla anual con capital inicial, interés ganado, capital final y ganancia acumulada
- **Depósito Variable:** Tabla de estadísticas con métricas y descripciones detalladas
- **Animaciones suaves** al cargar datos
- **Scroll personalizado** para tablas largas
- **Hover effects** en filas

### Características Técnicas
- **Cálculos matemáticos precisos** con JavaScript
- **Formateo automático de moneda** en USD
- **Validación robusta** de entradas
- **Manejo de errores** elegante
- **Performance optimizada** para simulaciones grandes

## 🚀 Uso

1. **Abrir `index.html`** en cualquier navegador moderno
2. **Seleccionar el tipo de depósito** usando las pestañas superiores
3. **Completar el formulario** con los datos requeridos
4. **Hacer clic en "Simular"** para ver los resultados
5. **Analizar las tablas** con datos detallados

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Diseño moderno con variables CSS y Grid/Flexbox
- **JavaScript ES6+** - Lógica de simulación y interactividad
- **Font Awesome** - Iconografía profesional
- **Google Fonts (Inter)** - Tipografía moderna

## 📱 Responsive Design

La aplicación está optimizada para:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

## 🎯 Próximas Funcionalidades

- Implementación de los 4 algoritmos restantes
- Exportación de resultados a CSV/PDF
- Comparación entre diferentes escenarios
- Historial de simulaciones
- Configuración avanzada de parámetros

## 📄 Licencia

Este proyecto está desarrollado para fines educativos y de investigación en algoritmos estocásticos.

---

*Desarrollado con precisión matemática y atención al detalle en la experiencia de usuario.*
