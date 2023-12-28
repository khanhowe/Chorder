import { NoteMessage, NoteName } from "../types/note";
import { Progression as tonalProgression } from 'tonal';
import { allNotes } from "../utils/allNotes";
import { Progression } from "../types/Progression";
import { Chord } from "../types/Chord";

export default class ProgressionAnalysis {
    identifyProgression(root: NoteName, progression: Chord[]): string[] {
        return tonalProgression.toRomanNumerals(root, progression.map((chord: Chord) => chord.name));
    };
}
