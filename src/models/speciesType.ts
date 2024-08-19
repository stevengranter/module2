export interface speciesType {
  id: string | number;
  imgSrc: string;
  commonName: string;
  scientificName: string;
  nickName?: string | undefined;
  family?: string | undefined;
  diet?: string | undefined;
  habitat?: string | undefined;
  description: string;
}
