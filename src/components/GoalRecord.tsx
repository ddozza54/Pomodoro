import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { GOAL_TOTAL, ROUND_TOTAL, goalAtom, roundAtom } from '../atoms';

export default function GoalRecord() {
    const round = useRecoilValue(roundAtom);
    const setRound = useSetRecoilState(roundAtom);
    const goal = useRecoilValue(goalAtom);
    const setGoal = useSetRecoilState(goalAtom);
    useEffect(() => {
        if (round === ROUND_TOTAL) {
            setGoal(prev => prev + 1)
            setRound(0);
        }
    }, [round])

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <div>
                <span>{goal}</span>
                <span>/{GOAL_TOTAL}</span>
            </div>
            <span>Round</span>
        </div>
    );
}

