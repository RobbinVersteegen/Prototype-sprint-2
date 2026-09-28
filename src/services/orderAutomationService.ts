export interface AutomationTestResult {
  status: 'success' | 'failure';
  message: string;
  makeResponse?: unknown;
}

export const automationTestEndpoint = '/api/test-make';

export async function testAutomation(): Promise<AutomationTestResult> {
  try {
    const response = await fetch(automationTestEndpoint, { method: 'POST' });
    const result = (await response.json()) as {
      success?: boolean;
      message?: string;
      makeResponse?: unknown;
    };

    if (!response.ok || !result.success) {
      return {
        status: 'failure',
        message: result.message || 'Verbinding met Make mislukt',
        makeResponse: result.makeResponse,
      };
    }

    return {
      status: 'success',
      message: 'Verbinding met Make werkt',
      makeResponse: result.makeResponse,
    };
  } catch {
    return { status: 'failure', message: 'Verbinding met Make mislukt' };
  }
}