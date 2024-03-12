import { useContext } from 'react'
import {CountdownCircleTimer} from 'react-countdown-circle-timer'
import { SettingsContext } from '../contexts/SettingsContext'
const CountdownAnimation = ({key, timer, animate, children}) => {

  const { stopAnimate } = useContext(SettingsContext)

    return (
      <CountdownCircleTimer
        // key={key}
        isPlaying={animate}
        duration={timer * 60}
        colors={['#1400FF', '#07977B', '#A30000', '#A30000']}
        colorsTime={[50, 30, 15, 0]}
        strokeWidth={6}
        size={220}
        onComplete={ () => {
          stopAnimate()
        }}
      >
        {children}
      </CountdownCircleTimer>
    )
}

export default CountdownAnimation