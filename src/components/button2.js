import React, { useRef, useEffect } from "react";
import styled from "styled-components";

const Button2Styled = styled.button``;

function Button2({ text, buttonRef, coundownState, active, currentTime }) {
  const button = useRef(null);
  useEffect(() => {
    buttonRef(button.current);
  }, [buttonRef]);

  return (
    <Button2Styled
      className={
        active
          ? "button pause-countdown active"
          : "button pause-countdown disabled"
      }
      ref={button}
      onClick={coundownState}
    >
      {currentTime
        ? text
          ? "Pause pomodoro"
          : "Play Pomodoro"
        : text
        ? "Pause Break"
        : "Play Break"}
    </Button2Styled>
  );
}

export default Button2;
