export interface AutomationTestResult {
  status: 'success' | 'failure';
  message: string;
}

export const automationTestEndpoint = '/api/test-make';

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

    return {
      status: 'success',
      message: 'Make is succesvol geactiveerd en controleert Gmail op nieuwe orders.',
    };
  } catch {
    return { status: 'failure', message: 'Automatisering kon niet worden gestart' };
  }
}