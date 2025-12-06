/**
 * Master Data Delete Alert Component
 * 
 * Generic delete confirmation dialog
 * Reusable across all master data pages
 */

'use client'

import { useState } from 'react'
import { Alert, AlertActions, AlertDescription, AlertTitle } from '@/components/alert'
import { Button } from '@/components/button'
import { BaseMasterEntity } from './types'

interface DeleteAlertProps<T extends BaseMasterEntity> {
  isOpen: boolean
  onClose: () => void
  entity: T | null
  entityName: string
  onConfirm: (id: number) => void | Promise<void>
}

export function DeleteAlert<T extends BaseMasterEntity>({
  isOpen,
  onClose,
  entity,
  entityName,
  onConfirm,
}: DeleteAlertProps<T>) {
  const [isDeleting, setIsDeleting] = useState(false)

  // Handle delete confirmation
  const handleDelete = async () => {
    if (!entity) return

    setIsDeleting(true)

    try {
      await onConfirm(entity.id)
      onClose()
    } catch (error) {
      console.error(`Failed to delete ${entityName.toLowerCase()}:`, error)
    } finally {
      setIsDeleting(false)
    }
  }

  if (!entity) return null

  return (
    <Alert open={isOpen} onClose={onClose}>
      <AlertTitle>Are you sure you want to delete this {entityName.toLowerCase()}?</AlertTitle>
      <AlertDescription>
        You are about to delete <strong className="text-zinc-900 dark:text-white">{entity.name}</strong>. 
        This action cannot be undone. All associated data will be permanently removed.
      </AlertDescription>
      <AlertActions>
        <Button plain onClick={onClose} disabled={isDeleting}>
          Cancel
        </Button>
        <Button color="red" onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Yes, Delete'}
        </Button>
      </AlertActions>
    </Alert>
  )
}

