import {forwardRef, useImperativeHandle, useRef} from "react";
import { createPortal } from 'react-dom';
const ResultModal = forwardRef(({targetTime, result, remainingTime, onReset},ref)=>{
    const userLost = remainingTime <= 1;
    const formatedReaminingTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100)
    return createPortal(
        <dialog ref={ref} className="result-modal" onClose={onReset}>
            {userLost && <h2>You Lost</h2>}
            {!userLost && <h2>Your Score: {score}</h2>}
            <p>The target time was <strong>{targetTime} seconds.</strong></p>
            <p>You stopped the time with <strong>{formatedReaminingTime} seconds left.</strong></p>
            <form method="dialog">
                <button onSubmit={onReset}>Close</button>
            </form>
        </dialog>,document.getElementById("modal")
    )
})

export default ResultModal;

