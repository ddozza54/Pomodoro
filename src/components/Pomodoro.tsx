import styled from "styled-components";

export default function Pomodoro() {
    return (
        <div>
            <Title>Pomodoro</Title>
            <div>
                <h2>Timer</h2>
                <span>24</span>
                <span>:</span>
                <span>45</span>
            </div>
            <div>
                <span>0/4</span>
                <span>Round</span>
            </div>
            <div>
                <span>0/12</span>
                <span>Goal</span>
            </div>
        </div>
    );
}

const Title = styled.h1`
    color: cornflowerblue;
`