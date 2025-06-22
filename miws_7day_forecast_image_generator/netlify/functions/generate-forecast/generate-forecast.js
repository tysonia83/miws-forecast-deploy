
const fetch = require('node-fetch');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

exports.handler = async function(event, context) {
  const response = await fetch('https://api.weather.gov/gridpoints/DVN/75,45/forecast');
  const data = await response.json();
  const periods = data.properties.periods;

  const canvas = createCanvas(1600, 700);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = "#002244";
  ctx.fillRect(0, 0, 1600, 700);
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 50px Arial";
  ctx.fillText("MIWS 7-DAY FORECAST", 500, 80);

  // Dummy sample: Render 7 days text (image rendering will follow after icons loaded)
  for (let i = 0; i < 7; i++) {
    const day = periods[i];
    ctx.font = "bold 40px Arial";
    ctx.fillText(day.name, 50 + i * 220, 200);
    ctx.font = "30px Arial";
    ctx.fillText(`${day.temperature}°`, 50 + i * 220, 250);
  }

  const buffer = canvas.toBuffer("image/png");
  return {
    statusCode: 200,
    headers: { "Content-Type": "image/png" },
    body: buffer.toString('base64'),
    isBase64Encoded: true
  };
}
