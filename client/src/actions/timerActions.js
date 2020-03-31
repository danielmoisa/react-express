const START_TIMER = "START_TIMER";
const STOP_IT = "STOP_IT";
const TICK = "TICK";
const RESET = "RESET";

export const startTimer = timerId =>  {
    return {
        type: START_TIMER,
        timerId: timerId
    }
}

export const stopIt = () => {
    return {
        type: STOP_IT
    }
}

export const tick = () => {
    return {
        type: TICK
    }
}

export const reset = () => {
    return {
        type: RESET
    }
}

