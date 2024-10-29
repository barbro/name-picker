export const scrambleList = (list: number[]): number[] => {
  return [...list].sort(() => Math.random() - 0.5);
};

export const createParticipant = (
  participantString: string,
  read = false,
): Participant => {
  return {
    name: participantString,
    arrayId: -1,
    uuid: crypto.randomUUID(),
    read,
  };
};
export const ParticipantReadStatus = (
  participants: Participant[],
): [Participant[], Participant[]] => {
  const unreadparticipants: Participant[] = [];
  const readparticipants: Participant[] = [];

  if (participants === undefined) return [[], []];
  participants.forEach((participant) => {
    if (participant.read) {
      readparticipants.push(participant);
    } else {
      unreadparticipants.push(participant);
    }
  });

  return [unreadparticipants, readparticipants];
};
