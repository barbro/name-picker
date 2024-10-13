import { create, StateCreator } from "zustand";
import { produce } from "immer";
import { createParticipant, scrambleList } from "@/lib/participantsUtils";
import { devtools, persist, PersistOptions } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type ParticipantsList = {
  participantList: ParticipantList;
  orderedParticipants: number[];
};
interface ParticipantStore extends ParticipantsList {
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

const participantsMiddlewares = (f: StateCreator<ParticipantStore>) =>
  devtools(persist(immer(f), { name: "participants" }));

export const useParticipantsStore = create<ParticipantStore>()(
  participantsMiddlewares((set, get) => ({
    participantList: [],
    orderedParticipants: [],

    enterParticipant: (participantString: string) => {
      if (participantString === "") return;
      const participant: Participant = createParticipant(participantString);

      set((state) => state.participantList.push(participant));
    },

    deleteParticipant: (id: string) => {
      set((state) => {
        return produce(state, (draft) => {
          const index = draft.participantList.findIndex(
            (participant) => participant.id === id,
          );

          const orderedIndex = draft.orderedParticipants.findIndex(
            (participant) => participant === index,
          );

          draft.participantList.splice(index, 1);
          draft.orderedParticipants.splice(orderedIndex, 1);
        });
      });
    },

    updateOrder: () =>
      set((state) =>
        produce(state, (draft) => {
          draft.orderedParticipants = scrambleList(
            draft.participantList
              .filter((participant) => !participant.read)
              .map((participant) => draft.participantList.indexOf(participant)),
          );
        }),
      ),

    updateParticipant: (id: string, participantName: string) =>
      set((state) => {
        const index = state.participantList.findIndex(
          (participant) => participant.id === id,
        );
        return produce(state, (draft) => {
          draft.participantList[index].name = participantName;
        });
      }),

    getParticipantById: (id: string) => {
      const foundParticipant = get().participantList.find(
        (participant) => participant.id === id,
      );
      return foundParticipant
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
        (participant) => !participant.read,
      );
    },
    getReadParticipants: () => {
      return [...get().participantList].filter(
        (participant) => participant.read,
      );
    },

    getCurrentParticipant: () => {
      return get().participantList[get().orderedParticipants[0]];
    },

    // templateFunction: () => {
    //   set((state) => {
    //     return produce(state, (draft) => {});
    //   });
    // },
  })),
);
