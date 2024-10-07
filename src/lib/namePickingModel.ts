//lib/namePickingModel.ts

export const scrambleNames = (names: Name[]) => {
  return names.sort(() => Math.random() - 0.5);
};

export const readName = (readNames: NameList, scrambledNames: NameList) => {
  const movedName = scrambledNames[0];
  const newReadNames: NameList = [...readNames, movedName];
  const newScrambledNames: NameList = [];
  return [newReadNames, newScrambledNames];
};
