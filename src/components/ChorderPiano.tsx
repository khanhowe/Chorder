import React from 'react';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
import { useNotes } from '../utils/ChordContext';
import { MessageType, NoteMessage } from '../types/note';

interface NoteLabelProps {
    keyboardShortcut: any;
    midiNumber: number;
    isActive: boolean;
}

const firstNote = MidiNumbers.fromNote('a0');
const lastNote = MidiNumbers.fromNote('c8');
const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
});


const ChorderPiano: React.FC = () => {
    const { addNote, removeNote, isNoteInChord } = useNotes();

    const renderNoteLabel = ({ keyboardShortcut, midiNumber, isActive }: NoteLabelProps) => {
        const newNote: NoteMessage = {
            midiNote: midiNumber,
            velocity: 100,
            type: MessageType.PressOn
        };
        const style = {
            backgroundColor: isNoteInChord(newNote) ? 'green' : 'transparent',
            border: isActive ? '3px solid red' : 'none',
        };
        return (
            <div style={style}>
                {keyboardShortcut}
            </div>
        )
    }
    return (
        <Piano
            noteRange={{ first: firstNote, last: lastNote }}
            playNote={(midiNumber: number) => {
                const newNote: NoteMessage = {
                    midiNote: midiNumber,
                    velocity: 100,
                    type: MessageType.PressOn
                };
                if (isNoteInChord(newNote)) {
                    removeNote(newNote);
                } else {
                    addNote(newNote);
                }
            }}
            stopNote={(midiNumber: number) => {
                // Stop playing a given note - you can replace this with your own logic
                console.log(`Stop note: ${midiNumber}`);
            }}
            width={1000}
            keyboardShortcuts={keyboardShortcuts}
            renderNoteLabel={renderNoteLabel}
        />
    );
};

export default ChorderPiano;
