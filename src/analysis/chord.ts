import { NoteMessage } from "../types/note";
import { Chord } from 'tonal';
import { allNotes } from "../utils/allNotes";

export default class NoteAnalysis {
    identifyChord(notes: NoteMessage[]): string {
        const [chord] = Chord.detect(
            notes.map(
                (note) => allNotes[note.midiNote].slice(0, -1)
            )
        );
        return chord;
    };
}
