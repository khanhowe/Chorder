import React, { createContext, useContext, useState, ReactNode } from 'react';
import { NoteMessage } from '../types/note';
import { Chord } from '../types/Chord';
import { v4 as uuidv4 } from 'uuid';
import NoteAnalysis from '../analysis/NoteAnalysis';

interface ChordContextType {
    chordNotes: NoteMessage[];
    constructedChord: Chord | null;
    setConstructedChord: (chord: Chord) => void;
    addNote: (note: NoteMessage) => void;
    removeNote: (note: NoteMessage) => void;
    clearNotes: () => void;
    isNoteInChord: (note: NoteMessage) => boolean;
}

const ChordContext = createContext<ChordContextType | null>(null);

export const useNotes = () => useContext(ChordContext)!;

interface ChordProviderProps {
    children: ReactNode;
}

export const ChordProvider: React.FC<ChordProviderProps> = ({ children }) => {
    const [chordNotes, setChordNotes] = useState<NoteMessage[]>([]);
    const [constructedChord, setConstructedChord] = useState<Chord | null>(
        null,
    );

    const noteAnalysis = new NoteAnalysis();

    const addNote = (note: NoteMessage): void => {
        setChordNotes((prevNotes) => [...prevNotes, note]);
    };

    const removeNote = (noteToRemove: NoteMessage): void => {
        setChordNotes((prevNotes) =>
            prevNotes.filter(
                (note: NoteMessage) => note.midiNote !== noteToRemove.midiNote,
            ),
        );
        if (!chordNotes.length) {
            setConstructedChord(null);
        }
    };

    const isNoteInChord = (newNote: NoteMessage): boolean => {
        return chordNotes.some(
            (note: NoteMessage) => newNote.midiNote === note.midiNote,
        );
    };

    const clearNotes = (): void => {
        setChordNotes([]);
    };

    return (
        <ChordContext.Provider
            value={{
                chordNotes,
                constructedChord,
                setConstructedChord,
                addNote,
                removeNote,
                clearNotes,
                isNoteInChord,
            }}
        >
            {children}
        </ChordContext.Provider>
    );
};
