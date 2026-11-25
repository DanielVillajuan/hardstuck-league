type AppHeaderProps = {
  isRefreshing: boolean
  onOpenAdmin: () => void
  onRefresh: () => void
}

export function AppHeader({ isRefreshing, onOpenAdmin, onRefresh }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/[0.07] bg-[#10151b]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="#home" aria-label="Hardstuck League, inicio">
          <img className="w-[210px] sm:w-[240px]" src="/hardstuck-league-logo.svg" alt="Hardstuck League" />
        </a>
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="hidden items-center gap-2 text-[10px] font-bold tracking-[.16em] text-slate-400 sm:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" /> TEMPORADA 2026
          </div>
          <span className="h-5 w-px bg-white/10" />
          <button type="button" onClick={onOpenAdmin} className="rounded-lg border border-orange-300/20 bg-orange-300/10 px-3 py-2.5 text-xs font-semibold text-orange-200 transition hover:bg-orange-300/15">
            Administrar
          </button>
          <button type="button" onClick={onRefresh} disabled={isRefreshing} className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[.04] px-3 py-2.5 text-xs font-semibold text-slate-200 transition hover:border-orange-300/40 hover:bg-white/[.08] disabled:opacity-60 sm:px-4">
            <svg className={isRefreshing ? 'h-4 w-4 animate-spin' : 'h-4 w-4'} viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M16.5 7.5A6.8 6.8 0 0 0 4.7 5.2L3 7m0 0V3.8M3 7h3.2m-2.7 5.5a6.8 6.8 0 0 0 11.8 2.3l1.7-1.8m0 0v3.2m0-3.2h-3.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="hidden sm:inline">{isRefreshing ? 'Actualizando…' : 'Recargar tabla'}</span>
            <span className="sm:hidden">Recargar</span>
          </button>
        </div>
      </div>
    </header>
  )
}
