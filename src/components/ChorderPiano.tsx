import React from "react";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import 'react-piano/dist/styles.css';

const firstNote = MidiNumbers.fromNote("a0");
const lastNote = MidiNumbers.fromNote("c8");
const keyboardShortcuts = KeyboardShortcuts.create({
  firstNote: firstNote,
  lastNote: lastNote,
  keyboardConfig: KeyboardShortcuts.HOME_ROW,
});

const ChorderPiano: React.FC = () => {
  return (
    <Piano
      noteRange={{ first: firstNote, last: lastNote }}
      playNote={(midiNumber: number) => {
        // Play a given note - you can replace this with your own logic
        console.log(`Play note: ${midiNumber}`);
      }}
      stopNote={(midiNumber: number) => {
        // Stop playing a given note - you can replace this with your own logic
        console.log(`Stop note: ${midiNumber}`);
      }}
      width={1000}
      keyboardShortcuts={keyboardShortcuts}
    />
  );
};

export default ChorderPiano;
