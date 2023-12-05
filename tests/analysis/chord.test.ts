import { mockNote } from "../mocks/note.mock";
import NoteAnalysis from '../../src/analysis/chord';
import { MidiNotes } from '../../src/midi/midi-notes.enum';


describe('NoteAnalysis()', () => {
    let noteAnalysis: NoteAnalysis;
    beforeAll(() => {
        noteAnalysis = new NoteAnalysis();
    });
    describe('identifyChord()', () => {
        it('Should identify a chord as CMajor given some generated notes', () => {
            const notes = [
                mockNote(), 
                mockNote({ midiNote: MidiNotes.E4, }), 
                mockNote({ midiNote: MidiNotes.G4, }),
            ];
            const chord = noteAnalysis.identifyChord(notes);
            expect(chord).toBe('CM');
        });

        it('Should identify a chord as CMajor given some spread out generated notes', () => {
            const notes = [
                mockNote(), 
                mockNote({ midiNote: MidiNotes.E4, }), 
                mockNote({ midiNote: MidiNotes.G0, }),
                mockNote({ midiNote: MidiNotes.E9, }),
                mockNote({ midiNote: MidiNotes.C7, }),
            ];
            const chord = noteAnalysis.identifyChord(notes);
            expect(chord).toBe('CM');
        });
    });
});