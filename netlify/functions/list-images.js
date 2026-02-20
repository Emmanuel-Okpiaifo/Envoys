const fetch = global.fetch || require('node-fetch');

exports.handler = async function(event) {
  // Only allow GET
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
  const API_KEY = process.env.CLOUDINARY_API_KEY;
  const API_SECRET = process.env.CLOUDINARY_API_SECRET;

  if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Cloudinary not configured' }) };
  }

  const listUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image/upload?max_results=50`;

  try {
    const res = await fetch(listUrl, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${API_KEY}:${API_SECRET}`).toString('base64')
      }
    });

    const data = await res.json();
    if (!res.ok) {
      return { statusCode: res.status || 500, body: JSON.stringify(data) };
    }

    // Normalize items to an array of { public_id, secure_url, url, format, width, height }
    const resources = (data.resources || []).map(r => ({
      public_id: r.public_id,
      secure_url: r.secure_url || r.url,
      url: r.secure_url || r.url,
      format: r.format,
      width: r.width,
      height: r.height
    }));

    return { statusCode: 200, body: JSON.stringify({ resources }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: String(err) }) };
  }
};
