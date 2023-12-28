import React, { createContext, useContext, useState, ReactNode } from 'react';
import { NoteMessage, NoteName } from '../types/note';
import { Chord } from '../types/Chord';
import { Progression } from 'tonal';

interface ProgressionContextType {
    progressionChords: Chord[];
    root: NoteName;
    setRoot: (noteName: NoteName) => void;
    addChord: (chord: Chord) => void;
    removeChord: (id: string) => void;
    clearChords: () => void;
}

const ProgressionContext = createContext<ProgressionContextType | null>(null);

export const useChords = () => useContext(ProgressionContext)!;

interface ChordProviderProps {
    children: ReactNode;
}

export const ProgressionProvider: React.FC<ChordProviderProps> = ({ children }) => {
    const [progressionChords, setProgressionChords] = useState<Chord[]>([]);
    const [root, setRoot] = useState<NoteName>(NoteName.A);

    const addChord = (chord: Chord): void => {
        setProgressionChords(prevChords => [...prevChords, chord]);
    };

    const removeChord = (id: string): void => {
        setProgressionChords(prevNotes =>
            prevNotes.filter(
                (chord: Chord) => chord.id !== id,
            ),
        );
    };

    const clearChords = (): void => {
        setProgressionChords([]);
    };

    return (
        <ProgressionContext.Provider
            value={{ progressionChords, root, setRoot, addChord, removeChord, clearChords }}
        >
            {children}
        </ProgressionContext.Provider>
    );
};