
import { OscillatorWaveform } from '../../types';
import './SettingsMenu.css';
import VolumeControl from './VolumeController';
import WaveformPicker from './WaveformPicker';

type SettingsMenuProps = {
    volume: number;
    onVolumeChange: (x: number) => void;
    waveform: string;
    onWaveformChange: (x: OscillatorWaveform) => void;
}

const SettingsMenu = ({ volume, onVolumeChange, waveform, onWaveformChange }: SettingsMenuProps) => {
    return (
        <div className='settingsBar'>
            <VolumeControl volume={volume} onVolumeChange={onVolumeChange} />
            <WaveformPicker waveform={waveform} onWaveformChange={onWaveformChange} />
        </div>
    )
}

export default SettingsMenu;