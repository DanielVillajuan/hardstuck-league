import { useEffect, useState } from 'react'

const challengeDeadline = new Date('2028-01-01T00:00:00-03:00').getTime()

function getCountdown() {
  const remaining = Math.max(0, challengeDeadline - Date.now())
  return {
    days: Math.floor(remaining / 86_400_000),
    hours: Math.floor(remaining / 3_600_000) % 24,
    minutes: Math.floor(remaining / 60_000) % 60,
    seconds: Math.floor(remaining / 1_000) % 60,
  }
}

function CountdownUnit({ label, value }: { label: string; value: number }) {
  return (
    <div className="min-w-0 rounded-lg border border-white/[.07] bg-black/25 px-2 py-2 text-center">
      <div className="font-mono text-2xl font-bold tabular-nums text-white sm:text-3xl">
        <span key={value} className="countdown-tick inline-block">{String(value).padStart(2, '0')}</span>
      </div>
      <div className="mt-0.5 text-[9px] font-bold tracking-[.16em] text-slate-500">{label}</div>
    </div>
  )
}

export function ChallengeCountdown() {
  const [countdown, setCountdown] = useState(getCountdown)

  useEffect(() => {
    const intervalId = window.setInterval(() => setCountdown(getCountdown()), 1_000)
    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <div className="mt-6 max-w-md" role="timer" aria-label={`Faltan ${countdown.days} días, ${countdown.hours} horas, ${countdown.minutes} minutos y ${countdown.seconds} segundos para el cierre del desafío`}>
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-[10px] font-bold tracking-[.18em] text-orange-300">CIERRE DEL DESAFÍO</span>
        <span className="text-[10px] font-semibold text-slate-500">31 DIC 2027 · 23:59 ART</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <CountdownUnit label="DÍAS" value={countdown.days} />
        <CountdownUnit label="HORAS" value={countdown.hours} />
        <CountdownUnit label="MIN" value={countdown.minutes} />
        <CountdownUnit label="SEG" value={countdown.seconds} />
      </div>
    </div>
  )
}
