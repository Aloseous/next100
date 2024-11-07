"use client";

import { useEffect, useState } from 'react'

const Timer = () => {


    const [intervalState, setIntervalState] = useState<NodeJS.Timeout | null>(null)

    const [timer, setTimer] = useState(0)

    useEffect(() => {
        return () => stopTimer();
    }, []);

    const startTimer = () => {
        setIntervalState(setInterval(updateTimer, 1000))
    }

    const updateTimer = () => {
        setTimer(prev => prev + 1)
    }
    const resetTimer = () => {
        setTimer(0)
    }

    const stopTimer = () => {
        if (intervalState) {
            clearInterval(intervalState)
            setIntervalState(null)
        }
        console.log('stop')
    }

    return (
        <div className='w-screen h-screen bg-gray-400 flex items-center justify-center'>
            <div className='w-[500px] h-[200px] bg-black text-white flex flex-col items-center justify-center rounded-lg gap-5'>
                <label id='timer' >{timer}</label>
                <div className='flex justify-between gap-5'>
                    <button className='w-[100px] h-[50px] bg-[#837C7C] rounded-md' onClick={stopTimer}>Stop</button>
                    <button className='w-[100px] h-[50px] bg-[#837C7C] rounded-md' onClick={startTimer}>Start</button>
                    <button className='w-[100px] h-[50px] bg-[#837C7C] rounded-md' onClick={resetTimer}>Reset</button>
                </div>
            </div>
        </div>
    )
}

export default Timer