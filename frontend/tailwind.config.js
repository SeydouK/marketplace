module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Vert nature — couleur principale (confiance, agriculture)
        brand: {
          50:  '#F2F7F3',
          100: '#E0EEE4',
          200: '#C2DCCB',
          300: '#97C3A7',
          400: '#65A37D',
          500: '#41855D',
          600: '#2D6A4F',
          700: '#245540',
          800: '#1B4332',
          900: '#142F24',
        },
        // Doré / orangé — accent chaleureux (CTA, badges premium)
        accent: {
          50:  '#FDF6EC',
          100: '#FAEAD2',
          200: '#F4D4A3',
          300: '#ECB867',
          400: '#E59C3C',
          500: '#D97E1F',
          600: '#B96416',
          700: '#944E15',
        },
        // Beige / sable — fonds doux et naturels
        sand: {
          50:  '#FBF9F4',
          100: '#F6F1E7',
          200: '#EDE4D3',
          300: '#DFD2B8',
          400: '#C9B690',
        },
        // Marron clair — touches terre / élevage
        earth: {
          400: '#A98B6F',
          500: '#8B6F55',
          600: '#7A5C43',
          700: '#5C4633',
        },
      },
      boxShadow: {
        'card': '0 1px 2px rgba(27, 67, 50, 0.06), 0 4px 16px rgba(27, 67, 50, 0.07)',
        'card-hover': '0 8px 28px rgba(27, 67, 50, 0.14)',
        'cta': '0 8px 24px rgba(45, 106, 79, 0.28)',
        'cta-accent': '0 8px 24px rgba(217, 126, 31, 0.30)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
