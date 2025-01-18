

  import axios from "axios";

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
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error fetching available countries:", error);
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
        console.error("Error fetching country information:", error);
        throw error;
    }
};
