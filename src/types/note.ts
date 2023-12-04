export enum NoteName {
    C = 'C', 
    CSharpDFlat = 'C#/Db',
    D = 'D', 
    DSharpEFlat = 'D#/Eb',
    E = 'E',
    F = 'F', 
    FSharpGFlat = 'F#/Gb',
    G = 'G',
    GSharpAflat = 'G#/Ab', 
    A = 'A', 
    ASharpBFlat = 'A#/Bb', 
    B = 'B',
}

export type NoteWithOctave = `${NoteName}${number}`;

export enum MessageType {
    PressOn = 144,
    PressOff = 128,
}

export interface NoteMessage {
    name: NoteWithOctave;
    type: MessageType;
    velocity: number;
};
