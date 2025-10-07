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
    
    // Dice game form
    const diceForm = document.getElementById('dice-game-form');
    diceForm.addEventListener('submit', handleDiceGameSubmit);
    
    // Customer arrival form
    const customerForm = document.getElementById('customer-arrival-form');
    customerForm.addEventListener('submit', handleCustomerArrivalSubmit);
    
    // Farmer simulation form
    const farmerForm = document.getElementById('farmer-simulation-form');
    farmerForm.addEventListener('submit', handleFarmerSimulationSubmit);
    
    // Inventory simulation form
    const inventoryForm = document.getElementById('inventory-simulation-form');
    inventoryForm.addEventListener('submit', handleInventorySimulationSubmit);
    
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

// Handle dice game form submission
function handleDiceGameSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const maxGames = parseInt(formData.get('maxGames'));
    const gamePrice = parseFloat(formData.get('gamePrice'));
    const costSum7 = parseFloat(formData.get('costSum7'));
    
    if (!validateDiceGameInputs(maxGames, gamePrice, costSum7)) {
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('.simulate-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<div class="loading"></div> Simulando...';
    submitBtn.disabled = true;
    
    // Simulate processing time for better UX
    setTimeout(() => {
        const results = simulateDiceGame(maxGames, gamePrice, costSum7);
        displayDiceGameResults(results);
        updateDiceTable(results);
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1000);
}

// Handle customer arrival form submission
function handleCustomerArrivalSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const daysToSimulate = parseInt(formData.get('daysToSimulate'));
    const maxHours = parseInt(formData.get('maxHours'));
    const fixedCost = parseFloat(formData.get('fixedCost'));
    const acquisitionCost = parseFloat(formData.get('acquisitionCost'));
    const salePrice = parseFloat(formData.get('salePrice'));
    
    if (!validateCustomerArrivalInputs(daysToSimulate, maxHours, fixedCost, acquisitionCost, salePrice)) {
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('.simulate-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<div class="loading"></div> Simulando...';
    submitBtn.disabled = true;
    
    // Simulate processing time for better UX
    setTimeout(() => {
        const results = simulateCustomerArrival(daysToSimulate, maxHours, fixedCost, acquisitionCost, salePrice);
        displayCustomerArrivalResults(results);
        updateCustomerTable(results);
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1200);
}

// Handle farmer simulation form submission
function handleFarmerSimulationSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const maxDays = parseInt(formData.get('maxDays'));
    const eggPrice = parseFloat(formData.get('eggPrice'));
    const chickenPrice = parseFloat(formData.get('chickenPrice'));
    
    if (!validateFarmerSimulationInputs(maxDays, eggPrice, chickenPrice)) {
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('.simulate-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<div class="loading"></div> Simulando...';
    submitBtn.disabled = true;
    
    // Simulate processing time for better UX
    setTimeout(() => {
        const results = simulateFarmer(maxDays, eggPrice, chickenPrice);
        displayFarmerResults(results);
        updateFarmerTable(results);
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1000);
}

// Handle inventory simulation form submission
function handleInventorySimulationSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const maxDays = parseInt(formData.get('maxDays'));
    const warehouseCapacity = parseFloat(formData.get('warehouseCapacity'));
    const reorderCost = parseFloat(formData.get('reorderCost'));
    const inventoryUnitCost = parseFloat(formData.get('inventoryUnitCost'));
    const acquisitionUnitCost = parseFloat(formData.get('acquisitionUnitCost'));
    const saleUnitPrice = parseFloat(formData.get('saleUnitPrice'));
    
    if (!validateInventorySimulationInputs(maxDays, warehouseCapacity, reorderCost, inventoryUnitCost, acquisitionUnitCost, saleUnitPrice)) {
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('.simulate-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<div class="loading"></div> Simulando...';
    submitBtn.disabled = true;
    
    // Simulate processing time for better UX
    setTimeout(() => {
        const results = simulateInventory(maxDays, warehouseCapacity, reorderCost, inventoryUnitCost, acquisitionUnitCost, saleUnitPrice);
        displayInventoryResults(results);
        updateInventoryTable(results);
        
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

// Validate dice game inputs
function validateDiceGameInputs(maxGames, gamePrice, costSum7) {
    if (!maxGames || maxGames <= 0 || maxGames > 10000) {
        showError('El número máximo de juegos debe estar entre 1 y 10,000');
        return false;
    }
    
    if (!gamePrice || gamePrice < 0) {
        showError('El precio unitario del juego debe ser mayor o igual a 0');
        return false;
    }
    
    if (!costSum7 || costSum7 < 0) {
        showError('El costo unitario si dados suman 7 debe ser mayor o igual a 0');
        return false;
    }
    
    return true;
}

// Validate customer arrival inputs
function validateCustomerArrivalInputs(daysToSimulate, maxHours, fixedCost, acquisitionCost, salePrice) {
    if (!daysToSimulate || daysToSimulate <= 0 || daysToSimulate > 365) {
        showError('El número de días a simular debe estar entre 1 y 365');
        return false;
    }
    
    if (!maxHours || maxHours <= 0 || maxHours > 24) {
        showError('El número máximo de horas debe estar entre 1 y 24');
        return false;
    }
    
    if (!fixedCost || fixedCost < 0) {
        showError('El costo fijo diario debe ser mayor o igual a 0');
        return false;
    }
    
    if (!acquisitionCost || acquisitionCost < 0) {
        showError('El costo unitario de adquisición debe ser mayor o igual a 0');
        return false;
    }
    
    if (!salePrice || salePrice < 0) {
        showError('El precio de venta unitario debe ser mayor o igual a 0');
        return false;
    }
    
    return true;
}

// Validate farmer simulation inputs
function validateFarmerSimulationInputs(maxDays, eggPrice, chickenPrice) {
    if (!maxDays || maxDays <= 0 || maxDays > 365) {
        showError('El número máximo de días debe estar entre 1 y 365');
        return false;
    }
    
    if (!eggPrice || eggPrice < 0) {
        showError('El precio unitario de venta de huevo debe ser mayor o igual a 0');
        return false;
    }
    
    if (!chickenPrice || chickenPrice < 0) {
        showError('El precio de venta unitario de pollo debe ser mayor o igual a 0');
        return false;
    }
    
    return true;
}

// Validate inventory simulation inputs
function validateInventorySimulationInputs(maxDays, warehouseCapacity, reorderCost, inventoryUnitCost, acquisitionUnitCost, saleUnitPrice) {
    if (!maxDays || maxDays <= 0 || maxDays > 365) {
        showError('El número máximo de días debe estar entre 1 y 365');
        return false;
    }
    
    if (!warehouseCapacity || warehouseCapacity <= 0) {
        showError('La capacidad de la bodega debe ser mayor a 0');
        return false;
    }
    
    if (!reorderCost || reorderCost < 0) {
        showError('El costo de reorden debe ser mayor o igual a 0');
        return false;
    }
    
    if (!inventoryUnitCost || inventoryUnitCost < 0) {
        showError('El costo unitario de inventario debe ser mayor o igual a 0');
        return false;
    }
    
    if (!acquisitionUnitCost || acquisitionUnitCost < 0) {
        showError('El costo unitario de adquisición debe ser mayor o igual a 0');
        return false;
    }
    
    if (!saleUnitPrice || saleUnitPrice < 0) {
        showError('El precio unitario de venta debe ser mayor o igual a 0');
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

// Simulate dice game
function simulateDiceGame(maxGames, gamePrice, costSum7) {
    let netGainHouse = 0;
    let houseWins = 0;
    let playerWins = 0;
    const gameDetails = [];
    
    for (let i = 0; i < maxGames; i++) {
        // Roll two dice (1-6 each)
        const die1 = Math.floor(Math.random() * 6) + 1;
        const die2 = Math.floor(Math.random() * 6) + 1;
        const diceSum = die1 + die2;
        
        let winner = '';
        let gameGain = 0;
        
        if (diceSum === 7) {
            // Player wins
            playerWins++;
            winner = 'Jugador';
            // House receives game price but pays cost for sum 7
            // Net gain = gamePrice - costSum7
            gameGain = gamePrice - costSum7;
            netGainHouse += gameGain;
        } else {
            // House wins
            houseWins++;
            winner = 'Casa';
            // House keeps the game price
            gameGain = gamePrice;
            netGainHouse += gameGain;
        }
        
        gameDetails.push({
            game: i + 1,
            die1: die1,
            die2: die2,
            diceSum: diceSum,
            winner: winner,
            gameGain: gameGain,
            accumulatedGain: netGainHouse
        });
    }
    
    const houseWinPercentage = (houseWins / maxGames) * 100;
    const playerWinPercentage = (playerWins / maxGames) * 100;
    
    return {
        maxGames: maxGames,
        gamePrice: gamePrice,
        costSum7: costSum7,
        netGainHouse: netGainHouse,
        houseWins: houseWins,
        playerWins: playerWins,
        houseWinPercentage: houseWinPercentage,
        playerWinPercentage: playerWinPercentage,
        gameDetails: gameDetails
    };
}

// Simulate customer arrival (based on C++ algorithm)
function simulateCustomerArrival(daysToSimulate, maxHours, fixedCost, acquisitionCost, salePrice) {
    let totalItemsSold = 0;
    let totalNetProfit = 0;
    let totalCustomers = 0;
    let profitableDays = 0;
    const dailyResults = [];
    
    for (let day = 1; day <= daysToSimulate; day++) {
        let dailyItemsSold = 0;
        let dailyCustomers = 0;
        let dailyProfit = 0;
        const hourlyDetails = [];
        
        for (let hour = 1; hour <= maxHours; hour++) {
            // Simulate customer arrival (0-4 customers per hour)
            const customersThisHour = Math.floor(Math.random() * 5);
            let hourlyItemsSold = 0;
            
            for (let i = 0; i < customersThisHour; i++) {
                const itemsBought = simulateItemsBought();
                hourlyItemsSold += itemsBought;
                dailyItemsSold += itemsBought;
            }
            
            dailyCustomers += customersThisHour;
            
            hourlyDetails.push({
                hour: hour,
                customers: customersThisHour,
                itemsSold: hourlyItemsSold
            });
        }
        
        // Calculate daily profit
        const dailyRevenue = dailyItemsSold * salePrice;
        const dailyVariableCosts = dailyItemsSold * acquisitionCost;
        const dailyNetProfit = dailyRevenue - dailyVariableCosts - fixedCost;
        
        if (dailyNetProfit > 0) {
            profitableDays++;
        }
        
        totalItemsSold += dailyItemsSold;
        totalCustomers += dailyCustomers;
        totalNetProfit += dailyNetProfit;
        
        dailyResults.push({
            day: day,
            totalCustomers: dailyCustomers,
            itemsSold: dailyItemsSold,
            revenue: dailyRevenue,
            variableCosts: dailyVariableCosts,
            fixedCost: fixedCost,
            netProfit: dailyNetProfit,
            isProfitable: dailyNetProfit > 0,
            hourlyDetails: hourlyDetails
        });
    }
    
    const avgDailyProfit = totalNetProfit / daysToSimulate;
    
    return {
        daysToSimulate: daysToSimulate,
        maxHours: maxHours,
        fixedCost: fixedCost,
        acquisitionCost: acquisitionCost,
        salePrice: salePrice,
        totalItemsSold: totalItemsSold,
        totalNetProfit: totalNetProfit,
        totalCustomers: totalCustomers,
        profitableDays: profitableDays,
        avgDailyProfit: avgDailyProfit,
        dailyResults: dailyResults
    };
}

// Simulate items bought by a customer (based on C++ function)
function simulateItemsBought() {
    const random = Math.floor(Math.random() * 100) + 1; // 1-100
    
    if (random <= 20) { // Probability 0.2
        return 0;
    } else if (random <= 50) { // Probability 0.3
        return 1;
    } else if (random <= 90) { // Probability 0.4
        return 2;
    } else { // Probability 0.1
        return 3;
    }
}

// Simulate farmer (based on C++ algorithm)
function simulateFarmer(maxDays, eggPrice, chickenPrice) {
    // Constants from C++ code
    const poissonMean = 2.0; // Media de Poisson para huevos puestos por día
    
    // Variables endógenas (contadores totales)
    let totalBrokenEggs = 0; // THR
    let totalSurvivingChickens = 0; // TPS
    let totalEggs = 0; // TH (huevos que permanecen huevos)
    let totalNetIncome = 0.0; // IGT
    const dailyResults = [];
    
    // Bucle principal de simulación (contador de días)
    for (let day = 1; day <= maxDays; day++) {
        // Simular HPG (Huevos que pone la gallina) usando Poisson
        const eggsLaid = simulatePoisson(poissonMean); // HPG
        
        let dailyBrokenEggs = 0;
        let dailyChickensBorn = 0;
        let dailySurvivingChickens = 0;
        let dailyEggsSold = 0;
        let dailyIncome = 0;
        
        for (let i = 0; i < eggsLaid; i++) {
            const eggState = simulateEggState(); // Determinar el destino del huevo
            
            if (eggState === 0) {
                // Huevo Roto
                dailyBrokenEggs++;
                totalBrokenEggs++; // THR
            } else if (eggState === 1) {
                // Nace Pollo
                dailyChickensBorn++;
                const chickenState = simulateChickenState(); // Determinar el destino del pollo
                
                if (chickenState === 1) {
                    // Pollo Sobrevive
                    dailySurvivingChickens++;
                    totalSurvivingChickens++; // TPS
                    totalNetIncome += chickenPrice; // Sumar ingreso por pollo
                    dailyIncome += chickenPrice;
                }
                // Si el pollo muere (chickenState === 0), no se hace nada.
            } else {
                // Permanece Huevo
                dailyEggsSold++;
                totalEggs++; // TH
                totalNetIncome += eggPrice; // Sumar ingreso por huevo
                dailyIncome += eggPrice;
            }
        }
        
        dailyResults.push({
            day: day,
            eggsLaid: eggsLaid,
            brokenEggs: dailyBrokenEggs,
            chickensBorn: dailyChickensBorn,
            survivingChickens: dailySurvivingChickens,
            eggsSold: dailyEggsSold,
            dailyIncome: dailyIncome
        });
    }
    
    // Cálculos finales
    const avgDailyIncome = totalNetIncome / maxDays; // IDP
    
    return {
        maxDays: maxDays,
        eggPrice: eggPrice,
        chickenPrice: chickenPrice,
        totalNetIncome: totalNetIncome,
        avgDailyIncome: avgDailyIncome,
        totalEggs: totalEggs,
        totalSurvivingChickens: totalSurvivingChickens,
        totalBrokenEggs: totalBrokenEggs,
        dailyResults: dailyResults
    };
}

// Simulate egg state (based on C++ function simularEstadoHuevo)
function simulateEggState() {
    const random = Math.floor(Math.random() * 100) + 1; // rEH: 1-100
    
    if (random <= 20) { // 20% (0.01 - 0.20)
        return 0; // Roto
    } else if (random <= 50) { // 30% (0.21 - 0.50) -> Acumulado: 50
        return 1; // Nace Pollo
    } else { // 50% (0.51 - 1.00) -> Acumulado: 100
        return 2; // Permanece Huevo
    }
}

// Simulate chicken state (based on C++ function simularEstadoPollo)
function simulateChickenState() {
    const random = Math.floor(Math.random() * 100) + 1; // rEP: 1-100
    
    if (random <= 20) { // 20%
        return 0; // Muere
    } else { // 80%
        return 1; // Sobrevive
    }
}

// Simulate Poisson distribution (based on C++ function simularPoisson_HPG)
function simulatePoisson(lambda) {
    const L = Math.exp(-lambda);
    let k = 0;
    let p = 1.0;
    
    // rHPG: Aleatorio HPG (rango 0.0 a 1.0)
    do {
        k++;
        p *= Math.random(); // Generar rHPG
    } while (p > L);
    
    return k - 1;
}

// Simulate inventory (based on C++ algorithm)
function simulateInventory(maxDays, warehouseCapacity, reorderCost, inventoryUnitCost, acquisitionUnitCost, saleUnitPrice) {
    // Variables endógenas (contadores totales)
    let sugarInventory = warehouseCapacity; // IAZU inicial: Bodega llena
    let totalUnsatisfiedDemand = 0.0; // DIT
    let totalReorderCost = 0.0; // CORDT
    let totalInventoryCost = 0.0; // CTINV
    let totalAcquisitionCost = 0.0; // CTADQ
    let totalGrossIncome = 0.0; // IBRU
    
    // Variables de seguimiento del pedido
    let sugarOrder = 0.0; // PAZU (Cantidad solicitada)
    let deliveryTime = 0; // TENT (Días restantes para recibir)
    
    // Variable para reportar el valor a los 27 días
    let unsatisfiedDemandDay27 = 0.0;
    
    const dailyResults = [];
    
    // Bucle principal de simulación (contador días - CD)
    for (let day = 1; day <= maxDays; day++) {
        const initialInventory = sugarInventory;
        
        // 1. RECEPCIÓN DE PEDIDO PENDIENTE (TENT)
        if (deliveryTime === 0 && sugarOrder > 0) {
            // El pedido llega al inicio del día
            if (sugarInventory + sugarOrder > warehouseCapacity) {
                // Si la bodega se desborda, solo se almacena hasta la capacidad máxima
                sugarInventory = warehouseCapacity;
            } else {
                sugarInventory += sugarOrder;
            }
            sugarOrder = 0.0;
        }
        
        // 2. GENERACIÓN DE DEMANDA Y COBRO DE INVENTARIO
        const dailyDemand = simulateSugarDemand(); // DAZU
        
        // Costo por mantener inventario (se cobra sobre el inventario que inicia el día)
        totalInventoryCost += sugarInventory * inventoryUnitCost; // CTINV
        
        // 3. SATISFACCIÓN DE DEMANDA
        let salesRealized = 0;
        let unsatisfiedDemand = 0;
        
        if (sugarInventory >= dailyDemand) {
            // Demanda satisfecha
            sugarInventory -= dailyDemand;
            salesRealized = dailyDemand;
            totalGrossIncome += dailyDemand * saleUnitPrice; // IBRU
        } else {
            // Demanda insatisfecha
            salesRealized = sugarInventory;
            unsatisfiedDemand = dailyDemand - sugarInventory;
            
            sugarInventory = 0.0; // El inventario se agota
            totalUnsatisfiedDemand += unsatisfiedDemand; // DIT
            totalGrossIncome += salesRealized * saleUnitPrice; // IBRU
        }
        
        // Guardar Demanda Insatisfecha a los 27 días
        if (day === 27) {
            unsatisfiedDemandDay27 = totalUnsatisfiedDemand;
        }
        
        // 4. REVISIÓN DE INVENTARIO Y ORDEN (Cada 7 días)
        if (day % 7 === 0) {
            if (sugarOrder === 0) { // Solo si no hay un pedido pendiente
                const quantityToOrder = warehouseCapacity - sugarInventory; // PAZU
                
                if (quantityToOrder > 0) {
                    sugarOrder = quantityToOrder;
                    deliveryTime = simulateDeliveryTime(); // TENT
                    
                    totalReorderCost += reorderCost; // CORDT
                    totalAcquisitionCost += sugarOrder * acquisitionUnitCost; // CTADQ
                }
            }
        }
        
        // 5. ACTUALIZACIÓN DEL TIEMPO DE ENTREGA
        if (deliveryTime > 0) {
            deliveryTime--;
        }
        
        // Guardar resultados del día
        dailyResults.push({
            day: day,
            initialInventory: initialInventory,
            dailyDemand: dailyDemand,
            sugarOrder: sugarOrder,
            finalInventory: sugarInventory,
            accumulatedUnsatisfiedDemand: totalUnsatisfiedDemand,
            totalCost: totalReorderCost + totalInventoryCost + totalAcquisitionCost
        });
    }
    
    // Cálculos finales
    const totalCost = totalReorderCost + totalInventoryCost + totalAcquisitionCost; // CTOT
    const netProfit = totalGrossIncome - totalCost; // GNETA
    
    return {
        maxDays: maxDays,
        warehouseCapacity: warehouseCapacity,
        reorderCost: reorderCost,
        inventoryUnitCost: inventoryUnitCost,
        acquisitionUnitCost: acquisitionUnitCost,
        saleUnitPrice: saleUnitPrice,
        totalGrossIncome: totalGrossIncome,
        totalCost: totalCost,
        netProfit: netProfit,
        totalUnsatisfiedDemand: totalUnsatisfiedDemand,
        unsatisfiedDemandDay27: unsatisfiedDemandDay27,
        totalReorderCost: totalReorderCost,
        totalInventoryCost: totalInventoryCost,
        totalAcquisitionCost: totalAcquisitionCost,
        dailyResults: dailyResults
    };
}

// Simulate sugar demand using exponential distribution (based on C++ function simularDemandaAzucar)
function simulateSugarDemand() {
    const random = Math.random(); // rDAZU: 0.0 a 1.0
    const mean = 100.0;
    
    // Usamos 1.0 - random para evitar log(0) y por convención
    return -mean * Math.log(1.0 - random);
}

// Simulate delivery time using uniform distribution (based on C++ function simularTiempoEntrega)
function simulateDeliveryTime() {
    const random = Math.random(); // rTENT: 0.0 a 1.0
    const a = 1;
    const b = 3;
    
    // Se usa Math.ceil para asegurar que el resultado sea 1, 2 o 3 días enteros
    return Math.ceil(a + random * (b - a));
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

// Display dice game results
function displayDiceGameResults(results) {
    document.getElementById('dice-net-gain').textContent = `Bs. ${results.netGainHouse.toFixed(2)}`;
    document.getElementById('dice-house-wins').textContent = `${results.houseWins} Juegos`;
    document.getElementById('dice-house-percentage').textContent = `${results.houseWinPercentage.toFixed(2)}%`;
    document.getElementById('dice-player-wins').textContent = `${results.playerWins} Juegos`;
    document.getElementById('dice-player-percentage').textContent = `${results.playerWinPercentage.toFixed(2)}%`;
    
    // Add animation to results
    animateResults('dice-game');
}

// Display customer arrival results
function displayCustomerArrivalResults(results) {
    document.getElementById('total-items-sold').textContent = results.totalItemsSold;
    document.getElementById('total-net-profit').textContent = `Bs. ${results.totalNetProfit.toFixed(2)}`;
    document.getElementById('avg-daily-profit').textContent = `Bs. ${results.avgDailyProfit.toFixed(2)}`;
    document.getElementById('total-customers').textContent = results.totalCustomers;
    document.getElementById('profitable-days').textContent = `${results.profitableDays} de ${results.daysToSimulate}`;
    
    // Add animation to results
    animateResults('customer-arrival');
}

// Display farmer results
function displayFarmerResults(results) {
    document.getElementById('total-net-income').textContent = `Bs. ${results.totalNetIncome.toFixed(2)}`;
    document.getElementById('avg-daily-income').textContent = `Bs. ${results.avgDailyIncome.toFixed(2)}/día`;
    document.getElementById('total-eggs').textContent = `${results.totalEggs} huevos`;
    document.getElementById('total-surviving-chickens').textContent = `${results.totalSurvivingChickens} pollos`;
    document.getElementById('total-broken-eggs').textContent = `${results.totalBrokenEggs} huevos`;
    
    // Add animation to results
    animateResults('farmer-simulation');
}

// Display inventory results
function displayInventoryResults(results) {
    document.getElementById('total-gross-income').textContent = `Bs. ${results.totalGrossIncome.toFixed(2)}`;
    document.getElementById('total-cost').textContent = `Bs. ${results.totalCost.toFixed(2)}`;
    document.getElementById('net-profit').textContent = `Bs. ${results.netProfit.toFixed(2)}`;
    document.getElementById('total-unsatisfied-demand').textContent = `${results.totalUnsatisfiedDemand.toFixed(2)} Kg`;
    document.getElementById('unsatisfied-demand-day27').textContent = `${results.unsatisfiedDemandDay27.toFixed(2)} Kg`;
    
    // Add animation to results
    animateResults('inventory-simulation');
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

// Update dice game table
function updateDiceTable(results) {
    const tbody = document.querySelector('#dice-table tbody');
    if (!tbody) return;
    
    // Clear existing rows
    tbody.innerHTML = '';
    
    // Add data rows (limit to first 50 games for performance)
    const gamesToShow = Math.min(results.gameDetails.length, 50);
    
    for (let i = 0; i < gamesToShow; i++) {
        const game = results.gameDetails[i];
        const row = tbody.insertRow();
        
        // Determine winner color
        const winnerClass = game.winner === 'Casa' ? 'success' : 'error';
        const gainClass = game.gameGain >= 0 ? 'success' : 'error';
        
        const diceSumClass = game.diceSum === 7 ? 'dice-sum-seven' : 'dice-sum';
        row.innerHTML = `
            <td class="year-cell">${game.game}</td>
            <td class="number-cell">${game.die1}</td>
            <td class="number-cell">${game.die2}</td>
            <td class="number-cell ${diceSumClass}">${game.diceSum}</td>
            <td class="winner-cell ${winnerClass}">${game.winner}</td>
            <td class="number-cell ${gainClass}">Bs. ${game.gameGain.toFixed(2)}</td>
            <td class="number-cell">Bs. ${game.accumulatedGain.toFixed(2)}</td>
        `;
        
        // Add animation delay
        row.style.opacity = '0';
        row.style.transform = 'translateY(20px)';
        setTimeout(() => {
            row.style.transition = 'all 0.3s ease-out';
            row.style.opacity = '1';
            row.style.transform = 'translateY(0)';
        }, i * 30);
    }
    
    // Add summary row if there are more games
    if (results.gameDetails.length > 50) {
        const summaryRow = tbody.insertRow();
        summaryRow.className = 'summary-row';
        summaryRow.innerHTML = `
            <td colspan="7" class="summary-cell">
                <i class="fas fa-info-circle"></i>
                Mostrando primeros 50 juegos de ${results.gameDetails.length} totales
            </td>
        `;
    }
}

// Update customer arrival table
function updateCustomerTable(results) {
    const tbody = document.querySelector('#customer-table tbody');
    if (!tbody) return;
    
    // Clear existing rows
    tbody.innerHTML = '';
    
    // Add data rows
    results.dailyResults.forEach((day, index) => {
        const row = tbody.insertRow();
        
        // Determine profit status
        const profitClass = day.isProfitable ? 'success' : 'error';
        const statusText = day.isProfitable ? 'Ganancia' : 'Pérdida';
        
        row.innerHTML = `
            <td class="year-cell">${day.day}</td>
            <td class="number-cell">${day.totalCustomers}</td>
            <td class="number-cell">${day.itemsSold}</td>
            <td class="number-cell">Bs. ${day.revenue.toFixed(2)}</td>
            <td class="number-cell">Bs. ${day.variableCosts.toFixed(2)}</td>
            <td class="number-cell">Bs. ${day.fixedCost.toFixed(2)}</td>
            <td class="number-cell ${profitClass}">Bs. ${day.netProfit.toFixed(2)}</td>
            <td class="status-cell ${profitClass}">${statusText}</td>
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

// Update farmer table
function updateFarmerTable(results) {
    const tbody = document.querySelector('#farmer-table tbody');
    if (!tbody) return;
    
    // Clear existing rows
    tbody.innerHTML = '';
    
    // Add data rows
    results.dailyResults.forEach((day, index) => {
        const row = tbody.insertRow();
        
        row.innerHTML = `
            <td class="year-cell">${day.day}</td>
            <td class="number-cell">${day.eggsLaid}</td>
            <td class="number-cell">${day.brokenEggs}</td>
            <td class="number-cell">${day.chickensBorn}</td>
            <td class="number-cell">${day.survivingChickens}</td>
            <td class="number-cell">${day.eggsSold}</td>
            <td class="number-cell">Bs. ${day.dailyIncome.toFixed(2)}</td>
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

// Update inventory table
function updateInventoryTable(results) {
    const tbody = document.querySelector('#inventory-table tbody');
    if (!tbody) return;
    
    // Clear existing rows
    tbody.innerHTML = '';
    
    // Add data rows
    results.dailyResults.forEach((day, index) => {
        const row = tbody.insertRow();
        
        row.innerHTML = `
            <td class="year-cell">${day.day}</td>
            <td class="number-cell">${day.initialInventory.toFixed(2)}</td>
            <td class="number-cell">${day.dailyDemand.toFixed(2)}</td>
            <td class="number-cell">${day.sugarOrder.toFixed(2)}</td>
            <td class="number-cell">${day.finalInventory.toFixed(2)}</td>
            <td class="number-cell">${day.accumulatedUnsatisfiedDemand.toFixed(2)}</td>
            <td class="number-cell">Bs. ${day.totalCost.toFixed(2)}</td>
        `;
        
        // Add animation delay
        row.style.opacity = '0';
        row.style.transform = 'translateY(20px)';
        setTimeout(() => {
            row.style.transition = 'all 0.3s ease-out';
            row.style.opacity = '1';
            row.style.transform = 'translateY(0)';
        }, index * 30);
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
