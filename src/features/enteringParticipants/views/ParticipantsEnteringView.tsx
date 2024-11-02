"use client";

import { useParticipantsStore } from "@/store/stores";
import { ParticipantReadStatus } from "@/features/participants/lib/participantsUtils";
import ParticipantsTable from "../components/ParticipantsTable";
import ParticipantInput from "../components/ParticipantInput";
import { useTranslation } from "react-i18next";
import EnteringOptions from "../components/EnteringOptions";
import { Separator } from "@/components/ui/separator";
const ParticipantEnteringView = () => {
  const participants = useParticipantsStore((state) => state.participants);
  const [unreadParticipants, readParticipants] = ParticipantReadStatus(
    participants,
  );
  const { t } = useTranslation();
  return (
    <>
      <div className="w-full md:w-[50%]">
        <ParticipantInput />
      </div>
      <div className="grid grid-cols-1 w-full gap-2 md:grid-cols-2 mt-4">
        <div className="flex order-first md:order-last gap-2">
          <Separator
            orientation="vertical"
            className="hidden md:block my-3"
          />
          <EnteringOptions />
        </div>
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
