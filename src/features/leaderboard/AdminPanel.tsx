import { useState, type FormEvent } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useLeagueStandings } from './queries'
import { addPlayer, refreshPlayerRanks, removePlayer } from './data/adminApi'
import { leaderboardQueryKey } from './queries'
import { AddPlayerForm } from './admin/AddPlayerForm'
import { AdminTokenField } from './admin/AdminTokenField'
import { PlayerRoster } from './admin/PlayerRoster'
import { RefreshRanksControl } from './admin/RefreshRanksControl'
import { RiotApiKeyForm } from './admin/RiotApiKeyForm'

type AdminPanelProps = {
  onClose: () => void
  onPlayerAdded?: () => void
}

export function AdminPanel({ onClose, onPlayerAdded }: AdminPanelProps) {
  const queryClient = useQueryClient()
  const { data: leagues = [] } = useLeagueStandings()
  const [token, setToken] = useState('')
  const [gameName, setGameName] = useState('')
  const [tagLine, setTagLine] = useState('')
  const [platform, setPlatform] = useState('LA2')
  const [leagueId, setLeagueId] = useState('league-1')
  const [message, setMessage] = useState('')

  const refreshMutation = useMutation({
    mutationFn: () => refreshPlayerRanks(token),
    onSuccess: async (result) => {
      await queryClient.refetchQueries({ queryKey: leaderboardQueryKey, type: 'active' })
      setMessage(result.failures.length ? 'Actualizados ' + result.updated + '; fallaron ' + result.failures.length + '.' : 'Rangos actualizados.')
    },
    onError: (error) => setMessage(error.message),
  })
  const addMutation = useMutation({
    mutationFn: () => addPlayer({ gameName, tagLine, platform, leagueId }, token),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: leaderboardQueryKey, type: 'active' })
      setGameName('')
      setTagLine('')
      setMessage('Jugador agregado y rango guardado.')
      onPlayerAdded?.()
    },
    onError: (error) => setMessage(error.message),
  })
  const removeMutation = useMutation({
    mutationFn: (id: string) => removePlayer(id, token),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: leaderboardQueryKey, type: 'active' })
      setMessage('Jugador quitado de la liga.')
    },
    onError: (error) => setMessage(error.message),
  })
  const busy = refreshMutation.isPending || addMutation.isPending || removeMutation.isPending

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('')
    addMutation.mutate()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section role="dialog" aria-modal="true" aria-labelledby="admin-title" className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#141a21] shadow-2xl">
        <div className="flex items-start justify-between border-b border-white/[.07] px-6 py-5">
          <div><p className="text-[10px] font-bold tracking-[.18em] text-orange-300">PANEL DE ADMIN</p><h2 id="admin-title" className="mt-1 text-xl font-bold text-white">Gestionar jugadores</h2></div>
          <button type="button" onClick={onClose} className="rounded-lg px-3 py-1 text-xl text-slate-500 hover:bg-white/5 hover:text-white" aria-label="Cerrar">×</button>
        </div>
        <div className="space-y-6 p-6">
          <AdminTokenField value={token} onChange={setToken} />
          <RiotApiKeyForm token={token} disabled={busy} />
          <RefreshRanksControl disabled={!token || busy} isRefreshing={refreshMutation.isPending} onRefresh={() => refreshMutation.mutate()} />
          <AddPlayerForm
            leagues={leagues}
            gameName={gameName}
            tagLine={tagLine}
            platform={platform}
            leagueId={leagueId}
            disabled={!token || busy}
            isAdding={addMutation.isPending}
            onGameNameChange={setGameName}
            onTagLineChange={setTagLine}
            onPlatformChange={setPlatform}
            onLeagueChange={setLeagueId}
            onSubmit={submit}
          />
          {message && <p role="status" className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-300">{message}</p>}
          <PlayerRoster leagues={leagues} disabled={!token || busy} onRemove={(id) => removeMutation.mutate(id)} />
        </div>
      </section>
    </div>
  )
}
