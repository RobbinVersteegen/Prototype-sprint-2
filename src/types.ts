export type OrderClassification = 'ORDER' | 'GEEN_ORDER' | 'ONZEKER';

export type ProcessingStatus = 'Verwerkt' | 'Controle nodig' | 'Niet verwerkt';

export interface ProcessingResult {
  id: string;
  receivedAt?: string;
  orderNumber: string;
  customer?: string;
  model?: string;
  quantity?: string;
  classification?: OrderClassification;
  status?: ProcessingStatus | string;
  reason?: string;
}

export interface MakeOrderData {
  ordernummer: string;
  klant?: string;
  model?: string;
  aantal?: string;
  status?: string;
}

export type ConnectionProvider = 'Gmail' | 'Google Sheets';