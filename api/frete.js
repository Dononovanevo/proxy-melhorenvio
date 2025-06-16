export default async function handler(req, res) {
  const path = req.url.replace('/api/frete', '');
  const url = `https://api.melhorenvio.com.br${path}`;

  const headers = { ...req.headers };
  delete headers.host;

  const options = {
    method: req.method,
    headers,
  };

  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    options.body = JSON.stringify(req.body);
  }

  try {
    const response = await fetch(url, options);
    const data = await response.text();

    res.status(response.status).send(data);
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
}

