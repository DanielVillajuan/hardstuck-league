type AdminTokenFieldProps = {
  value: string
  onChange: (value: string) => void
}

export function AdminTokenField({ value, onChange }: AdminTokenFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold text-slate-300">Token de administración</span>
      <input
        type="password"
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Se guarda solo durante esta sesión"
        className="w-full rounded-lg border border-white/10 bg-[#0c1015] px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-orange-300/50"
      />
    </label>
  )
}
