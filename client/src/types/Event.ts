export type EventCategory = 'Work' | 'Personal' | 'Health' | 'Travel' | 'Finance' | 'Other';

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  notes?: string;
  category: EventCategory;
  archived: boolean;
} 