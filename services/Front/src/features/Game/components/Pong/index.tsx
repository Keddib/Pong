import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense
import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useRef } from "react";
import { GameState, GameWindowProps, GoalKeeperConfig, DoublePaddleConfig} from "./utils/Types";

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



const Pong: React.FC<GameWindowProps> = (props: GameWindowProps) => {
  const [P5, setP5] = useState<p5Types | null>(null);
  const getGameStateData = (): GameState => props.gameStateData.current;
  let aspectRatio: number = getGameStateData().aspectRatio;

  let absoluteWidth: number = getGameStateData().width;
  let relativeWidth: number = props.width;

  let absoluteHeight: number = absoluteWidth / aspectRatio; //
  let relativeHeight: number = relativeWidth / aspectRatio; // if any of these overflowas section dimensions, we scale based on the one that over flows

  let scalingRatio: number = relativeWidth / absoluteWidth;
  if (relativeHeight > props.height) {
    absoluteHeight = getGameStateData().height;
    relativeHeight = props.height;
    absoluteWidth = absoluteHeight * aspectRatio; //
    relativeWidth = relativeHeight * aspectRatio; // if any of these overflowas section dimensions, we scale based on the one that over flows
    scalingRatio = relativeHeight / absoluteHeight;
  }

  //STATE
  let mousePressed = useRef<boolean>(false);

  // let ballX: number = getGameStateData().initBallX;
  // let ballY: number = getGameStateData().initBallY;
  // let paddleOneX: number = 0;
  // let paddleOneY: number = 0;
  // let paddleTwoX: number =
  //   getGameStateData().width - getGameStateData().paddleWidth;
  // let paddleTwoY: number = 0;
  // var state: 0 | 2 | 1 | 3 | 4 = 0;
  // let players: Array<string> = [];

  // draw
  const drawBall = (p5: p5Types) => {
    p5.ellipse(
      getGameStateData().ballX * scalingRatio,
      getGameStateData().ballY * scalingRatio,
      getGameStateData().ballRadius * 2 * scalingRatio,
      getGameStateData().ballRadius * 2 * scalingRatio
    );
  };
  const drawPaddleOne = (p5: p5Types) => {
    let g = getGameStateData()
    p5.rect(
      g.paddleOneX * scalingRatio,
      g.paddleOneY * scalingRatio,
      g.paddleWidth * scalingRatio,
      g.paddleHeight * scalingRatio
    );
    if (g.mode.toLowerCase() === "doublepaddle" && g.gameModeConfig != null){
      p5.rect(
        (g.paddleOneX + (g.gameModeConfig as DoublePaddleConfig).paddleXOffset * g.width) * scalingRatio,
        (g.paddleOneY + (g.gameModeConfig as DoublePaddleConfig).paddleYOffset * g.height)* scalingRatio,
        g.paddleWidth * scalingRatio,
        g.paddleHeight * scalingRatio
      );
    }
  };
  const drawPaddleTwo = (p5: p5Types) => {
    let g = getGameStateData()
    if(g.mode.toLowerCase() === "classic")
      p5.rect(
        g.paddleTwoX * scalingRatio,
        g.paddleTwoY * scalingRatio,
        g.paddleWidth * scalingRatio,
        g.paddleHeight * scalingRatio
      );
    if (g.mode.toLowerCase() === "doublepaddle" && g.gameModeConfig != null){
      p5.rect(
        (g.paddleTwoX - (g.gameModeConfig as DoublePaddleConfig).paddleXOffset * g.width) * scalingRatio,
        g.paddleTwoY * scalingRatio,
        g.paddleWidth * scalingRatio,
        g.paddleHeight * scalingRatio
      );
      p5.rect(
        g.paddleTwoX  * scalingRatio,
        (g.paddleTwoY + (g.gameModeConfig as DoublePaddleConfig).paddleYOffset * g.height) * scalingRatio,
        g.paddleWidth * scalingRatio,
        g.paddleHeight * scalingRatio
      );
    }
    if (g.mode.toLowerCase() === "goalkeeper" && g.gameModeConfig != null){
      p5.rect(
        g.paddleTwoX * scalingRatio,
        g.paddleTwoY * scalingRatio,
        g.paddleWidth * scalingRatio,
        g.paddleHeight * scalingRatio
      );
    }
    
  };
  const drawBoundaries = (p5: p5Types)=>{
    p5.push();
    p5.stroke(255);
    p5.line(1, 0, 1, relativeHeight);
    p5.line(relativeWidth - 1, 0, relativeWidth - 1, relativeHeight);
    p5.line(1, 1, relativeWidth, 1);
    p5.line(1, relativeHeight - 1, relativeWidth + 1, relativeHeight - 1);
    const r = 50
    for (let i = 0; i < relativeHeight; i+=r){
      p5.line(relativeWidth / 2, i, relativeWidth / 2, i + r*0.8);
    }
    let g = getGameStateData()
    if (g.mode.toLowerCase() === "goalkeeper" && g.gameModeConfig != null){
      p5.noStroke()
      p5.fill("#47649e")
      p5.rect( // top
        0,
        0,
        relativeWidth,
        relativeHeight * (g.gameModeConfig as GoalKeeperConfig).borderSize
      );
      p5.rect( // bot
        0,
        relativeHeight * (1 - (g.gameModeConfig as GoalKeeperConfig).borderSize),
        relativeWidth,
        relativeHeight * (g.gameModeConfig as GoalKeeperConfig).borderSize
      );
      p5.rect( // top left
        0,
        0,
        relativeHeight * (g.gameModeConfig as GoalKeeperConfig).borderSize,
        relativeHeight * (0.5 - (g.gameModeConfig as GoalKeeperConfig).goalSize / 2)
      );
      p5.rect(//bot left
        0,
        relativeHeight * (0.5 + (g.gameModeConfig as GoalKeeperConfig).goalSize / 2),
        relativeHeight * (g.gameModeConfig as GoalKeeperConfig).borderSize,
        relativeHeight * (0.5 - (g.gameModeConfig as GoalKeeperConfig).goalSize / 2)
      );
      p5.rect(//top right
        relativeWidth - relativeHeight * (g.gameModeConfig as GoalKeeperConfig).borderSize,
        0,
        relativeHeight * (g.gameModeConfig as GoalKeeperConfig).borderSize,
        relativeHeight * (0.5 - (g.gameModeConfig as GoalKeeperConfig).goalSize / 2)
      );
      p5.rect(//top right
        relativeWidth - relativeHeight * (g.gameModeConfig as GoalKeeperConfig).borderSize,
        relativeHeight * (0.5 + (g.gameModeConfig as GoalKeeperConfig).goalSize / 2),
        relativeHeight * (g.gameModeConfig as GoalKeeperConfig).borderSize,
        relativeHeight * (0.5 - (g.gameModeConfig as GoalKeeperConfig).goalSize / 2)
      );
    }
    p5.pop();
  }
  const drawClickToStartText = (p5: p5Types) => {
    if (getGameStateData().state === 3) {
      p5.fill(0xffffff);
      p5.textSize(relativeWidth * 5 / 100);
      if(getGameStateData().mode.toLowerCase() === "goalkeeper")
        p5.textSize(relativeWidth * 5 / 100 * (1 - (getGameStateData().gameModeConfig as GoalKeeperConfig).borderSize));

      p5.textAlign(p5.CENTER)
      const scores = getGameStateData().scores;
      const scoresSum = scores[0] + scores[1];
      //console.log(scoresSum%2,getGameStateData().players, getGameStateData().players[scoresSum%2])
      p5.text(
        props.socket.current.id === getGameStateData().players[scoresSum % 2]
          ? "Click on the screen to start the game "
          : "Waiting for oponent to start the game",
        relativeWidth/2,
        5 * (relativeHeight / 8)
      );
    }
  }
  const drawDisconnectOrFinalOutcome = (p5:p5Types) : boolean=>{
    if (getGameStateData().state === 4) {
      const scores = getGameStateData().scores;
      let winner = getGameStateData().players[scores[0] > scores[1] ? 0 : 1];
      winner = 
        getGameStateData().winner !== ""
          ? getGameStateData().winner
          : scores[0] == scores[1]
          ? "Tie"
          : winner;
      p5.fill(0xffffff);
      
      p5.textAlign(p5.CENTER)
      if (
        scores[0] < getGameStateData().maxScore &&
        scores[1] < getGameStateData().maxScore &&
        !getGameStateData().done
      ) {
        p5.textSize(relativeHeight * 7 / 100);
        const countdownTillVictory =
          getGameStateData().timeoutPeriodInSeconds -
          Math.ceil((Date.now() - getGameStateData().timeout) / 1000) +
          1;
        p5.text(
          "Opponenent disconnected, You win in " + countdownTillVictory,
          relativeWidth/2,
          relativeHeight / 2
        );
      } else {
        p5.textSize(relativeHeight * 20 / 100);
        p5.text(
          winner == "Tie"
            ? "Tie"
            : winner == props.socket.current.id
            ? "Victory"
            : "Defeat",
          relativeWidth/2,
          relativeHeight / 2 + 50
        );
      }
      return true;
    }
    return false;
  }
  const drawPing = (p5:p5Types)=>{
    p5.push()
    if (p5.frameCount % 40 == 0)
      ping = Date.now() - getGameStateData().timestamp;
    p5.textSize(15);
    p5.textAlign(p5.CENTER)
    p5.text("ping : " + ping + "ms", relativeWidth - getGameStateData().paddleWidth * scalingRatio - 100 , 40);
    p5.text(
        "state : " +
        getGameStateData().state,
        relativeWidth - getGameStateData().paddleWidth * scalingRatio - 100 , 55
    );
    p5.pop()
  }

  const drawScore = (p5: p5Types)=>{
    p5.push();
    p5.fill(0xffffff);
    p5.textSize(relativeHeight * 20 / 100);
    p5.textAlign(p5.CENTER)
    p5.text(
      getGameStateData().scores[0],
      (relativeWidth / 16) * 7 ,
      relativeHeight / 4 + 
      (getGameStateData().mode.toLowerCase() === "goalkeeper" ? 
          (getGameStateData().gameModeConfig as GoalKeeperConfig).borderSize * relativeHeight :
          0
        )
    );
    p5.text(
      getGameStateData().scores[1],
      (relativeWidth / 16) * 9,
      relativeHeight / 4 + 
      (getGameStateData().mode.toLowerCase() === "goalkeeper" ? 
          (getGameStateData().gameModeConfig as GoalKeeperConfig).borderSize * relativeHeight :
          0
        )
    );
    p5.pop();

  }
  const initDraw = (p5: p5Types)=>{
    p5.clear();
    p5.frameRate(60);
    if (relativeWidth < props.width)
      p5.translate((props.width - relativeWidth) / 2, 0);
  }
  const handlePlayerOneInput = (p5: p5Types) => {
    if (!mousePressed.current) {
      //handle keys
      return;
    }
    if (
      p5.mouseY >
      getGameStateData().paddleOneY * scalingRatio +
        (getGameStateData().paddleHeight * scalingRatio) / 2 +
        getGameStateData().paddleSpeed * scalingRatio
    ) {
      props.socket.current.emit("playerInput", { input: "DOWN" });
    } else if (
      p5.mouseY <
      getGameStateData().paddleOneY * scalingRatio +
        (getGameStateData().paddleHeight * scalingRatio) / 2 -
        getGameStateData().paddleSpeed * scalingRatio
    ) {
      props.socket.current.emit("playerInput", { input: "UP" });
    }
  };
  const handlePlayerTwoInput = (p5: p5Types) => {
    if (!mousePressed.current) {
      //handle keys
      return;
    }
    if (
      p5.mouseY >
      getGameStateData().paddleTwoY * scalingRatio +
        (getGameStateData().paddleHeight * scalingRatio) / 2 +
        getGameStateData().paddleSpeed * scalingRatio
    ) {
      props.socket.current.emit("playerInput", { input: "DOWN" });
    } else if (
      p5.mouseY <
      getGameStateData().paddleTwoY * scalingRatio +
        (getGameStateData().paddleHeight * scalingRatio) / 2 -
        getGameStateData().paddleSpeed * scalingRatio
    ) {
      props.socket.current.emit("playerInput", { input: "UP" });
    }
  };

  const onResize = (p5: p5Types) => {
    // console.log("resizing", props.width, props.height)
    absoluteWidth = getGameStateData().width;
    relativeWidth = props.width;
    absoluteHeight = absoluteWidth / aspectRatio;
    relativeHeight = relativeWidth / aspectRatio;
    scalingRatio = relativeWidth / absoluteWidth;
    if (relativeHeight > props.height) {
      absoluteHeight = getGameStateData().height;
      relativeHeight = props.height;
      absoluteWidth = absoluteHeight * aspectRatio; //
      relativeWidth = relativeHeight * aspectRatio; // if any of these overflowas section dimensions, we scale based on the one that over flows
      scalingRatio = relativeHeight / absoluteHeight;
    }
    if (p5) p5.resizeCanvas(props.width, relativeHeight);
  };

  // SETUP
  let canvas: p5Types.Renderer;
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    setP5(p5);
    // if(relativeWidth<getGameStateData().width)
    canvas = p5
      .createCanvas(props.width, relativeHeight)
      .parent(canvasParentRef);
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
  let ping: number = 0;
  const draw = (p5: p5Types) => {
    //init
    initDraw(p5);

    // score
    drawScore(p5);

    // boundaries for game window
    drawBoundaries(p5)

    // final outcome
    if (drawDisconnectOrFinalOutcome(p5)) return;

    //ping
    drawPing(p5);

    //waiting for player to start the game
    drawClickToStartText(p5);

    //ball
    drawBall(p5);
    //paddle one
    drawPaddleOne(p5);
    //paddle two
    drawPaddleTwo(p5);

    //handle input
    //console.log(socket.current)
    if (getGameStateData().players.indexOf(props.socket.current.id) === 0)
      handlePlayerOneInput(p5);
    if (getGameStateData().players.indexOf(props.socket.current.id) === 1)
      handlePlayerTwoInput(p5);
  };

  return <Sketch setup={setup} draw={draw} windowResized={onResize} />;
};

export default Pong;
