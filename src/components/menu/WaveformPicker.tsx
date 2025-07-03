
import { Dispatch, JSX, SetStateAction } from 'react';
import './WaveformPicker.css';
import { OscillatorWaveform } from '../../types';

const WaveformPicker = ({ waveform, onWaveformChange }: { waveform: string, onWaveformChange: (x: OscillatorWaveform) => void}): JSX.Element => {

    const isWaveform = (obj: any): obj is OscillatorWaveform => typeof obj === 'string' && (obj === 'square' || obj === 'sawtooth' || obj === 'sine' || obj === 'triangle' || obj === 'custom');

    return (
        <div className="settings-right">
            <label htmlFor='waveform'>Current Waveform: </label>
            <select id='waveform' name='waveform' value={waveform} onChange={event => isWaveform(event.target.value) ? onWaveformChange(event.target.value) : () => {}}>
                <option value='sine'>Sine</option>
                <option value='square'>Square</option>
                <option value="sawtooth">Sawtooth</option>
                <option value="triangle">Triangle</option>
                <option value="custom">Custom</option>
            </select>
        </div>
    )
}

export default WaveformPicker;