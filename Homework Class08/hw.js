async function getBorder(code) {
    try {
        let response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        let countryData = await response.json();

        let countryName = countryData[0].name.common;
        
        let borders = countryData[0].borders;

        console.log(`Neighbors of ${countryName} are:`);

        for (let border of borders) {
            let borderInfo = await fetch(`https://restcountries.com/v3.1/alpha/${border}`);
            let borderData = await borderInfo.json();
            console.log(borderData[0].name.common);
        }
    } catch (error) {
        console.error(error);
    }
}

getBorder("MKD");
