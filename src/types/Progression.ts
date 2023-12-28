import { Chord } from "./Chord";

export interface Progression {
    name: string,
    chords: Chord[],
    root: string,
    analysis: string[]
}