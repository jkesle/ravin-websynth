import React from 'react';
import Key from '../key/Key';
import './Octave.css';

interface OctaveProps {
  octaveIndex: number;
  keys: Record<string, number>;
  onNotePressed: (event: React.MouseEvent<HTMLDivElement>) => void;
  onNoteReleased: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const Octave: React.FC<OctaveProps> = ({ octaveIndex, keys, onNotePressed, onNoteReleased }) => {
  return (
    <div className="octave">
      {Object.entries(keys).map(([note, freq]) => (
        <Key
          key={`${note}${octaveIndex}`}
          note={note}
          octave={octaveIndex}
          freq={freq}
          onNotePressed={onNotePressed}
          onNoteReleased={onNoteReleased}
        />
      ))}
    </div>
  );
};

export default Octave;