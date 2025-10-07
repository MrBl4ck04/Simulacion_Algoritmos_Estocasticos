// Global variables - No longer needed for charts

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize the application
function initializeApp() {
    setupNavigation();
    setupForms();
    addSmoothAnimations();
}

// Setup navigation between tabs
function setupNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const sections = document.querySelectorAll('.simulation-section');

    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and sections
            navTabs.forEach(t => t.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding section
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Setup form submissions
function setupForms() {
    // Fixed deposit form
    const fixedForm = document.getElementById('fixed-deposit-form');
    fixedForm.addEventListener('submit', handleFixedDepositSubmit);
    
    // Variable deposit form
    const variableForm = document.getElementById('variable-deposit-form');
    variableForm.addEventListener('submit', handleVariableDepositSubmit);
    
    // Add input validation
    setupInputValidation();
}

// Setup input validation
function setupInputValidation() {
    const inputs = document.querySelectorAll('input[type="number"]');
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            validateInput(this);
        });
        
        input.addEventListener('blur', function() {
            validateInput(this);
        });
    });
}

// Validate individual input
function validateInput(input) {
    const value = parseFloat(input.value);
    const min = parseFloat(input.min) || 0;
    const max = parseFloat(input.max);
    
    if (input.value && (isNaN(value) || value < min || (max && value > max))) {
        input.style.borderColor = '#ef4444';
        input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
    } else {
        input.style.borderColor = '#e2e8f0';
        input.style.boxShadow = 'none';
    }
}

// Handle fixed deposit form submission
function handleFixedDepositSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const capital = parseFloat(formData.get('capital'));
    const rate = parseFloat(formData.get('rate'));
    const time = parseFloat(formData.get('time'));
    
    if (!validateFixedDepositInputs(capital, rate, time)) {
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('.simulate-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<div class="loading"></div> Simulando...';
    submitBtn.disabled = true;
    
    // Simulate processing time for better UX
    setTimeout(() => {
        const results = simulateFixedDeposit(capital, rate, time);
        displayFixedDepositResults(results);
        updateFixedTable(results);
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 800);
}

// Handle variable deposit form submission
function handleVariableDepositSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const capital = parseFloat(formData.get('capital'));
    const time = parseFloat(formData.get('time'));
    const simulations = parseInt(formData.get('simulations')) || 1000;
    
    if (!validateVariableDepositInputs(capital, time, simulations)) {
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('.simulate-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<div class="loading"></div> Simulando...';
    submitBtn.disabled = true;
    
    // Simulate processing time for better UX
    setTimeout(() => {
        const results = simulateVariableDeposit(capital, time, simulations);
        displayVariableDepositResults(results);
        updateVariableTable(results);
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1200);
}

// Validate fixed deposit inputs
function validateFixedDepositInputs(capital, rate, time) {
    if (!capital || capital <= 0) {
        showError('El capital inicial debe ser mayor a 0');
        return false;
    }
    
    if (!rate || rate < 0 || rate > 100) {
        showError('La tasa de interés debe estar entre 0% y 100%');
        return false;
    }
    
    if (!time || time <= 0) {
        showError('El tiempo de depósito debe ser mayor a 0');
        return false;
    }
    
    return true;
}

// Validate variable deposit inputs
function validateVariableDepositInputs(capital, time, simulations) {
    if (!capital || capital <= 0) {
        showError('El capital inicial debe ser mayor a 0');
        return false;
    }
    
    if (!time || time <= 0) {
        showError('El tiempo de depósito debe ser mayor a 0');
        return false;
    }
    
    if (!simulations || simulations < 100 || simulations > 10000) {
        showError('El número de simulaciones debe estar entre 100 y 10,000');
        return false;
    }
    
    return true;
}

// Show error message
function showError(message) {
    // Create or update error message
    let errorDiv = document.querySelector('.error-message');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ef4444;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.75rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
        `;
        document.body.appendChild(errorDiv);
    }
    
    errorDiv.textContent = message;
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                errorDiv.parentNode.removeChild(errorDiv);
            }, 300);
        }
    }, 5000);
}

// Simulate fixed deposit
function simulateFixedDeposit(capital, rate, time) {
    const annualRate = rate / 100;
    const finalCapital = capital * Math.pow(1 + annualRate, time);
    const totalGain = finalCapital - capital;
    const returnRate = (totalGain / capital) * 100;
    
    // Generate yearly data for table
    const yearlyData = [];
    const years = Math.ceil(time);
    
    for (let i = 0; i <= years; i++) {
        const currentTime = Math.min(i, time);
        const currentCapital = capital * Math.pow(1 + annualRate, currentTime);
        const previousCapital = i === 0 ? capital : capital * Math.pow(1 + annualRate, Math.min(i - 1, time));
        const interestEarned = currentCapital - previousCapital;
        const accumulatedGain = currentCapital - capital;
        
        yearlyData.push({
            year: currentTime,
            initialCapital: previousCapital,
            interestEarned: interestEarned,
            finalCapital: currentCapital,
            accumulatedGain: accumulatedGain
        });
    }
    
    return {
        initialCapital: capital,
        finalCapital: finalCapital,
        totalGain: totalGain,
        returnRate: returnRate,
        yearlyData: yearlyData
    };
}

// Simulate variable deposit
function simulateVariableDeposit(capital, time, simulations) {
    const results = [];
    
    for (let i = 0; i < simulations; i++) {
        // Generate random interest rates using normal distribution
        // Mean rate: 5%, Standard deviation: 2%
        const meanRate = 0.05;
        const stdDev = 0.02;
        
        // Box-Muller transformation for normal distribution
        const u1 = Math.random();
        const u2 = Math.random();
        const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
        const annualRate = Math.max(0, meanRate + z0 * stdDev);
        
        const finalCapital = capital * Math.pow(1 + annualRate, time);
        results.push(finalCapital);
    }
    
    // Calculate statistics
    const avgCapital = results.reduce((sum, val) => sum + val, 0) / results.length;
    const minCapital = Math.min(...results);
    const maxCapital = Math.max(...results);
    
    // Calculate standard deviation
    const variance = results.reduce((sum, val) => sum + Math.pow(val - avgCapital, 2), 0) / results.length;
    const stdDev = Math.sqrt(variance);
    
    // Calculate additional statistics
    const median = calculateMedian(results);
    const percentile25 = calculatePercentile(results, 25);
    const percentile75 = calculatePercentile(results, 95);
    const coefficientOfVariation = (stdDev / avgCapital) * 100;
    
    return {
        initialCapital: capital,
        avgCapital: avgCapital,
        minCapital: minCapital,
        maxCapital: maxCapital,
        median: median,
        percentile25: percentile25,
        percentile75: percentile75,
        stdDev: stdDev,
        coefficientOfVariation: coefficientOfVariation,
        results: results
    };
}

// Calculate median
function calculateMedian(data) {
    const sorted = [...data].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

// Calculate percentile
function calculatePercentile(data, percentile) {
    const sorted = [...data].sort((a, b) => a - b);
    const index = (percentile / 100) * (sorted.length - 1);
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    const weight = index % 1;
    
    if (upper >= sorted.length) return sorted[sorted.length - 1];
    return sorted[lower] * (1 - weight) + sorted[upper] * weight;
}

// Display fixed deposit results
function displayFixedDepositResults(results) {
    document.getElementById('fixed-final-capital').textContent = formatCurrency(results.finalCapital);
    document.getElementById('fixed-total-gain').textContent = formatCurrency(results.totalGain);
    document.getElementById('fixed-return-rate').textContent = results.returnRate.toFixed(2) + '%';
    
    // Add animation to results
    animateResults('fixed-deposit');
}

// Display variable deposit results
function displayVariableDepositResults(results) {
    document.getElementById('variable-avg-capital').textContent = formatCurrency(results.avgCapital);
    document.getElementById('variable-min-capital').textContent = formatCurrency(results.minCapital);
    document.getElementById('variable-max-capital').textContent = formatCurrency(results.maxCapital);
    document.getElementById('variable-std-dev').textContent = formatCurrency(results.stdDev);
    
    // Add animation to results
    animateResults('variable-deposit');
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

// Animate results
function animateResults(sectionId) {
    const resultValues = document.querySelectorAll(`#${sectionId} .result-value`);
    
    resultValues.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.5s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Update fixed deposit table
function updateFixedTable(results) {
    const tbody = document.querySelector('#fixed-table tbody');
    if (!tbody) return;
    
    // Clear existing rows
    tbody.innerHTML = '';
    
    // Add data rows
    results.yearlyData.forEach((data, index) => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td class="year-cell">${data.year.toFixed(1)}</td>
            <td class="number-cell">${formatCurrency(data.initialCapital)}</td>
            <td class="number-cell">${formatCurrency(data.interestEarned)}</td>
            <td class="number-cell">${formatCurrency(data.finalCapital)}</td>
            <td class="number-cell">${formatCurrency(data.accumulatedGain)}</td>
        `;
        
        // Add animation delay
        row.style.opacity = '0';
        row.style.transform = 'translateY(20px)';
        setTimeout(() => {
            row.style.transition = 'all 0.3s ease-out';
            row.style.opacity = '1';
            row.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

// Update variable deposit table
function updateVariableTable(results) {
    const tbody = document.querySelector('#variable-table tbody');
    if (!tbody) return;
    
    // Clear existing rows
    tbody.innerHTML = '';
    
    // Define table data
    const tableData = [
        {
            metric: 'Capital Promedio',
            value: formatCurrency(results.avgCapital),
            description: 'Valor promedio del capital final en todas las simulaciones'
        },
        {
            metric: 'Capital Mínimo',
            value: formatCurrency(results.minCapital),
            description: 'Menor valor obtenido en las simulaciones'
        },
        {
            metric: 'Capital Máximo',
            value: formatCurrency(results.maxCapital),
            description: 'Mayor valor obtenido en las simulaciones'
        },
        {
            metric: 'Mediana',
            value: formatCurrency(results.median),
            description: 'Valor que divide las simulaciones en dos partes iguales'
        },
        {
            metric: 'Percentil 25',
            value: formatCurrency(results.percentile25),
            description: '25% de las simulaciones dieron un valor menor'
        },
        {
            metric: 'Percentil 95',
            value: formatCurrency(results.percentile75),
            description: '95% de las simulaciones dieron un valor menor'
        },
        {
            metric: 'Desviación Estándar',
            value: formatCurrency(results.stdDev),
            description: 'Medida de la dispersión de los resultados'
        },
        {
            metric: 'Coeficiente de Variación',
            value: results.coefficientOfVariation.toFixed(2) + '%',
            description: 'Variabilidad relativa de los resultados'
        }
    ];
    
    // Add data rows
    tableData.forEach((data, index) => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td class="metric-cell">${data.metric}</td>
            <td class="number-cell">${data.value}</td>
            <td class="description-cell">${data.description}</td>
        `;
        
        // Add animation delay
        row.style.opacity = '0';
        row.style.transform = 'translateY(20px)';
        setTimeout(() => {
            row.style.transition = 'all 0.3s ease-out';
            row.style.opacity = '1';
            row.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Add smooth animations
function addSmoothAnimations() {
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .form-group input:valid {
            border-color: #10b981;
        }
        
        .form-group input:invalid:not(:placeholder-shown) {
            border-color: #ef4444;
        }
    `;
    document.head.appendChild(style);
    
    // Add intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.form-container, .results-card, .table-container');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// Utility function to generate random number with normal distribution
function normalRandom(mean = 0, stdDev = 1) {
    const u1 = Math.random();
    const u2 = Math.random();
    const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    return mean + z0 * stdDev;
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        simulateFixedDeposit,
        simulateVariableDeposit,
        formatCurrency,
        normalRandom
    };
}
