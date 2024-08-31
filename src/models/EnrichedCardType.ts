import { DefaultPhoto } from "./iNatTaxaResponseType";
import { WilderKindCardType } from "./WilderKindCardType.ts";

export interface EnrichedCardType extends WilderKindCardType {
  preferred_common_name?: string;
  default_photo?: DefaultPhoto;
  wikipedia_summary?: string;
  wikipedia_url?: string;
  name?: string;
}
