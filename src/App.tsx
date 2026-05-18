import { TimerIcon, HourglassIcon, ClockIcon } from "lucide-react"
import "./animation.css"
import Timer from "./components/timer"
import Clock from "./components/clock"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import useTimer from "./hooks/useTimer"
import useStopWatch from "./hooks/useStopWatch"
import Stopwatch from "./components/stopwatch"

export default function App() {
  const {
    timerTime,
    isTimerRunning,
    setTimerDuration,
    startTimer,
    pauseTimer,
    resetTimer,
  } = useTimer()

  const {
    stopWatchTime,
    isStopWatchRunning,
    startStopWatch,
    stopStopWatch,
    resetStopWatch,
  } = useStopWatch()

  return (
    <div className="flex min-h-svh w-full flex-col items-center justify-center overflow-hidden bg-background px-4 fade-in">
      <Tabs defaultValue="stopwatch" className="flex w-full max-w-xl flex-col">
        <TabsList className="mx-auto shrink-0 scale-90 sm:scale-100">
          <TabsTrigger value="clock" className="gap-1.5">
            <ClockIcon className="size-4" />
            Clock
          </TabsTrigger>

          <TabsTrigger value="stopwatch" className="gap-1.5">
            <TimerIcon className="size-4" />
            Stopwatch
          </TabsTrigger>

          <TabsTrigger value="timer" className="gap-1.5">
            <HourglassIcon className="size-4" />
            Timer
          </TabsTrigger>
        </TabsList>

        <div className="mt-6 min-h-[320px]">
          <TabsContent value="clock" className="tab-content mt-0">
            <Clock />
          </TabsContent>

          <TabsContent value="stopwatch" className="tab-content mt-0">
            <Stopwatch
              stopWatchTime={stopWatchTime}
              startStopWatch={startStopWatch}
              stopStopWatch={stopStopWatch}
              resetStopWatch={resetStopWatch}
              isStopWatchRunning={isStopWatchRunning}
            />
          </TabsContent>

          <TabsContent value="timer" className="tab-content mt-0">
            <Timer
              timerTime={timerTime}
              isTimerRunning={isTimerRunning}
              setTimerDuration={setTimerDuration}
              startTimer={startTimer}
              pauseTimer={pauseTimer}
              resetTimer={resetTimer}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
