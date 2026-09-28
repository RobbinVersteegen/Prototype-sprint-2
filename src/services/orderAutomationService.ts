export interface AutomationTestResult {
  status: 'not-connected' | 'started' | 'error';
  message: string;
}

export const automationTestEndpoint = '/api/automation/test';

// Vervang deze melding door een POST naar automationTestEndpoint zodra de backend bestaat.
export async function testAutomation(): Promise<AutomationTestResult> {
  return {
    status: 'not-connected',
    message: 'Make-koppeling wordt in de volgende stap toegevoegd.',
  };
}