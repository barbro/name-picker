import { StateCreator } from "zustand";
import { StandardMiddlewares } from "../../../store/storeTypes";
import {
  createParticipant,
  scrambleList,
} from "@/features/participants/lib/participantsUtils";

type ParticipantsList = {
  participantList: ParticipantList;
  orderedParticipants: number[];
};
export interface ParticipantStore extends ParticipantsList {
  enterParticipant: (participantString: string) => void;
  updateOrder: () => void;
  updateParticipant: (id: string, participantString: string) => void;
  readParticipant: () => void;
  deleteParticipant: (id: string) => void;
  clearParticipants: () => void;
  getOrderdParticipant: () => Participant;
  getParticipantById: (id: string) => Participant;
}
export const ParticipantStoreInit: StateCreator<
  ParticipantStore,
  StandardMiddlewares
> = (set, get) => ({
  participantList: [],
  orderedParticipants: [],

  enterParticipant: (participantName: string) => {
    set((state) => {
      if (participantName === "") return;
      const participant: Participant = createParticipant(participantName);

      state.participantList[state.participantList.length] = participant;
    });
    get().updateOrder();
  },

  clearParticipants: () => {
    set((state) => {
      state.participantList = [];
      state.orderedParticipants = [];
    });
  },
  deleteParticipant: (id: string) => {
    set((state) => {
      const participantIndex = state.participantList.findIndex(
        (participant) => participant.id === id,
      );

      const orderedIndex = state.orderedParticipants.findIndex(
        (participant) => participant === participantIndex,
      );

      state.participantList.splice(participantIndex, 1);
      state.orderedParticipants.splice(orderedIndex, 1);
    });
  },

  updateOrder: () =>
    set((state) => {
      state.orderedParticipants = scrambleList(
        state.participantList
          .filter((participant) => !participant.read)
          .map((participant) => state.participantList.indexOf(participant)),
      );
    }),

  updateParticipant: (id: string, participantName: string) =>
    set((state) => {
      const index = state.participantList.findIndex(
        (participant) => participant.id === id,
      );
      state.participantList[index].name = participantName;
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
      const [firstElement, ...restOfElements] = state.orderedParticipants;
      state.orderedParticipants = restOfElements;
      state.participantList[firstElement as number].read = true;
    });
  },
  getOrderdParticipant: (orderedIndex = 0) => {
    return get().participantList[get().orderedParticipants[orderedIndex]];
  },

  // templateFunction: () => {
  //   set((state) => {
  //     return produce(state, (draft) => {});
  //   });
  // },
});
