import VolumeSelector from "./VolumeSelector"
import styles from '../styles/Stem.module.css'
import { useState, useEffect } from "react"
import donda2 from '../public/tracklist'
import colorlist from '../public/colors'

function Stem({type, stem, track, load, setLoad, audioRef}) {
    /*
        Main container for stems
    */

    //
    const [status, setStatus] = useState(true); //not muted status
    const [volume, setVolume] = useState(1);
    const [color_i, setColorI] = useState([]);
    useEffect(() => {
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
                console.log(url.url);
                audioRef.current.src = url.url;
                audioRef.current.load();
            }
        })
        .catch(err => {
            console.log("Error fetching " + type + " stem");
            console.log(err);
        });

        setColorI(generateRandomColors());
    }, [track, stem, type, audioRef]);

    const toggleMute = () => {
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

    //colors
    const generateRandomColors = () => {
        var max = colorlist.length - 1;    //dont include last color which is for off

        var temp = [max, max, max, max]
        
        for(let i = 0; i < 4; i++) {
            temp[i] = colorlist[Math.floor(Math.random()*10%max)];
        }

        return temp;
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
                <VolumeSelector colors={color_i} audioRef={audioRef} setVolume={setVolume}/>
            }
            <audio  id="audio-vocals" preload="auto" 
                    src="" ref={audioRef} 
                    onCanPlayThrough={() => canPlaythrough()}
            hidden/>
        </>
        
    )
}

export default Stem