"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useParticipantsStore } from "@/store/participantsStore";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Edit, Pencil, Trash2 } from "lucide-react";
import { ParticipantReadStatus } from "@/lib/participantsUtils";
const ParticipantEnteringView = () => {
  const participants = useParticipantsStore((state) => state.participantList);
  const [unreadParticipants, readParticipants] =
    ParticipantReadStatus(participants);
  const getParticipantById = useParticipantsStore(
    (state) => state.getParticipantById
  );
  const enterParticipant = useParticipantsStore(
    (state) => state.enterParticipant
  );
  const updateParticipant = useParticipantsStore(
    (state) => state.updateParticipant
  );
  const deleteParticipant = useParticipantsStore(
    (state) => state.deleteParticipant
  );
  const [editingParticipantId, setEditingParticipantId] = useState<string>("");
  const [currentName, setCurrentName] = React.useState<string>("");
  const [editedName, setEditedName] = React.useState<string>("");

  const tryEnteringParticipant = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      enterParticipant(currentName);
      setCurrentName("");
    }
  };

  const nameEditApply = () => {
    if (editedName === "") return;
    updateParticipant(editingParticipantId, editedName);
    setEditingParticipantId("");
    setEditedName("");
  };

  const nameEditonKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      nameEditApply();
    }
  };

  const setEditingParticipant = (id: string) => {
    const currentName = getParticipantById(id).name;
    setEditedName(currentName);
    setEditingParticipantId(id);
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>משתתפים שלא נקראו</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {unreadParticipants.map((participant) => (
            <>
              <TableRow key={`${participant.id}-row`}>
                <TableCell key={`${participant.id}-cell`}>
                  {editingParticipantId === participant.id ? (
                    <Input
                      defaultValue={participant.name}
                      autoFocus
                      onChange={(e) => setEditedName(e.currentTarget.value)}
                      value={editedName}
                      onBlur={nameEditApply}
                      onKeyDown={nameEditonKeyDown}
                    />
                  ) : (
                    participant.name
                  )}
                </TableCell>
                <TableCell className="flex gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => deleteParticipant(participant.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setEditingParticipant(participant.id);
                    }}
                  >
                    <Pencil className="h-3 w-3" />
                  </Button>
                </TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ParticipantEnteringView;
