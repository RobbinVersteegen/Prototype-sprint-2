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

function isExplicitMakeFailure(value: unknown): boolean {
  if (typeof value !== 'object' || value === null) return false;

  const response = value as { success?: unknown; status?: unknown; error?: unknown };
  return response.success === false
    || (response.error !== undefined && response.error !== null && response.error !== false)
    || (typeof response.status === 'string' && ['error', 'failed', 'failure'].includes(response.status.toLowerCase()));
}

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

    const responseText = await makeResponse.text();
    let responseData: unknown;
    let validJson = true;
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = responseText;
      validJson = false;
    }

    if (!makeResponse.ok || !validJson || isExplicitMakeFailure(responseData)) {
      return res.status(502).json({
        success: false,
        message: 'Verbinding met Make mislukt',
        makeResponse: responseData,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Verbinding met Make werkt',
      makeResponse: responseData,
    });
  } catch {
    return res.status(502).json({ success: false, message: 'Verbinding met Make mislukt' });
  }
}