import { useState, useEffect, useRef } from "react"
import { faPlay, faPause, faArrowsRotate } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSelector, useDispatch } from 'react-redux'
import { reset, decrementTimeLeft, loadBreak, loadSession, startStop, startStopChime } from './timerSlice'
import ReactPlayer from 'react-player'
import Rainbow from "rainbowvis.js"

export default function Timer() {
    const dispatch = useDispatch();
    const timer = useSelector((state) => state.timer);
    const [dashArrayFraction, setDashArrayFraction] = useState(1);
    const [remainingPathColor, setRemainingPathColor] = useState('#008000');
    const chime = useRef(null);

    function formatTimeLeft(time) {
        let minutes = Math.floor(time / 60);
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        let seconds = time % 60;
        if (seconds < 10 ) {
            seconds = `0${seconds}`;
        }
        return `${minutes}:${seconds}`;
    }

    //effects when timer isRunning
    useEffect(() => {
        const interval = setInterval(() => {
            if (timer.isRunning) {
                if (timer.timeLeft > 0) {
                    dispatch(decrementTimeLeft());
                }else {
                    dispatch(startStopChime());
                    timer.isBreak ? dispatch(loadSession()) : dispatch(loadBreak());
                }
            }
        }, 1000);
        return () => clearInterval(interval);
    });

    //determines fraction of time left to accurately display time remaining circle
    useEffect(() => {
        setDashArrayFraction((timer.timeLeft / timer.initialTime) - (1 / timer.initialTime)*(1 - (timer.timeLeft / timer.initialTime)));
    }, [timer.timeLeft, timer.initialTime]);

    //determines the color of the time remaining circle based on fraction
    const rainbow = new Rainbow();
    rainbow.setSpectrum('#880808', '#EF7215', '#E6C700', '#008000');
    useEffect(() => {
        const colorValue = rainbow.colorAt(dashArrayFraction*100)
        setRemainingPathColor(`#${colorValue}`);
    }, [dashArrayFraction]);
    
    //resets chime
    useEffect(() => {
        if (!timer.isChimePlaying) {
            chime.current.seekTo(0);
        }
    }, [timer.isChimePlaying]);

    return (
        <div id="Timer">
            <svg className="timer-svg" viewBox="0 0 100 100" >
                <g className="timer-circle">
                    <circle className="timer-elapsed" cx="50" cy="50" r="45" />
                    <path
                        strokeDasharray={`${283*dashArrayFraction} 283`}
                        className='timer-path-remaining'
                        stroke={remainingPathColor}
                        d="
                        M 50, 50
                        m -45, 0
                        a 45,45 0 1,0 90,0
                        a 45,45 0 1,0 -90,0
                        "
                    >
                    </path>
                </g>
            </svg>
            <span id="timer-label">{timer.isBreak ? "Break" : "Session"}</span>
            <span id="time-left">{formatTimeLeft(timer.timeLeft)}</span>
            <div className="timer-buttons">
                <button id="start_stop" onClick={() => dispatch(startStop())}>
                    <FontAwesomeIcon icon={ faPlay } size='xl' />
                    <FontAwesomeIcon icon={ faPause } size='xl' />
                </button>
                <button id="reset" onClick={() => dispatch(reset())}>
                    <FontAwesomeIcon icon={faArrowsRotate} size='xl' />
                </button>
            </div>
            <ReactPlayer 
                ref={chime}
                url='/TimerEndChimes.mp3'
                playing={timer.isChimePlaying}
                onEnded={() => {dispatch(startStopChime())}}
                width={0}
                height={0}
                config={{
                    file: {
                        attributes: {
                            id: 'beep'
                        }
                    }
                }}
            />
        </div>
    )
}