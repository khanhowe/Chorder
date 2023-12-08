import React, { createContext, useContext, useState, ReactNode } from 'react';
import { NoteMessage } from '../types/note';
import { Chord } from '../types/Chord';

interface ProgressionContextType {
    progressionChords: Chord[];
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
            value={{ progressionChords, addChord, removeChord, clearChords }}
        >
            {children}
        </ProgressionContext.Provider>
    );
};