export type NestProviderState = {
  nest: NestContextState
  collections: CollectionContextState
}

type NestContextState = {
  get: () => string[]
  addItem: (itemId: string | number) => void
  removeItem: (itemId: string | number) => void
}

type CollectionContextState = {
  [x: string]: any
  get: () => Collection[]
  getMatchingNames: (id: string | number) => string[] | null
  create: (name: string) => void
  addItem: (itemId: string | number, name: string) => void
  removeItem: (itemId: string | number, name: string) => void
}

export type Collection = {
  name: string
  id: string
  items: string[]
  description?: string
}
