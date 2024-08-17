export default async function fetchData(url: string | undefined) {
  if (!url) {
    url = 'http://my-json-server.typicode.com/stevengranter/module2';
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
