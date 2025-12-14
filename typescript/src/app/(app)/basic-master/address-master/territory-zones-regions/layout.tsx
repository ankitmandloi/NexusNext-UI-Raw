'use client'

import { TerritoryProvider } from './TerritoryContext'

export default function TerritoryLayout({ children }: { children: React.ReactNode }) {
  return <TerritoryProvider>{children}</TerritoryProvider>
}
