import { useState } from 'react'
import './index.css'
import { BottomNav } from './components/BottomNav'
import { HomePage } from './features/home/HomePage'
import { CalculateScreen } from './features/calculate/CalculateScreen'
import { CruiseScreen } from './features/cruise/CruiseScreen'
import { StockingGuides } from './features/guides/StockingGuides'
import { ReferencePage } from './features/reference/ReferencePage'
import { AboutPage } from './features/about/AboutPage'

type Tab = 'home' | 'calculate' | 'cruise' | 'guides' | 'reference'

export function App() {
  const [tab, setTab] = useState<Tab>('home')
  const [sub, setSub] = useState<string | undefined>()

  const navigate = (newTab: string, newSub?: string) => {
    setTab(newTab as Tab)
    setSub(newSub)
  }

  return (
    <>
      <header className="app-header">
        <img src="/header.png" alt="Forester's Fieldbook — The Burl Ashley Tribute App" style={{ width: '100%', display: 'block' }} />
      </header>

      {tab === 'home' && <HomePage onNavigate={navigate} />}
      {tab === 'calculate' && <CalculateScreen sub={sub} onSubChange={setSub} />}
      {tab === 'cruise' && <CruiseScreen sub={sub} onSubChange={setSub} />}
      {tab === 'guides' && <StockingGuides sub={sub} onSubChange={setSub} />}
      {tab === 'reference' && sub === 'about'
        ? <AboutPage onBack={() => setSub(undefined)} />
        : tab === 'reference' && !sub
          ? <ReferencePage onNavigate={navigate} onAbout={() => setSub('about')} />
          : null}

      <BottomNav active={tab} onChange={t => { setTab(t); setSub(undefined) }} />
    </>
  )
}

export default App
