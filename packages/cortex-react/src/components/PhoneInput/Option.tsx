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
      className="flex w-full h-[2rem] items-center justify-between p-centi cursor-pointer hover:bg-content-inverse bg-inherit"
      onClick={() => {
        handleSelectCountry(country);
      }}
      disabled={disableClick}
    >
      <span>{country?.name}</span>
      <span className="text-content-minimal text-sm">+{country?.dialCode}</span>
    </button>
  );
};
