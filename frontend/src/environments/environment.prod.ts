export const environment = {
  production: true,
  apiUrl: 'https://marketplace-uq3c.onrender.com/api',

  /**
   * Fournisseurs cartographiques — voir environment.ts pour le detail.
   *
   * Ces deux adresses sont des services publics de demonstration. Elles tiennent
   * tant que la charge reste anecdotique ; elles ne tiendront pas au-dela. Le
   * basculement vers l'instance auto-hebergee se fait ici, sans toucher au code
   * applicatif : infra/osrm/README.md decrit la mise en place.
   */
  carte: {
    osrm: 'https://router.project-osrm.org',
    /** Plafond /match du serveur vise — voir environment.ts. 500 en auto-heberge. */
    osrmMatchMax: 10,
    tuiles: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    },
  },
};
