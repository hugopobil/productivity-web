import { useContext, useState, useEffect } from 'react'
import { SettingsContext } from '../contexts/SettingsContext'
import { useNavigate } from 'react-router-dom'
import "./SetPomodoro.css"

const SetPomodoro = () => {

    const navigate = useNavigate()

    const [newTimer, setNewTimer] = useState({
        work: 2,
        short: 1,
        long: 5,
        active: 'work'
    })

    const {updateExecute} = useContext(SettingsContext)

    // useEffect(() => {
    //     console.log(newTimer)
    // },[newTimer])

    const handleChange = input => {
        const {name, value} = input.target
        switch (name) {
            case 'work':
                setNewTimer({
                    ...newTimer,
                    work: parseInt(value)
                })
                break;
            case 'shortBreak':
                setNewTimer({
                    ...newTimer,
                    short: parseInt(value)
                })
                break;
            case 'longBreak':
                setNewTimer({
                    ...newTimer,
                    long: parseInt(value)
                })
                break;
        }
    }
    const handleSubmit = e => {
        e.preventDefault()
        updateExecute(newTimer)
        navigate('/pomodoro')
    }
    return (
        <div className="form-container">
            <form noValidate onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <div className="pomodoro-input" >
                     <label>Work</label>
                     <input className="input" type="number" name="work" onChange={handleChange} value={newTimer.work} />
                    </div>
                    <div className="pomodoro-input" >
                     <label>Short Break</label>
                     <input className="input" type="number" name="shortBreak" onChange={handleChange} value={newTimer.short} />
                    </div>
                    <div className="pomodoro-input" >
                     <label>Long Break</label>
                     <input className="input" type="number" name="longBreak" onChange={handleChange} value={newTimer.long} />
                    </div>
                </div>
                <button className="pomodoro-button" type='submit'>Set Pomodoro</button>
            </form>
        </div>
    )
}

export default SetPomodoro