/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'appBackground': "url('/src/assets/appbg.png')",
        'text-texture': "linear-gradient(45deg, #0099FF, #BB33FF, #FF5280, #FFBA00)",
      }
    },
  },
  plugins: [daisyui],
  daisyui: {
    // Disable DaisyUI scrollbar styles if they're applied as a component
    styled: true,
    base: false, // this removes the base styles including scrollbar overrides
    themes: [
      {
        light: {
          primary: '#ffffff',
          secondary: '#e9e9e9',
          accent: '#BB33FF',
          neutral: '#000000',
          'base-100': '#ffffff', 
          'placeholder': '#bababa'
        
      
        },
        black: {
          primary: '#000000',
          secondary: '#333333',
          accent: '#BB33FF',
          neutral: '#ffffff',
          'base-100': '#090314',
          'placeholder': '#494949'

       
         
        },
      },
    ],
  },
}

