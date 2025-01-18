import axios from "axios";

const baseUrl = axios.create({
    baseURL: process.env.API_URL,
    timeout: 10000, 
    headers: {
        "Content-Type": "application/json",
    },
});

export const getAllCountries = async () => {
    try {
        const response = await baseUrl.get("http://localhost:3001/getAllCountries");
        console.log(response)
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar os países disponíveis:", error);
        throw error;
    }
};

export const getInformationsCountry = async (countryCode: string) => {
    try {
      const response = await baseUrl.get(`http://localhost:3001/countryInfo`, {
        params: { countryCode }, 
      });
  
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar as informações do país:", error);
      throw error;
    }
  };
