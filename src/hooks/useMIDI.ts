import { useEffect } from 'react';

const useMIDI = (onMIDIMessage: (midiMessage: WebMidi.MIDIMessageEvent) => void) => {
    useEffect(() => {
        const onMIDISuccess = (midiAccess: WebMidi.MIDIAccess) => {
            midiAccess.inputs.forEach(input => {
                input.onmidimessage = onMIDIMessage;
            });
        };

        const onMIDIFailure = () => {
            console.error("Failed to access MIDI devices.");
        };

        navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

        // Cleanup function to remove event listeners
        return () => {
            navigator.requestMIDIAccess().then(midiAccess => {
                midiAccess.inputs.forEach(input => {
                    input.onmidimessage = () => {}; // Assign a dummy function
                });
            });
        };
    }, [onMIDIMessage]);
};

export default useMIDI;