// Example from https://beta.reactjs.org/learn

import { useEffect, useRef, useState } from 'react'
import styles from './program-codey.module.css'

function MyButton(): JSX.Element {
  const [moves, setMoves] = useState(1);
  const [selectedNumber, setSelectedNumber] = useState(1);
  const [instructions, setInstructions] = useState('');
  const canvasRef = useRef(null);
  const [robotPosition, setRobotPosition] = useState({ x: 300, y: 200 });
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(robotPosition.x, robotPosition.y, 20, 0, 2 * Math.PI);
        ctx.fillStyle = 'yellow';
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'black';
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(robotPosition.x - 18, robotPosition.y - 10, 4, 0, 2 * Math.PI);
        ctx.arc(robotPosition.x + 18, robotPosition.y - 10, 4, 0, 2 * Math.PI);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(robotPosition.x, robotPosition.y + 10, 6, Math.PI, 2 * Math.PI);
        ctx.fill()
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.stroke();

        // Draw line trace
        ctx.beginPath();
        ctx.moveTo(robotPosition.x, robotPosition.y);
        ctx.lineTo(
          robotPosition.x - 20 * Math.sin((2 * Math.PI * (moves - 1)) / 4),
          robotPosition.y - 20 * Math.cos((2 * Math.PI * (moves - 1)) / 4)
        );
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }
  }, [robotPosition, isRunning]);

  const handleNumberSelect = (event) => {
    setSelectedNumber(parseInt(event.target.value));
    setMoves(event.target.value);
  };

  const handleButtonClick = (event) => {
    const buttonName = event.target.innerText;
    setInstructions(
      (prevInstructions) => `${prevInstructions} ${moves} ${buttonName}`
    );
  };

  const handleRunClick = () => {
    setIsRunning(true);
    const instructionList = instructions.trim().split(' ');
    let newPosition = { ...robotPosition };
    for (let i = 0; i < instructionList.length; i += 2) {
      const direction = instructionList[i + 1].toLowerCase();
      const distance = parseInt(instructionList[i]);
      switch (direction) {
        case 'up':
          newPosition.y -= distance;
          break;
        case 'down':
          newPosition.y += distance;
          break;
        case 'left':
          newPosition.x -= distance;
          break;
        case 'right':
          newPosition.x += distance;
          break;
        default:
          break;
      }
    }
    setRobotPosition(newPosition);
    setIsRunning(false);
  };

  const handleResetClick = () => {
    setRobotPosition({ x: 300, y: 200 });
    setInstructions('');
    setMoves(1);
  };

  return (
    <div className={styles.style} style={{ position: 'relative' }}>
      <canvas ref={canvasRef} width={596} height={396} />
      <div className={styles.style}>
        <div>
          {instructions || 'Your instructions will appear here'}
        </div>
        <div>You moved {moves} times</div>
        <div>
          <select value={selectedNumber} onChange={handleNumberSelect}>
            {[1, 2, 3, 4, 5].map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.style}>
        <div>
          <button onClick={handleButtonClick}>Up</button>
          <button onClick={handleButtonClick}>Down</button>
          <button onClick={handleButtonClick}>Left</button>
          <button onClick={handleButtonClick}>Right</button>
        </div>
        <div>
          <button onClick={handleRunClick}>RUN</button>
          <button onClick={handleResetClick}>RESET</button>
        </div>
      </div>
    </div>
  );
}

export default function MyApp() {
  return <MyButton />
}