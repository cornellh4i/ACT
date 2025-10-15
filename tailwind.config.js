/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        jost: ['Jost-Regular', 'system-ui', 'sans-serif'],
        'jost-italic': ['Jost-Italic', 'Jost-Regular', 'system-ui', 'sans-serif'],
        'jost-medium': ['Jost-Medium', 'Jost-Regular', 'system-ui', 'sans-serif'],
        'jost-semibold': ['Jost-SemiBold', 'Jost-Regular', 'system-ui', 'sans-serif'],
        'jost-bold': ['Jost-Bold', 'Jost-Regular', 'system-ui', 'sans-serif'],
        'jost-black': ['Jost-Black', 'Jost-Regular', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
