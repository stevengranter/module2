import { DefaultPhoto } from './iNatTaxaResponseType';
import { speciesCardType } from './speciesCardType';

export interface enrichedCardType extends speciesCardType {
  preferred_common_name?: string;
  default_photo?: DefaultPhoto;
  wikipedia_summary?: string;
  wikipedia_url?: string;
  name?: string;
}
