interface VercelRequest {
  method?: string;
}

interface VercelResponse {
  setHeader(name: string, value: string): void;
  status(code: number): VercelResponse;
  json(body: unknown): VercelResponse;
}

const testPayload = {
  action: 'test_connection',
  source: 'order-automation-dashboard',
};

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<VercelResponse> {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Alleen POST-requests zijn toegestaan.' });
  }

  const webhookUrl = process.env.MAKE_WEBHOOK_URL;
  if (!webhookUrl) {
    return res.status(500).json({ success: false, message: 'MAKE_WEBHOOK_URL is niet ingesteld in Vercel.' });
  }

  try {
    const parsedUrl = new URL(webhookUrl);
    if (parsedUrl.protocol !== 'https:') {
      return res.status(500).json({ success: false, message: 'MAKE_WEBHOOK_URL moet een HTTPS-adres zijn.' });
    }

    const makeResponse = await fetch(parsedUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(testPayload),
      signal: AbortSignal.timeout(8000),
    });

    if (!makeResponse.ok) {
      return res.status(502).json({
        success: false,
        message: 'Automatisering kon niet worden gestart',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Automatisering gestart',
    });
  } catch {
    return res.status(502).json({ success: false, message: 'Automatisering kon niet worden gestart' });
  }
}