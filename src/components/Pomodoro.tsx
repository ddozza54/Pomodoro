import { useEffect } from "react";
import styled from "styled-components";
import { PlayIcon } from "../assets/Play";
import { PauseIcon } from "../assets/Pause";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isTimerWorkAtom, pomoTimeAtom } from "../atoms";
import RoundRecord from "./RoundRecord";
import GoalRecord from "./GoalRecord";


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
    const pomoTime = useRecoilValue(pomoTimeAtom);
    const setPomoTime = useSetRecoilState(pomoTimeAtom);
    const isTimerWork = useRecoilValue(isTimerWorkAtom);
    const setIsTimerWork = useSetRecoilState(isTimerWorkAtom);

    useEffect(() => {
        if (isTimerWork) {
            const timer = setInterval(() => {
                pomoTime > 0
                    && setPomoTime(prev => prev - 1)
            }, 1000);
            return () => clearInterval(timer)
        }
    }, [pomoTime, isTimerWork])

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
            <RoundRecord />
            <GoalRecord />
        </div >
    );
}

const Title = styled.h1`
    color: cornflowerblue;
`