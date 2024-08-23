const jsonServerUrl =
  import.meta.env.VITE_JSONSERVER_URL || 'http://localhost:3000';
const imagePathUrl = '/images/';
const iNatAPIUrl = 'https://api.inaturalist.org/v1';

export { jsonServerUrl, imagePathUrl, iNatAPIUrl };
