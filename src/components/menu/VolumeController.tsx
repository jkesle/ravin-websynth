import { JSX } from 'react';
import './VolumeController.css';

const VolumeControl = ({ volume, onVolumeChange }: {volume: number, onVolumeChange: (x: number) => void}): JSX.Element => {
    return (
        <div className='settings-left'>
            <label htmlFor='volume'>Volume: </label>
            <input id='volume' type='range' min='0,0' max='1.0' step='0.01' value={volume} list='volumes' name='volume' onChange={event => onVolumeChange(parseFloat(event.target.value))} />
            <datalist id='volumes'>
                <option value='0.0' label="🔇"></option>
                <option value='1.0' label="🔊"></option>
            </datalist>
        </div>
    )
}

export default VolumeControl;