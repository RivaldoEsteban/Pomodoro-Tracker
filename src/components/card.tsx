/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import "../css/card.css";
import Time from "./time";
import ButtonPomodoro from "./button1";
import Button2 from "./button2";
import Buttonbreak from "./buttonBreak";

function Card() :JSX.Element {
  ///false = play , true = pause
  const [controls, setControls] = useState<boolean>(false);

  //tiempo de la cuenta regresiva
  const [timePomodoro, setTimePomodoro] = useState<number>(1500);
  const [timeBreak, setTimeBreak] = useState<number>(300);
  const [pomodoroActive, setPomodoroActive] = useState<boolean>(true);
  const [time, setTime] = useState<boolean>(true);
  //color del cronómetro
  const [color, setColor] = useState<string>("var(--pink)");

  //button2
  const [buttonRef, setButtonRef] = useState<any>();
  const [buttonActive, setButtonActive] = useState<boolean>(false);

  const intervalo = useRef<NodeJS.Timeout>();
  const breakInterval = useRef<NodeJS.Timeout>();

  function handleStartCountdown():void {
    breakInterval?.current && clearInterval(breakInterval.current);
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

  function handleStartBreak():void{
    intervalo?.current && clearInterval(intervalo.current);
    setTime(false);
    setPomodoroActive(true);
    setButtonActive(true); //estilo activo al boton de pause/play
    setControls(true); //cambiando el label del boton a pause

    setTimeBreak(300);
    setColor("var(--green)");
    breakInterval.current = setInterval(() => {
      setTimeBreak((prevState) => prevState - 1);
    }, 1000);
  }

  function coundownState() :void{
    const labelButton:string = buttonRef.textContent.toLowerCase();
    if (labelButton.includes("pause")) {
      setControls(false);
      intervalo?.current && clearInterval(intervalo.current);
      breakInterval?.current && clearInterval(breakInterval.current);
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
    intervalo?.current && clearInterval(intervalo.current);
  }
  if (timeBreak === 0) {
    breakInterval?.current && clearInterval(breakInterval.current);
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
