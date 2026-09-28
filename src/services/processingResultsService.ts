import type { ProcessingResult } from '../types';

interface ProcessingResultsResponse {
  results: ProcessingResult[];
}

// Dit endpoint wordt door de eigen backend gevuld met echte Make-verwerkingen.
export async function getProcessingResults(): Promise<ProcessingResult[]> {
  const response = await fetch('/api/processing-results');

  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw new Error('Verwerkingsgegevens konden niet worden opgehaald.');
  }

  if (!response.headers.get('content-type')?.includes('application/json')) {
    return [];
  }

  const data = (await response.json()) as ProcessingResultsResponse;
  return data.results;
}