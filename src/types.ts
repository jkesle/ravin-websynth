export type NoteTable = Array<Record<string, number>>;
export type OscillatorWaveform = 'sine' | 'square' | 'sawtooth' | 'triangle' | 'custom';
export type OscillatorList = Record<number, Record<string, OscillatorNode>>;