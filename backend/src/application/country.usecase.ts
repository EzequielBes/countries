import { getAllCountries, getCountryInfo } from "../gateways/contry";
import { getCountriesFlags, getCountriesPopulation } from "../gateways/countriesNow.api";

export class CountryUseCases {

    async listAll () {
        const all = getAllCountries()
        return all
    }

    async listInfoSpecificCountry(params: any) {
        const { countryCode } = params;
    
        try {
            const populationData = await getCountriesPopulation();
            const country = await getCountryInfo(countryCode);
            const flagsData = await getCountriesFlags();
            const countryFlag = flagsData.data.find((item: any) => item.country === country.name)?.flag;
    
            const countriesWithFlagsAndPopulation = country.borders.map((border: any) => {
                const cityPopulationData = populationData.data.find((item: any) => item.country === border.commonName);
                const borderFlag = flagsData.data.find((item: any) => item.name === border.commonName)?.flag;
    
                return {
                    ...border,
                    population: cityPopulationData ? cityPopulationData : "No information",
                    flag: borderFlag || "No flag available"
                };
            });
    
            const result = {
                country: {
                    name: country.name,
                    code: countryCode,
                    flag: countryFlag,
                    info: country.info,
                },
                borders: countriesWithFlagsAndPopulation,
            };
    
            return result;
        } catch (error: any) {
            throw new Error("Error: " + error.message);
        }
    }
    
}

