export interface SpeciesCardType {
  stages?:
    | {
        larva: undefined | number | string;
        adult: undefined | number | string;
        pupa: undefined | number | string;
        egg: undefined | number | string;
      }
    | undefined;
  current_stage?: undefined | string;
  nickname?: undefined | string;
  taxon_id?: undefined | number;
  imgSrc?: undefined | string;
  id: string | number;
}
