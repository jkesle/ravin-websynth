import React, { useState, useRef, useEffect, useCallback } from 'react';
import Keyboard from './components/keyboard/Keyboard';
import SettingsBar from './components/menu/SettingsMenu';
import { generateNotes } from './util';
import { OscillatorWaveform, OscillatorList } from './types';
import './Ravin.css';
import { useKeyboardControl } from './hooks/useKeyboardControl';

const noteTable = generateNotes();

const Synthesizer: React.FC = () => {
  const [volume, setVolume] = useState<number>(0.5);
  const [waveform, setWaveform] = useState<OscillatorType>('square');

  const audioContextRef = useRef<AudioContext | null>(null);
  const mainGainNodeRef = useRef<GainNode | null>(null);
  const oscListRef = useRef<OscillatorList>({});
  const customWaveformRef = useRef<PeriodicWave | null>(null);
  const keyboardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const audioContext = new (window.AudioContext)();
    const mainGainNode = audioContext.createGain();
    mainGainNode.connect(audioContext.destination);

    const sineTerms = new Float32Array([0, 0, 1, 0, 1]);
    const cosineTerms = new Float32Array(sineTerms.length);
    const customWaveform = audioContext.createPeriodicWave(cosineTerms, sineTerms);
    
    audioContextRef.current = audioContext;
    mainGainNodeRef.current = mainGainNode;
    customWaveformRef.current = customWaveform;
    
    noteTable.forEach((_, idx) => { oscListRef.current[idx] = {}; });

    setTimeout(() => {
        const middleKey = keyboardRef.current?.querySelector("div[data-note='B'][data-octave='5']");
        middleKey?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }, 100);

    return () => {audioContext.close();}
  }, []);

  useEffect(() => {
    if (mainGainNodeRef.current) {
      mainGainNodeRef.current.gain.value = volume;
    }
  }, [volume]);

  const playTone = (freq: string): OscillatorNode | null => {
    if (!audioContextRef.current || !mainGainNodeRef.current) return null;

    const osc = audioContextRef.current.createOscillator();
    osc.connect(mainGainNodeRef.current);
    osc.type = waveform;

    if (waveform === 'custom' && customWaveformRef.current) {
      osc.setPeriodicWave(customWaveformRef.current);
    }
    
    osc.frequency.setValueAtTime(parseFloat(freq), audioContextRef.current.currentTime);
    osc.start();
    return osc;
  };

  const notePressed = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (event.buttons & 1) {
      const { note, octave, frequency, pressed } = (event.target as HTMLDivElement).dataset;
      if (note && octave && frequency && !pressed) {
        const osc = playTone(frequency);
        if (osc) {
            oscListRef.current[parseInt(octave, 10)][note] = osc;
            (event.target as HTMLDivElement).dataset.pressed = 'yes';
            (event.target as HTMLDivElement).classList.add('active');
        }
      }
    }
  }, [waveform]);

  const noteReleased = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const { note, octave, pressed } = (event.target as HTMLDivElement).dataset;
    if (note && octave && pressed) {
      const octaveNum = parseInt(octave, 10);
      if (oscListRef.current[octaveNum]?.[note]) {
        oscListRef.current[octaveNum][note].stop();
        delete oscListRef.current[octaveNum][note];
      }
      delete (event.target as HTMLDivElement).dataset.pressed;
      (event.target as HTMLDivElement).classList.remove('active');
    }
  }, []);

  useKeyboardControl(keyboardRef, notePressed, noteReleased)

  return (
    <div className="synth-wrapper">
      <Keyboard 
        ref={keyboardRef}
        noteTable={noteTable} 
        onNotePressed={notePressed} 
        onNoteReleased={noteReleased} 
      />
      <SettingsBar 
        volume={volume}
        onVolumeChange={setVolume}
        waveform={waveform}
        onWaveformChange={setWaveform}
      />
    </div>
  );
};

export default Synthesizer;