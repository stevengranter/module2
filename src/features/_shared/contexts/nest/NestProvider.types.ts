export type NestContextState = {
  nest: { get: () => number[]; addId: (id: number) => void };
  collections: {
    get: () => Collection[];
    getNames: () => string[];
    getMatching: (id: number) => Collection[] | null;
    getMatchingNames: (id: number) => string[] | null;
    getCollection: (name: string) => Collection;
    addId: (id: number, name: string) => void;
    removeId: (taxonId: number, collectionName: string) => void;
    create: (name: string) => void;
    clear: () => void;
  };
};
export type Collection = {
  name: string;
  id: string | null;
  items: number[];
};
