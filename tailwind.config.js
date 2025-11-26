/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './packages/react-web-kit/src/components/atoms/**/*.{js,ts,jsx,tsx}',
    './packages/cortex-core/docs/*.{js,ts,jsx,tsx}',
    './packages/cortex-react/docs/*.{js,ts,jsx,tsx}',
    './docs/**/*.{js,ts,jsx,tsx}',
    './packages/cortex-core/src/components/**/*.{js,ts,jsx,tsx}',
    './packages/cortex-react/src/**/**/*.{js,ts,jsx,tsx}',
  ],
};
