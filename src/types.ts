export type OrderClassification = 'ORDER' | 'GEEN_ORDER' | 'ONZEKER';

export type ProcessingStatus = 'Verwerkt' | 'Controle nodig' | 'Niet verwerkt';

export interface ProcessingResult {
  id: string;
  receivedAt: string;
  orderNumber: string;
  customer: string;
  classification: OrderClassification;
  status: ProcessingStatus;
  reason?: string;
}

export type ConnectionProvider = 'Gmail' | 'Google Sheets';