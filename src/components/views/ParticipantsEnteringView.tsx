"use client";

import { useParticipantsStore } from "@/store/stores";
import { ParticipantReadStatus } from "@/lib/participantsUtils";
import ParticipantsTable from "../ParticipantsTable";
import ParticipantInput from "../ParticipantInput";
import { useTranslation } from "react-i18next";
import EnteringOptions from "../EnteringOptions";
const ParticipantEnteringView = () => {
  const participants = useParticipantsStore((state) => state.participantList);
  const [unreadParticipants, readParticipants] =
    ParticipantReadStatus(participants);
  const { t } = useTranslation();
  return (
    <>
      <ParticipantInput />
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
    </>
  );
};

export default ParticipantEnteringView;
