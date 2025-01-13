import React, {useRef, useState} from 'react';
import ResultModal from "./ResultModal.jsx";

function TimerChallenge({title,targetTime}) {
    const timer = useRef();
    const dialog = useRef();
    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
    const timeActive = timeRemaining >= 0 && timeRemaining < targetTime * 1000;

    if (timeRemaining <= 0){
        clearInterval(timer.current);
        dialog.current.showModal();
    }

    function handleStart(){
        timer.current=setInterval(()=>{
            setTimeRemaining(prevState => prevState -10);
        },10)
    }
    function handleStop(){
        clearInterval(timer.current);
        dialog.current.showModal();
    }
    function handleReset(){
        setTimeRemaining(targetTime * 1000)
    }
    return (
        <section className="challenge">
            <h2>{title}</h2>

            <ResultModal
                ref={dialog}
                targetTime={targetTime}
                remainingTime={timeRemaining}
                onReset={handleReset}
            />

            <p className="challenge-time">{targetTime} second{targetTime > 1 ? "s" : ""} second</p>
            <p>
                <button onClick={timeActive ? handleStop : handleStart}>
                    {timeActive ? "Stop" : "Start"} Challenge
                </button>

            </p>
            <p className={timeActive ? "active" : undefined}  onClick={handleStart}>
                {timeActive ? "Time is running..." : "Timer Inactive"}
            </p>
        </section>
    );
}

export default TimerChallenge;