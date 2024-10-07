import { create } from "zustand";
import { produce } from "immer";
import { ListOrdered } from "lucide-react";

interface ListsStore {
  nameList: NameList;
  orderedNames: number[];
  setEnteredNames: (names: NameList) => void;
  enterName: (nameString: string) => void;
  updateOrder: () => void;
  updateNames: (id: string, nameString: string) => void;
  readName: () => void;
  getUnreadNames: () => NameList;
  getReadNames: () => NameList;
  getCurrentName: () => Name;
}

export const useListsStore = create<ListsStore>((set, get) => ({
  nameList: [],
  orderedNames: [],

  setEnteredNames: (names: NameList) => set({ nameList: names }),

  enterName: (nameString: string) => {
    const name: Name = createName(nameString);
    set((state) =>
      produce(state, (draft) => {
        draft.nameList.push(name);
      })
    );
  },

  updateOrder: () =>
    set((state) =>
      produce(state, (draft) => {
        draft.orderedNames = scrambleList(
          draft.nameList
            .filter((name) => !name.read)
            .map((name) => draft.nameList.indexOf(name))
        );
      })
    ),

  updateNames: (id: string, nameString: string) =>
    set((state) => {
      const index = state.nameList.findIndex((name) => name.id === id);
      return produce(state, (draft) => {
        draft.nameList[index].name = nameString;
      });
    }),

  readName: () => {
    set((state) => {
      return produce(state, (draft) => {
        const [firstElement, ...restOfElements] = draft.orderedNames;
        draft.orderedNames = restOfElements;
        draft.nameList[firstElement as number].read = true;
      });
    });
  },

  getUnreadNames: () => {
    return get().nameList.filter((name) => !name.read);
  },
  getReadNames: () => {
    return get().nameList.filter((name) => name.read);
  },

  getCurrentName: () => {
    return get().nameList[get().orderedNames[0]];
  },
  // templateFunction: () => {
  //   set((state) => {
  //     return produce(state, (draft) => {});
  //   });
  // },
}));

const scrambleList = (list: number[]): number[] => {
  return [...list].sort(() => Math.random() - 0.5);
};

const createName = (nameString: string, read = false): Name => {
  return {
    name: nameString,
    id: crypto.randomUUID(),
    read,
  };
};
