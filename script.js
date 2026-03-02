const spinner = document.getElementById("loading-spinner");
const errorMessage = document.getElementById("error-message");
const borderContainer = document.getElementById("bordering-countries");
const countryInfo = document.getElementById("country-info");
const input = document.getElementById("country-input");

spinner.classList.add("hidden");

async function searchCountry(countryName) {
    try {
        spinner.classList.remove("hidden");
        errorMessage.textContent = "";
        borderContainer.innerHTML = "";
        countryInfo.innerHTML = "";

        if (!countryName.trim()) {
            errorMessage.textContent = "Please enter a country name";
            return;
        }

        const response = await fetch(
            `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
        );

        if (!response.ok) {
            throw new Error("Country not found");
        }

        const data = await response.json();
        const country = data[0];

        document.getElementById("country-info").innerHTML = `
            <h2>${country.name.common}</h2>
            <p><strong>Capital:</strong> 
                ${country.capital?.[0] || "Doesn't have a capital"}
            </p>
            <p><strong>Population:</strong> 
                ${country.population.toLocaleString()}
            </p>
            <p><strong>Region:</strong> ${country.region}</p>
            <img src="${country.flags.svg}" width="125">
        `;

        if (country.borders && country.borders.length > 0) {
            for (const code of country.borders) {
                const nResponse = await fetch(
                    `https://restcountries.com/v3.1/alpha/${code}`
                );

                if (!nResponse.ok) continue;

                const nData = await nResponse.json();
                const nCountry = nData[0];

                borderContainer.innerHTML += `
                    <p>${nCountry.name.common}</p>
                    <img src="${nCountry.flags.svg}" width="80">
                `;
            }
        } else {
            borderContainer.innerHTML =
                "<p>This country has no bordering countries.</p>";
        }

    } catch (error) {
        borderContainer.innerHTML = "";
        countryInfo.innerHTML = "";
        errorMessage.textContent =
            "Sorry! The country name is either misspelled or doesn't exist.";
    } finally {
        spinner.classList.add("hidden");
    }
}

document.getElementById("search-btn").addEventListener("click", () => {
    const country = document.getElementById("country-input").value;
    searchCountry(country);
});

input.addEventListener("keydown", (event)=>{
    if(event.key === "Enter"){
        const country = input.value;
        searchCountry(country);
    }
});