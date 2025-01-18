import axios from "axios";

const baseUrl = axios.create({
    baseURL: "https://countriesnow.space/api/v0.1/",
    timeout: 10000, 
    headers: {
        "Content-Type": "application/json",
    },
});


export const getCountriesPopulation = async () => {
    try {
        const response = await baseUrl.get("countries/population");
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar a população dos países:", error);
        throw error;
    }
};

export const getCountriesFlags = async () => {
    try {
        const response = await baseUrl.get("countries/flag/images");
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar as bandeiras dos países:", error);
        throw error;
    }
};
