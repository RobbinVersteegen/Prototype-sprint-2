import type { ProcessingResult } from '../types';

// Voorbeeldresultaten staan apart van de interface en kunnen later door API-data worden vervangen.
export const demoResults: ProcessingResult[] = [
  {
    id: '10001',
    classification: 'ORDER',
    status: 'Verwerkt',
    receivedAt: 'Vandaag, 10:42',
  },
  {
    id: '10002',
    classification: 'ONZEKER',
    status: 'Controle nodig',
    receivedAt: 'Vandaag, 09:18',
  },
  {
    id: '10003',
    classification: 'GEEN_ORDER',
    status: 'Niet verwerkt',
    receivedAt: 'Gisteren, 16:05',
  },
];