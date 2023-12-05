import { ActionTypes } from "../types/ActionTypes.type";
import { NoteMessage } from "../types/note";

export const midiReducer = (state: any, action: any) => {
  switch (action.type) {
    case ActionTypes.ADD_NOTE:
      return {
        ...state,
        chordNotes: [...state.chordNotes, action.payload],
      };
    case ActionTypes.REMOVE_NOTE:
      // Logic to remove a note
      return {
        ...state,
        chordNotes: state.chordNotes.filter(
          (note: NoteMessage) => note.midiNote !== action.payload.midiNote
        ),
      };
    case ActionTypes.CLEAR_NOTES:
        return {
            ...state,
            chordNotes: [] // Reset only the chordNotes part of the state
        };
    default:
      return state;
  }
};
