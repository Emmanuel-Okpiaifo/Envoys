const fetch = global.fetch || require('node-fetch');

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch (err) {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const public_id = body.public_id;
  if (!public_id) {
    return { statusCode: 400, body: 'Missing public_id' };
  }

  const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
  const API_KEY = process.env.CLOUDINARY_API_KEY;
  const API_SECRET = process.env.CLOUDINARY_API_SECRET;

  if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
    return { statusCode: 500, body: 'Cloudinary not configured' };
  }

  const deleteUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image/upload/${encodeURIComponent(public_id)}`;

  try {
    const res = await fetch(deleteUrl, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${API_KEY}:${API_SECRET}`).toString('base64')
      }
    });

    const data = await res.json();
    if (!res.ok) {
      return { statusCode: res.status || 500, body: JSON.stringify(data) };
    }

    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (err) {
    return { statusCode: 500, body: String(err) };
  }
};
