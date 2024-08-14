const API_ENDPOINT = 'https://api.inaturalist.org/v1/';
export default async function fetchData(querystring = '') {
  const url = `${API_ENDPOINT}${querystring}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
