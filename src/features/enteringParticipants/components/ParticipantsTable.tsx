import React, { useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParticipantsStore } from "@/store/stores";
import { Separator } from "@/components/ui/separator";

type participantsTableProps = {
  participants: Participant[];
  tableName: string;
};

const ParticipantsTable = ({
  participants,
  tableName,
}: participantsTableProps) => {
  const deleteParticipant = useParticipantsStore(
    (state) => state.deleteParticipant,
  );
  const [editedName, setEditedName] = useState<string>("");
  const [editingParticipantId, setEditingParticipantId] = useState<string>("");
  const updateParticipant = useParticipantsStore(
    (state) => state.updateParticipant,
  );
  const getParticipantById = useParticipantsStore(
    (state) => state.getParticipantById,
  );

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
      <p className="mx-4 text-muted-foreground">{tableName}</p>
      <div className="flex flex-col gap-2 rounded-md p-2 shadow">
        {participants.map((participant, index) => (
          <span className="flex flex-col gap-2">
            <div key={participant.id} className="flex items-center gap-2">
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
                <span className="min-w-32 px-3">{participant.name}</span>
              )}
            </div>
            {participants.length - 1 !== index && <Separator />}
          </span>
        ))}
      </div>
    </>
  );
};

export default ParticipantsTable;
