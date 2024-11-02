import React, { useState } from "react";
import { useParticipantsStore } from "@/store/stores";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";

const ParticipantInput = () => {
  const { t } = useTranslation();
  const [currentName, setCurrentName] = useState("");

  const enterParticipant = useParticipantsStore((state) =>
    state.enterParticipant
  );
  const participants = useParticipantsStore((state) => state.participants);

  const handleEnterParticipant = () => {
    const trimmedName = currentName.trim();

    if (!trimmedName) {
      toast.error(t("emptyName"));
      return;
    }

    if (participants.some((participant) => participant.name === trimmedName)) {
      toast.error(t("duplicateName"));
      return;
    }

    enterParticipant(trimmedName);
    setCurrentName("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleEnterParticipant();
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 w-full max-w-md mx-auto p-4">
      <Input
        type="text"
        id="participant-name"
        name="participant-name"
        value={currentName}
        onChange={(e) => setCurrentName(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={t("placeholderName")}
        className="flex-1"
        aria-label={t("nameInputLabel")}
      />
      <Button
        onClick={handleEnterParticipant}
        aria-label={t("enterNameButton")}
        type="button"
        className="flex items-center gap-2"
      >
        <PlusCircle className="w-4 h-4" />
        <span className="sr-only">{t("enterNameButton")}</span>
      </Button>
    </div>
  );
};

export default ParticipantInput;
