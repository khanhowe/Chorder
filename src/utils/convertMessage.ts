import { NoteMessage } from "../types/note";
import { allNotes } from "./allNotes";

export const createNoteMessage = (noteMessage: string[]): NoteMessage | null => {
    const messageArray = noteMessage[0].split(',').map(num => parseInt(num.trim(), 10));
    const name = allNotes[messageArray[1]];
    const type = messageArray[0]
    const velocity = messageArray[2];

    return { name, type, velocity };
}
