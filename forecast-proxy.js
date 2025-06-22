
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const apiUrl = 'https://api.weather.gov/gridpoints/DVN/75,45/forecast';

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch forecast.' })
    };
  }
}
