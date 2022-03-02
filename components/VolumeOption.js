import styles from '../styles/VolumeOption.module.css'
import { Box } from '@chakra-ui/react';
import { motion} from 'framer-motion'
import colors from '../public/colors'

const MotionBox = motion(Box);

function VolumeOption({color, audioRef, volume, setVolume}) {
    /*
        Main container for stems
    */

    const shouldAnimate = () => {
        return !audioRef.current.paused && audioRef.current.volume >= volume;
    }

    const animation = {
        initial: {
            opacity: 0,
            width: '3em',
            height: '3em',
            scale: 0.8,
            backgroundColor: color
        },
        animate: {
            opacity: 1,
            scale: shouldAnimate() ? 1 : 0.8,
            backgroundColor: audioRef.current.volume >= volume ? color : colors[colors.length - 1],

            transition: {
                type: 'spring',
                ease: 'easeOut',
                repeat: shouldAnimate() ? Infinity : 0,
                repeatType: 'reverse',
                delay: volume,
                duration:  shouldAnimate() ? 1 : 0.5
            }
        }
        
    }

    const handleVolume = () => {
        audioRef.current.volume = volume;
        setVolume(volume);
    }        

    return (    
        <MotionBox  className={styles.box} 
                    onClick={() => handleVolume()}
                    
                    //animations
                    variants={animation}
                    initial='initial'
                    animate='animate'
                    transition='transition'
        >
                    
        </MotionBox>
    )
}

export default VolumeOption