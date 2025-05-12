/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EAF0F2',
          100: '#D5E1E6',
          200: '#B4C5CC',
          300: '#8FA5AF',
          400: '#6D8896',
          500: '#586F7C', 
          600: '#4A5E6A',
          700: '#3C4D58',
          800: '#2F4550', 
          900: '#233239',
        },
        accent: {
          50: '#EDF7F8',
          100: '#D9EFF1',
          200: '#BFE5E8',
          300: '#9AD4D6', 
          400: '#7BC5C8',
          500: '#5CB6BA', 
          600: '#4A9B9F',
          700: '#118076',  
          800: '#0D6057',  
          900: '#084039',  
        },
        coral: {
          300: '#FF8C8C',
          500: '#FF4F4F',
        },
        amber: {
          300: '#FFD166',
          400: '#FFC145', 
          500: '#FFB020',
        },
        seafoam: {
          300: '#57DFB8',
          400: '#22D3A7', 
          500: '#00BF96', 
        },
        nordic: {
          teal: '#9AD4D6',  
          slate: '#2F4550',
          mid: '#586F7C',
          coral: '#FF6B6B',
          amber: '#FFC145',
          seafoam: '#22D3A7'
        },
        dark: '#233239',
        light: '#F5F8FA',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}