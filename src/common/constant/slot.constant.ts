export const SLOT_TIME = {
  1: { start: '07:00', end: '09:15' },
  2: { start: '09:30', end: '11:45' },
  3: { start: '12:30', end: '14:45' },
  4: { start: '15:00', end: '17:15' },
} as const;

export type SlotNumber = keyof typeof SLOT_TIME;
