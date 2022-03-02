import VolumeSelector from "./VolumeSelector"
import styles from '../styles/Stem.module.css'
import { useState, useEffect } from "react"
import donda2 from '../public/tracklist'

function Stem({type, stem, track, load, setLoad, audioRef}) {
    /*
        Main container for stems
    */

    //
    const [status, setStatus] = useState(true); //not muted status
    const [volume, setVolume] = useState(1);

    useEffect(() => {
        console.log('Retrieving ' + type);
        let current_track = donda2[track];

        let stem_name = "Donda 2_" + current_track['filename'] + "_" + stem + current_track['filetype'];
        let fetch_params = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(stem_name)
        }

        fetch('api/audio', fetch_params)
        .then(res => res.json())
        .then(url => {
            if(audioRef.current !== undefined) {
                audioRef.current.src = url.url;
                audioRef.current.load();
            }
        })
        .catch(err => {
            console.log("Error fetching " + type + " stem");
            console.log(err);
        });

    }, [track, stem, type, audioRef]);

    const toggleMute = () => {
        console.log('mute');
        if (status) {
            audioRef.current.volume = 0;
        }
        else {
            audioRef.current.volume = volume;
        }
        setStatus(!status);
    }

    const canPlaythrough = () => {
        setLoad(true);
    }

    return (    
        <>
            <div>
                <h2>{type}</h2>
                <span className={styles.span}
                        onClick={() => toggleMute()}>
                    [{status ? "on":"off"}]
                </span>
            </div>
            {  load === false ?
                <h2>loading</h2>
                :
                <VolumeSelector audioRef={audioRef} setVolume={setVolume}/>
            }
            <audio  id="audio-vocals" preload="auto" 
                    src="" ref={audioRef} 
                    onCanPlayThrough={() => canPlaythrough()}
            hidden/>
        </>
        
    )
}

export default Stem