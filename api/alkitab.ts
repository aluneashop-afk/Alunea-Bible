export default async function handler(req: any, res: any) {
  try {
    const API_KEY = process.env.APIINDONESIA_KEY || 'aip_live_SWX40QLFVWS9aJAg2c4bR35Cpu21ZYa4';
    
    // Extract subpath: either from query.path or from req.url
    let subPath = '';
    if (req.query?.path) {
      subPath = Array.isArray(req.query.path) ? req.query.path.join('/') : req.query.path;
    } else {
      const urlParts = (req.url || '').split('?')[0].split('/api/alkitab/');
      subPath = urlParts[1] || '';
    }

    // Preserve other query parameters (e.g., q, limit, offset)
    const urlObj = new URL(req.url, 'http://localhost');
    urlObj.searchParams.delete('path');
    const queryString = urlObj.searchParams.toString();
    const targetUrl = `https://use.apiindonesia.id/api/v1/alkitab/${subPath}${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(targetUrl, {
      headers: {
        'x-api-key': API_KEY,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AluneaBible/1.0',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `API error: ${response.statusText}` });
    }

    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=604800');
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Error in /api/alkitab handler:', error);
    return res.status(500).json({ error: 'Failed to fetch Bible data from API' });
  }
}
