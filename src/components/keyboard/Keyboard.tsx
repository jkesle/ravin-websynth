import React from 'react';
import Octave from './octave/Octave';
import { NoteTable } from '../../types';
import './Keyboard.css';

interface KeyboardProps {
  noteTable: NoteTable;
  onNotePressed: (event: React.MouseEvent<HTMLDivElement>) => void;
  onNoteReleased: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const Keyboard = React.forwardRef<HTMLDivElement, KeyboardProps>(
  ({ noteTable, onNotePressed, onNoteReleased }, ref) => {
    return (
      <div className="container">
        <div className="keyboard" ref={ref}>
          {noteTable.map((keys, octaveIdx) => (
            <Octave
              key={octaveIdx}
              octaveIndex={octaveIdx}
              keys={keys}
              onNotePressed={onNotePressed}
              onNoteReleased={onNoteReleased}
            />
          ))}
        </div>
      </div>
    );
  }
);

export default Keyboard;