
export default async function handler(req, res) {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send("Missing url");

  try {
    const response = await fetch(targetUrl);
    let html = await response.text();

    // Supprimer les entêtes HTML gênants
    html = html.replace(/<meta[^>]+http-equiv=["']?X-Frame-Options["']?[^>]*>/gi, '');
    html = html.replace(/content-security-policy[^>]*>/gi, '');

    res.setHeader("Content-Type", "text/html");
    res.send(html);
  } catch (err) {
    res.status(500).send("Proxy error: " + err.message);
  }
}
