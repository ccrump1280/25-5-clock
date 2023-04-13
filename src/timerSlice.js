import { createSlice } from '@reduxjs/toolkit'

export const timerSlice = createSlice({
    name: 'timer',
    initialState: {
        timeLeft: 25*60,
        initialTime: 25*60,
        sessionLength: 25,
        breakLength: 5,
        isRunning: false,
        isBreak: false,
        isChimePlaying: false,
    },
    reducers: {
        reset: (state) => {
            state.timeLeft = 25*60;
            state.initialTime = 25*60;
            state.sessionLength = 25;
            state.breakLength = 5;
            state.isRunning = false;
            state.isBreak = false;
            state.isChimePlaying = false;
        },
        startStop: (state) => {
            state.isRunning = !state.isRunning;
        },
        updateSessionLength: (state, action) => {
            if (!state.isRunning) {
                state.sessionLength = clamp(state.sessionLength + action.payload, 1, 60);
                if (!state.isBreak) {
                    state.initialTime = state.sessionLength*60;
                    state.timeLeft = state.sessionLength*60;
                }
            }
        },
        updateBreakLength: (state, action) => {
            if (!state.isRunning) {
                state.breakLength = clamp(state.breakLength + action.payload, 1, 60);
                if (state.isBreak) {
                    state.initialTime = state.breakLength*60;
                    state.timeLeft = state.breakLength*60;
                }
            }
        },
        decrementTimeLeft: (state) => {
            state.timeLeft--;
        },
        setTimeLeft: (state, action) => {
            state.timeLeft = action.payload;
        },
        loadBreak: (state) => {
            state.isBreak = true;
            state.initialTime = state.breakLength*60;
            state.timeLeft = state.breakLength*60;
        },
        loadSession: (state) => {
            state.isBreak = false;
            state.initialTime = state.sessionLength*60;
            state.timeLeft = state.sessionLength*60;
        },
        startStopChime: (state) => {
            state.isChimePlaying = !state.isChimePlaying;
        }

    }
})

function clamp(val, min, max) {
    return val > max ? max : val < min ? min : val;
}

export const { reset, startStop, updateSessionLength, updateBreakLength, decrementTimeLeft, setTimeLeft, loadBreak, loadSession, startStopChime } = timerSlice.actions;

export default timerSlice.reducer