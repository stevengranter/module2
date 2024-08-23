import { speciesCardType } from './speciesCardType';

export interface enrichedCardType extends speciesCardType {
  default_photo: { medium_url: string; url: string };
  preferred_common_name: string;
  wikipedia_summary: string;
  wikipedia_url: string;
  name: string;
}
