import React from "react"
import { Button } from "@/components/ui/button"

interface StopwatchProps {
  stopWatchTime: number
  isStopWatchRunning: boolean
  startStopWatch: () => void
  stopStopWatch: () => void
  resetStopWatch: () => void
}

const pad = (n: number) => String(Math.max(0, Math.floor(n))).padStart(2, "0")

const Stopwatch = ({
  stopWatchTime,
  isStopWatchRunning,
  startStopWatch,
  stopStopWatch,
  resetStopWatch,
}: StopwatchProps) => {
  const totalMs = stopWatchTime
  const hours = Math.floor(totalMs / 3600000)
  const minutes = Math.floor((totalMs % 3600000) / 60000)
  const seconds = Math.floor((totalMs % 60000) / 1000)
  const ms = Math.floor((totalMs % 1000) / 10)

  const hasStarted = totalMs > 0 || isStopWatchRunning

  return (
    <div className="flex flex-col items-center gap-6 px-2 py-4 sm:px-8">
      <div className="flex items-end gap-0.5">
        {hours > 0 && (
          <>
            <TimeUnit value={pad(hours)} label="hr" />
            <Colon />
          </>
        )}

        <TimeUnit value={pad(minutes)} label="min" />
        <Colon />
        <TimeUnit value={pad(seconds)} label="sec" />
        <Colon />
        <TimeUnit value={pad(ms)} label="ms" />
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <Button
          size="lg"
          onClick={startStopWatch}
          disabled={isStopWatchRunning}
          className="w-20 sm:w-24"
        >
          Start
        </Button>

        <Button
          size="lg"
          variant="outline"
          onClick={stopStopWatch}
          disabled={!isStopWatchRunning}
          className="w-20 sm:w-24"
        >
          Stop
        </Button>

        <Button
          size="lg"
          variant="ghost"
          onClick={resetStopWatch}
          disabled={!hasStarted}
          className="w-20 sm:w-24"
        >
          Reset
        </Button>
      </div>
    </div>
  )
}

const TimeUnit = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center gap-2">
    <span className="w-[2.2ch] text-center font-mono text-[2.8rem] leading-none font-semibold tracking-tighter tabular-nums sm:text-[4rem] md:text-[5rem]">
      {value}
    </span>
    <span className="font-sans text-[8px] tracking-[0.14em] text-muted-foreground uppercase sm:text-[10px]">
      {label}
    </span>
  </div>
)

const Colon = () => (
  <span className="px-0.5 pb-3 font-mono text-[2.8rem] leading-none font-semibold text-muted-foreground/40 select-none sm:pb-6 sm:text-[4rem] md:text-[5rem]">
    :
  </span>
)

export default Stopwatch
