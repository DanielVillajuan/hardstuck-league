export const rankColors: Record<string, string> = {
  cyan: 'bg-cyan-300/10 text-cyan-200 border-cyan-200/20',
  green: 'bg-emerald-300/10 text-emerald-200 border-emerald-200/20',
  blue: 'bg-sky-300/10 text-sky-200 border-sky-200/20',
  amber: 'bg-amber-300/10 text-amber-200 border-amber-200/20',
  slate: 'bg-slate-300/10 text-slate-200 border-slate-200/20',
  orange: 'bg-orange-300/10 text-orange-200 border-orange-200/20',
  violet: 'bg-violet-300/10 text-violet-200 border-violet-200/20',
  red: 'bg-rose-300/10 text-rose-200 border-rose-200/20',
  yellow: 'bg-yellow-300/10 text-yellow-200 border-yellow-200/20',
}

export function getRankColor(color: string) {
  return rankColors[color] || rankColors.slate
}
