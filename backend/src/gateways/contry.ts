import axios from "axios";

const baseUrl = axios.create({
    baseURL: "https://date.nager.at/api/v3",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

export const getAllCountries = async () => {
    try {
        const response = await baseUrl.get("/AvailableCountries");
        return response.data;
    } catch (error) {
        console.error("Error fetching available countries:", error);
        throw error;
    }
};

export const getCountryInfo = async (countryCode: any) => {
    try {
        const response = await baseUrl.get(`countryInfo/${countryCode}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching country information (${countryCode}):`, error);
        throw error;
    }
};
