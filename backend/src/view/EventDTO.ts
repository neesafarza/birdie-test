export interface EventDTO {
  id: string;
  eventType: string;
  visitId: string;
  timestamp: Date;
  caregiverId: string;
  careRecipientId: string;
  eventInfo?: string;
}

export interface PageDTO<T> {
  rows: T[];
  count: number;
}
