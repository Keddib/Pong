import Pong from "../../../Components/Game"
import React, { useEffect, useState, useRef } from "react"
export default function Game(props) {
  window.addEventListener('load', () =>{
    setSectionWidth(props.props.parentRef.current.clientWidth);
    setSectionHeight(props.props.parentRef.current.clientHeight);
    console.log(sectionWidth, sectionHeight)
  })

  const [sectionWidth, setSectionWidth] = useState(0)
  const [sectionHeight, setSectionHeight] = useState(0)
  const [padding, setPadding] = useState(20); // 1.5 rem

  useEffect(()=>{
    setSectionWidth(props.props.parentRef.current.clientWidth);
    setSectionHeight(props.props.parentRef.current.clientHeight);
    console.log(props.props.parentRef.current)
    const pad = Number.parseInt(window.getComputedStyle(props.props.parentRef.current, null).getPropertyValue('padding').slice(0,2)) * 2
    console.log(pad);
    setPadding(pad);
  },[])
  

  return (
    <div>
      {/* <h1>Game</h1> */}
      <Pong
              width={sectionWidth - padding} height={sectionHeight - padding}
              initBallX={500} initBallY={350} ballRadius={50} ballSpeed={10}
              paddleWidth={30} paddleHeight={150} paddleSpeed={10}
            />
    </div>
  )
}
