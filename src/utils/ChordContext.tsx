import React, { createContext, useContext, useState, ReactNode } from 'react';
import { NoteMessage } from '../types/note';

interface ChordContextType {
    chordNotes: NoteMessage[];
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

    const addNote = (note: NoteMessage): void => {
        setChordNotes(prevNotes => [...prevNotes, note]);
    };

    const removeNote = (noteToRemove: NoteMessage): void => {
        setChordNotes(prevNotes =>
            prevNotes.filter(
                (note: NoteMessage) => note.midiNote !== noteToRemove.midiNote,
            ),
        );
    };

    const isNoteInChord = (newNote: NoteMessage): boolean => {
        return chordNotes.some((note: NoteMessage) => newNote.midiNote === note.midiNote);
    }

    const clearNotes = (): void => {
        setChordNotes([]);
    };

    return (
        <ChordContext.Provider
            value={{ chordNotes, addNote, removeNote, clearNotes, isNoteInChord }}
        >
            {children}
        </ChordContext.Provider>
    );
};