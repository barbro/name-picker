import { StateCreator } from "zustand";
import { StandardMiddlewares } from "../../../store/storeTypes";
import {
  createParticipant,
  scrambleList,
} from "@/features/participants/lib/participantsUtils";

type ParticipantsValues = {
  participants: Participant[];
  orderedParticipants: number[];
  currentParticipant: number;
};

export interface ParticipantStore extends ParticipantsValues {
  enterParticipant: (participantString: string) => void;
  updateOrdering: () => void;
  updateParticipant: (id: string, participantString: string) => void;
  readParticipant: () => void;
  deleteParticipant: (id: string) => void;
  clearParticipants: () => void;
  getParticipantById: (id: string) => Participant | void;
  startReading: () => void;
  getCurrentParticipant: () => Participant | void;
}

export const ParticipantStoreInit: StateCreator<
  ParticipantStore,
  StandardMiddlewares
> = (set, get) => ({
  participants: [],
  orderedParticipants: [],
  currentParticipant: -1,

  getCurrentParticipant: () => {
    return get().participants[get().currentParticipant];
  },

  enterParticipant: (participantName: string) => {
    if (participantName === "") return;
    const newParticipant = createParticipant(participantName);
    set((state) => {
      state.participants = [...state.participants, newParticipant];
    });
    get().updateOrdering();
  },

  clearParticipants: () => {
    set((state) => {
      state.participants = [];
    });
    get().updateOrdering();
  },

  deleteParticipant: (id: string) => {
    set((state) => {
      state.participants = state.participants.filter(
        (participant) => participant.uuid !== id,
      );
    });
    get().updateOrdering();
  },

  updateOrdering: () => {
    set((state) => {
      if (state.participants.length === 0) {
        state.orderedParticipants = [];
        state.currentParticipant = -1;
        return;
      }

      // resetting arrayIds
      state.participants = state.participants.map((participant, index) => ({
        ...participant,
        arrayId: index,
      }));

      const filteredParticipants = state.participants
        .filter((participant) => !participant.read) // only unread participants
        .map((participant) => participant.arrayId) // get the ids
        .filter((id) => id !== state.currentParticipant); // not current participant id

      state.orderedParticipants = scrambleList(filteredParticipants);
    });
  },

  updateParticipant: (id: string, participantName: string) => {
    set((state) => {
      state.participants = state.participants.map((participant) =>
        participant.uuid === id
          ? { ...participant, name: participantName }
          : participant,
      );
    });
  },

  getParticipantById: (id: string) => {
    console.log("deprecated");
  },

  startReading: () => {
    set((state) => {
      state.currentParticipant = state.orderedParticipants[0];
      state.orderedParticipants.splice(0, 1);
    });
  },

  readParticipant: () => {
    set((state) => {
      if (state.currentParticipant === -1) return;

      state.participants[state.currentParticipant].read = true;

      if (state.orderedParticipants.length === 0) {
        state.currentParticipant = -1;
      } else {
        state.currentParticipant = state.orderedParticipants[0];
        state.orderedParticipants.splice(0, 1);
      }
    });
  },
});

const clgState = (state: ParticipantStore) => {
  console.log("currentParticipant: " + state.currentParticipant);
  console.log("orderedParticipants: " + state.orderedParticipants);
  console.log("participants: " + state.participants);
};
