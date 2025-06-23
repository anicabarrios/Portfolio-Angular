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
        'float': 'float 6s ease-in-out infinite',
        'particle-float': 'particleFloat 12s ease-in-out infinite',
        'rotate-3d': 'rotate3D 20s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'breathe': 'breathe 3s ease-in-out infinite',
        'holographic': 'holographicShift 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-15px) rotate(1deg)' },
          '50%': { transform: 'translateY(-8px) rotate(-1deg)' },
          '75%': { transform: 'translateY(-20px) rotate(0.5deg)' },
        },
        particleFloat: {
          '0%, 100%': { 
            transform: 'translateY(0px) translateX(0px) rotate(0deg)', 
            opacity: '0.6' 
          },
          '25%': { 
            transform: 'translateY(-30px) translateX(10px) rotate(90deg)', 
            opacity: '1' 
          },
          '50%': { 
            transform: 'translateY(-15px) translateX(-5px) rotate(180deg)', 
            opacity: '0.8' 
          },
          '75%': { 
            transform: 'translateY(-40px) translateX(8px) rotate(270deg)', 
            opacity: '0.9' 
          },
        },
        rotate3D: {
          '0%': { transform: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)' },
          '33%': { transform: 'rotateX(120deg) rotateY(120deg) rotateZ(120deg)' },
          '66%': { transform: 'rotateX(240deg) rotateY(240deg) rotateZ(240deg)' },
          '100%': { transform: 'rotateX(360deg) rotateY(360deg) rotateZ(360deg)' },
        },
        pulseGlow: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(154, 212, 214, 0.3)' 
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(154, 212, 214, 0.6)' 
          },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
        },
        holographicShift: {
          '0%, 100%': { 
            backgroundPosition: '0% 50%', 
            filter: 'hue-rotate(0deg)' 
          },
          '50%': { 
            backgroundPosition: '100% 50%', 
            filter: 'hue-rotate(180deg)' 
          },
        },
      },
      perspective: {
        '500': '500px',
        '1000': '1000px',
      },
    },
  },
  plugins: [],
}