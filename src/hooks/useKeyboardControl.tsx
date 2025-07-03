import { useEffect, type RefObject, type MouseEvent } from 'react';

// The hook accepts the keyboard container's ref and the note handlers as arguments.
export const useKeyboardControl = (
  keyboardRef: RefObject<HTMLDivElement | null>,
  notePressed: (event: MouseEvent<HTMLDivElement>) => void,
  noteReleased: (event: MouseEvent<HTMLDivElement>) => void
) => {
  useEffect(() => {
    const keyMap: Record<string, string> = {
      'KeyA': 'C4', 'KeyW': 'C#4', 'KeyS': 'D4', 'KeyE': 'D#4', 'KeyD': 'E4', 
      'KeyF': 'F4', 'KeyT': 'F#4', 'KeyG': 'G4', 'KeyY': 'G#4', 'KeyH': 'A4',
      'KeyU': 'A#4', 'KeyJ': 'B4', 'KeyK': 'C5', 'KeyL': 'D5',
    };

    const findKeyElement = (noteName: string): HTMLDivElement | null => {
      if (!keyboardRef.current || !noteName) return null;
      
      const note = noteName.slice(0, -1);
      const octave = noteName.slice(-1);
      return keyboardRef.current.querySelector(`div[data-note='${note}'][data-octave='${octave}']`);
    };

    const keyNoteHandler = (event: KeyboardEvent) => {
      if (event.repeat) return;

      const keyElement = findKeyElement(keyMap[event.code]);
      
      if (keyElement) {
        const syntheticEvent = {
            target: keyElement,
            buttons: 1,
        } as unknown as MouseEvent<HTMLDivElement>;

        if (event.type === 'keydown') {
            notePressed(syntheticEvent);
        } else {
            noteReleased(syntheticEvent);
        }
      }
    };

    window.addEventListener('keydown', keyNoteHandler);
    window.addEventListener('keyup', keyNoteHandler);

    return () => {
      window.removeEventListener('keydown', keyNoteHandler);
      window.removeEventListener('keyup', keyNoteHandler);
    };
  }, [keyboardRef, notePressed, noteReleased]);
};