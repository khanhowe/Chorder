import { NoteName, NoteWithOctave } from "../types/note";

export const allNotes: NoteWithOctave[] = [];

for (let octave = -1; octave <= 9; octave++) {
    for (let note in NoteName) {
        if (isNaN(Number(note))) {
            const noteName = NoteName[note as keyof typeof NoteName];
            allNotes.push(`${noteName}${octave}`);
        }
    }
}