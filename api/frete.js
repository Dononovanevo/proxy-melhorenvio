export default async function handler(req, res) {
  const path = req.url.replace('/api/frete', '');
  const url = `https://api.melhorenvio.com.br${path}`;

  const response = await fetch(url, {
    method: req.method,
    headers: {
      ...req.headers,
      host: 'api.melhorenvio.com.br',
    },
    body: ['GET', 'HEAD'].includes(req.method) ? null : req.body,
  });

  const data = await response.text();
  res.status(response.status).send(data);
}
