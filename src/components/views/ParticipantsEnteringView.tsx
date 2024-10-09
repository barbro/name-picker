"use client";

import React, { useEffect, useState } from "react";
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
const ParticipantEnteringView = () => {
  const getUnreadparticipant = useParticipantsStore(
    (state) => state.getUnreadParticipants
  );
  unreadPraticipants = useParticipantsStore(
    (state) => state.unreadParticipants
  );
  const getParticipantById = useParticipantsStore(
    (state) => state.getParticipantById
  );
  const [editingParticipantId, setEditingParticipantId] = useState<string>("");
  const enterParticipant = useParticipantsStore(
    (state) => state.enterParticipant
  );
  const updateParticipant = useParticipantsStore(
    (state) => state.updateParticipant
  );
  const deleteParticipant = useParticipantsStore(
    (state) => state.deleteParticipant
  );
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
    const currentName = getParticipantById(id)?.name || "";
    setEditedName(currentName);
    setEditingParticipantId(id);
  };

  console.log(getUnreadparticipant());
  useEffect(() => {
    console.log(getUnreadparticipant());
  }, [getUnreadparticipant()]);
  return (
    <>
      <div className="flex justify-center">
        <Input
          placeholder="הכנס שם"
          value={currentName}
          onChange={(e) => setCurrentName(e.currentTarget.value)}
          onKeyDown={(e) => tryEnteringParticipant(e)}
        />
        <Button
          variant="outline"
          size="icon"
          onClick={() => enterParticipant(currentName)}
        >
          <Edit className="h-3 w-3" />
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>משתתפים שלא נקראו</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {unreadparticipant.map((participant) => (
            <>
              <TableRow key={`${participant.id}-row`}>
                <TableCell key={`${participant.id}-cell`}>
                  {editingParticipantId === participant.id ? (
                    <Input
                      defaultValue={participant.name}
                      autoFocus
                      onChange={(e) => setEditedName(e.currentTarget.value)}
                      value={editedName === "" ? participant.name : editedName}
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
