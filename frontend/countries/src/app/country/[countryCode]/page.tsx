"use client";
import { getInformationsCountry } from "@/api/countries.api";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import Flag from "react-world-flags";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface CountryDetailProps {
  params: {
    countryCode: string;
  };
}

const CountryDetail = ({ params }: CountryDetailProps) => {
  const [countryData, setCountryData] = useState<any | null>(null);
  const [countryCode, setCountryCode] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountryCode = async () => {
      const resolvedParams = await params;
      setCountryCode(resolvedParams.countryCode);
    };

    fetchCountryCode();
  }, [params]);

  useEffect(() => {
    if (countryCode) {
      const fetchCountryData = async () => {
        console.log("Fetching data for:", countryCode);
        const data = await getInformationsCountry(countryCode);
        setCountryData(data);
      };
      fetchCountryData();
    }
  }, [countryCode]);

  if (!countryCode) {
    return <p>No country code provided in the URL.</p>;
  }

  if (!countryData) {
    return <p>Loading...</p>;
  }

  const { country, borders } = countryData;

  const populationData = country?.population?.populationCounts.map((pop: any) => ({
    year: pop.year,
    value: pop.value,
  }));
  
  const chartData = {
    labels: populationData?.map((data: any) => data.year),
    datasets: [
      {
        label: `Population of ${country.code}`,
        data: populationData?.map((data: any) => data.value),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center text-blue-700">{country.name}</h2>
      <p className="text-center text-gray-600">Details about {country.population.country}</p>
      
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-blue-600">General Information:</h3>
        <p className="text-black"><strong >Code:</strong> {country.code}</p>
        <p>  <strong>Flag:</strong>
        <Flag code={countryCode} className="w-12 h-auto" />

        </p>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-blue-600">Population Growth:</h3>
        <Line data={chartData} />
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-blue-600">Borders with other countries:</h3>
        {borders?.length > 0 ? (
          <ul className="list-disc pl-5">
            {borders.map((border: any) => (
              <li key={border.countryCode} className="text-gray-700 flex gap-2">
                <img src={border.flag} className="w-5 h-4" />
                <strong>{border.commonName}</strong> ({border.officialName})
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">This country has no borders with other countries.</p>
        )}
      </div>
    </div>
  );
};

export default CountryDetail;
