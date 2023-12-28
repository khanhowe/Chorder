import { Chip, Menu, MenuItem } from '@mui/material';
import { useNotes } from '../utils/ChordContext';
import { useChords } from '../utils/ProgressionContext';
import { Chord } from '../types/Chord';
import NoteAnalysis from '../analysis/NoteAnalysis';
import { MouseEvent, useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
interface ChordChipProps {
    chord: Chord;
}

const CurrentChord: React.FC = () => {
    const { chordNotes, clearNotes } = useNotes();
    const { addChord } = useChords();
    const noteAnalysis = new NoteAnalysis();
    const identifiedChord = noteAnalysis.identifyChord(chordNotes);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const addChordToProgression = useCallback(() => {
        addChord({
            id: uuidv4(),
            name: identifiedChord,
            description: '',
            notes: chordNotes
        })
    }, [addChord, chordNotes])

    if (identifiedChord) {
        return (
            <div>
                <Chip
                    label={identifiedChord}
                    variant="outlined"
                    onClick={handleClick}
                />
                <Menu
                    id="new-chord-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button'
                    }}
                >
                    <MenuItem onClick={addChordToProgression}>Add Chord</MenuItem>
                    <MenuItem>Add Chord To...</MenuItem>
                    <MenuItem onClick={() => clearNotes()}>Clear</MenuItem>
                </Menu>
            </div>
        );
    }

    return null;
};

const ChordChip: React.FC<ChordChipProps> = ({ chord }) => {
    const { removeChord } = useChords();
    return <Chip label={chord.name} onClick={() => removeChord(chord.id)} />;
};

const Chords: React.FC = () => {
    const { progressionChords } = useChords();
    return (
        <div>
            <CurrentChord />
            <div>
                {progressionChords.map((chord, index) => (
                    <ChordChip chord={chord} key={index} />
                ))}
            </div>
        </div>
    );
};

export default Chords;
