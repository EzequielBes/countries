import axios from "axios";
require('dotenv').config()

const baseUrl = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API,
    timeout: 10000, 
    headers: {
        "Content-Type": "application/json",
    },
});

export const getAllCountries = async () => {
    try {
        const response = await baseUrl.get("/getAllCountries");
        console.log(response)
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar os países disponíveis:", error);
        throw error;
    }
};

export const getInformationsCountry = async (countryCode: string) => {
    try {
      const response = await baseUrl.get(`/countryInfo`, {
        params: { countryCode }, 
      });
  
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar as informações do país:", error);
      throw error;
    }
  };
