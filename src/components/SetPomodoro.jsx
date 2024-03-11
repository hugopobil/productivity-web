import React from 'react';
import Button from './Button';
import { useState } from 'react';

const SetPomodoro = () => {
    const [newTimer, setNewTimer] = useState({
        work: 0.3,
        short: 0.2,
        long: 1,
        active: 'work'
    })

    const handleChange = e => {
        const {name, value} = e.target 
        switch (name) {
            case 'work':
                setNewTimer({
                    ...newTimer,
                    work: parseInt(value)
                })
                break;
            default:
                break;
        }

    }

    return (
        <div className="form-container">
            <form noValidate>
                <div className="input-wrapper">
                    <input className="input" name="work" onChange={handleChange} value={}/>
                    <input className="input" name="shortBrear" onChange={handleChange} value={}/>
                    <input className="input" name="longBreak" onChange={handleChange} value={}/>
                </div>
                <Button onClick={handleSubmit}>
                    Set Timer
                </Button>
            </form>
        </div>
    );
};

export default SetPomodoro;