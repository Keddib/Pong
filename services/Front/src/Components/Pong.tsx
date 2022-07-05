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
  width: number;
  height: number;

  initBallX: number;
  initBallY: number;
  ballRadius: number;
  ballSpeed: number;

  paddleWidth: number;
  paddleHeight: number;
  paddleSpeed: number;
}

interface GameState {
  // Game variables
  ballX: number;
  ballY: number;
  ballDirX: number;
  ballDirY: number;

  paddleOneX: number;
  paddleOneY: number;

  paddleTwoX: number;
  paddleTwoY: number;

  state: 0 | 1 | 2; // 0 waiting for player to join // 1 playing // 2 opponent left
  players: Array<string>;
}

const Pong: React.FC<GameWindowProps> = (props: GameWindowProps) => {

  const [P5, setP5] = useState(0);
  // Responsivity
  let aspectRatio : number = 16/9;
  let absoluteWidth : number = 1000;
  let relativeWidth : number = props.width;
  let absoluteHeight : number = absoluteWidth / aspectRatio;
  let relativeHeight : number = relativeWidth / aspectRatio;

  console.log(aspectRatio, absoluteWidth, absoluteHeight)
  console.log(aspectRatio, relativeWidth, relativeHeight)

  //STATE
  let mousePressed: any = useRef<boolean>(false);

  let ballX: number = props.initBallX;
  let ballY: number = props.initBallY;
  let paddleOneX: number = 0;
  let paddleOneY: number = 0;
  let paddleTwoX: number = props.width - props.paddleWidth;
  let paddleTwoY: number = 0;
  var state: 0|2|1 = 0;
  let players: Array<string> = []
  const gamestatedata: any = useRef<GameState>({
    ballX,
    ballY,
    paddleOneX,
    paddleOneY,
    paddleTwoX,
    paddleTwoY,
    state,
    players,
  })
  const setGameStateData = (newVal) => {
    gamestatedata.current = {...gamestatedata.current, ...newVal}
  }
  const getGameStateData = () => gamestatedata.current;

  // draw
  const drawBall = (p5: p5Types) => {
    p5.ellipse(getGameStateData().ballX, getGameStateData().ballY, props.ballRadius, props.ballRadius);
  };
  const drawPaddleOne = (p5: p5Types) => {
    p5.rect(getGameStateData().paddleOneX, getGameStateData().paddleOneY, props.paddleWidth, props.paddleHeight);
  };
  const drawPaddleTwo = (p5: p5Types) => {
    p5.rect(getGameStateData().paddleTwoX, getGameStateData().paddleTwoY, props.paddleWidth, props.paddleHeight);
  };
  const handlePlayerOneInput = (p5: p5Types) => {
    if (!mousePressed.current) {
      //handle keys
      return;
    }

    if (p5.mouseY > getGameStateData().paddleOneY + props.paddleHeight / 2 + props.paddleSpeed) {
      socket.current.emit("playerInput", { input: "DOWN" });
    } else if (
      p5.mouseY <
      getGameStateData().paddleOneY + props.paddleHeight / 2 - props.paddleSpeed
    ) {
      socket.current.emit("playerInput", { input: "UP" });
    }
  };
  const handlePlayerTwoInput = (p5: p5Types) => {
    if (!mousePressed.current) {
      //handle keys
      return;
    }
    if (p5.mouseY > getGameStateData().paddleTwoY + props.paddleHeight / 2 + props.paddleSpeed) {
      socket.current.emit("playerInput", { input: "DOWN" });
    } else if (
      p5.mouseY <
      getGameStateData().paddleTwoY + props.paddleHeight / 2 - props.paddleSpeed
    ) {
      socket.current.emit("playerInput", { input: "UP" });
    }
  };
  //resize

  const onResize = ( p5: p5Types)=>{
    console.log("resizing", p5)

    absoluteWidth = 1000;
    relativeWidth = props.width;
  
    absoluteHeight = absoluteWidth / aspectRatio;
    relativeHeight = relativeWidth / aspectRatio;

    if(p5) p5.resizeCanvas(relativeWidth, relativeHeight);
  }

  // SETUP
  let canvas: p5Types.Renderer;
  let socket: any = useRef<Socket>(null);
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    console.log('p5 set')
    setP5(p5);
    canvas = p5.createCanvas(relativeWidth, relativeHeight).parent(canvasParentRef);

    canvas.mousePressed(() => {
      mousePressed.current = true;
    });
    canvas.mouseReleased(() => {
      mousePressed.current = false;
    });
  };
  


  useEffect(() => {
    console.log("bruh")
    socket.current = io("ws://localhost:3001").on('connect',()=>{
      console.log( socket.current)
      socket.current.emit("playerJoined");

      socket.current.on("gameState", (data: GameState) => {
        //console.log(data);

        setGameStateData(data);

      });
    });

    return () => {
      if (canvas !== undefined) canvas.remove();
      if (socket.current !== undefined) socket.current.close();
    };
  }, []);

  // DRAW
  const draw = (p5: p5Types) => {
    p5.background(0);
    p5.frameRate(60);

    //console.log(getGameStateData().state)
    if (!getGameStateData().state) {
      p5.fill(0xffffff);
      p5.textSize(40);
      p5.text("Waiting for opponent to join...", 50, props.height / 2);
      return;
    }
    if (getGameStateData().state === 2) {
      p5.fill(0xffffff);
      p5.textSize(40);
      p5.text(
        "Opponent disconnected, refresh to play again...",
        50,
        props.height / 2
      );
      return;
    }

    //ball
    drawBall(p5);
    //paddle one
    drawPaddleOne(p5);
    //paddle two
    drawPaddleTwo(p5);

    //handle input
    //console.log(socket.current)
    if (getGameStateData().players.indexOf(socket.current.id) === 0) handlePlayerOneInput(p5);
    if (getGameStateData().players.indexOf(socket.current.id) === 1) handlePlayerTwoInput(p5);
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
