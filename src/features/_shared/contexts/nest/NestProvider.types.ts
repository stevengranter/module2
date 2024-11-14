export type NestContextState = {
  nest: number[];
  collections: Collection[];
};

export type Collection = {
  name: string;
  id: string;
  items: number[];
};
