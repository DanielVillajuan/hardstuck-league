import { useState, type FormEvent } from 'react'
import { useMutation } from '@tanstack/react-query'
import { updateRiotApiKey } from '../data/adminApi'

type RiotApiKeyFormProps = {
  token: string
  disabled: boolean
}

export function RiotApiKeyForm({ token, disabled }: RiotApiKeyFormProps) {
  const [apiKey, setApiKey] = useState('')
  const [message, setMessage] = useState('')
  const mutation = useMutation({
    mutationFn: () => updateRiotApiKey(apiKey, token),
    onSuccess: () => {
      setApiKey('')
      setMessage('Clave actualizada y guardada. Ya podés sincronizar rangos sin redeploy.')
    },
    onError: (error) => setMessage(error.message),
  })

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('')
    mutation.mutate()
  }

  return (
    <form onSubmit={submit} autoComplete="off" className="space-y-3 rounded-xl border border-white/[.07] bg-black/15 p-4">
      <div>
        <h3 className="text-sm font-semibold text-white">Riot API key</h3>
        <p className="mt-1 text-xs leading-relaxed text-slate-500">Se guarda en la base local del backend y reemplaza la key del entorno. Nunca se vuelve a mostrar.</p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          required
          type="password"
          name="riot-api-key"
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          maxLength={512}
          value={apiKey}
          onChange={(event) => setApiKey(event.target.value)}
          placeholder="Pegá la nueva Riot API key"
          disabled={!token || disabled || mutation.isPending}
          className="min-w-0 flex-1 rounded-lg border border-white/10 bg-[#0c1015] px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-orange-300/50 disabled:opacity-40"
        />
        <button
          type="submit"
          disabled={!token || disabled || mutation.isPending || !apiKey.trim()}
          className="rounded-lg bg-orange-300 px-4 py-2.5 text-xs font-bold text-[#20140f] transition hover:bg-orange-200 disabled:opacity-40"
        >
          {mutation.isPending ? 'Guardando…' : 'Guardar key'}
        </button>
      </div>
      {message && <p role="status" className="text-xs text-slate-300">{message}</p>}
    </form>
  )
}
