import { NoteTable } from './types';

export const generateNotes = (): NoteTable => {
    const noteFreq: NoteTable = [
        { 'A': 27.5, 'A#': 29.135, 'B': 30.867 },
        { 'C': 32.703, 'C#': 34.647, 'D': 36.708, 'D#': 38.890, 'E': 41.203,
          'F': 43.653, 'F#': 46.249, 'G': 48.999, 'G#': 51.913, 'A': 55.000,
          'A#': 58.270, 'B': 61.735
        }
    ];

    for (let i = 0; i < 6; ++i) {
        const previousOctave = noteFreq[noteFreq.length - 1];
        const newOctave = Object.fromEntries(Object.entries(previousOctave).map(([key, freq]) => [key, freq * 2]));
        noteFreq.push(newOctave);
    }

    return noteFreq;
}