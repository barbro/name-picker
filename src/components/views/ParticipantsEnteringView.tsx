"use client";

import React, { useState } from "react";
import { useParticipantsStore } from "@/store/storesMiddlewares";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Edit, Pencil, Trash2 } from "lucide-react";
import { ParticipantReadStatus } from "@/lib/participantsUtils";
import ParticipantsTable from "../ParticipantsTable";
const ParticipantEnteringView = () => {
  const participants = useParticipantsStore((state) => state.participantList);
  const [unreadParticipants, readParticipants] =
    ParticipantReadStatus(participants);

  const getParticipantById = useParticipantsStore(
    (state) => state.getParticipantById,
  );
  const enterParticipant = useParticipantsStore(
    (state) => state.enterParticipant,
  );

  const [currentName, setCurrentName] = React.useState<string>("");

  const tryEnteringParticipant = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      enterParticipant(currentName);
      setCurrentName("");
    }
  };

  return (
    <>
      <div className="flex justify-center gap-2">
        <Input
          placeholder="הכנס שם"
          value={currentName}
          onChange={(e) => setCurrentName(e.currentTarget.value)}
          onKeyDown={(e) => tryEnteringParticipant(e)}
        />
        <Button
          size="icon"
          className="px-12"
          onClick={() => enterParticipant(currentName)}
        >
          הוסף
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {unreadParticipants.length > 0 && (
          <ParticipantsTable
            participants={unreadParticipants}
            tableName={"לא נקראו"}
          />
        )}
        {readParticipants.length > 0 && (
          <ParticipantsTable
            participants={readParticipants}
            tableName={"נקראו"}
          />
        )}
      </div>
    </>
  );
};

export default ParticipantEnteringView;
