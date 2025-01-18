import React from 'react';
import Flag from 'react-world-flags';


interface CountryProps {
  name: string;
  countryCode: string;
}

const Country: React.FC<CountryProps> = ({ name, countryCode }) => (
  <div className="p-6 border border-gray-300 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
    <div className="my-4">
    <Flag code={countryCode} className="w-12 h-auto" />    </div>
  </div>
);

export default Country;
