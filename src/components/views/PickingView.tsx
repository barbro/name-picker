import React from "react";
import ActivePickingView from "./ActivePickingView";
import NoParticipantsPickingView from "./NoParticipantsPickingView";
import PickingDoneView from "./PickingDoneView";
import { ParticipantReadStatus } from "@/lib/participantsUtils";
import { useParticipantsStore } from "@/store/participantsStore";

const PickingView = () => {
  const participants = useParticipantsStore((state) => state.participantList);
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
