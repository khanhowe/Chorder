import { MidiNotes } from '../../src/midi/midi-notes.enum';
import { MessageType, NoteMessage } from '../../src/types/note';

export const mockNote = (overrides?: Partial<NoteMessage>): NoteMessage => {
    const defaultNote: NoteMessage = {
        midiNote: MidiNotes.C4,
        velocity: 1,
        type: MessageType.PressOn,
    };

    return {
        ...defaultNote,
        ...overrides,
    }
}