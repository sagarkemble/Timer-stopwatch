import React from "react"
const useStopWatch = () => {
  const [stopWatchTime, setStopWatchTime] = React.useState(0)
  const [isStopWatchRunning, setIsStopWatchRunning] = React.useState(false)
  const startTime = React.useRef(0)
  const elapsedTime = React.useRef(0)

  React.useEffect(() => {
    let intervalId: number
    if (isStopWatchRunning) {
      startTime.current = Date.now() - elapsedTime.current
      intervalId = setInterval(
        () => setStopWatchTime(Date.now() - startTime.current),
        10
      )
      return () => clearInterval(intervalId)
    }
  }, [isStopWatchRunning])

  return {
    stopWatchTime,
    isStopWatchRunning,
    startStopWatch() {
      setIsStopWatchRunning(true)
    },
    stopStopWatch() {
      setIsStopWatchRunning(false)
      elapsedTime.current = stopWatchTime
    },
    resetStopWatch() {
      setIsStopWatchRunning(false)
      setStopWatchTime(0)
      elapsedTime.current = 0
    },
  }
}

export default useStopWatch
