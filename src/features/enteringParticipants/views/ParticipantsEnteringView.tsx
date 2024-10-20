"use client";

import { useParticipantsStore } from "@/store/stores";
import { ParticipantReadStatus } from "@/features/participants/lib/participantsUtils";
import ParticipantsTable from "../components/ParticipantsTable";
import ParticipantInput from "../components/ParticipantInput";
import { useTranslation } from "react-i18next";
import EnteringOptions from "../components/EnteringOptions";
const ParticipantEnteringView = () => {
  const participants = useParticipantsStore((state) => state.participantList);
  const [unreadParticipants, readParticipants] =
    ParticipantReadStatus(participants);
  const { t } = useTranslation();
  return (
    <>
      <ParticipantInput />
      <div className="flex w-full flex-col gap-2 md:flex-row-reverse md:justify-end">
        <EnteringOptions />
        <div className="flex flex-col gap-2">
          {unreadParticipants.length > 0 && (
            <ParticipantsTable
              participants={unreadParticipants}
              tableName={t("unreadTableName")}
            />
          )}
          {readParticipants.length > 0 && (
            <ParticipantsTable
              participants={readParticipants}
              tableName={t("readTableName")}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ParticipantEnteringView;
