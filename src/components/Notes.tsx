import { Chip, Typography } from "@mui/material";
import { NoteMessage } from "../types/note";
import { allNotes } from "../utils/allNotes";
import { useNotes } from "../utils/ChordContext";
import { splitNoteAndOctave } from "../utils/splitNoteAndOctave";

interface NoteChipProps {
    note: NoteMessage;
}

const NoteChip: React.FC<NoteChipProps> = ({ note }) => {
    const { removeNote } = useNotes();

    const splitNote = splitNoteAndOctave(allNotes[note.midiNote]);
    const chipLabel = <p>{splitNote[0]}<sub>{splitNote[1]}</sub></p>
    return <Chip
        variant='outlined'
        label={chipLabel}
        onClick={() => removeNote(note)}
    />
}

const Notes: React.FC = () => {
    const { chordNotes } = useNotes();
    return (
        <div>
            {chordNotes.map((note, index) => {
                return <NoteChip note={note} key={index}/>
            })}
        </div>
    );
}

export default Notes;