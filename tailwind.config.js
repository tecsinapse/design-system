/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: true,
  },
  content: [
    './packages/react-web-kit/src/components/atoms/**/*.{js,ts,jsx,tsx}',
    './packages/cortex-core/docs/*.{js,ts,jsx,tsx}',
    './packages/cortex-react/docs/*.{js,ts,jsx,tsx}',
    './docs/**/*.{js,ts,jsx,tsx}',
    './packages/cortex-core/src/components/**/*.{js,ts,jsx,tsx}',
    './packages/cortex-react/src/**/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [require('./packages/cortex-core/dist/cjs/preset')],
  theme: {
    extend: {
      animation: {
        progress: 'progress 1s infinite linear',
      },
      keyframes: {
        progress: {
          '0%': { transform: 'translateX(0) scaleX(0)' },
          '40%': { transform: 'translateX(0) scaleX(0.4)' },
          '100%': { transform: 'translateX(100%) scaleX(0.5)' },
        },
      },
      transformOrigin: {
        'left-right': '0% 50%',
      },
    },
  },
};
