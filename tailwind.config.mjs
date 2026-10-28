/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './packages/cortex-core/docs/*.{js,ts,jsx,tsx}',
    './packages/cortex-react/docs/*.{js,ts,jsx,tsx}',
    './docs/**/*.{js,ts,jsx,tsx}',
    './packages/cortex-core/src/components/**/*.{js,ts,jsx,tsx}',
    './packages/cortex-react/src/**/**/*.{js,ts,jsx,tsx}',
  ],
};
