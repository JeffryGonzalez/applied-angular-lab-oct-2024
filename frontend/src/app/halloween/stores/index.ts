export { HouseEntryStore } from './house-entry.store';
export const RATINGS = [1, 2, 3, 4, 5] as const;

export type Rating = (typeof RATINGS)[number];
export type HouseEntry = {
  address: string;
  hasAmbiance: boolean;
  hasFullSizeCandy: boolean;
  qualityRating: Rating;
  quantityRating: Rating;
};

export type HouseEntity = HouseEntry & { id: string };

export type HouseListModel = HouseEntity & {
  totalScore: number;
  isPending: boolean;
};
