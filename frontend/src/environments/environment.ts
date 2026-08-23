export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',

  /**
   * Fournisseurs cartographiques.
   *
   * Regroupés ici, et non en dur dans les services, parce qu'ils changeront :
   * les deux adresses par défaut sont des services publics de démonstration, à
   * quitter avant toute mise en charge sérieuse. Voir infra/osrm/README.md.
   */
  carte: {
    /**
     * Serveur de calcul d'itinéraire.
     *
     * router.project-osrm.org est une démonstration : sans garantie de
     * disponibilité, sans débit garanti, et son usage en production est
     * découragé par le projet lui-même. Remplacer par l'adresse de l'instance
     * auto-hébergée — http://localhost:5000 en développement.
     */
    osrm: 'https://router.project-osrm.org',

    /**
     * Nombre maximal de points par demande de recalage (/match).
     *
     * Cette borne appartient au serveur, pas à l'application : OSRM refuse la
     * requête entière au-delà, par un 400 « TooBig ». Le serveur de démonstration
     * la fixe à 10 — bien en dessous des 100 par défaut d'OSRM. Une instance
     * auto-hébergée choisit la sienne via --max-matching-size ; celle décrite
     * dans infra/osrm/docker-compose.yml annonce 500.
     *
     * À 10 points, le recalage ne lisse plus que la fin du parcours. C'est le
     * prix du serveur public, et c'est une raison de plus de s'héberger.
     */
    osrmMatchMax: 10,

    tuiles: {
      /**
       * Fond de carte.
       *
       * tile.openstreetmap.org est soumis à une politique d'usage qui exclut
       * explicitement les applications à trafic soutenu. Le respecter n'est pas
       * une option : le projet bloque les clients qui en abusent, et la carte
       * disparaîtrait alors sans préavis pour tous les utilisateurs.
       */
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      /** Exigée par la licence ODbL des données. Ne pas retirer. */
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    },
  },
};
