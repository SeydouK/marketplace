/**
 * Design system BétailMarket.
 *
 * Deux familles de jetons cohabitent :
 *  - les jetons SEMANTIQUES (ink, line, canvas, surface, muted, danger…) : ce
 *    sont eux que les écrans doivent employer ; ils disent le rôle, pas la teinte ;
 *  - les palettes de MARQUE (brand, accent, sand, earth), conservées pour les
 *    usages ponctuels et pour la compatibilité avec l'existant.
 *
 * Règles : aucun dégradé ; le vert porte l'action et la confiance ; le doré est
 * réservé à l'unique appel à publier ; le rouge, aux erreurs et aux litiges.
 */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Figtree Variable"', 'Figtree', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'Arial', 'sans-serif'],
        display: ['"Fraunces Variable"', 'Fraunces', 'Georgia', '"Times New Roman"', 'serif'],
      },
      colors: {
        // ── Sémantique ─────────────────────────────────────────────────────
        ink: {
          DEFAULT: '#1F1C17',   // texte principal
          2: '#5B5348',         // texte secondaire
          3: '#8A8174',         // texte tertiaire, légendes
        },
        canvas: '#FAF8F4',      // fond d'application
        surface: '#FFFFFF',     // cartes, panneaux
        muted: '#F4F0E8',       // zones en retrait, fonds de champ
        line: {
          DEFAULT: '#E8E2D6',   // séparateurs, bordures de carte
          strong: '#D7CEBE',    // bordures de champ
        },
        danger: { DEFAULT: '#B4382D', soft: '#FBEDEB', line: '#F1C9C3' },
        warning: { DEFAULT: '#9A5B0E', soft: '#FCF3E3', line: '#F1D6A6' },
        info: { DEFAULT: '#2C5A82', soft: '#EBF2F8', line: '#C7D9EA' },

        // ── Marque ─────────────────────────────────────────────────────────
        // Vert nature — couleur principale (confiance, agriculture)
        brand: {
          50:  '#F1F6F2',
          100: '#E2EEE6',
          200: '#C2DCCB',
          300: '#97C3A7',
          400: '#65A37D',
          500: '#41855D',
          600: '#2D6A4F',
          700: '#245540',
          800: '#1B4332',
          900: '#142F24',
        },
        // Doré — accent chaleureux, réservé à la publication
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
      fontSize: {
        // Échelle resserrée : peu de tailles, bien espacées.
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      letterSpacing: {
        eyebrow: '0.08em',
      },
      boxShadow: {
        // Ombres neutres et discrètes : la profondeur vient des bordures.
        'xs': '0 1px 2px rgba(31, 28, 23, 0.05)',
        'card': '0 1px 2px rgba(31, 28, 23, 0.04), 0 1px 3px rgba(31, 28, 23, 0.04)',
        'card-hover': '0 2px 4px rgba(31, 28, 23, 0.04), 0 12px 28px rgba(31, 28, 23, 0.08)',
        'pop': '0 4px 12px rgba(31, 28, 23, 0.06), 0 16px 40px rgba(31, 28, 23, 0.10)',
        'focus': '0 0 0 3px rgba(45, 106, 79, 0.18)',
        // Compatibilité : anciens noms, désormais sans halo coloré.
        'cta': '0 1px 2px rgba(31, 28, 23, 0.08)',
        'cta-accent': '0 1px 2px rgba(31, 28, 23, 0.08)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      maxWidth: {
        page: '1200px',
        wide: '1440px',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
