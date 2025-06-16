export default async function handler(req, res) {
  const path = req.url.replace('/api/frete', '');
  const url = `https://api.melhorenvio.com.br${path}`;

  const options = {
    method: req.method,
    headers: {
      ...req.headers,
      host: 'api.melhorenvio.com.br',
    }
  };

  if (!['GET', 'HEAD'].includes(req.method)) {
    options.body = req.body;
  }

  try {
    const response = await fetch(url, options);
    const data = await response.text();
    res.status(response.status).send(data);
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
}
