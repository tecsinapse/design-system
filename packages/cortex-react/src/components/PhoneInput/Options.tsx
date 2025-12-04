import { useEffect, useMemo, useState } from 'react';
import { Divider } from '../Divider';
import { Country, usePhoneInput } from './context';
import { PhoneInputOption } from './Option';
import { countries } from './countryCodes';
import { isSupportedCountry } from 'libphonenumber-js';

export const PhoneInputOptions = () => {
  const { country, setCountry, setIsOpen } = usePhoneInput();
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);

  const filtered = useMemo(() => {
    return countries.filter(
      c => c.iso !== country?.iso && isSupportedCountry(c.iso)
    );
  }, [country]);

  useEffect(() => {
    setFilteredCountries(filtered);
  }, [filtered]);

  const handleSelect = (country: Country | null) => {
    setCountry?.(country);
    setIsOpen?.(false);
  };

  return (
    <div className="w-full h-full flex flex-col overflow-y-auto">
      {country ? (
        <>
          <PhoneInputOption
            country={country}
            handleSelectCountry={handleSelect}
            disableClick
          />
          <Divider />
        </>
      ) : null}
      {filteredCountries.map(country => (
        <PhoneInputOption
          country={country}
          handleSelectCountry={handleSelect}
          key={`${country.code} ${country.iso}`}
        />
      ))}
    </div>
  );
};
