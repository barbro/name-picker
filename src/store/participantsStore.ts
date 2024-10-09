import { create } from "zustand";
import { produce } from "immer";
import { ListOrdered } from "lucide-react";

type ParticipantsLists = {
  participantList: ParticipantList;
  orderedParticipants: number[];
  unreadParticipants: number[];
};
interface ParticipantStore extends ParticipantsLists {
  setEnteredParticipants: (participantLists: ParticipantsLists) => void;
  enterParticipant: (participantString: string) => void;
  updateOrder: () => void;
  updateParticipant: (id: string, participantString: string) => void;
  readParticipant: () => void;
  deleteParticipant: (id: string) => void;
  getReadParticipants: () => ParticipantList;
  getCurrentParticipant: () => Participant;
  getParticipantById: (id: string) => Participant | undefined;
}

export const useParticipantsStore = create<ParticipantStore>((set, get) => ({
  participantList: [],
  orderedParticipants: [],
  unreadParticipants: [],

  setEnteredParticipants: (participantLists: ParticipantsLists) =>
    set(() => ({ ...participantLists })),

  enterParticipant: (participantString: string) => {
    if (participantString === "") return;
    const participant: Participant = createParticipant(participantString);
    const newParticipantId = get().participantList.length;
    set((state) =>
      produce(state, (draft) => {
        draft.unreadParticipants.push(newParticipantId);
        draft.participantList.push(participant);
      })
    );
  },

  deleteParticipant: (id: string) => {
    const idDeletion = get().participantList.findIndex(
      (participant) => participant.id === id
    );
    const unreadIdDeletion = get().unreadParticipants.findIndex(
      (participant) => participant === idDeletion
    );

    if (idDeletion === -1) return;

    set((state) => {
      return produce(state, (draft) => {
        draft.participantList.splice(idDeletion, 1);
        unreadIdDeletion >= 0 &&
          draft.unreadParticipants.splice(unreadIdDeletion, 1);
      });
    });
  },

  updateOrder: () =>
    set((state) =>
      produce(state, (draft) => {
        draft.orderedParticipants = scrambleList(
          draft.participantList
            .filter((participant) => !participant.read)
            .map((participant) => draft.participantList.indexOf(participant))
        );
      })
    ),

  updateParticipant: (id: string, participantName: string) =>
    set((state) => {
      const index = state.participantList.findIndex(
        (participant) => participant.id === id
      );
      return produce(state, (draft) => {
        draft.participantList[index].name = participantName;
      });
    }),

  getParticipantById: (id: string) => {
    return get().participantList.find((participant) => participant.id === id);
  },
  readParticipant: () => {
    set((state) => {
      return produce(state, (draft) => {
        const [firstElement, ...restOfElements] = draft.orderedParticipants;
        draft.orderedParticipants = restOfElements;
        draft.participantList[firstElement as number].read = true;
      });
    });
  },

  getUnreadParticipants: () => {
    return [...get().participantList].filter(
      (participant) => !participant.read
    );
  },
  getReadParticipants: () => {
    return [...get().participantList].filter((participant) => participant.read);
  },

  getCurrentParticipant: () => {
    return get().participantList[get().orderedParticipants[0]];
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

const createParticipant = (participantName: string): Participant => {
  return {
    name: participantName,
    id: crypto.randomUUID(),
  };
};
