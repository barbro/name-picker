export const scrambleList = (list: number[]): number[] => {
  return [...list].sort(() => Math.random() - 0.5);
};

export const createParticipant = (
  participantString: string,
  read = false,
): Participant => {
  return {
    name: participantString,
    id: crypto.randomUUID(),
    read,
  };
};
export const ParticipantReadStatus = (
  participants: ParticipantList,
): [ParticipantList, ParticipantList] => {
  const unreadparticipants: ParticipantList = [];
  const readparticipants: ParticipantList = [];

  participants.forEach((participant) => {
    if (participant.read) {
      readparticipants.push(participant);
    } else {
      unreadparticipants.push(participant);
    }
  });

  return [unreadparticipants, readparticipants];
};
