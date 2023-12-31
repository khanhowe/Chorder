import { MouseEvent, useCallback, useState } from 'react';
import NoteAnalysis from '../../analysis/NoteAnalysis';
import { useChords } from '../../utils/ProgressionContext';
import { useNotes } from '../../utils/ChordContext';
import { Chip, Menu, MenuItem, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { Chord } from '../../types/Chord';

interface ChordChipOptions {
    chord: Chord | null;
    addable: boolean;
    removeable: boolean;
    clearable: boolean;
}

const ChordChip: React.FC<ChordChipOptions> = ({ chord, addable, removeable, clearable }) => {
    const { chordNotes, clearNotes } = useNotes();
    const { addChord, removeChord } = useChords();
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
            notes: chordNotes,
        });
    }, [addChord, chordNotes]);

    const removeChordFromProgression = useCallback((chord: Chord) => {
        removeChord(chord.id)
    }, []);

    return (
        <div>
            <Chip
                label={<Typography>{chord?.name || 'N/A'}</Typography>}
                variant="outlined"
                onClick={chordNotes.length ? handleClick : () => {}}
            />
            <Menu
                id="new-chord-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {addable && <MenuItem onClick={addChordToProgression}>Add</MenuItem>}
                {addable && <MenuItem>Add To...</MenuItem>}
                {/* {chord && removeable && <MenuItem onClick={removeChordFromProgression(chord?.id)}>Remove</MenuItem>} */}
                {clearable && <MenuItem onClick={() => clearNotes()}>Clear</MenuItem>}
            </Menu>
        </div>
    );
};

export default ChordChip;
