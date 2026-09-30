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
    let success = false;
    try {
      const result = (await response.json()) as { success?: unknown; order?: unknown };
      success = result.success === true;
      if (isMakeOrderData(result.order)) order = result.order;
    } catch {
      // A successful HTTP response without valid order data is not a processed order.
    }

    if (!success || !order) {
      return { status: 'failure', message: 'Automatisering kon niet worden gestart' };
    }

    return {
      status: 'success',
      message: 'Make is succesvol geactiveerd en controleert Gmail op nieuwe orders.',
      order,
    };
  } catch {
    return { status: 'failure', message: 'Automatisering kon niet worden gestart' };
  }
}