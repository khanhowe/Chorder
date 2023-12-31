import { MouseEvent, useCallback, useEffect, useState } from "react";
import NoteAnalysis from "../../analysis/NoteAnalysis";
import { useChords } from "../../utils/ProgressionContext";
import { useNotes } from "../../utils/ChordContext";
import { Chip, Menu, MenuItem, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import ChordChip from "./ChordChip";

const CurrentChord: React.FC = () => {
    const { chordNotes, constructedChord, setConstructedChord } = useNotes();
    const noteAnalysis = new NoteAnalysis();

    useEffect(() => {
        setConstructedChord({
            id: uuidv4(),
            name: noteAnalysis.identifyChord(chordNotes),
            notes: chordNotes,
        });
    }, [chordNotes, setConstructedChord]);

    return (
        <div className='current-chord'>
            <Typography>Current Chord</Typography>
            <div className='calculated-chord-container'>
                <ChordChip
                    chord={constructedChord}
                    addable={true}
                    clearable={true}
                    removeable={false}
                />
            </div>
        </div>
    );
};

export default CurrentChord;