import { ActionTypes } from '../types/ActionTypes.type';
import { NoteMessage } from '../types/note';

export const midiReducer = (state: any, action: any) => {
    console.log(`Action type: ${action.type}`);
    switch (action.type) {
        case ActionTypes.ADD_NOTE:
            return {
                ...state,
                chordNotes: [...state.chordNotes, action.payload],
            };
        case ActionTypes.REMOVE_NOTE:
            return {
                ...state,
                chordNotes: state.chordNotes.filter(
                    (note: NoteMessage) =>
                        note.midiNote !== action.payload.midiNote,
                ),
            };
        case ActionTypes.CLEAR_NOTES:
            return {
                ...state,
                chordNotes: [],
            };
        default:
            return state;
    }
};
