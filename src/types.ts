export type OrderClassification = 'ORDER' | 'GEEN_ORDER' | 'ONZEKER';

export type ProcessingStatus = 'Verwerkt' | 'Controle nodig' | 'Niet verwerkt';

export interface ProcessingResult {
  id: string;
  classification: OrderClassification;
  status: ProcessingStatus;
  receivedAt: string;
}

export type ConnectionProvider = 'Gmail' | 'Google Sheets';