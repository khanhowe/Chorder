export enum NoteName {
    C = 'C', 
    CSharpDFlat = 'C#',
    D = 'D', 
    DSharpEFlat = 'D#',
    E = 'E',
    F = 'F', 
    FSharpGFlat = 'F#',
    G = 'G',
    GSharpAflat = 'G#', 
    A = 'A', 
    ASharpBFlat = 'A#', 
    B = 'B',
}

export type NoteWithOctave = `${NoteName}${number}`;

export enum MessageType {
    PressOn = 144,
    PressOff = 128,
}

export interface NoteMessage {
    // name: NoteWithOctave;
    midiNote: number;
    type: MessageType;
    velocity: number;
};
