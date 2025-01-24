/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Text colors
        'black-text': '#373839',
        'white-text': '#ffffff',
        'blue-text': '#2eacee',
        'orange-text': '#ff7506',
        'green-text': '#49c510',
        'grey-text': '#c9c4c0',

        // Status colors
        'red-status': '#ed2025',
        'blue-status': '#0b80ec',
        'green-status': '#49c510',

        // Background colors
        'background-1': '#ff5400',
        'background-2': '#f17f21',
        'background-3': '#fdc830',
        'background-4': '#f37335',
        'background-5': '#56ccf2',
        'background-6': '#2f80ed',
        'background-7': '#45b649',
        'background-8': '#dce35b',

        'background-gray': '#c9c4c0',
        'background-orange-1': '#ff7506',
        'background-orange-2': '#ffb923',
        'background-orange-3': '#ffa75e',
        'background-blue-1': '#2eacee',
        'background-blue-2': '#a1d9f7',
        'background-blue-3': '#0016dab2',
        'background-green': '#49c510',
        'background-white': '#ffffff',
        'background-input': '#ffd8b8',

        // Border colors
        'border-orange': '#ff7506',

        // Icon colors
        'icon-color': '#823b00',

        // User colors
        'user-color': '#cc5c00',
      },
      backgroundImage: {
        'gradient-top-or': 'linear-gradient(to top, #ff5400, #f17f21)',
        'gradient-right-or': 'linear-gradient(to right, #f17f21, #ff5400)',
        'gradient-sheet': 'linear-gradient(to right, #fdc830, #f37335)',
        'gradient-blue': 'linear-gradient(to right, #56ccf2, #2f80ed)',
        'gradient-green': 'linear-gradient(to right, #dce35b, #45b649)',
      },
    },
  },
  plugins: [],
};