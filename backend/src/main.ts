import { CountryUseCases } from "./application/country.usecase";
import { CountryControllers } from "./domain/controllers/countriesController";
import { ServerHttpExpress } from "./http/http.server";

const http = new ServerHttpExpress()

const countryUseCase = new CountryUseCases()
const countryControllers = new CountryControllers(http, countryUseCase)

http.listen(process.env.PORT || "3001")