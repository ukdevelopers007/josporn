module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundImage: {
      login: "url('/login/banner2.png')",
      banner_wide: "url('/homepageImages/banner-wide.png')",
    },
    extend: {
      aspectRatio: {
        'custom': '16 / 11',
      },

      animation: {
        fade: 'fadeIn 1s ease',
      },
      keyframes: theme => ({
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      }),

      screens: {
        "sm": "500px",
        'md': '750px',
        'lg': "1000px",
        'xl': "1300px",
        '2xl': "1600px"
      },
      gradients: {
        'theme-gradient': ['#A40606', '#D98324'],
      },
      colors: {
        'primary': '#3498db',      // Blue
        'secondary': '#880808',    // Red
        'dark-text': '#222222',    // Dark text
        'light-text': '#ffffff',   // Light text
        'button-primary': '#3498db',   // Default button color
        'button-secondary': '#e74c3c', // Secondary button color
        'button-primary-hover': '#2581c5',   // Default button hover color
        'button-secondary-hover': '#c0392b', // Secondary button hover color
        'body-bg': '#f5f5f5',      // Body background
        'header-bg': '#ffffff',    // Header background
        'footer-bg': '#333333',    // Footer background
        'card-bg': '#ffffff',
      },
      fontFamily: {
        body: ['Pushster'],
        footer: ['Inter'],
        theme: ['Poppins'],
        arial: ['Arial'],
        manrope: ['Manrope'],
        delius: ['Delius Unicase'],
        inter: ['Inter'],
        poppins: ['Poppins'],
        DMsans: ['DM Sans'],
        Opensans: ['Open Sans'],
        SFuiDisplay: ['SF UI Display'],
        Abhayalibre: ['Abhaya Libre'],
        Dancing: ['Dancing Script'],
      }
    },
  },

  variants: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar-hide'), 
    require('tailwindcss-gradients')]
}
