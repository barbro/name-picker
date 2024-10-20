import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import {
  ParticipantStore,
  ParticipantStoreInit,
} from "@/features/participants/store/participantStore";
import { StandardMiddlewares } from "./storeTypes";

const standardMiddlewares = (
  f: StateCreator<ParticipantStore, StandardMiddlewares>,
) => devtools(persist(immer(f), { name: "participants" }));

export const useParticipantsStore = create<ParticipantStore>()(
  standardMiddlewares(ParticipantStoreInit),
);
