const CORS_PROXY_URL = "https://corsproxy.io";

const INAT_API_URL = `${CORS_PROXY_URL}?https://api.inaturalist.org/v1`;

const JSON_SERVER_URL =
  import.meta.env.VITE_JSONSERVER_URL || "http://localhost:3000";

export { JSON_SERVER_URL, INAT_API_URL };
