import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import GlobalStyle from "./GlobalStyle";

const WALL_HEIGHT = 650;
const Wall_width = 700;
const doreaemon_height = 80;
const doreaemon_width = 70;
const Gravity = 4;
const OBJ_WIDTH = 52;
const objgap = 200;
const obj_speed = 8;

const App = () => {
  const [dorapos, setdoraposition] = useState(255);
  const [isstart, setIsstart] = useState(false);
  const [objHeight, setobjheight] = useState(200);
  const [objpos, setobjpos] = useState(Wall_width);
  const [score, setscore] = useState(0);
  const [bestScore, setBestScore] = useState(
    localStorage.getItem("bestScore") || 0
  );

  const updateBestScore = useCallback(
    (newScore) => {
      if (newScore > bestScore) {
        setBestScore(newScore);
        localStorage.setItem("bestScore", newScore.toString());
      }
    },
    [bestScore]
  );

  useEffect(() => {
    let doraval;
    if (isstart && dorapos < WALL_HEIGHT - doreaemon_height) {
      doraval = setInterval(() => {
        setdoraposition((dorapos) => dorapos + Gravity);
      }, 16);
    }
    return () => clearInterval(doraval);
  });

  useEffect(() => {
    let objVal;
    if (isstart && objpos >= -OBJ_WIDTH) {
      objVal = setInterval(() => {
        setobjpos((objpos) => objpos - obj_speed);
      }, 16);
    } else {
      setobjpos(Wall_width - OBJ_WIDTH);
      setobjheight(Math.floor(Math.random() * (WALL_HEIGHT - objgap - objHeight)));

      if (isstart) {
        setscore((score) => {
          const newScore = score + 1;
          updateBestScore(newScore);
          return newScore;
        });
      }
    }

    return () => clearInterval(objVal);
  }, [isstart, objpos, objHeight, score, updateBestScore]);

  useEffect(() => {
    const handleCollison = () => {
      let topobj = dorapos >= 0 && dorapos < objHeight;
      let bottomobj =
        dorapos <= WALL_HEIGHT &&
        dorapos >= WALL_HEIGHT - (WALL_HEIGHT - objgap - objHeight) - doreaemon_height;
      if (objpos >= 0 && objpos <= OBJ_WIDTH && (topobj || bottomobj)) {
        setIsstart(false);
        setdoraposition(255);
        setscore(0);
      }
    };
    handleCollison();
  }, [isstart, dorapos, objHeight, objpos]);

  const handleStart = () => {
    if (!isstart) {
      setIsstart(true);
    } else if (dorapos < doreaemon_height) {
      setdoraposition(0);
    } else {
      setdoraposition((dorapos) => dorapos - 50);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Home onClick={handleStart}>
        <Background height={WALL_HEIGHT} width={Wall_width}>
          <Scoring>Score:{score}</Scoring>
          <p>Best score: {bestScore}</p>
          {!isstart ? ( <Startgame className="startname">Click to start</Startgame> ) : null}
          <Obj
            className="piki"
            height={objHeight}
            width={OBJ_WIDTH}
            left={objpos}
            top={0}
            deg={180}
          />
          <Obj
            className="piki"
            top={objHeight + objgap}
            width={OBJ_WIDTH}
            left={objpos}
            height={WALL_HEIGHT - objHeight - objgap}
            deg={0}
          />
          <Bird
            height={doreaemon_height}
            width={doreaemon_width}
            top={dorapos}
            left={100}
          />
        </Background>
      </Home>
    </>
  );
};

export default App;

const Home = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Background = styled.div`
  background-image: url(\"../images/house.png\");\n  background-repeat: no-repeat;
  background-size: ${(props) => props.width}px ${(props) =>
  props.height}px;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  border: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const Obj = styled.div`
  position: absolute;
  background-image: url("../images/pipe-green.png");
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
  background-repeat: no-repeat;
  transform: rotate(${(props) => props.deg}deg);
`;

const Bird = styled.div`\n  position: absolute;\n  background-image: url("../images/pngegg.png");
  background-repeat: no-repeat;
  background-size: ${(props) => props.width}px ${(props) => props.height}px;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  transform: scaleX(-1);
`;

const Startgame = styled.div`
  text-align: center;
  position: absolute;
  top: 47%;
  background-color: #b13f54;
  padding: 10px;
  margin-left: -45px;
  width: 100px;
  color: white;
  border-radius: 5px;
  border: 2px solid #ddb551;
  transition: 0.8s;
  overflow: hidden;
  font-size: 20px;
  cursor: pointer;
`;

const Scoring = styled.div`
  position: absolute;
  top: 2px;
  float: left;
  left: 1.5px;
  background-color: #706948;
  border: 2px solid black;
  border-radius: 5px;
  font-size: 20px;
  padding: 5px;
  margin: 2px;
  color: #ddb551;
  text-shadow: 2px;
`;