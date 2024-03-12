import { useEffect, useContext } from 'react';
import Button from '../components/Button';
import CountDownAnimation from '../components/CountDownAnimation';
import SetPomodoro from '../components/SetPomodoro';
import SettingsContext from '../contexts/SettingsContext';

const Pomodoro = () => {

    const {
        pomodoro,
        executing,
        startAnimate,
        children,
        startTimer,
        pauseTimer,
        updateExecute,
        setCurrentTimer,
        SettingsBtn 
    } = useContext(SettingsContext)

    useEffect(() => {updateExecute(executing)}, [executing, startAnimate])

    return (
        <div className="container">
        <h1>Pomodoro</h1>
        <small>Be productive the right way.</small>
        {pomodoro !== 0 ?
        <>
          <ul className="labels">
            <li>
              <Button 
                title="Work" 
                className={executing.active === 'work' ? 'active-label' : undefined} 
                onClick={() => setCurrentTimer('work')} 
              />
            </li>
            <li>
              <Button 
                title="Short Break" 
                className={executing.active === 'short' ? 'active-label' : undefined} 
                onClick={() => setCurrentTimer('short')} 
              />
            </li>
            <li>
              <Button 
                title="Long Break" 
                className={executing.active === 'long' ? 'active-label' : undefined} 
                onClick={() => setCurrentTimer('long')} 
              />
            </li>
          </ul>
          <Button title="Settings" onClick={SettingsBtn} />
          <div className="timer-container">
            <div className="time-wrapper">
                <CountDownAnimation
                  key={pomodoro} 
                  timer={pomodoro} 
                  animate={startAnimate}
                >
                  {children}
                </CountDownAnimation>
            </div>
          </div>
          <div className="button-wrapper">
            <Button title="Start" className={!startAnimate ? 'active' : undefined} onClick={startTimer} />
            <Button title="Pause" className={startAnimate ? 'active' : undefined} onClick={pauseTimer} />
          </div>
        </> : <SetPomodoro />}
      </div>
    );
};

export default Pomodoro;