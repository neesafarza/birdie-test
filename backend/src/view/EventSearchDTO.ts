export interface EventSearchDTO {
  eventType: string;
  careRecipientId: string;
  startDate?: Date;
  endDate?: Date;
  caregiverId?: string;
  page?: string;
}
