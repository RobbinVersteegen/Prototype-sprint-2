interface VercelRequest {
  method?: string;
}

interface VercelResponse {
  setHeader(name: string, value: string): void;
  status(code: number): VercelResponse;
  json(body: unknown): VercelResponse;
}

interface MakeOrder {
  ordernummer: string;
  klant?: string;
  model?: string;
  aantal?: string;
  status?: string;
}

const testPayload = {
  action: 'test_connection',
  source: 'order-automation-dashboard',
};

function readMakeOrder(value: unknown): MakeOrder | undefined {
  if (typeof value !== 'object' || value === null) return undefined;

  const data = value as Record<string, unknown>;
  if (data.success !== true || typeof data.ordernummer !== 'string' || !data.ordernummer.trim()) return undefined;

  const toStringValue = (field: unknown) =>
    typeof field === 'string' || typeof field === 'number' ? String(field) : undefined;

  return {
    ordernummer: data.ordernummer,
    klant: toStringValue(data.klant),
    model: toStringValue(data.model),
    aantal: toStringValue(data.aantal),
    status: toStringValue(data.status),
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<VercelResponse> {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Alleen POST-requests zijn toegestaan.' });
  }

  const webhookUrl = process.env.MAKE_WEBHOOK_URL;
  if (!webhookUrl) {
    console.info('[Make] final success:', false);
    return res.status(500).json({ success: false, message: 'MAKE_WEBHOOK_URL is niet ingesteld in Vercel.' });
  }

  try {
    const parsedUrl = new URL(webhookUrl);
    if (parsedUrl.protocol !== 'https:') {
      console.info('[Make] final success:', false);
      return res.status(500).json({ success: false, message: 'MAKE_WEBHOOK_URL moet een HTTPS-adres zijn.' });
    }

    const makeResponse = await fetch(parsedUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(testPayload),
    });
    const responseText = await makeResponse.text();
    console.info('[Make] HTTP status:', makeResponse.status);
    console.info('[Make] raw response text:', responseText);

    let parsedResponse: unknown;
    try {
      parsedResponse = JSON.parse(responseText) as unknown;
    } catch {
      parsedResponse = undefined;
    }
    console.info('[Make] parsed response:', parsedResponse);

    const order = readMakeOrder(parsedResponse);
    if (!makeResponse.ok || !order) {
      console.info('[Make] final success:', false);
      return res.status(502).json({
        success: false,
        message: 'Automatisering kon niet worden gestart',
      });
    }

    console.info('[Make] final success:', true);
    return res.status(200).json({
      success: true,
      message: 'Order succesvol verwerkt',
      order,
    });
  } catch {
    console.info('[Make] final success:', false);
    return res.status(502).json({ success: false, message: 'Automatisering kon niet worden gestart' });
  }
}