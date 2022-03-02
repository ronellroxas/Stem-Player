import VolumeOption from "./VolumeOption"
import styles from '../styles/VolumeSelector.module.css'

function VolumeSelector({audioRef, setVolume}) {
    /*
        Main container for stems
    */

    return (
        <div className={styles.div}>
            <VolumeOption audioRef={audioRef} volume={0.25} setVolume={setVolume}/>
            <VolumeOption audioRef={audioRef} volume={0.50} setVolume={setVolume}/>
            <VolumeOption audioRef={audioRef} volume={0.75} setVolume={setVolume}/>
            <VolumeOption audioRef={audioRef} volume={1.0} setVolume={setVolume}/>
        </div>
    )
}

export default VolumeSelector