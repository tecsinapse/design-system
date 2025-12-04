import { ParsedCountry } from 'react-international-phone';
import { Country } from './context';

export const PhoneInputOption = ({
  country,
  handleSelectCountry,
  disableClick = false,
}: {
  country: ParsedCountry;
  handleSelectCountry: (country: ParsedCountry) => void;
  disableClick?: boolean;
}) => {
  return (
    <div
      className="flex w-full h-[2rem] items-center justify-between p-centi cursor-pointer hover:bg-gray-100"
      onClick={() => {
        if (!disableClick) {
          handleSelectCountry(country);
        }
      }}
    >
      <span>{country?.name}</span>
      <span className="text-gray-400 text-sm">+{country?.dialCode}</span>
    </div>
  );
};
