// Required: Use async/await OR .then() for API calls
// Required: Use try/catch OR .catch() for error handling

async function searchCountry(countryName) {
    try {
        document.getElementById("country-input");
        document.getElementById("bordering-countries")
        // Show loading spinner
        spinner.classList.remove("hidden");
        // Fetch country data
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);

        if(!response.ok){
            throw new Error("Sorry! The country name is either misspelled or doesn't exist. Please try again.")
        }
        const data = await response.json();
        const country = data[0]
        // Update DOM
        document.getElementById('country-info').innerHTML = `
        <h2>${country.name.common}</h2>
        <p><strong>Capital:</strong> ${country.capital[0]}</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <img src="${country.flags.svg}" alt="${country.name.common} flag">
    `;
        // Fetch bordering countries
        const nResponse = await fetch(` https://restcountries.com/v3.1/alpha/{code}`);
        
        if(!response.ok){
            throw new Error("Sorry! The country name is either misspelled or doesn't exist. Please try again.")
        }

        const nData = await nResponse.json();
        const nCountry = data[0]
        // Update bordering countries section
        document.getElementById('bordering-countries').innerHTML = `
        <h2>${country.name.common}</h2>
        <p><strong>Capital:</strong> ${country.capital[0]}</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <img src="${country.flags.svg}" alt="${country.name.common} flag">
    `;
    } catch (error) {
        // Show error message
        errorMessage.textContent = "Sorry! The country name is either misspelled or doesn't exist. Please try again.";
    } finally {
        // Hide loading spinner
        spinner.classList.add("hidden");
    }
}

// Event listeners
document.getElementById('search-btn').addEventListener('click', () => {
    const country = document.getElementById('country-input').value;
    searchCountry(country);
});