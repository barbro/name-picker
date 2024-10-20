import { useParticipantsStore } from "@/store/stores";
import React, { useState } from "react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useTranslation } from "react-i18next";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";

const ParticipantInput = () => {
  const { t } = useTranslation();
  const enterParticipant = useParticipantsStore(
    (state) => state.enterParticipant,
  );
  const participants = useParticipantsStore((state) => state.participants);

  const [currentName, setCurrentName] = useState<string>("");

  const returnKeyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // console.log(e.key);
    if (e.key === "Enter") {
      enterParticipantHandler();
    }
  };

  const enterParticipantHandler = () => {
    if (currentName === "") return;
    if (
      participants.filter((participant) => participant.name === currentName)
        .length > 0
    )
      return toast(t("duplicateName"));

    enterParticipant(currentName);
    setCurrentName("");
  };

  return (
    <div className="flex justify-center gap-2">
      <Input
        placeholder={t("placeholderName")}
        value={currentName}
        onChange={(e) => setCurrentName(e.currentTarget.value)}
        onKeyDown={(e) => returnKeyHandler(e)}
      />
      <Button onClick={enterParticipantHandler}>
        <PlusCircle />
        {/* aria-label={t("enterNameButton")} */}
      </Button>
    </div>
  );
};

export default ParticipantInput;
