import { StateCreator } from "zustand";
import { StandardMiddlewares } from "../../../store/storeTypes";
import {
  createParticipant,
  scrambleList,
} from "@/features/participants/lib/participantsUtils";

type ParticipantsList = {
  participants: ParticipantList;
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
  participants: [],
  orderedParticipants: [],

  enterParticipant: (participantName: string) => {
    set((state) => {
      if (participantName === "") return;
      const participant = createParticipant(participantName);

      state.participants[state.participants.length] = participant;
    });
    get().updateOrder();
  },

  clearParticipants: () => {
    set((state) => {
      state.participants = [];
      state.orderedParticipants = [];
    });
  },
  deleteParticipant: (id: string) => {
    set((state) => {
      const participantIndex = state.participants.findIndex(
        (participant: Participant) => participant.id === id,
      );

      const orderedIndex = state.orderedParticipants.findIndex(
        (participant) => participant === participantIndex,
      );

      state.participants.splice(participantIndex, 1);
      state.orderedParticipants.splice(orderedIndex, 1);
    });
    get().updateOrder();
  },

  updateOrder: () =>
    set((state) => {
      state.orderedParticipants = scrambleList(
        state.participants
          .filter((participant) => !participant.read)
          .map((participant) => state.participants.indexOf(participant)),
      );
    }),

  updateParticipant: (id: string, participantName: string) =>
    set((state) => {
      const index = state.participants.findIndex(
        (participant) => participant.id === id,
      );
      state.participants[index].name = participantName;
    }),

  getParticipantById: (id: string) => {
    const foundParticipant = get().participants.find(
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
      state.participants[firstElement as number].read = true;
    });
  },
  getOrderdParticipant: (orderedIndex = 0) => {
    return get().participants[get().orderedParticipants[orderedIndex || 0]];
  },
});
