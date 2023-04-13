import { useSelector, useDispatch } from 'react-redux'
import { updateBreakLength, updateSessionLength } from './timerSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

export default function LengthControls() {
    const dispatch = useDispatch();
    const timer = useSelector((state) => state.timer);
    return (
        <div>
            <div className="length-control">
            <h2 id="break-label">Break Length</h2>
            <button id="break-decrement" className="decrement" onClick={() => dispatch(updateBreakLength(-1))}>
                <FontAwesomeIcon icon={faCaretDown} size='2xl'/>
            </button>
            <span id="break-length">{timer.breakLength}</span>
            <button id="break-increment" onClick={() => dispatch(updateBreakLength(+1))}><FontAwesomeIcon icon={faCaretUp} size='2xl'/></button>
            </div>

            <div className="length-control">
            <h2 id="session-label">Session Length</h2>
            <button id="session-decrement" className='decrement' onClick={() => dispatch(updateSessionLength(-1))}>
                <FontAwesomeIcon icon={faCaretDown} size='2xl'/>
            </button>
            <span id="session-length">{timer.sessionLength}</span>
            <button id="session-increment" onClick={() => dispatch(updateSessionLength(+1))}>
                <FontAwesomeIcon icon={faCaretUp} size='2xl'/>
            </button>
            </div>
        </div>
        
    )
}