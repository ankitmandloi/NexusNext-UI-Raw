/**
 * Master Data View Alert Component
 * 
 * Generic view dialog for displaying entity details
 * Reusable across all master data pages
 */

'use client'

import { Alert, AlertActions, AlertDescription, AlertTitle, AlertBody } from '@/components/alert'
import { Button } from '@/components/button'
import { BaseMasterEntity } from './types'

interface ViewAlertProps<T extends BaseMasterEntity> {
  isOpen: boolean
  onClose: () => void
  entity: T | null
  entityName: string
  fields?: Array<{ key: keyof T; label: string }>
}

export function ViewAlert<T extends BaseMasterEntity>({
  isOpen,
  onClose,
  entity,
  entityName,
  fields = [
    { key: 'id' as keyof T, label: 'ID' },
    { key: 'name' as keyof T, label: `${entityName} Name` },
  ],
}: ViewAlertProps<T>) {
  if (!entity) return null

  return (
    <Alert open={isOpen} onClose={onClose}>
      <AlertTitle>{entityName} Details</AlertTitle>
      <AlertDescription>
        View the details of the selected {entityName.toLowerCase()} below.
      </AlertDescription>
      <AlertBody>
        <div className="space-y-3">
          {fields.map((field) => (
            <div key={String(field.key)} className="flex gap-2">
              <span className="font-medium text-zinc-700 dark:text-zinc-300">
                {field.label}:
              </span>
              <span className="text-zinc-600 dark:text-zinc-400">
                {String(entity[field.key])}
              </span>
            </div>
          ))}
        </div>
      </AlertBody>
      <AlertActions>
        <Button color="dark/zinc" onClick={onClose}>Close</Button>
      </AlertActions>
    </Alert>
  )
}

