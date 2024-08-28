import { DefaultPhoto } from "./iNatTaxaResponseType";
import { SpeciesCardType } from "./SpeciesCardType";

export interface EnrichedCardType extends SpeciesCardType {
  preferred_common_name?: string;
  default_photo?: DefaultPhoto;
  wikipedia_summary?: string;
  wikipedia_url?: string;
  name?: string;
}
