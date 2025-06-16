export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: true, message: 'Method Not Allowed' });
  }

  try {
    const token = process.env.TOKEN_MELHORENVIO;

    const response = await fetch('https://melhorenvio.com.br/api/v2/me/shipment/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: true, message: data?.error || 'Erro na API do Melhor Envio' });
    }

    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: true, message: 'Erro interno do servidor', detail: err.message });
  }
}

