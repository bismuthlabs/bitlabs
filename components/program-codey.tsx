// Example from https://beta.reactjs.org/learn

import { useEffect, useRef, useState } from 'react'
import styles from './program-codey.module.css'

function MyButton(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [numMoves, setNumMoves] = useState(1);
  const [robotPosition, setRobotPosition] = useState({ x: 300, y: 200 });
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(robotPosition.x, robotPosition.y, 40, 0, 2 * Math.PI);
        ctx.fillStyle = 'yellow';
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'black';
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(robotPosition.x - 35, robotPosition.y - 20, 8, 0, 2 * Math.PI);
        ctx.arc(robotPosition.x + 35, robotPosition.y - 20, 8, 0, 2 * Math.PI);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(robotPosition.x, robotPosition.y + 20, 12, Math.PI, 2 * Math.PI);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.stroke();
      }
    }
  }, [robotPosition, isRunning]);

  const handleUpClick = () => {
    console.log('Up button clicked!');
    setRobotPosition((prevPos) => ({ x: prevPos.x, y: prevPos.y - 10 }));
  };

  const handleDownClick = () => {
    console.log('Down button clicked!');
    setRobotPosition((prevPos) => ({ x: prevPos.x, y: prevPos.y + 10 }));
  };

  const handleLeftClick = () => {
    console.log('Left button clicked!');
    setRobotPosition((prevPos) => ({ x: prevPos.x - 10, y: prevPos.y }));
  };

  const handleRightClick = () => {
    console.log('Right button clicked!');
    setRobotPosition((prevPos) => ({ x: prevPos.x + 10, y: prevPos.y }));
  };

  const handleRunClick = () => {
    console.log(`Run button clicked with numMoves=${numMoves}!`);
    setIsRunning(true);
  };

  const handleResetClick = () => {
    console.log('Reset button clicked!');
    setRobotPosition({ x: 300, y: 200 });
    setIsRunning(false);
  };

  const handleNumMovesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNumMoves(parseInt(event.target.value));
  };

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setRobotPosition((prevPos) => ({ x: prevPos.x + 10, y: prevPos.y }));
        setNumMoves((prevNumMoves) => prevNumMoves - 1);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  useEffect(() => {
    if (numMoves === 0) {
      setIsRunning(false);
    }
  }, [numMoves]);

  return (
    <div className={styles.style}>
      <canvas ref={canvasRef} width={596} height={396} />
      <div className={styles.style}>Your instructions will appear here.</div>
      <div>
        Move the robot{' '}
        <select value={numMoves} onChange={handleNumMovesChange}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>{' '}
        times.
      </div>
      <div>
        <button onClick={handleUpClick}>Up</button>
      </div>
      <div>
        <button onClick={handleLeftClick}>Left</button>
        <button onClick={handleDownClick}>Down</button>
        <button onClick={handleRightClick}>Right</button>
      </div>
      <div>
        <button onClick={handleRunClick}>RUN</button>
        <button onClick={handleResetClick}>RESET</button>
      </div>
    </div>
  );
}

export default function MyApp() {
  return <MyButton />
}
