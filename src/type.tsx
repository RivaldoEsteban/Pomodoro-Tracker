import React ,{useState, useEffect,useRef} from 'react';
import styled from 'styled-components';

const TypeStyled = styled.div`
`
type FormElement = React.FormEvent<HTMLFormElement>

function Type(): JSX.Element {
  const [state,setState] = useState<string[]>([])
  const [numberlist, setNumberList] = useState<number[]>([])
  const [count, setCount] =  useState<number>(0)
  const ref = useRef<NodeJS.Timeout>()

  useEffect(()=>{
    ref?.current && clearInterval(ref.current)
    ref.current = setInterval(()=>{
      setCount(prevState => prevState + 1)
    },1000)
  },[])

  function handleButtonClick():void{// void cuando no retorna nada
    setCount(prevState => prevState + 1)
  }
  return (
    <TypeStyled>
        <span>{count}</span>
        <button onClick={handleButtonClick}>Clickme</button>
    </TypeStyled>
  )
}

export default Type
