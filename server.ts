import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API endpoint to proxy renungan JSON and bypass CORS constraints
  app.get('/api/renungan', async (req, res) => {
    try {
      const response = await fetch('https://alunea.id/renungan-harian/renungan.json', {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch from source: ${response.status}`);
      }

      const data = await response.json();
      res.setHeader('Cache-Control', 'public, max-age=1800'); // Cache for 30 mins
      res.json(data);
    } catch (error) {
      console.error('Error in /api/renungan proxy:', error);
      res.status(500).json({ error: 'Gagal mengambil data renungan dari server.' });
    }
  });

  // API endpoint to proxy Alkitab requests to apiindonesia.id securely
  const ALKITAB_API_KEY = process.env.APIINDONESIA_KEY || 'aip_live_SWX40QLFVWS9aJAg2c4bR35Cpu21ZYa4';

  app.get('/api/alkitab/*', async (req, res) => {
    try {
      const subPath = req.params[0];
      const queryStr = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
      const targetUrl = `https://use.apiindonesia.id/api/v1/alkitab/${subPath}${queryStr}`;

      const response = await fetch(targetUrl, {
        headers: {
          'x-api-key': ALKITAB_API_KEY,
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AluneaBible/1.0',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        return res.status(response.status).json({ error: `API error: ${response.statusText}` });
      }

      const data = await response.json();
      res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
      res.json(data);
    } catch (error: any) {
      console.error('Error in /api/alkitab proxy:', error);
      res.status(500).json({ error: 'Gagal mengambil data Alkitab dari API.' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
