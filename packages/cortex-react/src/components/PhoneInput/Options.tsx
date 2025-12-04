import { useEffect, useMemo, useState } from 'react';
import { Divider } from '../Divider';
import { Country, usePhoneContext } from './context';
import { PhoneInputOption } from './Option';
import { Input } from '..';
import {
  defaultCountries,
  parseCountry,
  ParsedCountry,
} from 'react-international-phone';

const countries = defaultCountries.map(c => {
  return parseCountry(c);
});

export const PhoneInputOptions = () => {
  const { country, setCountry, setIsOpen } = usePhoneContext();
  const [searchText, setSearchText] = useState('');
  const filteredCountries = useMemo(() => {
    return countries.filter(
      c => c.iso2 !== country?.iso2 && c.name.includes(searchText)
    );
  }, [country]);

  const handleSelect = (country: ParsedCountry) => {
    setCountry?.(country.iso2);
    setIsOpen?.(false);
  };

  return (
    <div className="w-full h-full flex flex-col overflow-y-auto">
      <Input.Search onChange={e => setSearchText(e.target.value)} />
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
      {filteredCountries.map(country => {
        return (
          <PhoneInputOption
            country={country}
            handleSelectCountry={handleSelect}
            key={`${country.dialCode} ${country.iso2}`}
          />
        );
      })}
    </div>
  );
};
