import React from "react";
import styled from "styled-components";

const TimeStyled = styled.div`
  background: ${(props) => props.color || "var(--pink)"};
  .countdown {
    color: ${(props) => props.color || "var(--pink)"};
  }
`;

function Time({ time, color }) {
  let minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "00");
  let seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "00");

  return (
    <TimeStyled className="countdown-container" color={color}>
      <div className="countdown-content">
        <span className="countdown">{`${minutes}:${seconds}`}</span>
      </div>
    </TimeStyled>
  );
}

export default Time;
