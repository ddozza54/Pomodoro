import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { GOAL_TOTAL, ROUND_TOTAL, goalAtom, roundAtom } from '../atoms';

export default function GoalRecord() {
    const round = useRecoilValue(roundAtom);
    const goal = useRecoilValue(goalAtom);
    const setGoal = useSetRecoilState(goalAtom);

    useEffect(() => {
        if (round === ROUND_TOTAL) {
            setGoal(prev => prev + 1)
        }
    }, [round])

    return (
        <div>
            <div>
                <span>{goal}</span>
                <span>/{GOAL_TOTAL}</span>
                <span>Goal</span>
            </div>
        </div>
    );
}

