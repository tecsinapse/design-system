import { ParsedCountry } from 'react-international-phone';

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
    <button
      className="flex w-full h-[2rem] items-center justify-between p-centi cursor-pointer hover:bg-gray-100 bg-inherit"
      onClick={() => {
        handleSelectCountry(country);
      }}
      disabled={disableClick}
    >
      <span>{country?.name}</span>
      <span className="text-gray-400 text-sm">+{country?.dialCode}</span>
    </button>
  );
};
