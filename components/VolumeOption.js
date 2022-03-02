import styles from '../styles/VolumeOption.module.css'

function VolumeOption({audioRef, volume, setVolume}) {
    /*
        Main container for stems
    */

    const handleVolume = () => {
        console.log('vol to ' + volume);
        audioRef.current.volume = volume;
        setVolume(volume);
    }        

    return (    
        <span className={styles.span} onClick={() => handleVolume()}></span>
    )
}

export default VolumeOption