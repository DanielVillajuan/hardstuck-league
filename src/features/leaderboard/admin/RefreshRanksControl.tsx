type RefreshRanksControlProps = {
  disabled: boolean
  isRefreshing: boolean
  onRefresh: () => void
}

export function RefreshRanksControl({ disabled, isRefreshing, onRefresh }: RefreshRanksControlProps) {
  return (
    <div className="flex flex-col justify-between gap-3 rounded-xl border border-white/[.07] bg-black/15 p-4 sm:flex-row sm:items-center">
      <div>
        <p className="text-sm font-semibold text-white">Actualizar rangos Solo/Duo</p>
        <p className="mt-1 text-xs text-slate-500">Consulta Riot y guarda los LP actuales.</p>
      </div>
      <button type="button" disabled={disabled} onClick={onRefresh} className="rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/[.06] disabled:opacity-40">
        {isRefreshing ? 'Actualizando…' : 'Actualizar todos'}
      </button>
    </div>
  )
}
