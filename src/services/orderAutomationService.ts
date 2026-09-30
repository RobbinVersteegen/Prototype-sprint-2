import type { MakeOrderData } from '../types';

export interface AutomationTestResult {
  status: 'success' | 'failure';
  message: string;
  order?: MakeOrderData;
}

export const automationTestEndpoint = '/api/test-make';

function isMakeOrderData(value: unknown): value is MakeOrderData {
  if (typeof value !== 'object' || value === null) return false;
  const order = value as Record<string, unknown>;
  return typeof order.ordernummer === 'string' && order.ordernummer.trim().length > 0;
}

function readSuccessfulOrder(value: unknown): MakeOrderData | undefined {
  if (typeof value !== 'object' || value === null) return undefined;

  const result = value as Record<string, unknown>;
  if (result.success !== true) return undefined;

  const nestedOrder = result.order;
  if (isMakeOrderData(nestedOrder)) return nestedOrder;
  return isMakeOrderData(result) ? result : undefined;
}

export async function testAutomation(): Promise<AutomationTestResult> {
  try {
    const response = await fetch(automationTestEndpoint, { method: 'POST' });

    if (!response.ok) {
      let message = 'Automatisering kon niet worden gestart';
      try {
        const result = (await response.json()) as { message?: string };
        message = result.message || message;
      } catch {
        // Keep the generic failure message when the API has no JSON response.
      }
      return {
        status: 'failure',
        message,
      };
    }

    let order: MakeOrderData | undefined;
    try {
      order = readSuccessfulOrder(await response.json() as unknown);
    } catch {
      // An invalid API response is not a successfully processed order.
    }

    if (!order) {
      return { status: 'failure', message: 'Automatisering kon niet worden gestart' };
    }

    return {
      status: 'success',
      message: 'Order succesvol verwerkt',
      order,
    };
  } catch {
    return { status: 'failure', message: 'Automatisering kon niet worden gestart' };
  }
}