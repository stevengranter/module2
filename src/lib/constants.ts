const JSON_SERVER_URL =
  import.meta.env.VITE_JSONSERVER_URL || "http://localhost:3000";
const imagePathUrl = "/images/";
const INAT_API_URL = "https://corsproxy.io?https://api.inaturalist.org/v1";

export { JSON_SERVER_URL, imagePathUrl, INAT_API_URL };
