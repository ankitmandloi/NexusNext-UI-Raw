'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Territory, territoryHierarchy as initialData } from './data'

type TerritoryContextType = {
  territories: Territory[]
  updateTerritories: (territories: Territory[]) => void
}

const TerritoryContext = createContext<TerritoryContextType | undefined>(undefined)

export function TerritoryProvider({ children }: { children: ReactNode }) {
  const [territories, setTerritories] = useState<Territory[]>(initialData)

  const updateTerritories = (newTerritories: Territory[]) => {
    setTerritories(newTerritories)
  }

  return (
    <TerritoryContext.Provider value={{ territories, updateTerritories }}>
      {children}
    </TerritoryContext.Provider>
  )
}

export function useTerritoryContext() {
  const context = useContext(TerritoryContext)
  if (context === undefined) {
    throw new Error('useTerritoryContext must be used within a TerritoryProvider')
  }
  return context
}
