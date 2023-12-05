import { NoteMessage } from "../types/note";
import { allNotes } from "./allNotes";

export const createNoteMessage = (noteMessage: string[]): NoteMessage | null => {
    if (noteMessage.length === 0 || typeof noteMessage[0] !== 'string') {
        console.error('Invalid noteMessage array: expected a non-empty array with a string as the first element.');
        return null;
    }

    const messageArray = noteMessage[0].split(',').map(num => parseInt(num.trim(), 10));
    console.log(messageArray);

    if (messageArray.length !== 3 || isNaN(messageArray[0]) || isNaN(messageArray[1]) || isNaN(messageArray[2])) {
        console.error('Invalid noteMessage format: expected a string like "128, 98, 89".');
        return null;
    }

    const type = messageArray[0];
    const noteIndex = messageArray[1];
    const velocity = messageArray[2];

    if (noteIndex < 0 || noteIndex >= allNotes.length) {
        console.error(`Invalid note index: ${noteIndex}. Must be between 0 and ${allNotes.length - 1}.`);
        return null;
    }

    if (velocity < 0 || velocity > 127) {
        console.error('Invalid velocity: expected a number between 0 and 127.');
        return null;
    }

    return { midiNote: noteIndex, type, velocity };
}