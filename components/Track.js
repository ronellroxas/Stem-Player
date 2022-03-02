import styles from '../styles/Track.module.css'

function Track({title, track, setTrack, moveTrack}) {
    /*
        Main container for stems
    */

    
    const handleNext = () => {
        moveTrack();

        if (track + 1 > 16) {
            setTrack(1);
        }
        else {
            setTrack(track + 1);
        }
    }

    const handlePrev = () => {
        moveTrack();

        if (track - 1 < 1) {
            setTrack(16);
        }
        else {
            setTrack(track - 1);
        }
        
    }

    return (
        <div>
            <span className={styles.span} onClick={() => handlePrev()}>prev</span>
            <h1 className={styles.h1}>{title}</h1>
            <span className={styles.span} onClick={() => handleNext()}>next</span>
        </div>    
    )
}

export default Track