import React from "react";
import styled from "styled-components";

const ButtonbreakStyled = styled.button``;

function Buttonbreak({ handleStart }) {
  return (
    <ButtonbreakStyled className="button start-countdown" onClick={handleStart}>
      Start Break
    </ButtonbreakStyled>
  );
}

export default Buttonbreak;
