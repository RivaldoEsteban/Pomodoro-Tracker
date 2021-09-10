import React from "react";
import styled from "styled-components";

const Button1Styled = styled.button``;

function ButtonPomodoro({ handleStart }) {
  return (
    <Button1Styled className="button start-countdown" onClick={handleStart}>
      Start Pomodoro
    </Button1Styled>
  );
}

export default ButtonPomodoro;
