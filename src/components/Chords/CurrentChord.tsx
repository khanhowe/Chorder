import { MouseEvent, useCallback, useState } from "react";
import NoteAnalysis from "../../analysis/NoteAnalysis";
import { useChords } from "../../utils/ProgressionContext";
import { useNotes } from "../../utils/ChordContext";
import { Chip, Menu, MenuItem, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

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

    return (
        <div className='current-chord'>
            <Typography>Current Chord</Typography>
            <div className='calculated-chord-container'>
                <Chip
                    label={<Typography>{identifiedChord || 'N/A'}</Typography>}
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
        </div>
    );
};

export default CurrentChord;