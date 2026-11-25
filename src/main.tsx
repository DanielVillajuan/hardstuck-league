import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'
import './index.css'
import { LeagueDataProvider } from './app/data-provider'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <LeagueDataProvider>
        <App />
      </LeagueDataProvider>
    </QueryClientProvider>
  </StrictMode>,
)
