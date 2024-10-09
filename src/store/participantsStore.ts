import { create } from "zustand";
import { produce } from "immer";
import { ListOrdered } from "lucide-react";

type ParticipantsList = {
  participantList: ParticipantList;
  orderedParticipants: number[];
};
interface ParticipantStore extends ParticipantsList {
  setEnteredParticipants: (participantsLists: ParticipantsList) => void;
  enterParticipant: (participantString: string) => void;
  updateOrder: () => void;
  updateParticipant: (id: string, participantString: string) => void;
  readParticipant: () => void;
  deleteParticipant: (id: string) => void;
  getUnreadParticipants: () => ParticipantList;
  getReadParticipants: () => ParticipantList;
  getCurrentParticipant: () => Participant;
  getParticipantById: (id: string) => Participant;
}

export const useParticipantsStore = create<ParticipantStore>((set, get) => ({
  participantList: [],
  orderedParticipants: [],

  setEnteredParticipants: (participantsLists: ParticipantsList) =>
    set({ ...participantsLists }),

  enterParticipant: (participantString: string) => {
    if (participantString === "") return;
    const participant: Participant = createParticipant(participantString);
    set((state) =>
      produce(state, (draft) => {
        draft.participantList.push(participant);
      })
    );
  },

  deleteParticipant: (id: string) => {
    set((state) => {
      return produce(state, (draft) => {
        const index = draft.participantList.findIndex(
          (participant) => participant.id === id
        );
        draft.participantList.splice(index, 1);
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
    const foundParticipant = get().participantList.find(
      (participant) => participant.id === id
    );
    foundParticipant
      ? foundParticipant
      : createParticipant("participant not found");
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

const createParticipant = (
  participantString: string,
  read = false
): Participant => {
  return {
    name: participantString,
    id: crypto.randomUUID(),
    read,
  };
};
