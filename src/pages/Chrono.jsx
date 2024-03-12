import "./Chrono.css";
import { useEffect } from "react";
import Button from "../components/Button";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Chrono = () => {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [stopPressed, setStopPressed] = useState(false);

  
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        return `${hours}:${minutes}:${remainingSeconds}`;
    };

    useEffect(() => {
        let timerId;

        if (isRunning) {
            timerId = setInterval(() => {
                setCount((prevCount) => prevCount + 1);
            }, 1000);
        } else {
            clearInterval(timerId);
        }

        return () => clearInterval(timerId);
    }, [isRunning]);

    const handleStart = () => {
        setIsRunning(true);
    };

    const handleStop = () => {
        setIsRunning(false);
        setStopPressed(true);
    };

    const handleRestart = () => {
        setCount(0);
    };

    return (
        <div className="pomodoro-page">
            <h1>Counter: {formatTime(count)}</h1>
            <div className="pomodoro-buttons-controls">
                <button
                    className="pomodoro-button"
                    onClick={handleStart}
                    disabled={isRunning}
                >
                    Start
                </button>
                <button
                    className="pomodoro-button"
                    onClick={handleStop}
                    disabled={!isRunning}
                >
                    Stop
                </button>
                <button className="pomodoro-button" onClick={handleRestart}>
                    Restart
                </button>
            </div>

            {stopPressed && (
                <h2 className="productivity-message-new-post">
                    Add your productivity to a new post! Your Score is {count}
                </h2>
            )}

            {stopPressed && (
                <Link to="/posts/create" className="pomodoro__link">
                    <button className="pomodoro-button">Create Post</button>
                </Link>
            )}

            {!isRunning && (
                <Button className="create-pomodoro" linkTo={"/pomodoro"}>Create a Pomodoro 🍅</Button>
            )}
            

        </div>
    );
};

export default Chrono;
  
  
 