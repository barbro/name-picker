import { StateCreator } from "zustand";
import { StandardMiddlewares } from "../../../store/storeTypes";
import {
  createParticipant,
  scrambleList,
} from "@/features/participants/lib/participantsUtils";

export const ParticipantStoreInit: StateCreator<
  ParticipantStore,
  StandardMiddlewares
> = (set, get) => ({
  participantList: [],
  orderedParticipants: [],

  enterParticipant: (participantName: string) => {
    set((state) => {
      if (participantName === "") return;
      const participant = createParticipant(participantName);
      state.participantList.push(participant);
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
        (participant: Participant) => participant.id === id,
      );
      if (participantIndex !== -1) {
        state.participantList.splice(participantIndex, 1);
        state.orderedParticipants = state.orderedParticipants
          .filter((index) => index !== participantIndex)
          .map((index) => (index > participantIndex ? index - 1 : index));
      }
    });
  },

  updateOrder: () =>
    set((state) => {
      const unreadParticipants = state.participantList
        .filter((participant) => !participant.read)
        .map((_, index) => index);

      if (unreadParticipants.length === 0) {
        // If all participants have been read, reset all to unread
        state.participantList.forEach(
          (participant) => (participant.read = false),
        );
        state.orderedParticipants = scrambleList([
          ...Array(state.participantList.length).keys(),
        ]);
      } else if (state.orderedParticipants.length === 0) {
        // Only scramble if we're starting fresh
        state.orderedParticipants = scrambleList(unreadParticipants);
      }
      // If we're in the middle of reading (some read, some unread), keep the current order
    }),

  updateParticipant: (id: string, participantName: string) =>
    set((state) => {
      const index = state.participantList.findIndex(
        (participant) => participant.id === id,
      );
      if (index !== -1) {
        state.participantList[index].name = participantName;
      }
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
      if (state.orderedParticipants.length > 0) {
        const [firstElement, ...restOfElements] = state.orderedParticipants;
        state.orderedParticipants = restOfElements;
        state.participantList[firstElement].read = true;
      }
    });
  },

  getOrderedParticipant: (orderedIndex = 0) => {
    const state = get();
    if (state.orderedParticipants.length > orderedIndex) {
      return state.participantList[state.orderedParticipants[orderedIndex]];
    }
    return createParticipant("No more participants");
  },

  isReadingInProgress: () => {
    const state = get();
    return (
      state.participantList.some((participant) => participant.read) &&
      state.participantList.some((participant) => !participant.read)
    );
  },
});
