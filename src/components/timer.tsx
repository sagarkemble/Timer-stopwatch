import { Button } from "@/components/ui/button"

interface TimerProps {
  timerTime: number
  isTimerRunning: boolean
  setTimerDuration: (time: number) => void
  startTimer: () => void
  pauseTimer: () => void
  resetTimer: () => void
}

const pad = (n: number) => String(Math.max(0, Math.floor(n))).padStart(2, "0")

const Timer = ({
  timerTime,
  isTimerRunning,
  setTimerDuration,
  startTimer,
  pauseTimer,
  resetTimer,
}: TimerProps) => {
  const totalSeconds = Math.max(0, Math.ceil(timerTime / 1000))
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  const isDone = timerTime <= 0

  const adjust = (unit: "hours" | "minutes" | "seconds", delta: number) => {
    if (isTimerRunning) return
    const step = unit === "hours" ? 3600000 : unit === "minutes" ? 60000 : 1000
    setTimerDuration(Math.max(1000, timerTime + delta * step))
  }

  return (
    <div className="flex flex-col items-center gap-6 rounded-2xl bg-background px-2 sm:px-8">
      <div className="flex items-center gap-0.5">
        <TimeUnit
          value={pad(hours)}
          label="hr"
          unit="hours"
          onUp={() => adjust("hours", 1)}
          onDown={() => adjust("hours", -1)}
          disabled={isTimerRunning}
        />
        <Colon />
        <TimeUnit
          value={pad(minutes)}
          label="min"
          unit="minutes"
          onUp={() => adjust("minutes", 1)}
          onDown={() => adjust("minutes", -1)}
          disabled={isTimerRunning}
        />
        <Colon />
        <TimeUnit
          value={pad(seconds)}
          label="sec"
          unit="seconds"
          onUp={() => adjust("seconds", 1)}
          onDown={() => adjust("seconds", -1)}
          disabled={isTimerRunning}
        />
      </div>

      {isDone && !isTimerRunning && (
        <p className="text-xs tracking-widest text-muted-foreground uppercase">
          Time's up!
        </p>
      )}

      <div className="flex flex-wrap justify-center gap-2">
        <Button
          size="lg"
          onClick={startTimer}
          disabled={isTimerRunning || isDone}
          className="w-20 sm:w-24"
        >
          Start
        </Button>

        <Button
          size="lg"
          variant="outline"
          onClick={pauseTimer}
          disabled={!isTimerRunning}
          className="w-20 sm:w-24"
        >
          Pause
        </Button>

        <Button
          size="lg"
          variant="ghost"
          onClick={resetTimer}
          className="w-20 sm:w-24"
        >
          Reset
        </Button>
      </div>
    </div>
  )
}

const ArrowUp = () => (
  <svg width="14" height="8" viewBox="0 0 14 8" fill="currentColor">
    <polygon points="7,0 14,8 0,8" />
  </svg>
)

const ArrowDown = () => (
  <svg width="14" height="8" viewBox="0 0 14 8" fill="currentColor">
    <polygon points="7,8 14,0 0,0" />
  </svg>
)

const TimeUnit = ({
  value,
  label,
  unit,
  onUp,
  onDown,
  disabled,
}: {
  value: string
  label: string
  unit: string
  onUp: () => void
  onDown: () => void
  disabled: boolean
}) => (
  <div className="flex flex-col items-center">
    <button
      onClick={onUp}
      disabled={disabled}
      className="flex w-full items-center justify-center py-2 text-muted-foreground/50 transition-colors hover:text-foreground disabled:opacity-25"
    >
      <ArrowUp />
    </button>

    <div className="flex flex-col items-center gap-2">
      <span className="w-[2.2ch] text-center font-mono text-[2.8rem] leading-none font-semibold tracking-tighter tabular-nums sm:text-[4rem] md:text-[5rem]">
        {value}
      </span>
      <span className="font-sans text-[8px] tracking-[0.14em] text-muted-foreground uppercase sm:text-[10px]">
        {label}
      </span>
    </div>

    <button
      onClick={onDown}
      disabled={disabled}
      className="flex w-full items-center justify-center py-2 text-muted-foreground/50 transition-colors hover:text-foreground disabled:opacity-25"
    >
      <ArrowDown />
    </button>
  </div>
)

const Colon = () => (
  <span className="px-0.5 pb-4 font-mono text-[2.8rem] leading-none font-semibold text-muted-foreground/40 select-none sm:pb-8 sm:text-[4rem] md:text-[5rem]">
    :
  </span>
)

export default Timer
