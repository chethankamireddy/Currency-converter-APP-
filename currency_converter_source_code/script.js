// Import the API key from api-key.js
const apiKey = API_KEY; // Ensure the variable matches what's in api-key.js

// Construct the API endpoint
const api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`; // Use backticks for template literals

// Select necessary DOM elements
const fromDropDown = document.getElementById("from-currency-select");
const toDropDown = document.getElementById("to-currency-select");
const result = document.getElementById("result");

// Populate dropdowns with currency codes
currencies.forEach((currency) => {
    const optionFrom = document.createElement("option");
    optionFrom.value = currency;
    optionFrom.text = currency;
    fromDropDown.add(optionFrom);

    const optionTo = document.createElement("option");
    optionTo.value = currency;
    optionTo.text = currency;
    toDropDown.add(optionTo);
});

// Set default dropdown values
fromDropDown.value = "USD";
toDropDown.value = "INR";

// Currency conversion function
const convertCurrency = async () => {
    const amount = document.querySelector("#amount").value;
    const fromCurrency = fromDropDown.value;
    const toCurrency = toDropDown.value;

    if (!amount || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }

    try {
        // Fetch exchange rates from the API
        const response = await fetch(api);
        const data = await response.json();

        if (data.result === "error") {
            throw new Error(data['error-type']);
        }

        // Perform the conversion
        const fromExchangeRate = data.conversion_rates[fromCurrency];
        const toExchangeRate = data.conversion_rates[toCurrency];
        const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;

        // Display the result
        result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`; // Use backticks for template literals
    } catch (error) {
        alert(`Error: ${error.message}`); // Use backticks for template literals
    }
};

// Attach event listeners
document.querySelector("#convert-button").addEventListener("click", convertCurrency);
window.addEventListener("load", convertCurrency);
