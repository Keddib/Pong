import Pong from "../../../Components/Game"
import React, {useEffect} from "react"
export default function Game() {
    useEffect(() => {

        function handleResize() {
    
          console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)
    
        
    
    }
    
    
        window.addEventListener('resize', handleResize)
    
      })
    return (
    <div>
        <h1>Game</h1>
        <Pong
              width={1000} height={700}
              initBallX={500} initBallY={350} ballRadius={50} ballSpeed={10}
              paddleWidth={30} paddleHeight={150} paddleSpeed={10}
            />
    </div>
    )
}
  