import React from "react";

const TableImplementation = () => {
  return (
    <Table className="">
      <TableHeader>
        <TableRow>
          <TableHead>{tableName}</TableHead>
          <TableHead className="w-24"> </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {participants.map((participant) => (
          <>
            <TableRow key={`${participant.id}-row`}>
              <TableCell key={`${participant.id}-cell`}>
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
                  participant.name
                )}
              </TableCell>
              <TableCell className="flex gap-1">
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
              </TableCell>
            </TableRow>
          </>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableImplementation;
