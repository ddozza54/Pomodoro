import { atom } from "recoil";

export const isTimerWorkAtom = atom({
    key: "isTimerWork",
    default: false
})

export const POMO_TOTAL = 25 * 60;
// export const POMO_TOTAL = 5;
export const pomoTimeAtom = atom({
    key: "pomoTime",
    default: POMO_TOTAL,
})


export const ROUND_TOTAL = 4;
export const roundAtom = atom({
    key: "round",
    default: 0,
})

export const GOAL_TOTAL = 12;
export const goalAtom = atom({
    key: "goal",
    default: 0
})