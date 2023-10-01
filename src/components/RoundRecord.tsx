import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { POMO_TOTAL, ROUND_TOTAL, isTimerWorkAtom, pomoTimeAtom, roundAtom } from '../atoms';

export default function RoundRecord() {
    const pomoTime = useRecoilValue(pomoTimeAtom);
    const setPomoTime = useSetRecoilState(pomoTimeAtom);
    const round = useRecoilValue(roundAtom);
    const setRound = useSetRecoilState(roundAtom);
    const setIsTimerWork = useSetRecoilState(isTimerWorkAtom);

    useEffect(() => {
        if (pomoTime === 0) {
            setRound(prev => prev + 1);
            setPomoTime(POMO_TOTAL);
            setIsTimerWork(false);
        }
    }, [pomoTime, POMO_TOTAL])

    return (
        <div>
            <div>
                <span>{round}</span>
                <span>/{ROUND_TOTAL}</span>
                <span>Round</span>
            </div>
        </div>
    );
}

