import { CountryUseCases } from "../../application/country.usecase";
import { HttpServer } from "../../http/http.server";

export class CountryControllers {
    constructor (connection: HttpServer, countryUseCase : CountryUseCases) {


        connection.register("get", "/getAllCountries", () => {
            return countryUseCase.listAll()
        })


        connection.register("get", "/countryInfo", (body:any, query:any) => {
            return countryUseCase.listInfoSpecificCountry(query)
        })
    }

    
}