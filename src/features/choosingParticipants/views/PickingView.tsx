import { Button } from "@/components/ui/button";
import { ParticipantReadStatus } from "@/features/participants/lib/participantsUtils";
import { cn } from "@/lib/utils";
import { useParticipantsStore } from "@/store/stores";
import { t } from "i18next";
import { useEffect, useState } from "react";

const enum PickingState {
  STANDBY = "standby",
  READY_TO_READ = "readyToRead",
  READING = "reading",
  COMPLETED = "completed",
  LAST_PARTICIPANT = "lastParticipant",
}

interface StateConfig {
  systemMessage: string;
  buttonText?: string;
  buttonAction?: () => void;
  showParticipantName?: boolean;
}

const PickingView = () => {
  const {
    participants,
    getCurrentParticipant,
    readParticipant,
    currentParticipant,
    startReading,
  } = useParticipantsStore();

  const [unreadParticipants, readParticipants] =
    ParticipantReadStatus(participants);

  const [appear, setAppear] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAppear(true);
  }, []);
  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const handleStoreFunction = async (fn: () => void) => {
    setLoading(true);
    setAppear(false);
    try {
      await wait(500);
      await fn();
      await setAppear(true);
      await wait(300);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentState = (): PickingState => {
    // No participants at all
    if (participants.length === 0) {
      return PickingState.STANDBY;
    }

    if (unreadParticipants.length === 1) {
      return PickingState.LAST_PARTICIPANT;
    }

    // All participants have been read
    if (unreadParticipants.length === 0) {
      return PickingState.COMPLETED;
    }

    // Have participants but haven't started reading
    if (currentParticipant === -1) {
      return PickingState.READY_TO_READ;
    }

    // Currently reading through participants
    return PickingState.READING;
  };

  const stateConfig: Record<PickingState, StateConfig> = {
    [PickingState.STANDBY]: {
      systemMessage: t("noParticipants"),
    },
    [PickingState.READY_TO_READ]: {
      systemMessage: t("readyToPresent"),
      buttonText: t("startPresenting"),
      buttonAction: () => handleStoreFunction(startReading),
    },
    [PickingState.READING]: {
      systemMessage: t("choosenParticipant"),
      buttonText: t("nextParticipant"),
      showParticipantName: true,
      buttonAction: () => handleStoreFunction(readParticipant),
    },
    [PickingState.COMPLETED]: {
      systemMessage: t("allParticipantsRead"),
    },
    [PickingState.LAST_PARTICIPANT]: {
      systemMessage: t("choosenParticipant"),
      buttonText: t("finishReading"),
      showParticipantName: true,
      buttonAction: () => handleStoreFunction(readParticipant),
    },
  };

  const config = stateConfig[getCurrentState()];

  return (
    <div className="space-y-4 p-4">
      <p className="mt-4 text-center text-2xl text-gray-400">
        {config.systemMessage}
      </p>

      {config.showParticipantName && (
        <p
          className={cn([
            "m-12 text-center text-5xl transition-all duration-500 ease-out",
            appear ? "opacity-100" : "opacity-0",
          ])}
        >
          {getCurrentParticipant()?.name}
        </p>
      )}

      {config.buttonText && config.buttonAction && (
        <div className="flex justify-center">
          <Button
            onClick={config.buttonAction}
            disabled={loading}
            className="mx-auto transition-all duration-200"
          >
            {config.buttonText}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PickingView;
