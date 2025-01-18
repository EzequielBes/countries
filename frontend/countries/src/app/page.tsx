"use client";
import { getAllCountries, getInformationsCountry } from "@/api/countries.api";
import Country from "@/components/list_country";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [countries, setCountries] = useState<any[]>([]); 
  const [countryName, setCountryName] = useState(''); 
  const [loading, setLoading] = useState(false); 
  const router = useRouter();

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true); 
      const response = await getAllCountries();
      setCountries(response);
      setLoading(false); 
    };

    fetchCountries();
  }, []);

 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleCountryClick = (countryCode: string) => {
    router.push(`/country/${countryCode}`); 
  };

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <header className="sticky top-0 bg-gray-800 p-8 z-10">
        <h1 className="text-white text-xl sm:text-2xl md:text-3xl">Find your Country</h1>
       
      </header>

      <main className="p-8 pt-32 sm:pt-40">
        {loading ? (
          <p className="text-white">Carregando...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {countries.map((item: { name: string, countryCode: string }) => (
              <div
                key={item.countryCode}
                onClick={() => handleCountryClick(item.countryCode)} 
                className="cursor-pointer p-4 border rounded-md shadow-md hover:bg-blue-200 transition-all"
              >
                <Country
                  name={item.name}
                  countryCode={item.countryCode}
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
