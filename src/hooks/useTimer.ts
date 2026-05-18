import React from "react"

const useTimer = () => {
  const [duration, setDuration] = React.useState(1 * 60 * 1000)
  const [timerTime, setTimerTime] = React.useState(duration)
  const [isTimerRunning, setIsTimerRunning] = React.useState(false)

  const startTime = React.useRef(0)
  const elapsedTime = React.useRef(0)

  React.useEffect(() => {
    let intervalId: number
    if (isTimerRunning) {
      startTime.current = Date.now() - elapsedTime.current

      intervalId = setInterval(() => {
        const timeLeft = duration - (Date.now() - startTime.current)
        setTimerTime(timeLeft)
        if (timeLeft <= 0) {
          clearInterval(intervalId)
          setIsTimerRunning(false)
        }
      }, 10)
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [isTimerRunning, duration])

  return {
    timerTime,
    isTimerRunning,
    startTimer() {
      setIsTimerRunning(true)
    },
    pauseTimer() {
      elapsedTime.current = Date.now() - startTime.current
      setIsTimerRunning(false)
    },
    resetTimer() {
      setTimerTime(duration)
      setIsTimerRunning(false)
      elapsedTime.current = 0
    },
    setTimerDuration(time: number) {
      setDuration(time)
      setTimerTime(time)
      setIsTimerRunning(false)
      elapsedTime.current = 0
    },
  }
}

export default useTimer
