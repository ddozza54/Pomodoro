import { useEffect } from "react";
import styled from "styled-components";
import { PlayIcon } from "../assets/Play";
import { PauseIcon } from "../assets/Pause";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isTimerWorkAtom, pomoTimeAtom } from "../atoms";
import RoundRecord from "./RoundRecord";
import GoalRecord from "./GoalRecord";
import { motion } from "framer-motion";

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
        <PomoWrapper>
            <Title>Pomodoro</Title>
            <Timer >
                <NumberText
                    variants={NumberVariants}
                    transition={{
                        type: "spring", delay: 0.2, stiffness: 210,
                    }}
                    initial="start"
                    animate="end"
                >{getMinutes(pomoTime) < 10 ? `0${getMinutes(pomoTime)}` : getMinutes(pomoTime)}</NumberText>
                <Text>:</Text>
                <NumberText
                    key={pomoTime}
                    variants={NumberVariants}
                    transition={{ type: "spring", delay: 0.2, stiffness: 210 }}
                    initial="start"
                    animate="end"
                >{getSecond(pomoTime) < 10 ? `0${getSecond(pomoTime)}` : getSecond(pomoTime)}</NumberText>
            </Timer>
            {
                isTimerWork ?
                    <PlayBtn onClick={() => setIsTimerWork(false)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}>
                        <PauseIcon width={20} height={20} />
                    </PlayBtn>
                    : <PlayBtn onClick={() => setIsTimerWork(true)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}>
                        <PlayIcon width={20} height={20} />
                    </PlayBtn>
            }
            <Scores>
                <RoundRecord />
                <GoalRecord />
            </Scores>
        </PomoWrapper >
    );
}

const PomoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 80vh;
    margin: auto;
    justify-content: space-around;
    align-items: center;
`

const Title = styled.h1`
font-weight: 800;
font-size: 3rem;
`
const Timer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
`

const Text = styled.span`
    font-size: x-large;
    font-weight: 800;
    `

const NumberText = styled(motion.span)`
    font-size: x-large;
    font-weight: 800;
    width: 6rem;
height: 8rem;
background-color: #d1baa1;
border-radius: 1rem;
display: flex;
justify-content: center;
align-items: center;
margin: 0.5rem;
box-shadow: 10px 10px 14px -7px rgba(0,0,0,0.51);
-webkit-box-shadow: 10px 10px 14px -7px rgba(0,0,0,0.51);
-moz-box-shadow: 10px 10px 14px -7px rgba(0,0,0,0.51);
`

const PlayBtn = styled(motion.button)`
border: none;
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    background-color: rgba(0,0,0,0.3);
    color: white;
`

const Scores = styled.div`
    display: flex;
    width: 80%;
    justify-content: space-around;
`

const NumberVariants = {
    start: { scale: 0, opacity: 0 },
    end: { scale: 1, opacity: 1 }
}
