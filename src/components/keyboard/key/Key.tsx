import React from 'react';
import './Key.css';

interface KeyProps {
  note: string;
  octave: number;
  freq: number;
  onNotePressed: (event: React.MouseEvent<HTMLDivElement>) => void;
  onNoteReleased: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const Key: React.FC<KeyProps> = ({ note, octave, freq, onNotePressed, onNoteReleased }) => {
  const isSharp = note.includes('#');
  const keyClassName = `key${(isSharp ? ' key--sharp' : '')}`;

  return (
    <div
      className={keyClassName}
      data-octave={octave}
      data-note={note}
      data-frequency={freq}
      onMouseDown={onNotePressed}
      onMouseUp={onNoteReleased}
      onMouseOver={onNotePressed}
      onMouseLeave={onNoteReleased}
    >
      <div className='key-label'>{note}<sub>{octave}</sub></div>
    </div>
  );
};

export default Key