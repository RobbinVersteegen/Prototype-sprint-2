export interface AutomationTestResult {
  accepted: boolean;
  message: string;
}

// Dit is het toekomstige aansluitpunt voor je eigen backend/API richting Make.
export async function testAutomation(): Promise<AutomationTestResult> {
  await new Promise((resolve) => window.setTimeout(resolve, 800));

  return {
    accepted: true,
    message: 'Demo afgerond. Koppel deze actie later aan de backend en Make.',
  };
}