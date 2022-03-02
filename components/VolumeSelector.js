import VolumeOption from "./VolumeOption"
import styles from '../styles/VolumeSelector.module.css'

function VolumeSelector({colors, audioRef, setVolume}) {
    /*
        Main container for stems
    */

    return (
        <div className={styles.div}>
            <VolumeOption color={colors[0]} audioRef={audioRef} volume={0.25} setVolume={setVolume}/>
            <VolumeOption color={colors[1]} audioRef={audioRef} volume={0.50} setVolume={setVolume}/>
            <VolumeOption color={colors[2]} audioRef={audioRef} volume={0.75} setVolume={setVolume}/>
            <VolumeOption color={colors[3]} audioRef={audioRef} volume={1.0} setVolume={setVolume}/>
        </div>
    )
}

export default VolumeSelector