export default async function fetchData(url: string | undefined) {
  if (!url) {
    url = 'http://localhost:3000/wilderkind';
  }

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
