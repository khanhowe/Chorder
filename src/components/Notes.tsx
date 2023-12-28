import { Chip } from "@mui/material";
import { NoteMessage } from "../types/note";
import { allNotes } from "../utils/allNotes";
import { useNotes } from "../utils/ChordContext";

interface NoteChipProps {
    note: NoteMessage;
}

const NoteChip: React.FC<NoteChipProps> = ({ note }) => {
    const { removeNote } = useNotes();
    return <Chip
        variant='outlined'
        label={allNotes[note.midiNote]}
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