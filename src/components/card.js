/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import "../css/card.css";
import Time from "./time";
import ButtonPomodoro from "./button1";
import Button2 from "./button2";
import Buttonbreak from "./buttonBreak";

function Card() {
  ///false = play , true = pause
  const [controls, setControls] = useState(false);

  //tiempo de la cuenta regresiva
  const [timePomodoro, setTimePomodoro] = useState(1500);
  const [timeBreak, setTimeBreak] = useState(10);
  const [pomodoroActive, setPomodoroActive] = useState(true);
  const [time, setTime] = useState(true);
  //color del cronómetro
  const [color, setColor] = useState("var(--pink)");

  //button2
  const [buttonRef, setButtonRef] = useState();
  const [buttonActive, setButtonActive] = useState(false);

  const intervalo = useRef(null);
  const breakInterval = useRef(null);

  function handleStartCountdown() {
    clearInterval(breakInterval.current);
    setTime(true);
    setPomodoroActive(false);
    setButtonActive(true); //estilo activo al boton de pause/play
    setControls(true); //cambiando el label del boton a pause

    setTimePomodoro(1500);
    setColor("var(--pink)");
    intervalo.current = setInterval(() => {
      setTimePomodoro((prevState) => prevState - 1);
    }, 1000);
  }

  function handleStartBreak() {
    clearInterval(intervalo.current);
    setTime(false);
    setPomodoroActive(true);
    setButtonActive(true); //estilo activo al boton de pause/play
    setControls(true); //cambiando el label del boton a pause

    setTimeBreak(5);
    setColor("var(--green)");
    breakInterval.current = setInterval(() => {
      setTimeBreak((prevState) => prevState - 1);
    }, 1000);
  }

  function coundownState() {
    const labelButton = buttonRef.textContent.toLowerCase();
    if (labelButton.includes("pause")) {
      setControls(false);
      clearInterval(intervalo.current);
      clearInterval(breakInterval.current);
    } else {
      setControls(true);
      if (pomodoroActive) {
        setColor("var(--green)");
        breakInterval.current = setInterval(() => {
          setTimeBreak((prevState) => prevState - 1);
        }, 1000);
      } else {
        setColor("var(--pink)");
        intervalo.current = setInterval(() => {
          setTimePomodoro((prevState) => prevState - 1);
        }, 1000);
      }
    }
  }

  if (timePomodoro === 0) {
    clearInterval(intervalo.current);
  }
  if (timeBreak === 0) {
    clearInterval(breakInterval.current);
  }

  return (
    <div className="card-container  animate__animated animate__bounceInDown">
      <div className="card-content">
        <h2 className="title">Pomodoro Tracker</h2>
        <Time time={time ? timePomodoro : timeBreak} color={color} />
        {pomodoroActive ? (
          <ButtonPomodoro handleStart={handleStartCountdown} />
        ) : (
          <Buttonbreak handleStart={handleStartBreak} />
        )}
        <Button2
          buttonRef={setButtonRef}
          text={controls}
          coundownState={coundownState}
          active={buttonActive}
          currentTime={time}
        />
      </div>
    </div>
  );
}

export default Card;
