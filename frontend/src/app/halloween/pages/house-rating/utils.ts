import { HouseRatingEntry } from './types';

export function getTotalScore(item: HouseRatingEntry) {
  const ratings = item.qualityRating + 1 + item.quantityRating + 1;
  const bonus = (item.hasAmbiance ? 1 : 0) + (item.hasFullSizeCandy ? 1 : 0);
  return ratings + bonus;
}
