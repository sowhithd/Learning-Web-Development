/** @type {import('tailwindcss').Config} */

/* 
  When it comes to the custom font, we can use custom google font which is already added as reference in index HTML file.
  The custom font can be used we need to configure that in tailwind config file theme object as below.
  
  In that theme setting under extend, we can add the "font-family key" and then register a new font-family with any identifier of our 
  choice. So "font-family, this identifier name here, is not up to us" this is required to tell Tailwind CSS that we wanna extend
  the list of supported fonts it has. But identifier "title" is custom name.

  And we can the custom font on any HTLM element using attribute "font-title". This attribute name gets change if the custom key which
  we created below changes. 

  Ex: Below we have added custom font details to a object varaible called "title". Based on this Tailwind provides a attribute name called "font-title" 
      If the object variable name changes to something called "custom_font" then Tailwind attribute changes to "font-custom_font"


*/
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        title: ['"Pacifico"','cursive']
      }
    },
  },
  plugins: [],
}

