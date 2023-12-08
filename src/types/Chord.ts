import { NoteMessage } from "./note";

export interface Chord {
    id: string;
    name: string;
    description?: string;
    notes: NoteMessage[];
}