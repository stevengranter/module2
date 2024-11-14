import {
  Context,
  createContext,
  ReducerAction,
  ReducerState,
  useContext,
  useReducer,
} from "react";

import {
  NestProviderState,
  Collection,
} from "~/features/_shared/contexts/nest/NestProvider.types.ts";
import Nest from "~/features/dashboard/components/Nest.tsx";

const UserDataContext = createContext<Context<NestProviderState> | null>(null);

const initialData: NestProviderState = {
  nest: { name: "nest", id: crypto.randomUUID(), items: [] },
  collections: [],
};

type NestAction = {
  type: "ADD_ITEM" | "REMOVE_ITEM";
  payload: NestPayload;
};

type NestPayload = {
  item: number;
};

type CollectionsAction = {
  type:
    | "CREATE_COLLECTION"
    | "REMOVE_COLLECTION"
    | "ADD_ITEM_COLLECTION"
    | "REMOVE_ITEM_COLLECTION";
  payload: CollectionsPayload;
};

type CollectionsPayload = {
  name?: string;
  item?: number;
};

type ActionType = NestAction | CollectionsAction;

function reducer(state = initialData, action: ActionType) {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        nest: {
          ...state.nest,
          items: [...state.nest.items, action.payload.item],
        },
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        nest: {
          items: state.nest.items.filter(
            (item) => item !== action.payload.item,
          ),
        },
      };

    case "CREATE_COLLECTION": {
      const existingCollection = state.collections.find(
        (collection) => collection.name === action.payload.name,
      );
      if (existingCollection) {
        return state;
      }
      return {
        ...state,
        collections: [
          ...state.collections,
          {
            name: action.payload.name,
          },
        ],
      };
    }
    case "REMOVE_COLLECTION": {
      const collectionToRemove = state.collections.find(
        (collection) => collection.name === action.payload.name,
      );
      if (!collectionToRemove) {
        return state;
      }
      const updatedCollections = state.collections.filter(
        (collection) => collection.name !== action.payload.name,
      );
      return {
        ...state,
        collections: updatedCollections,
      };
    }

    case "ADD_ITEM_COLLECTION":
      return {
        ...state,
        collections: state.collections.map((collection) => {
          if (collection.name === action.payload.name) {
            return {
              ...collection,
              items: [...collection.items, action.payload.item],
            };
          }
          return collection;
        }),
      };

    case "REMOVE_ITEM_COLLECTION":
      return {
        ...state,
        collections: state.collections.map((collection) => {
          if (
            collection.name === action.payload.name &&
            action.payload.item &&
            collection.items.includes(action.payload.item)
          ) {
            return {
              ...collection,
              items: collection.items.filter(
                (item) => item !== action.payload.item,
              ),
            };
          }
          return collection;
        }),
      };
    default:
      return state;
  }
}
export default function UserDataProvider() {
  const [state, dispatch] = useReducer(reducer, initialData);
}
