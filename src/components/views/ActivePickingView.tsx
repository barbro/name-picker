import { ParticipantReadStatus } from "@/lib/participantsUtils";
import { useParticipantsStore } from "@/store/participantsStore";

const ActivePickingView = () => {
  const updateOrder = useParticipantsStore((state) => state.updateOrder);
  const participants = useParticipantsStore((state) => state.participantList);
  const [unreadParticipants, readParticipants] =
    ParticipantReadStatus(participants);
  const orderedList = useParticipantsStore(
    (state) => state.orderedParticipants
  );
  updateOrder();
  console.log("orderedList:", orderedList, "participants:", participants);

  return (
    // <p className="text-center text-xl"> {participants[orderedList[0]].name} </p>
    <>temp</>
  );
};

export default ActivePickingView;
