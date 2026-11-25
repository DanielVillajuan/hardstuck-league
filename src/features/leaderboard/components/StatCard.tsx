type StatCardProps = {
  label: string
  value: string
  detail?: string
}

export function StatCard({ label, value, detail }: StatCardProps) {
  return (
    <div className="min-w-[125px] rounded-xl border border-white/[.07] bg-black/20 px-4 py-3">
      <div className="text-[10px] font-semibold tracking-[.14em] text-slate-500">{label}</div>
      <div className="mt-1 text-xl font-bold text-white">
        {value} {detail && <span className="text-xs font-medium text-slate-500">{detail}</span>}
      </div>
    </div>
  )
}
