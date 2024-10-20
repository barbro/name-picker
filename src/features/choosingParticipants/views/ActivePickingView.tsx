import { useParticipantsStore } from "@/store/stores";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const ActivePickingView = () => {
  const [appear, setAppear] = useState(false);
  const [loading, setLoading] = useState(false);
  const participants = useParticipantsStore((state) => state.participantList);
  const orderedParticipants = useParticipantsStore(
    (state) => state.orderedParticipants,
  );
  const updateOrder = useParticipantsStore((state) => state.updateOrder);
  const readParticipant = useParticipantsStore(
    (state) => state.readParticipant,
  );
  const { t } = useTranslation();

  useEffect(() => {
    updateOrder();
    setAppear(true);
  });

  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const handleReadParticipant = async () => {
    setLoading(true);
    setAppear(false);
    try {
      await wait(500);
      await readParticipant();
      await setAppear(true);
      await wait(300);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <p className="mt-4 text-center text-2xl text-gray-400">
        {t("choosenParticipant")}
      </p>

      <p
        className={cn([
          "m-12 text-center text-5xl transition-all duration-500 ease-out",
          appear ? "opacity-100" : "opacity-0",
        ])}
      >
        {participants[orderedParticipants[0]].name}
      </p>
      <div className="flex justify-center">
        <Button
          onClick={handleReadParticipant}
          disabled={loading}
          className="mx-auto w-32 transition-all duration-200"
        >
          {t("nextParticipant")}
        </Button>
      </div>
    </>
  );
};

export default ActivePickingView;
