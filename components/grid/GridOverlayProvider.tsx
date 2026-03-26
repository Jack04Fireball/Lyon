'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface GridOverlayContextValue {
  isVisible: boolean
  toggle: () => void
}

const GridOverlayContext = createContext<GridOverlayContextValue>({
  isVisible: false,
  toggle: () => {},
})

export function GridOverlayProvider({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('lyon-grid-overlay')
    if (stored === 'true') setIsVisible(true)
  }, [])

  function toggle() {
    setIsVisible(prev => {
      const next = !prev
      localStorage.setItem('lyon-grid-overlay', String(next))
      return next
    })
  }

  return (
    <GridOverlayContext.Provider value={{ isVisible, toggle }}>
      {children}
    </GridOverlayContext.Provider>
  )
}

export function useGridOverlay() {
  return useContext(GridOverlayContext)
}
