import { useState, useEffect } from 'react'

function detectPlatform(): 'ios' | 'android' | 'other' {
  const ua = navigator.userAgent
  if (/iphone|ipad|ipod/i.test(ua)) return 'ios'
  if (/android/i.test(ua)) return 'android'
  return 'other'
}

function isAlreadyInstalled(): boolean {
  return window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as any).standalone === true
}

export function InstallBanner() {
  const [dismissed, setDismissed] = useState(false)
  const [platform] = useState(detectPlatform)

  useEffect(() => {
    const stored = localStorage.getItem('install-banner-dismissed')
    if (stored === 'true') setDismissed(true)
  }, [])

  const dismiss = () => {
    setDismissed(true)
    localStorage.setItem('install-banner-dismissed', 'true')
  }

  if (dismissed || isAlreadyInstalled()) return null

  const content = platform === 'ios' ? (
    <>
      <strong>Add to your home screen</strong> for offline field use:{' '}
      tap the <strong>Share</strong> button{' '}
      <span style={{ fontSize: '1.1rem' }}>⎙</span> at the bottom of Safari,
      then choose <strong>"Add to Home Screen."</strong>
    </>
  ) : platform === 'android' ? (
    <>
      <strong>Add to your home screen</strong> for offline field use:{' '}
      tap the <strong>⋮ menu</strong> in Chrome,
      then choose <strong>"Add to Home Screen."</strong>
    </>
  ) : (
    <>
      <strong>Install for offline use:</strong> open this app in Chrome or Safari
      on your phone and add it to your home screen.
    </>
  )

  return (
    <div style={{
      background: '#1a3009',
      color: '#d4e8b8',
      borderRadius: 8,
      padding: '10px 12px',
      marginBottom: 12,
      fontSize: '0.82rem',
      lineHeight: 1.5,
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start',
    }}>
      <span style={{ fontSize: '1.2rem', flexShrink: 0, marginTop: 1 }}>📲</span>
      <span style={{ flex: 1 }}>{content}</span>
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        style={{
          background: 'none',
          border: 'none',
          color: '#a0c878',
          fontSize: '1.1rem',
          cursor: 'pointer',
          flexShrink: 0,
          padding: '0 2px',
          lineHeight: 1,
        }}
      >✕</button>
    </div>
  )
}
