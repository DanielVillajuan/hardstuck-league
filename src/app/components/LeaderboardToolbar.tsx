type LeaderboardToolbarProps = {
  search: string
  onSearchChange: (value: string) => void
}

export function LeaderboardToolbar({ search, onSearchChange }: LeaderboardToolbarProps) {
  return (
    <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <div className="text-[10px] font-bold tracking-[.2em] text-slate-500">CLASIFICACIÓN GENERAL</div>
        <h2 className="mt-1 text-xl font-bold tracking-tight text-white">Tablas de posiciones</h2>
      </div>
      <label className="relative block w-full sm:w-64">
        <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="8.8" cy="8.8" r="5.8" stroke="currentColor" strokeWidth="1.5" />
          <path d="m13.2 13.2 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input autoComplete="off" value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Buscar jugador…" className="w-full rounded-lg border border-white/10 bg-[#141a21] py-2.5 pl-9 pr-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-orange-300/50" />
      </label>
    </div>
  )
}
