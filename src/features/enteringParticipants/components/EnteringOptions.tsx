import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useParticipantsStore } from "@/store/stores";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import i18next from "i18next";
import { cn } from "@/lib/utils";

const EnteringOptions = ({ className }: { className?: string }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const clearParticipants = useParticipantsStore(
    (state) => state.clearParticipants,
  );
  const resetReadParticipants = useParticipantsStore(
    (state) => state.resetReadParticipants,
  );
  const participants = useParticipantsStore((state) => state.participants);

  const handleClearParticipants = () => {
    clearParticipants();
  };

  const handleAlertDialog = () => {
    participants.length > 0
      ? setOpen(true)
      : toast(t("noParticipantsToDelete"));
  };
  return (
    <div className={cn("my-3 flex gap-2 flex-col", className)}>
      <Button variant={"outline"} onClick={handleAlertDialog}>
        {t("clearNames")}
      </Button>
      <Button variant={"outline"} onClick={resetReadParticipants}>
        {t("resetRead")}
      </Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent dir={i18next.dir()}>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("clearNamesDialog")}</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription />

          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={handleClearParticipants}>
              {t("delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EnteringOptions;
