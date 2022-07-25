import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense
import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useRef } from "react";

// import AuthService , {LoginDto, RegisterDto} from "../../services/auth/auth.service"
// import UserService from "../../services/auth/user.service";

/**
 * TODO:
 * 3 game modes
 * aspect ratio : 2 / 3
 * height = aspect ratio * width
 * 
 * absolute width 1000;
 * relative width 100%
 * 
 * absolute X = 720
 * relative X = 720 / absolute width * 100
 */ 

interface GameWindowProps {
  gameStateData: any;
  socket: any;
  width: number;
  height: number;
  
}

interface GameState {
  // Window dimensions
  aspectRatio: number;
  width: number;
  height: number;

  //ball
  ballX: number;
  ballY: number;
  ballDirX: number;
  ballDirY: number;
  ballSpeed: number;
  ballRadius: number;

  //paddle
  paddleWidth: number;
  paddleHeight: number;
  paddleSpeed: number;
  paddleOneX: number;
  paddleOneY: number;
  paddleTwoX: number;
  paddleTwoY: number;

  state: 0 | 1 | 2 | 3 | 4;

  scores: Array<number>;
  maxScore : number;
  players: Array<string>;
  timestamp: number;

  done: boolean;

  winner : string ;

}

const Pong: React.FC<GameWindowProps> = (props: GameWindowProps) => {

    const [P5, setP5] = useState(null);
  //let socket: any = useRef<Socket>(null);
  const setGameStateData = (newVal) => {
    gamestatedata.current = {...gamestatedata.current, ...newVal}
  }
  const getGameStateData = () : GameState => props.gameStateData.current;
  
  // console.log(props.height, props.width, "props")
  // Responsiveness
  let aspectRatio : number = getGameStateData().aspectRatio;

  let absoluteWidth : number = getGameStateData().width;
  let relativeWidth : number = props.width;

  let absoluteHeight : number = absoluteWidth / aspectRatio; // 
  let relativeHeight : number = relativeWidth / aspectRatio; // if any of these overflowas section dimensions, we scale based on the one that over flows

  let scalingRatio : number = relativeWidth / absoluteWidth; 
  if (relativeHeight > props.height){
      absoluteHeight = getGameStateData().height;
      relativeHeight = props.height;
      absoluteWidth = absoluteHeight * aspectRatio; // 
      relativeWidth = relativeHeight * aspectRatio; // if any of these overflowas section dimensions, we scale based on the one that over flows
      scalingRatio = relativeHeight / absoluteHeight; 
  }
  // console.log("scalingRatio", scalingRatio, getGameStateData().paddleHeight, getGameStateData().paddleHeight * scalingRatio)

  // console.log(aspectRatio, absolutewidth, absoluteHeight)
  // console.log(aspectRatio, relativeWidth, relativeHeight)



  //STATE
  let mousePressed = useRef<boolean>(false);

  let ballX: number = getGameStateData().initBallX;
  let ballY: number = getGameStateData().initBallY;
  let paddleOneX: number = 0;
  let paddleOneY: number = 0;
  let paddleTwoX: number = getGameStateData().width - getGameStateData().paddleWidth;
  let paddleTwoY: number = 0;
  var state: 0|2|1|3|4 = 0;
  let players: Array<string> = []
  const gamestatedata = useRef<GameState>({
    ballX,
    ballY,
    paddleOneX,
    paddleOneY,
    paddleTwoX,
    paddleTwoY,
    state,
    players,
  })


  // draw
  const drawBall = (p5: p5Types) => {

    p5.ellipse(getGameStateData().ballX * scalingRatio, getGameStateData().ballY * scalingRatio, getGameStateData().ballRadius * scalingRatio, getGameStateData().ballRadius * scalingRatio);
  };
  const drawPaddleOne = (p5: p5Types) => {
    p5.rect(getGameStateData().paddleOneX * scalingRatio, getGameStateData().paddleOneY * scalingRatio, getGameStateData().paddleWidth * scalingRatio, getGameStateData().paddleHeight * scalingRatio);
  };
  const drawPaddleTwo = (p5: p5Types) => {
    p5.rect(getGameStateData().paddleTwoX * scalingRatio, getGameStateData().paddleTwoY * scalingRatio, getGameStateData().paddleWidth * scalingRatio, getGameStateData().paddleHeight * scalingRatio);
  };
  const handlePlayerOneInput = (p5: p5Types) => {
    if (!mousePressed.current) {
      //handle keys
      return;
    }

    if (p5.mouseY >
      getGameStateData().paddleOneY  * scalingRatio + getGameStateData().paddleHeight * scalingRatio / 2 + getGameStateData().paddleSpeed * scalingRatio) {
      props.socket.current.emit("playerInput", { input: "DOWN" });
    } else if (
      p5.mouseY <
      getGameStateData().paddleOneY * scalingRatio + getGameStateData().paddleHeight * scalingRatio / 2 - getGameStateData().paddleSpeed * scalingRatio
    ) {
      props.socket.current.emit("playerInput", { input: "UP" });
    }
  };
  const handlePlayerTwoInput = (p5: p5Types) => {
    if (!mousePressed.current) {
      //handle keys
      return;
    }
    if (p5.mouseY > getGameStateData().paddleTwoY * scalingRatio +getGameStateData().paddleHeight * scalingRatio / 2 +getGameStateData().paddleSpeed * scalingRatio) {
      props.socket.current.emit("playerInput", { input: "DOWN" });
    } else if (
      p5.mouseY <
      getGameStateData().paddleTwoY * scalingRatio + getGameStateData().paddleHeight * scalingRatio / 2 - getGameStateData().paddleSpeed * scalingRatio
    ) {
      props.socket.current.emit("playerInput", { input: "UP" });
    }
  };
  //resize
  // useEffect(()=>{
  //   absoluteWidth = getGameStateData().width;
  //   relativeWidth = props.width;
   
  //   absoluteHeight = absoluteWidth / aspectRatio;
  //   relativeHeight = relativeWidth / aspectRatio;

  //   scalingRatio = relativeWidth / absoluteWidth; 
  //   if (relativeHeight > props.height){
  //     absoluteHeight = getGameStateData().height;
  //     relativeHeight = props.height;
  //     absoluteWidth = absoluteHeight / aspectRatio; // 
  //     relativeWidth = relativeHeight / aspectRatio; // if any of these overflowas section dimensions, we scale based on the one that over flows
  //     scalingRatio = relativeHeight / absoluteHeight; 
  //   }
  //   if(P5) P5.resizeCanvas(props.width, relativeHeight);
  // },[props.width, props.height])
  const onResize = ( p5: p5Types)=>{
    // console.log("resizing", props.width, props.height)
    absoluteWidth = getGameStateData().width;
    relativeWidth = props.width;
    absoluteHeight = absoluteWidth / aspectRatio;
    relativeHeight = relativeWidth / aspectRatio;
    scalingRatio = relativeWidth / absoluteWidth; 
    if (relativeHeight > props.height){
      absoluteHeight = getGameStateData().height;
      relativeHeight = props.height;
      absoluteWidth = absoluteHeight * aspectRatio; // 
      relativeWidth = relativeHeight * aspectRatio; // if any of these overflowas section dimensions, we scale based on the one that over flows
      scalingRatio = relativeHeight / absoluteHeight;  
  }
    if(p5) p5.resizeCanvas(props.width, relativeHeight);
  }

  // SETUP
  let canvas: p5Types.Renderer;
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    setP5(p5);
    // if(relativeWidth<getGameStateData().width)
      canvas = p5.createCanvas(props.width, relativeHeight).parent(canvasParentRef);
    canvas.mousePressed(() => {
      mousePressed.current = true;
    });
    canvas.mouseReleased(() => {
      mousePressed.current = false;
    });
  };
  
  useEffect(() => {
    // console.log("canvas mounted")
    return () => {
      if (canvas !== undefined) canvas.remove();
    };
  }, []);

  // DRAW
  // States : 0 in queue // 1 playing ? // 3 waiting 
  let ping : number = 0;
  const draw = (p5: p5Types) => {
    p5.clear()
    p5.frameRate(60);
    if(relativeWidth<props.width)
      p5.translate((props.width-relativeWidth)/2,0);

    //console.log(getGameStateData().state)
    // if (getGameStateData().state === 0 ) {
    //   p5.fill(0xffffff);
    //   p5.textSize(40);
    //   p5.text("Waiting for opponent to join...", 50, props.height / 2);
    //   return;
    // }
    p5.push()
    p5.fill(0xffffff);
    p5.textSize(40);
    p5.text(
      getGameStateData().scores[0]+" - "+getGameStateData().scores[1]+" state : "+getGameStateData().state,
      getGameStateData().width/ 4,
      getGameStateData().height / 4
    );
    p5.pop();


    // if (getGameStateData().state === 2) {
    //   p5.fill(0xffffff);
    //   p5.textSize(40);
    //   p5.text(
    //     "Opponent disconnected, refresh to play again...",
    //     50,
    //     props.height / 2
    //   );
    //   return;
    // }

      //gameover state

    if (getGameStateData().state === 4) {
      const scores = getGameStateData().scores;
      let winner =  getGameStateData().players[scores[0] > scores[1] ? 0 : 1]
      winner = getGameStateData().winner !== "" ? getGameStateData().winner : (scores[0] == scores[1] ? "Tie": winner);
      p5.fill(0xffffff);
      p5.textSize(40);
      if (scores[0] < getGameStateData().maxScore && scores[1] < getGameStateData().maxScore && !getGameStateData().done)
      {
        p5.text(
          "A player disconnected",
          50,
          getGameStateData().height / 2
        );
      }
      else{
        p5.text(
          winner == "Tie" ? "Tie" : (winner == props.socket.current.id ? "Victory" : "Defeat"),
          50,
          getGameStateData().height / 2
        );
      }
      return;
    }

      //ping
    if(p5.frameCount % 40 == 0)
      ping = Date.now()-getGameStateData().timestamp;
    p5.textSize(15);
    p5.text(
      "ping : "+ping+"ms",
      getGameStateData().width/ 2,
      40
    );

    //waiting for player to start the game
    if (getGameStateData().state === 3) {
      p5.fill(0xffffff);
      p5.textSize(40);
      const scores = getGameStateData().scores;
      const scoresSum = scores[0] + scores[1];
      //console.log(scoresSum%2,getGameStateData().players, getGameStateData().players[scoresSum%2])
      p5.text(
        props.socket.current.id === getGameStateData().players[scoresSum % 2]?
        "Click on the screen to start the game ":
        "Waiting for oponent to start the game",
        50,
        3*(getGameStateData().height / 8)
      );
      //return;
    }

    // boundaries for game window
    p5.push()

    p5.stroke(255)

    p5.line(1, 0, 1, relativeHeight)
    p5.line(relativeWidth-1, 0, relativeWidth -1, relativeHeight)

    p5.line(1, 1, relativeWidth, 1)
    p5.line(1, relativeHeight - 1, relativeWidth + 1, relativeHeight - 1)

    p5.pop()
  
    //ball
    drawBall(p5);
    //paddle one
    drawPaddleOne(p5);
    //paddle two
    drawPaddleTwo(p5);

    //handle input
    //console.log(socket.current)
    if (getGameStateData().players.indexOf(props.socket.current.id) === 0) handlePlayerOneInput(p5);
    if (getGameStateData().players.indexOf(props.socket.current.id) === 1) handlePlayerTwoInput(p5);
  };

  return <Sketch setup={setup} draw={draw} windowResized={onResize}/>;
};

//Render using :
// <Pong
//   width={1000} height={700}
//   initBallX={500} initBallY={350} ballRadius={50} ballSpeed={10}
//   paddleWidth={30} paddleHeight={150} paddleSpeed={10}
//   />

export default Pong;
