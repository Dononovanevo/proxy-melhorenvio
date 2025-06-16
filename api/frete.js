import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.melhorenvio.com.br/api/v2/me/shipment/calculate", {
      method: "POST",
      headers: {
        "Authorization": "Bearer SEU_TOKEN_AQUI",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Erro no fetch:", error.message);
    res.status(500).json({ error: true, message: "fetch failed" });
  }
}


