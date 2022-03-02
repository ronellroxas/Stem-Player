import Head from 'next/head'
import Stem from '../components/Stem'
import Track from '../components/Track'
import styles from '../styles/Home.module.css'
import { useState, useEffect, useRef } from 'react'
import donda2 from '../public/tracklist';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure
} from '@chakra-ui/react'

export default function Home() {

  //utility states
  const [play, setPlay] = useState(false);
  const [title, setTitle] = useState(null);
  const [duration, setDuration] = useState("00:00");
  const [autoplay, setAutoPlay] = useState(false);

  //audio refs
  const stem1Ref = useRef();
  const stem2Ref = useRef();
  const stem3Ref = useRef();
  const stem4Ref = useRef();

  //audio elements
  const [track, setTrack] = useState(1);  //set track number

  //audio states
  const [stem1Load, setStem1Load] = useState(false);
  const [stem2Load, setStem2Load] = useState(false);
  const [stem3Load, setStem3Load] = useState(false);
  const [stem4Load, setStem4Load] = useState(false);

  //modal
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    setTitle(donda2[track]['filename']);
  }, [track]);

  useEffect(() => {
    if (stem1Load && stem2Load && stem3Load && stem4Load && autoplay) {
      handleAudioPlay(true);
    }

  }, [stem1Load, stem2Load, stem3Load, stem4Load, autoplay]);

  //handles play/pause event
  const handleAudioPlay = (state) => {
    if(state) {
      stem1Ref.current.play();
      stem2Ref.current.play();
      stem3Ref.current.play();
      stem4Ref.current.play();

      setPlay(state);
    }
    else {
      stem1Ref.current.pause();
      stem2Ref.current.pause();
      stem3Ref.current.pause();
      stem4Ref.current.pause();

      setPlay(state);
    }
  };

  //reset variables when switching tracks
  const moveTrack = () => {
    stem1Ref.current.pause();
    stem2Ref.current.pause();
    stem3Ref.current.pause();
    stem4Ref.current.pause();

    stem1Ref.current.src = '';
    stem2Ref.current.src = '';
    stem3Ref.current.src = '';
    stem4Ref.current.src = '';

    setPlay(false);

    setStem1Load(false);
    setStem2Load(false);
    setStem3Load(false);
    setStem4Load(false);

  }

  //audio duration tracking
  useEffect(() => {
    setInterval (() => {
      getCurrentDuration();
    }, 1000); //per second

    stem1Ref.current.addEventListener("ended", null);
    stem1Ref.current.addEventListener("ended", () => {
      moveTrack();

      if (track + 1 > 16) {
          setTrack(1);
      }
      else {
          setTrack(track + 1);
      }
      
    });

  }, [stem1Load, track]);

  const getCurrentDuration = () => {
    var total_time = stem1Ref.current.duration;
    var remaining = total_time-stem1Ref.current.currentTime;

    var minutes = Math.floor(remaining / 60);
    var seconds = Math.ceil(remaining - minutes * 60);

    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    setDuration(minutes + ":" + seconds)
  }

  const selectTrack = (i) => {
    moveTrack();

    setTrack(i);
    onClose();
  }

  return (
    <>
      <Head>
        <title>STEM PLAYER</title>
        <meta name="description" content="Simulated Stem Player by Kanye West" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Track title={title}
               track={track}
               setTrack={setTrack}
               setPlay={setPlay}
               moveTrack={moveTrack}/>
        <Stem type="vocals" stem={2} track={track} load={stem1Load} setLoad={setStem1Load} audioRef={stem1Ref}/>
        <Stem type="instrumentals" stem={1} track={track} load={stem2Load} setLoad={setStem2Load} audioRef={stem2Ref}/>
        <Stem type="bass" stem={3} track={track} load={stem3Load} setLoad={setStem3Load} audioRef={stem3Ref}/>
        <Stem type="drums" stem={4} track={track} load={stem4Load} setLoad={setStem4Load} audioRef={stem4Ref}/>

        { !stem1Load || !stem2Load || !stem3Load || !stem4Load ?
          <h1 className={styles.h1}>loading</h1>
          :
          play == false ?
            <h1 className={styles.h1} onClick={()=> handleAudioPlay(true)}>play [{duration}]</h1>
            :
            <h1 className={styles.h1} onClick={()=> handleAudioPlay(false)}>pause [{duration}]</h1>
        }
        <span>
          <span className={styles.span} onClick={onOpen}>SETTINGS & TRACKLIST</span>
        </span>
        
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent bgColor='#FFFFFF' >
            
            <ModalBody className={styles.modal}>
              <h1 onClick={() => {setAutoPlay(!autoplay)}}>SETTINGS: AUTOPLAY TRACKS [{autoplay ? "ON": "OFF"}]</h1>
              <ul className={styles.ul}>
                {
                  Object.keys(donda2).map((key, index) => {
                    return <li key={index} className={styles.li}><h2 onClick={() => selectTrack(key)}>{donda2[key]['filename']}</h2>
                            {track == key ? <span>[playing]</span>: null}
                          </li>
                  })
                }
              </ul>
              <h3 onClick={onClose} cursor='pointer' className={styles.h3}>BACK</h3>
              
            </ModalBody>
          </ModalContent>
        </Modal>
      </main> 
    </>
  )
}
