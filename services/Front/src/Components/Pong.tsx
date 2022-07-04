import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense
import React, { useEffect } from "react";
import { io, Socket } from "socket.io-client";

// import AuthService , {LoginDto, RegisterDto} from "../../services/auth/auth.service"
// import UserService from "../../services/auth/user.service";

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
  //STATE
  let ballX: number = props.initBallX;
  let ballY: number = props.initBallY;

  let paddleOneX: number = 0;
  let paddleOneY: number = 0;

  let paddleTwoX: number = props.width - props.paddleWidth;
  let paddleTwoY: number = 0;

  let mousePressed: boolean = false;

  let state: 0 | 1 | 2 = 0;
  let players: Array<string> = [];

  // draw
  const drawBall = (p5: p5Types) => {
    p5.ellipse(ballX, ballY, props.ballRadius, props.ballRadius);
  };
  const drawPaddleOne = (p5: p5Types) => {
    p5.rect(paddleOneX, paddleOneY, props.paddleWidth, props.paddleHeight);
  };
  const drawPaddleTwo = (p5: p5Types) => {
    p5.rect(paddleTwoX, paddleTwoY, props.paddleWidth, props.paddleHeight);
  };
  const handlePlayerOneInput = (p5: p5Types) => {
    if (!mousePressed) {
      //handle keys
      return;
    }
    if (p5.mouseY > paddleOneY + props.paddleHeight / 2 + props.paddleSpeed) {
      socket.emit("playerInput", { input: "DOWN" });
    } else if (
      p5.mouseY <
      paddleOneY + props.paddleHeight / 2 - props.paddleSpeed
    ) {
      socket.emit("playerInput", { input: "UP" });
    }
  };
  const handlePlayerTwoInput = (p5: p5Types) => {
    if (!mousePressed) {
      //handle keys
      return;
    }
    if (p5.mouseY > paddleTwoY + props.paddleHeight / 2 + props.paddleSpeed) {
      socket.emit("playerInput", { input: "DOWN" });
    } else if (
      p5.mouseY <
      paddleTwoY + props.paddleHeight / 2 - props.paddleSpeed
    ) {
      socket.emit("playerInput", { input: "UP" });
    }
  };
  // SETUP
  let canvas: p5Types.Renderer;
  let socket: Socket;
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    socket = io("ws://localhost:3001");

    // //login
    // const loginData : LoginDto = {email:"test@mail.com", password:"123456789"}
    // AuthService.login(loginData)
    // .then((d)=>{
    //   console.log("all good",d)
    //   console.log(AuthService.getCurrentUser());
    //   UserService.changeUsername(Date.now().toString())
    //   .then((e)=>{

    //   })
    // })
    // .catch(e=>{
    //   console.log("not so good",e)
    // })
    // //

    console.log("w", props.width);
    console.log("h", props.height);
    canvas = p5.createCanvas(props.width, props.height).parent(canvasParentRef);
    canvas.mousePressed(() => {
      mousePressed = true;
    });
    canvas.mouseReleased(() => {
      mousePressed = false;
    });

    socket.emit("playerJoined");

    socket.on("gameState", (data: GameState) => {
      //console.log(data);
      ballX = data.ballX;
      ballY = data.ballY;
      ballX = data.ballX;
      ballY = data.ballY;
      paddleOneX = data.paddleOneX;
      paddleOneY = data.paddleOneY;
      paddleTwoX = data.paddleTwoX;
      paddleTwoY = data.paddleTwoY;
      state = data.state;
      players = data.players;
    });
  };
  useEffect(() => {
    //console.log("bruh")
    return () => {
      if (canvas !== undefined) canvas.remove();
      if (socket !== undefined) socket.close();
    };
  }, []);

  // DRAW
  const draw = (p5: p5Types) => {
    p5.background(0);
    p5.frameRate(60);

    //print state
    //console.log(state);

    if (!state) {
      p5.fill(0xffffff);
      p5.textSize(40);
      p5.text("Waiting for opponent to join...", 50, props.height / 2);
      return;
    }
    if (state === 2) {
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
    if (players.indexOf(socket.id) === 0) handlePlayerOneInput(p5);
    if (players.indexOf(socket.id) === 1) handlePlayerTwoInput(p5);
  };

  return <Sketch setup={setup} draw={draw} />;
};

//Render using :
// <Pong
//   width={1000} height={700}
//   initBallX={500} initBallY={350} ballRadius={50} ballSpeed={10}
//   paddleWidth={30} paddleHeight={150} paddleSpeed={10}
//   />

export default Pong;
