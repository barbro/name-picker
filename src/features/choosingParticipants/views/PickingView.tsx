import React from "react";
import ActivePickingView from "./ActivePickingView";
import NoParticipantsPickingView from "./NoParticipantsPickingView";
import PickingDoneView from "./PickingDoneView";
import { ParticipantReadStatus } from "@/features/participants/lib/participantsUtils";
import { useParticipantsStore } from "@/store/stores";

const PickingView = () => {
  const participants = useParticipantsStore((state) => state.participants);
  const unreadParticipants = ParticipantReadStatus(participants)[0];

  return (
    <>
      {unreadParticipants.length > 0 ? (
        <ActivePickingView />
      ) : participants.length > 0 ? (
        <PickingDoneView />
      ) : (
        <NoParticipantsPickingView />
      )}
    </>
  );
};

export default PickingView;
