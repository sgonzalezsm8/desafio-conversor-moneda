const amountInput = document.getElementById('amount');
const currencySelect = document.getElementById('currency');
const convertBtn = document.getElementById('convert-btn');
const resultDiv = document.getElementById('result');
const chartCanvas = document.getElementById('chart');

async function fetchExchangeRates(){
    try{
        const response = await fetch('https://mindicador.cl/api/');
        if(!response.ok){
            throw new Error('Ha ocurrido un error de red al consultar la api');
        }
        return await response.json();
    }catch (error){
        console.error('Fectch error: ', error);
        resultDiv.innerHTML = '<p class="text-danger"> Error al obtener los datos de la API. Usando datos locales.</p>';
        return null;
    }
}

async function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const currency = currencySelect.value;
    
    if (isNaN(amount) || amount <= 0) {
        resultDiv.innerHTML = '<p class="text-danger">Ingrese un monto válido.</p>';
        return;
    }

    const data = await fetchExchangeRates();
    const exchangeRate = data[currency].valor;
    const convertedAmount = amount * exchangeRate;

    resultDiv.innerHTML = `<p>${amount} CLP son $${convertedAmount.toFixed(2)} ${currency.toUpperCase()}.</p>`;
}

convertBtn.addEventListener('click', convertCurrency);