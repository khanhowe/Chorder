export const splitNoteAndOctave = (noteString: string) => {
    const regex = /([A-G]#?)(\d)/;
    const matches = noteString.match(regex);

    if (matches) {
        return [matches[1], matches[2]];
    } else {
        throw new Error('Invalid note string');
    }
}
