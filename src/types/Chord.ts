import { NoteMessage } from "./note";

export interface Chord {
    id: string;
    name: string;
    notes: NoteMessage[];
}