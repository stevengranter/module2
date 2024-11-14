export type NestProviderState = {
  nest: NestContextState;
  collections: CollectionContextState;
};

type NestContextState = {
  get: () => string | number[];
  addItem: (id: string | number) => void;
  removeItem: (id: string | number) => void;
};

type CollectionContextState = {
  get: () => Collection[];
  getMatchingNames: (id: string | number) => string[] | null;
  create: (name: string) => void;
  addItem: (id: string | number, name: string) => void;
  removeItem: (id: string | number, name: string) => void;
};

export type Collection = {
  name: string;
  id: string;
  items: string[] | number[];
};
