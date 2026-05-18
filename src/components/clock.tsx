import React from "react"

const Clock = () => {
  const [now, setNow] = React.useState(new Date())

  React.useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 500)
    return () => clearInterval(interval)
  }, [])

  const time = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })

  const d = now.getDate()
  const suffix =
    d > 3 && d < 21 ? "th" : (["th", "st", "nd", "rd"][d % 10] ?? "th")

  const date = `${d}${suffix} ${now.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  })}`

  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-background px-4 py-4 sm:px-8">
      <h1 className="text-center font-mono text-[4rem] leading-none font-semibold tracking-tighter tabular-nums sm:text-[3.5rem] md:text-[5rem]">
        {time}
      </h1>

      <p className="text-center tracking-[0.12em] text-muted-foreground uppercase sm:text-xs">
        {date}
      </p>
    </div>
  )
}

export default Clock
