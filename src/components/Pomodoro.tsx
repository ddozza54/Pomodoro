import { useEffect, useState } from "react";
import styled from "styled-components";
import { PlayIcon } from "../assets/Play";
import { PauseIcon } from "../assets/Pause";
/**
 * 설정한 time 
 * play 버튼 클릭 시 숫자 변환
 * 
 */

const getMinutes = (second: number) => {
    if (second <= 59) {
        return 0;
    } else {
        return Math.floor(second / 60)
    }
}
const getSecond = (second: number) => {
    return second % 60
}

export default function Pomodoro() {
    const POMO_TOTAL = 25 * 60;
    const [pomoTime, setPomoTime] = useState(POMO_TOTAL);
    const [isTimerWork, setIsTimerWork] = useState(false);

    const [round, setRound] = useState(0);
    const ROUND_TOTAL = 4;

    const [goal, setGoal] = useState(0);
    const GOAL_TOTAL = 12;
    //현재 초를 기억해야 -> 일시 정지 해도 남아 있음. 
    useEffect(() => {
        if (isTimerWork) {
            const timer = setInterval(() => {
                pomoTime > 0 && setPomoTime(prev => prev - 1)
            }, 1000);
            return () => clearInterval(timer)
        }
    }, [pomoTime, isTimerWork])

    useEffect(() => {
        if (pomoTime === 0) {
            setRound(prev => prev + 1);
            setPomoTime(POMO_TOTAL);
            setIsTimerWork(false);
        }
    }, [pomoTime])

    useEffect(() => {
        if (round === ROUND_TOTAL) {
            setGoal(prev => prev + 1)
        }
    }, [round])

    return (
        <div>
            <Title>Pomodoro</Title>
            <div>
                <h2>Timer</h2>
                <span>{getMinutes(pomoTime) < 10 ? `0${getMinutes(pomoTime)}` : getMinutes(pomoTime)}</span>
                <span>:</span>
                <span>{getSecond(pomoTime) < 10 ? `0${getSecond(pomoTime)}` : getSecond(pomoTime)}</span>
            </div>
            {
                isTimerWork ?
                    <button onClick={() => setIsTimerWork(false)}>
                        <PauseIcon width={20} height={20} />
                    </button>
                    : <button onClick={() => setIsTimerWork(true)}>
                        <PlayIcon width={20} height={20} />
                    </button>}
            <div>
                <span>{round}</span>
                <span>/{ROUND_TOTAL}</span>
                <span>Round</span>
            </div>
            <div>
                <span>{goal}</span>
                <span>/{GOAL_TOTAL}</span>
                <span>Goal</span>
            </div>
        </div >
    );
}

const Title = styled.h1`
    color: cornflowerblue;
`