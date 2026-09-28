import type { ConnectionProvider } from '../types';

export interface ConnectionTestResult {
  success: boolean;
  message: string;
}

// Vervang deze demo door een request naar je eigen backend; bewaar credentials daar.
export async function testConnection(
  provider: ConnectionProvider,
): Promise<ConnectionTestResult> {
  await new Promise((resolve) => window.setTimeout(resolve, 650));

  return {
    success: true,
    message: `${provider}: demo-check afgerond. Er is nog geen externe verbinding getest.`,
  };
}